/**
 * SQL压缩工具主脚本
 */
document.addEventListener('DOMContentLoaded', function () {
    // 元素引用
    const sqlInput = document.getElementById('sql-input');
    const sqlOutput = document.getElementById('sql-output');
    const compressBtn = document.getElementById('compress-btn');
    const formatBtn = document.getElementById('format-btn');
    const clearInputBtn = document.getElementById('clear-input');
    const pasteBtn = document.getElementById('paste-sql');
    const copyBtn = document.getElementById('copy-output');
    const keepCommentsCheckbox = document.getElementById('keep-comments');
    const dialectSelect = document.getElementById('sql-dialect');
    const themeSwitch = document.getElementById('theme-switch');

    // 创建复制成功提示
    const copyTooltip = document.createElement('div');
    copyTooltip.className = 'copy-tooltip';
    copyTooltip.textContent = '复制成功';
    document.body.appendChild(copyTooltip);

    // 辅助函数：显示复制成功提示
    function showCopyTooltip() {
        copyTooltip.classList.add('show');
        setTimeout(() => {
            copyTooltip.classList.remove('show');
        }, 2000);
    }

    // 辅助函数：显示自定义提示
    function showTooltip(message) {
        copyTooltip.textContent = message;
        copyTooltip.classList.add('show');
        setTimeout(() => {
            copyTooltip.classList.remove('show');
        }, 2000);
    }

    // 压缩SQL
    compressBtn.addEventListener('click', function () {
        const sql = sqlInput.value.trim();
        if (!sql) {
            sqlOutput.value = '';
            return;
        }

        try {
            const options = {
                language: dialectSelect.value,
                keepComments: keepCommentsCheckbox.checked
            };

            const compressed = sqlFormatter.compress(sql, options);
            sqlOutput.value = compressed;
        } catch (error) {
            console.error('SQL压缩错误', error);
            sqlOutput.value = '处理SQL时出错: ' + error.message;
        }
    });

    // 美化SQL
    formatBtn.addEventListener('click', function () {
        const sql = sqlInput.value.trim();
        if (!sql) {
            sqlOutput.value = '';
            return;
        }

        try {
            const options = {
                language: dialectSelect.value,
                keepComments: keepCommentsCheckbox.checked
            };

            const formatted = sqlFormatter.format(sql, options);
            sqlOutput.value = formatted;
        } catch (error) {
            console.error('SQL格式化错误', error);
            sqlOutput.value = '处理SQL时出错: ' + error.message;
        }
    });

    // 清空输入
    clearInputBtn.addEventListener('click', function () {
        sqlInput.value = '';
        sqlInput.focus();
    });

    // 粘贴SQL
    pasteBtn.addEventListener('click', function () {
        if (window.utoolsHelper && typeof window.utoolsHelper.getClipboardText === 'function') {
            const clipboardText = window.utoolsHelper.getClipboardText();
            if (clipboardText) {
                sqlInput.value = clipboardText;
                // 自动调整高度
                autoResizeTextarea(sqlInput);
                // 显示提示
                showTooltip('SQL已粘贴');
            }
        } else if (typeof utools !== 'undefined' && typeof utools.readText === 'function') {
            const clipboardText = utools.readText();
            if (clipboardText) {
                sqlInput.value = clipboardText;
                // 自动调整高度
                autoResizeTextarea(sqlInput);
                // 显示提示
                showTooltip('SQL已粘贴');
            }
        }
    });

    // 复制结果
    copyBtn.addEventListener('click', function () {
        const output = sqlOutput.value.trim();
        if (!output) return;

        let success = false;

        // 首先尝试使用utoolsHelper
        if (window.utoolsHelper && typeof window.utoolsHelper.copyText === 'function') {
            success = window.utoolsHelper.copyText(output);
        }
        // 如果失败或者不存在，尝试使用原生utools API
        else if (typeof utools !== 'undefined' && typeof utools.copyText === 'function') {
            success = utools.copyText(output);
        }
        // 最后尝试使用document.execCommand
        else {
            try {
                sqlOutput.select();
                success = document.execCommand('copy');
            } catch (e) {
                console.error('复制失败', e);
            }
        }

        if (success) {
            showCopyTooltip();
        }
    });

    // 主题切换
    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function (e) {
        // Ctrl+Enter 执行压缩
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            compressBtn.click();
        }

        // Ctrl+Shift+Enter 执行美化
        if (e.ctrlKey && e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            formatBtn.click();
        }

        // Ctrl+V 在输入框中粘贴（当输入框聚焦时）
        if (e.ctrlKey && e.key === 'v' && document.activeElement !== sqlInput) {
            pasteBtn.click();
        }

        // Ctrl+C 复制结果（当结果框聚焦时）
        if (e.ctrlKey && e.key === 'c' && document.activeElement === sqlOutput) {
            e.preventDefault();
            copyBtn.click();
        }
    });

    // 支持拖放
    sqlInput.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    sqlInput.addEventListener('dragleave', function () {
        this.classList.remove('dragover');
    });

    sqlInput.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('dragover');

        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    const file = e.dataTransfer.items[i].getAsFile();
                    readFile(file);
                    break;
                } else if (e.dataTransfer.items[i].kind === 'string') {
                    e.dataTransfer.items[i].getAsString((s) => {
                        this.value = s;
                        // 自动调整高度
                        autoResizeTextarea(this);
                    });
                    break;
                }
            }
        }
    });

    // 读取拖放的文件
    function readFile(file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            sqlInput.value = e.target.result;
            // 自动调整高度
            autoResizeTextarea(sqlInput);
        };
        reader.readAsText(file);
    }

    // 输入区域自动调整高度
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }

    sqlInput.addEventListener('input', function () {
        autoResizeTextarea(this);
    });

    // 在初始化加载时自动调整
    if (sqlInput.value) {
        autoResizeTextarea(sqlInput);
    }

    // 如果剪贴板中有SQL语句，自动粘贴
    if (window.location.hash === '#auto-paste') {
        pasteBtn.click();
    }

    // 检查是否有从preload传递的SQL
    if (window.sqlFromClipboard) {
        console.log('从preload中获取到SQL，填充到输入框');
        sqlInput.value = window.sqlFromClipboard;
        autoResizeTextarea(sqlInput);
        // 可选：自动执行美化操作
        // formatBtn.click();
    }

    // 设置输入框焦点
    setTimeout(() => {
        // 再次检查是否有SQL内容（可能由preload.js在setTimeout中填充）
        if (sqlInput.value) {
            autoResizeTextarea(sqlInput);
        }
        sqlInput.focus();
    }, 200);
}); 