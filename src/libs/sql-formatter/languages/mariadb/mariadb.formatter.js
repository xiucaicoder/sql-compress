import { expandPhrases } from '../../expandPhrases.js';
import { postProcess } from './likeMariaDb.js';
import { dataTypes, keywords } from './mariadb.keywords.js';
import { functions } from './mariadb.functions.js';
const reservedSelect = expandPhrases(['SELECT [ALL | DISTINCT | DISTINCTROW]']);
const reservedClauses = expandPhrases([
    // queries
    'WITH [RECURSIVE]',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'PARTITION BY',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'FETCH {FIRST | NEXT}',
    // Data manipulation
    // - insert:
    'INSERT [LOW_PRIORITY | DELAYED | HIGH_PRIORITY] [IGNORE] [INTO]',
    'REPLACE [LOW_PRIORITY | DELAYED] [INTO]',
    'VALUES',
    'ON DUPLICATE KEY UPDATE',
    // - update:
    'SET',
    // other
    'RETURNING',
]);
const standardOnelineClauses = expandPhrases([
    'CREATE [OR REPLACE] [TEMPORARY] TABLE [IF NOT EXISTS]',
]);
const tabularOnelineClauses = expandPhrases([
    // - create:
    'CREATE [OR REPLACE] [SQL SECURITY DEFINER | SQL SECURITY INVOKER] VIEW [IF NOT EXISTS]',
    // - update:
    'UPDATE [LOW_PRIORITY] [IGNORE]',
    // - delete:
    'DELETE [LOW_PRIORITY] [QUICK] [IGNORE] FROM',
    // - drop table:
    'DROP [TEMPORARY] TABLE [IF EXISTS]',
    // - alter table:
    'ALTER [ONLINE] [IGNORE] TABLE [IF EXISTS]',
    'ADD [COLUMN] [IF NOT EXISTS]',
    '{CHANGE | MODIFY} [COLUMN] [IF EXISTS]',
    'DROP [COLUMN] [IF EXISTS]',
    'RENAME [TO]',
    'RENAME COLUMN',
    'ALTER [COLUMN]',
    '{SET | DROP} DEFAULT',
    'SET {VISIBLE | INVISIBLE}',
    // - truncate:
    'TRUNCATE [TABLE]',
    // https://mariadb.com/docs/reference/mdb/sql-statements/
    'ALTER DATABASE',
    'ALTER DATABASE COMMENT',
    'ALTER EVENT',
    'ALTER FUNCTION',
    'ALTER PROCEDURE',
    'ALTER SCHEMA',
    'ALTER SCHEMA COMMENT',
    'ALTER SEQUENCE',
    'ALTER SERVER',
    'ALTER USER',
    'ALTER VIEW',
    'ANALYZE',
    'ANALYZE TABLE',
    'BACKUP LOCK',
    'BACKUP STAGE',
    'BACKUP UNLOCK',
    'BEGIN',
    'BINLOG',
    'CACHE INDEX',
    'CALL',
    'CHANGE MASTER TO',
    'CHECK TABLE',
    'CHECK VIEW',
    'CHECKSUM TABLE',
    'COMMIT',
    'CREATE AGGREGATE FUNCTION',
    'CREATE DATABASE',
    'CREATE EVENT',
    'CREATE FUNCTION',
    'CREATE INDEX',
    'CREATE PROCEDURE',
    'CREATE ROLE',
    'CREATE SEQUENCE',
    'CREATE SERVER',
    'CREATE SPATIAL INDEX',
    'CREATE TRIGGER',
    'CREATE UNIQUE INDEX',
    'CREATE USER',
    'DEALLOCATE PREPARE',
    'DESCRIBE',
    'DROP DATABASE',
    'DROP EVENT',
    'DROP FUNCTION',
    'DROP INDEX',
    'DROP PREPARE',
    'DROP PROCEDURE',
    'DROP ROLE',
    'DROP SEQUENCE',
    'DROP SERVER',
    'DROP TRIGGER',
    'DROP USER',
    'DROP VIEW',
    'EXECUTE',
    'EXPLAIN',
    'FLUSH',
    'GET DIAGNOSTICS',
    'GET DIAGNOSTICS CONDITION',
    'GRANT',
    'HANDLER',
    'HELP',
    'INSTALL PLUGIN',
    'INSTALL SONAME',
    'KILL',
    'LOAD DATA INFILE',
    'LOAD INDEX INTO CACHE',
    'LOAD XML INFILE',
    'LOCK TABLE',
    'OPTIMIZE TABLE',
    'PREPARE',
    'PURGE BINARY LOGS',
    'PURGE MASTER LOGS',
    'RELEASE SAVEPOINT',
    'RENAME TABLE',
    'RENAME USER',
    'REPAIR TABLE',
    'REPAIR VIEW',
    'RESET MASTER',
    'RESET QUERY CACHE',
    'RESET REPLICA',
    'RESET SLAVE',
    'RESIGNAL',
    'REVOKE',
    'ROLLBACK',
    'SAVEPOINT',
    'SET CHARACTER SET',
    'SET DEFAULT ROLE',
    'SET GLOBAL TRANSACTION',
    'SET NAMES',
    'SET PASSWORD',
    'SET ROLE',
    'SET STATEMENT',
    'SET TRANSACTION',
    'SHOW',
    'SHOW ALL REPLICAS STATUS',
    'SHOW ALL SLAVES STATUS',
    'SHOW AUTHORS',
    'SHOW BINARY LOGS',
    'SHOW BINLOG EVENTS',
    'SHOW BINLOG STATUS',
    'SHOW CHARACTER SET',
    'SHOW CLIENT_STATISTICS',
    'SHOW COLLATION',
    'SHOW COLUMNS',
    'SHOW CONTRIBUTORS',
    'SHOW CREATE DATABASE',
    'SHOW CREATE EVENT',
    'SHOW CREATE FUNCTION',
    'SHOW CREATE PACKAGE',
    'SHOW CREATE PACKAGE BODY',
    'SHOW CREATE PROCEDURE',
    'SHOW CREATE SEQUENCE',
    'SHOW CREATE TABLE',
    'SHOW CREATE TRIGGER',
    'SHOW CREATE USER',
    'SHOW CREATE VIEW',
    'SHOW DATABASES',
    'SHOW ENGINE',
    'SHOW ENGINE INNODB STATUS',
    'SHOW ENGINES',
    'SHOW ERRORS',
    'SHOW EVENTS',
    'SHOW EXPLAIN',
    'SHOW FUNCTION CODE',
    'SHOW FUNCTION STATUS',
    'SHOW GRANTS',
    'SHOW INDEX',
    'SHOW INDEXES',
    'SHOW INDEX_STATISTICS',
    'SHOW KEYS',
    'SHOW LOCALES',
    'SHOW MASTER LOGS',
    'SHOW MASTER STATUS',
    'SHOW OPEN TABLES',
    'SHOW PACKAGE BODY CODE',
    'SHOW PACKAGE BODY STATUS',
    'SHOW PACKAGE STATUS',
    'SHOW PLUGINS',
    'SHOW PLUGINS SONAME',
    'SHOW PRIVILEGES',
    'SHOW PROCEDURE CODE',
    'SHOW PROCEDURE STATUS',
    'SHOW PROCESSLIST',
    'SHOW PROFILE',
    'SHOW PROFILES',
    'SHOW QUERY_RESPONSE_TIME',
    'SHOW RELAYLOG EVENTS',
    'SHOW REPLICA',
    'SHOW REPLICA HOSTS',
    'SHOW REPLICA STATUS',
    'SHOW SCHEMAS',
    'SHOW SLAVE',
    'SHOW SLAVE HOSTS',
    'SHOW SLAVE STATUS',
    'SHOW STATUS',
    'SHOW STORAGE ENGINES',
    'SHOW TABLE STATUS',
    'SHOW TABLES',
    'SHOW TRIGGERS',
    'SHOW USER_STATISTICS',
    'SHOW VARIABLES',
    'SHOW WARNINGS',
    'SHOW WSREP_MEMBERSHIP',
    'SHOW WSREP_STATUS',
    'SHUTDOWN',
    'SIGNAL',
    'START ALL REPLICAS',
    'START ALL SLAVES',
    'START REPLICA',
    'START SLAVE',
    'START TRANSACTION',
    'STOP ALL REPLICAS',
    'STOP ALL SLAVES',
    'STOP REPLICA',
    'STOP SLAVE',
    'UNINSTALL PLUGIN',
    'UNINSTALL SONAME',
    'UNLOCK TABLE',
    'USE',
    'XA BEGIN',
    'XA COMMIT',
    'XA END',
    'XA PREPARE',
    'XA RECOVER',
    'XA ROLLBACK',
    'XA START',
]);
const reservedSetOperations = expandPhrases([
    'UNION [ALL | DISTINCT]',
    'EXCEPT [ALL | DISTINCT]',
    'INTERSECT [ALL | DISTINCT]',
    'MINUS [ALL | DISTINCT]',
]);
const reservedJoins = expandPhrases([
    'JOIN',
    '{LEFT | RIGHT} [OUTER] JOIN',
    '{INNER | CROSS} JOIN',
    'NATURAL JOIN',
    'NATURAL {LEFT | RIGHT} [OUTER] JOIN',
    // non-standard joins
    'STRAIGHT_JOIN',
]);
const reservedPhrases = expandPhrases([
    'ON {UPDATE | DELETE} [SET NULL | SET DEFAULT]',
    'CHARACTER SET',
    '{ROWS | RANGE} BETWEEN',
    'IDENTIFIED BY',
]);
// For reference: https://mariadb.com/kb/en/sql-statements-structure/
export const mariadb = {
    name: 'mariadb',
    tokenizerOptions: {
        reservedSelect,
        reservedClauses: [...reservedClauses, ...standardOnelineClauses, ...tabularOnelineClauses],
        reservedSetOperations,
        reservedJoins,
        reservedPhrases,
        supportsXor: true,
        reservedKeywords: keywords,
        reservedDataTypes: dataTypes,
        reservedFunctionNames: functions,
        // TODO: support _ char set prefixes such as _utf8, _latin1, _binary, _utf8mb4, etc.
        stringTypes: [
            '""-qq-bs',
            "''-qq-bs",
            { quote: "''-raw", prefixes: ['B', 'X'], requirePrefix: true },
        ],
        identTypes: ['``'],
        identChars: { first: '$', rest: '$', allowFirstCharNumber: true },
        variableTypes: [
            { regex: '@@?[A-Za-z0-9_.$]+' },
            { quote: '""-qq-bs', prefixes: ['@'], requirePrefix: true },
            { quote: "''-qq-bs", prefixes: ['@'], requirePrefix: true },
            { quote: '``', prefixes: ['@'], requirePrefix: true },
        ],
        paramTypes: { positional: true },
        lineCommentTypes: ['--', '#'],
        operators: [
            '%',
            ':=',
            '&',
            '|',
            '^',
            '~',
            '<<',
            '>>',
            '<=>',
            '&&',
            '||',
            '!',
            '*.*', // Not actually an operator
        ],
        postProcess,
    },
    formatOptions: {
        onelineClauses: [...standardOnelineClauses, ...tabularOnelineClauses],
        tabularOnelineClauses,
    },
};
//# sourceMappingURL=mariadb.formatter.js.map