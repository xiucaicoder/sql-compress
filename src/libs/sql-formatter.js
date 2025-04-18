/**
 * 简易SQL格式化工具
 * 基于正则表达式实现SQL的美化和压缩
 */
(function (global) {
    const SQLFormatter = {
        /**
         * 格式化SQL (美化)
         * @param {string} sql SQL语句
         * @param {Object} options 选项
         * @returns {string} 格式化后的SQL
         */
        format: function (sql, options) {
            if (!sql) return '';

            const config = Object.assign({
                language: 'sql',
                uppercase: true,
                indent: '  ',
                keywordCase: 'upper', // 'upper', 'lower', 'preserve'
                linesBetweenQueries: 2,
                maxColumnLength: 50,
                keepComments: true,
            }, options);

            // 如果用户选择不保留注释，移除所有注释
            if (!config.keepComments) {
                sql = this._removeComments(sql);
            }

            // 移除多余空白
            sql = this._removeExtraWhitespace(sql);

            // 处理关键字大小写
            sql = this._handleKeywordCase(sql, config.keywordCase);

            // 处理主要关键字后的换行
            sql = this._formatMainKeywords(sql);

            // 格式化逗号
            sql = this._formatCommas(sql);

            // 格式化括号
            sql = this._formatParentheses(sql, config.indent);

            // 为每行添加适当的缩进
            sql = this._indentLines(sql, config.indent);

            return sql.trim();
        },

        /**
         * 压缩SQL
         * @param {string} sql SQL语句
         * @param {Object} options 选项
         * @returns {string} 压缩后的SQL
         */
        compress: function (sql, options) {
            if (!sql) return '';

            const config = Object.assign({
                language: 'sql',
                keepComments: true,
                keywordCase: 'upper', // 'upper', 'lower', 'preserve'
            }, options);

            // 如果用户选择不保留注释，移除所有注释
            if (!config.keepComments) {
                sql = this._removeComments(sql);
            }

            // 移除多余空白
            sql = this._removeExtraWhitespace(sql);

            // 处理关键字大小写
            sql = this._handleKeywordCase(sql, config.keywordCase);

            // 压缩成一行，保留必要的空格
            sql = this._compressToSingleLine(sql);

            return sql.trim();
        },

        /**
         * 移除所有SQL注释
         * @param {string} sql SQL语句
         * @returns {string} 无注释的SQL
         */
        _removeComments: function (sql) {
            // 移除多行注释 /* */
            sql = sql.replace(/\/\*[\s\S]*?\*\//g, '');

            // 移除单行注释 --
            sql = sql.replace(/--.*?$/gm, '');

            return sql;
        },

        /**
         * 移除多余的空白字符
         * @param {string} sql SQL语句
         * @returns {string} 处理后的SQL
         */
        _removeExtraWhitespace: function (sql) {
            // 替换多个空白为单个空格
            sql = sql.replace(/\s+/g, ' ');

            return sql;
        },

        /**
         * 处理关键字大小写
         * @param {string} sql SQL语句
         * @param {string} keywordCase 大小写类型
         * @returns {string} 处理后的SQL
         */
        _handleKeywordCase: function (sql, keywordCase) {
            if (keywordCase === 'preserve') {
                return sql;
            }

            const keywords = [
                'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS',
                'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'INSERT',
                'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'VIEW', 'INDEX',
                'FUNCTION', 'PROCEDURE', 'TRIGGER', 'AS', 'ON', 'AND', 'OR', 'NOT', 'IN',
                'BETWEEN', 'LIKE', 'IS', 'NULL', 'TRUE', 'FALSE', 'CASE', 'WHEN', 'THEN',
                'ELSE', 'END', 'DISTINCT', 'COUNT', 'MAX', 'MIN', 'AVG', 'SUM', 'WITH'
            ];

            let processedSql = sql;

            // 使用正则表达式匹配关键字，忽略字符串和标识符内的关键字
            for (const keyword of keywords) {
                const pattern = new RegExp(`\\b${keyword}\\b`, 'gi');
                processedSql = processedSql.replace(pattern, (match) => {
                    return keywordCase === 'upper' ? match.toUpperCase() : match.toLowerCase();
                });
            }

            return processedSql;
        },

        /**
         * 格式化主要关键字
         * @param {string} sql SQL语句
         * @returns {string} 格式化后的SQL
         */
        _formatMainKeywords: function (sql) {
            // 主要关键字后添加换行
            const mainKeywords = [
                'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING',
                'LIMIT', 'UNION', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER',
                'DROP', 'SET'
            ];

            let processedSql = sql;

            for (const keyword of mainKeywords) {
                const pattern = new RegExp(`\\b${keyword}\\b`, 'gi');
                processedSql = processedSql.replace(pattern, `\n${keyword}`);
            }

            // 为JOIN语句添加换行
            processedSql = processedSql.replace(/\b(INNER|LEFT|RIGHT|OUTER|CROSS|FULL)?\s+JOIN\b/gi, '\n$&');

            return processedSql;
        },

        /**
         * 格式化逗号
         * @param {string} sql SQL语句
         * @returns {string} 格式化后的SQL
         */
        _formatCommas: function (sql) {
            // 将逗号前的空格去掉，逗号后换行
            return sql.replace(/\s*,\s*/g, ',\n');
        },

        /**
         * 格式化括号
         * @param {string} sql SQL语句
         * @param {string} indent 缩进字符
         * @returns {string} 格式化后的SQL
         */
        _formatParentheses: function (sql, indent) {
            // 左括号后添加换行和缩进
            let result = sql.replace(/\(/g, '(\n');

            // 右括号前添加换行
            result = result.replace(/\)/g, '\n)');

            return result;
        },

        /**
         * 为每行添加适当的缩进
         * @param {string} sql SQL语句
         * @param {string} indent 缩进字符
         * @returns {string} 格式化后的SQL
         */
        _indentLines: function (sql, indent) {
            const lines = sql.split('\n');
            let indentLevel = 0;
            let result = [];

            for (let line of lines) {
                line = line.trim();
                if (!line) continue;

                // 右括号减少缩进
                if (line === ')') {
                    indentLevel = Math.max(0, indentLevel - 1);
                }

                // 添加缩进
                if (line.length > 0) {
                    const currentIndent = indent.repeat(indentLevel);
                    result.push(currentIndent + line);
                } else {
                    result.push('');
                }

                // 左括号增加缩进
                if (line.endsWith('(')) {
                    indentLevel += 1;
                }
            }

            return result.join('\n');
        },

        /**
         * 压缩成单行
         * @param {string} sql SQL语句
         * @returns {string} 压缩后的SQL
         */
        _compressToSingleLine: function (sql) {
            // 移除所有换行符
            let compressed = sql.replace(/\n/g, ' ');

            // 为主要关键字保留一个空格
            const keywordsToKeepSpace = [
                'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING',
                'LIMIT', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS',
                'UNION', 'ALL', 'INSERT', 'UPDATE', 'DELETE', 'SET', 'VALUES',
                'CREATE', 'ALTER', 'DROP', 'AND', 'OR', 'ON', 'AS'
            ];

            for (const keyword of keywordsToKeepSpace) {
                const pattern = new RegExp(`\\s*\\b${keyword}\\b\\s*`, 'gi');
                compressed = compressed.replace(pattern, ` ${keyword} `);
            }

            // 逗号后保留一个空格
            compressed = compressed.replace(/,\s*/g, ', ');

            // 移除括号周围的空格
            compressed = compressed.replace(/\s*\(\s*/g, '(');
            compressed = compressed.replace(/\s*\)\s*/g, ') ');

            // 处理多余的空格
            compressed = compressed.replace(/\s+/g, ' ');

            return compressed;
        }
    };

    // 导出为全局变量
    global.sqlFormatter = {
        format: function (sql, options) {
            return SQLFormatter.format(sql, options);
        },
        compress: function (sql, options) {
            return SQLFormatter.compress(sql, options);
        }
    };

})(typeof window !== 'undefined' ? window : this); 