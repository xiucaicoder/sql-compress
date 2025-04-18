import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { format } from 'sql-formatter';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

// 常量定义
const FORMATTER_OPTIONS = {
    language: 'sql',
    uppercase: false, // SQL关键字是否大写
    indentStyle: 'standard', // 缩进样式
    keywordCase: 'preserve', // 保留关键字的大小写
};

// 通用工具函数
const compress = (sql) => {
    if (!sql) return '';

    // 移除注释
    sql = sql.replace(/--.*$/gm, ''); // 移除单行注释
    sql = sql.replace(/\/\*[\s\S]*?\*\//g, ''); // 移除多行注释

    // 压缩空白
    sql = sql.replace(/\s+/g, ' ').trim();

    return sql;
};

const formatSQL = (sql, options = {}) => {
    if (!sql) return '';

    try {
        return format(sql, { ...FORMATTER_OPTIONS, ...options });
    } catch (error) {
        console.error('SQL格式化错误:', error);
        return sql; // 出错时返回原始SQL
    }
};

// 复制成功提示组件
const CopyNotification = ({ show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 2000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="copy-success">复制成功!</div>
    );
};

// 主应用组件
const App = () => {
    const [sql, setSql] = useState('');
    const [formattedSql, setFormattedSql] = useState('');
    const [compressedSql, setCompressedSql] = useState('');
    const [activeTab, setActiveTab] = useState('format'); // 'format' 或 'compress'
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [uppercaseKeywords, setUppercaseKeywords] = useState(false);

    const editorRef = useRef(null);

    // 处理SQL输入
    const handleSqlChange = (value) => {
        setSql(value);
        processSql(value);
    };

    // 处理SQL
    const processSql = (inputSql) => {
        if (!inputSql) {
            setFormattedSql('');
            setCompressedSql('');
            setCharCount(0);
            return;
        }

        try {
            // 格式化
            const formatted = formatSQL(inputSql, { uppercase: uppercaseKeywords });
            setFormattedSql(formatted);

            // 压缩
            const compressed = compress(inputSql);
            setCompressedSql(compressed);

            // 字符计数
            setCharCount(inputSql.length);

            // 保存到历史
            if (inputSql.trim().length > 10) {
                window.saveHistory && window.saveHistory(inputSql);
                loadHistory();
            }
        } catch (error) {
            console.error('处理SQL错误:', error);
        }
    };

    // 复制到剪贴板
    const copyToClipboard = (text) => {
        if (window.copyToClipboard) {
            const success = window.copyToClipboard(text);
            if (success) {
                setShowCopyNotification(true);
            }
        } else {
            navigator.clipboard.writeText(text)
                .then(() => setShowCopyNotification(true))
                .catch(err => console.error('复制失败:', err));
        }
    };

    // 加载历史记录
    const loadHistory = () => {
        if (window.getHistory) {
            const historyItems = window.getHistory();
            setHistory(historyItems);
        }
    };

    // 从历史中加载
    const loadFromHistory = (item) => {
        setSql(item);
        processSql(item);
        setShowHistory(false);
    };

    // 切换大小写
    const toggleUppercase = () => {
        const newValue = !uppercaseKeywords;
        setUppercaseKeywords(newValue);
        processSql(sql, { uppercase: newValue });
    };

    // 初始化和事件监听
    useEffect(() => {
        // 加载历史
        loadHistory();

        // 监听来自uTools的SQL输入
        const handleSqlInput = (event) => {
            const inputSql = event.detail;
            if (inputSql) {
                setSql(inputSql);
                processSql(inputSql);
            }
        };

        window.addEventListener('sql-input', handleSqlInput);

        // 检查初始SQL
        if (window.sqlInput) {
            setSql(window.sqlInput);
            processSql(window.sqlInput);
        }

        return () => {
            window.removeEventListener('sql-input', handleSqlInput);
        };
    }, []);

    return (
        <div className="app-container">
            <div className="header">
                <h1 className="title">SQL格式化压缩工具</h1>

                <div className="toolbar">
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                        <span style={{ marginRight: '8px', fontSize: '14px' }}>大写关键字:</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={uppercaseKeywords}
                                onChange={toggleUppercase}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <button
                        className={`btn ${showHistory ? '' : 'btn-secondary'}`}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        历史记录
                    </button>
                </div>
            </div>

            <div className="content">
                <div className="editor-container">
                    <div className="editor-header">
                        <div className="editor-title">输入SQL</div>
                        <div className="editor-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setSql('')}
                                disabled={!sql}
                            >
                                清空
                            </button>
                        </div>
                    </div>

                    <div className="editor-wrapper">
                        <CodeMirror
                            value={sql}
                            height="100%"
                            extensions={[sql()]}
                            onChange={handleSqlChange}
                            ref={editorRef}
                        />
                    </div>
                </div>

                <div className="tab-container">
                    <div
                        className={`tab ${activeTab === 'format' ? 'active' : ''}`}
                        onClick={() => setActiveTab('format')}
                    >
                        格式化
                    </div>
                    <div
                        className={`tab ${activeTab === 'compress' ? 'active' : ''}`}
                        onClick={() => setActiveTab('compress')}
                    >
                        压缩
                    </div>
                </div>

                <div className="editor-container">
                    <div className="editor-header">
                        <div className="editor-title">
                            {activeTab === 'format' ? '格式化结果' : '压缩结果'}
                        </div>
                        <div className="editor-actions">
                            <button
                                className="btn"
                                onClick={() => copyToClipboard(activeTab === 'format' ? formattedSql : compressedSql)}
                                disabled={activeTab === 'format' ? !formattedSql : !compressedSql}
                            >
                                复制
                            </button>
                        </div>
                    </div>

                    <div className="editor-wrapper">
                        <CodeMirror
                            value={activeTab === 'format' ? formattedSql : compressedSql}
                            height="100%"
                            extensions={[sql()]}
                            readOnly={true}
                        />
                    </div>
                </div>

                <div className="status-bar">
                    <div>字符数: {charCount}</div>
                </div>

                {showHistory && history.length > 0 && (
                    <div className="history-container">
                        <div style={{ marginBottom: '10px', fontWeight: '500' }}>历史记录</div>
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="history-item"
                                onClick={() => loadFromHistory(item)}
                            >
                                {item.length > 60 ? item.substring(0, 60) + '...' : item}
                            </div>
                        ))}
                    </div>
                )}

                <CopyNotification
                    show={showCopyNotification}
                    onClose={() => setShowCopyNotification(false)}
                />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root')); 