export const keywords = [
    // List of all keywords taken from:
    // https://docs.singlestore.com/managed-service/en/reference/sql-reference/restricted-keywords/list-of-restricted-keywords.html
    // Then filtered down to reserved keywords by running
    // > SELECT * AS <keyword>;
    // for each keyword in that list and observing which of these produce an error.
    'ADD',
    'ALL',
    'ALTER',
    'ANALYZE',
    'AND',
    'AS',
    'ASC',
    'ASENSITIVE',
    'BEFORE',
    'BETWEEN',
    '_BINARY',
    'BOTH',
    'BY',
    'CALL',
    'CASCADE',
    'CASE',
    'CHANGE',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'CONDITION',
    'CONSTRAINT',
    'CONTINUE',
    'CONVERT',
    'CREATE',
    'CROSS',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'CURRENT_USER',
    'CURSOR',
    'DATABASE',
    'DATABASES',
    'DAY_HOUR',
    'DAY_MICROSECOND',
    'DAY_MINUTE',
    'DAY_SECOND',
    'DECLARE',
    'DEFAULT',
    'DELAYED',
    'DELETE',
    'DESC',
    'DESCRIBE',
    'DETERMINISTIC',
    'DISTINCT',
    'DISTINCTROW',
    'DIV',
    'DROP',
    'DUAL',
    'EACH',
    'ELSE',
    'ELSEIF',
    'ENCLOSED',
    'ESCAPED',
    'EXCEPT',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'EXTRA_JOIN',
    'FALSE',
    'FETCH',
    'FOR',
    'FORCE',
    'FORCE_COMPILED_MODE',
    'FORCE_INTERPRETER_MODE',
    'FOREIGN',
    'FROM',
    'FULL',
    'FULLTEXT',
    'GRANT',
    'GROUP',
    'HAVING',
    'HEARTBEAT_NO_LOGGING',
    'HIGH_PRIORITY',
    'HOUR_MICROSECOND',
    'HOUR_MINUTE',
    'HOUR_SECOND',
    'IF',
    'IGNORE',
    'IN',
    'INDEX',
    'INFILE',
    'INNER',
    'INOUT',
    'INSENSITIVE',
    'INSERT',
    'IN',
    '_INTERNAL_DYNAMIC_TYPECAST',
    'INTERSECT',
    'INTERVAL',
    'INTO',
    'ITERATE',
    'JOIN',
    'KEY',
    'KEYS',
    'KILL',
    'LEADING',
    'LEAVE',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LINES',
    'LOAD',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOCK',
    'LOOP',
    'LOW_PRIORITY',
    'MATCH',
    'MAXVALUE',
    'MINUS',
    'MINUTE_MICROSECOND',
    'MINUTE_SECOND',
    'MOD',
    'MODIFIES',
    'NATURAL',
    'NO_QUERY_REWRITE',
    'NOT',
    'NO_WRITE_TO_BINLOG',
    'NO_QUERY_REWRITE',
    'NULL',
    'ON',
    'OPTIMIZE',
    'OPTION',
    'OPTIONALLY',
    'OR',
    'ORDER',
    'OUT',
    'OUTER',
    'OUTFILE',
    'OVER',
    'PRIMARY',
    'PROCEDURE',
    'PURGE',
    'RANGE',
    'READ',
    'READS',
    'REFERENCES',
    'REGEXP',
    'RELEASE',
    'RENAME',
    'REPEAT',
    'REPLACE',
    'REQUIRE',
    'RESTRICT',
    'RETURN',
    'REVOKE',
    'RIGHT',
    'RIGHT_ANTI_JOIN',
    'RIGHT_SEMI_JOIN',
    'RIGHT_STRAIGHT_JOIN',
    'RLIKE',
    'SCHEMA',
    'SCHEMAS',
    'SECOND_MICROSECOND',
    'SELECT',
    'SEMI_JOIN',
    'SENSITIVE',
    'SEPARATOR',
    'SET',
    'SHOW',
    'SIGNAL',
    'SPATIAL',
    'SPECIFIC',
    'SQL',
    'SQL_BIG_RESULT',
    'SQL_BUFFER_RESULT',
    'SQL_CACHE',
    'SQL_CALC_FOUND_ROWS',
    'SQLEXCEPTION',
    'SQL_NO_CACHE',
    'SQL_NO_LOGGING',
    'SQL_SMALL_RESULT',
    'SQLSTATE',
    'SQLWARNING',
    'STRAIGHT_JOIN',
    'TABLE',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'UNBOUNDED',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    '_UTF8',
    'VALUES',
    'WHEN',
    'WHERE',
    'WHILE',
    'WINDOW',
    'WITH',
    'WITHIN',
    'WRITE',
    'XOR',
    'YEAR_MONTH',
    'ZEROFILL',
];
export const dataTypes = [
    // https://docs.singlestore.com/cloud/reference/sql-reference/data-types/
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'CHAR',
    'CHARACTER',
    'DATETIME',
    'DEC',
    'DECIMAL',
    'DOUBLE PRECISION',
    'DOUBLE',
    'ENUM',
    'FIXED',
    'FLOAT',
    'FLOAT4',
    'FLOAT8',
    'INT',
    'INT1',
    'INT2',
    'INT3',
    'INT4',
    'INT8',
    'INTEGER',
    'LONG',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'MIDDLEINT',
    'NATIONAL CHAR',
    'NATIONAL VARCHAR',
    'NUMERIC',
    'PRECISION',
    'REAL',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'UNSIGNED',
    'VARBINARY',
    'VARCHAR',
    'VARCHARACTER',
    'YEAR',
];
//# sourceMappingURL=singlestoredb.keywords.js.map