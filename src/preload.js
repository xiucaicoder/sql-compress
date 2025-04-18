/**
 * uTools 预加载脚本
 * 用于处理 uTools API 的交互
 */

// 全局变量，用于存储从剪贴板或命令获取的SQL
window.sqlFromClipboard = '';

// 如果当前环境是uTools，监听窗口加载完成事件
if (typeof utools !== 'undefined') {
    // 监听窗口加载事件
    window.addEventListener('load', () => {
        console.log('uTools窗口加载完成，检查剪贴板内容');
        if (window.sqlFromClipboard) {
            console.log('发现SQL内容，准备填充到输入框');
            fillInputWithSQL(window.sqlFromClipboard);
        }
    });
}

// 辅助函数：填充SQL到输入框
function fillInputWithSQL(sql) {
    if (!sql) return;

    // 获取输入框元素
    const sqlInput = document.getElementById('sql-input');
    if (sqlInput) {
        console.log('找到输入框，填充SQL内容');
        sqlInput.value = sql;

        // 自动调整高度
        sqlInput.style.height = 'auto';
        sqlInput.style.height = (sqlInput.scrollHeight) + 'px';

        // 触发输入事件，确保任何依赖于输入变化的逻辑能够执行
        const event = new Event('input', { bubbles: true });
        sqlInput.dispatchEvent(event);

        // 可选：自动执行格式化操作
        // document.getElementById('format-btn').click();
    } else {
        console.warn('未找到输入框元素');
    }
}

// 导出插件接口
window.exports = {
    "sql-compress": {
        mode: "none",
        args: {
            // 进入插件时调用
            enter: (action) => {
                console.log('插件被激活，action类型:', action.type, '内容:', action.payload);

                let sql = '';

                // 根据不同的进入方式获取SQL
                if (action.type === 'regex' && action.payload) {
                    // 从文本匹配进入
                    sql = action.payload;
                } else if (action.type === 'over') {
                    // 从剪贴板匹配进入
                    sql = action.payload || '';

                    // 如果payload为空，尝试直接读取剪贴板
                    if (!sql && utools && typeof utools.readText === 'function') {
                        sql = utools.readText();
                    }
                } else if (action.type === 'text') {
                    // 从文本方式进入
                    sql = action.payload || '';
                }

                // 如果获取到了SQL内容
                if (sql) {
                    console.log('获取到SQL内容:', sql.substring(0, 50) + (sql.length > 50 ? '...' : ''));

                    // 保存到全局变量
                    window.sqlFromClipboard = sql;

                    // 尝试直接填充到输入框
                    fillInputWithSQL(sql);

                    // 同时也尝试延迟填充，以防DOM还未完全加载
                    setTimeout(() => {
                        fillInputWithSQL(sql);
                    }, 100);
                } else {
                    console.log('未获取到SQL内容');
                }
            }
        }
    }
};

// 监听uTools插件进入事件
if (typeof utools !== 'undefined') {
    utools.onPluginEnter(({ code, type, payload }) => {
        console.log('插件进入事件触发，类型:', type, '内容:', payload);
        // 调用刚才定义的enter函数
        if (window.exports && window.exports['sql-compress'] && window.exports['sql-compress'].args.enter) {
            window.exports['sql-compress'].args.enter({ type, payload });
        }
    });
}

// 工具函数
window.utoolsHelper = {
    // 复制文本到剪贴板
    copyText: (text) => {
        // 使用原生的 uTools API
        if (typeof utools !== 'undefined' && typeof utools.copyText === 'function') {
            return utools.copyText(text);
        } else {
            // 兼容浏览器环境
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                const result = document.execCommand('copy');
                document.body.removeChild(textarea);
                return result;
            } catch (e) {
                console.error('复制失败', e);
                return false;
            }
        }
    },

    // 从剪贴板获取文本
    getClipboardText: () => {
        if (typeof utools !== 'undefined' && typeof utools.readText === 'function') {
            return utools.readText();
        }
        return '';
    },

    // 获取系统主题
    getTheme: () => {
        if (typeof utools !== 'undefined' && typeof utools.isDarkColors === 'function') {
            return utools.isDarkColors() ? 'dark' : 'light';
        }

        // 浏览器环境下的备选方案
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
};

// 当页面加载完成，初始化主题和检查剪贴板
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题
    const theme = window.utoolsHelper.getTheme();
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.checked = true;
        }
    }

    // 检查是否有从命令或剪贴板获取的SQL
    console.log('DOMContentLoaded, 检查 sqlFromClipboard:', window.sqlFromClipboard);
    if (window.sqlFromClipboard) {
        fillInputWithSQL(window.sqlFromClipboard);
    } else {
        // 如果没有找到预先获取的SQL，尝试从剪贴板直接获取
        const clipboardText = window.utoolsHelper.getClipboardText();
        if (clipboardText && clipboardText.trim()) {
            console.log('从剪贴板获取内容:', clipboardText.substring(0, 50) + (clipboardText.length > 50 ? '...' : ''));
            fillInputWithSQL(clipboardText);
        }
    }
}); 