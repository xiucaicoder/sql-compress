/**
 * uTools 预加载脚本
 * 用于处理 uTools API 的交互
 */

window.exports = {
    "sql-compress": {
        mode: "none",
        args: {
            // 进入插件时调用
            enter: (action) => {
                // 处理从文本匹配进入的情况，自动填充输入框
                if (action.type === 'regex' && action.payload) {
                    // 延迟执行，确保 DOM 已经加载
                    setTimeout(() => {
                        const sqlInput = document.getElementById('sql-input');
                        if (sqlInput) {
                            sqlInput.value = action.payload;
                            // 可以自动执行压缩或格式化操作
                            // document.getElementById('compress-btn').click();
                        }
                    }, 100);
                }
            }
        }
    }
};

// 工具函数
window.utools = {
    // 复制文本到剪贴板
    copyText: (text) => {
        if (window.utools && window.utools.copyText) {
            window.utools.copyText(text);
            return true;
        } else {
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
        if (window.utools && window.utools.readText) {
            return window.utools.readText();
        }
        return '';
    },

    // 获取系统主题
    getTheme: () => {
        if (window.utools && window.utools.isDarkColors) {
            return window.utools.isDarkColors() ? 'dark' : 'light';
        }

        // 浏览器环境下的备选方案
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    }
};

// 当页面加载完成，初始化主题
document.addEventListener('DOMContentLoaded', () => {
    const theme = window.utools.getTheme();
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeSwitch = document.getElementById('theme-switch');
        if (themeSwitch) {
            themeSwitch.checked = true;
        }
    }
}); 