const { clipboard } = require('electron');

// uTools 与页面交互的桥接函数
window.exports = {
    'sql-compress': {
        mode: 'none',
        args: {
            enter: (callbackSetList, callbackAddItem) => {
                window.utools.setSubInput(({ text }) => {
                    if (text) {
                        window.sqlInput = text;
                        window.dispatchEvent(new CustomEvent('sql-input', { detail: text }));
                    }
                }, '输入或粘贴SQL语句');
            }
        }
    },
    'sql-from-clipboard': {
        mode: 'none',
        args: {
            enter: (callbackSetList, callbackAddItem) => {
                try {
                    const clipboardText = clipboard.readText();
                    if (clipboardText && isSqlLike(clipboardText)) {
                        window.sqlInput = clipboardText;
                        window.dispatchEvent(new CustomEvent('sql-input', { detail: clipboardText }));
                    }
                } catch (error) {
                    console.error('读取剪贴板失败:', error);
                }
            }
        }
    },
    'sql-formatter': {
        mode: 'none',
        args: {
            enter: (callbackSetList, callbackAddItem) => {
                // 直接使用匹配到的SQL
                window.sqlInput = window.utools.getCurrentBrowserUrl();
                window.dispatchEvent(new CustomEvent('sql-input', { detail: window.sqlInput }));
            }
        }
    }
};

// 判断文本是否像SQL语句
function isSqlLike(text) {
    if (!text || typeof text !== 'string') return false;

    // SQL关键字正则
    const sqlKeywords = /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|AND|OR|JOIN|GROUP BY|ORDER BY|HAVING)\b/i;

    // 简单判断：包含SQL关键字并且长度超过10
    return sqlKeywords.test(text) && text.length > 10;
}

// 存储历史记录
window.saveHistory = (sql) => {
    try {
        const maxHistory = 20;
        let history = JSON.parse(window.localStorage.getItem('sql-history') || '[]');

        // 避免重复
        history = history.filter(item => item !== sql);

        // 添加到头部
        history.unshift(sql);

        // 限制数量
        if (history.length > maxHistory) {
            history = history.slice(0, maxHistory);
        }

        window.localStorage.setItem('sql-history', JSON.stringify(history));
    } catch (error) {
        console.error('保存历史记录失败:', error);
    }
};

// 获取历史记录
window.getHistory = () => {
    try {
        return JSON.parse(window.localStorage.getItem('sql-history') || '[]');
    } catch (error) {
        console.error('获取历史记录失败:', error);
        return [];
    }
};

// 复制到剪贴板
window.copyToClipboard = (text) => {
    try {
        clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('复制到剪贴板失败:', error);
        return false;
    }
}; 