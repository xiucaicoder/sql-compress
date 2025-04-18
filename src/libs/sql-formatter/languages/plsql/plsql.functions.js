export const functions = [
    // https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions001.htm
    // numeric
    'ABS',
    'ACOS',
    'ASIN',
    'ATAN',
    'ATAN2',
    'BITAND',
    'CEIL',
    'COS',
    'COSH',
    'EXP',
    'FLOOR',
    'LN',
    'LOG',
    'MOD',
    'NANVL',
    'POWER',
    'REMAINDER',
    'ROUND',
    'SIGN',
    'SIN',
    'SINH',
    'SQRT',
    'TAN',
    'TANH',
    'TRUNC',
    'WIDTH_BUCKET',
    // character
    'CHR',
    'CONCAT',
    'INITCAP',
    'LOWER',
    'LPAD',
    'LTRIM',
    'NLS_INITCAP',
    'NLS_LOWER',
    'NLSSORT',
    'NLS_UPPER',
    'REGEXP_REPLACE',
    'REGEXP_SUBSTR',
    'REPLACE',
    'RPAD',
    'RTRIM',
    'SOUNDEX',
    'SUBSTR',
    'TRANSLATE',
    'TREAT',
    'TRIM',
    'UPPER',
    'NLS_CHARSET_DECL_LEN',
    'NLS_CHARSET_ID',
    'NLS_CHARSET_NAME',
    'ASCII',
    'INSTR',
    'LENGTH',
    'REGEXP_INSTR',
    // datetime
    'ADD_MONTHS',
    'CURRENT_DATE',
    'CURRENT_TIMESTAMP',
    'DBTIMEZONE',
    'EXTRACT',
    'FROM_TZ',
    'LAST_DAY',
    'LOCALTIMESTAMP',
    'MONTHS_BETWEEN',
    'NEW_TIME',
    'NEXT_DAY',
    'NUMTODSINTERVAL',
    'NUMTOYMINTERVAL',
    'ROUND',
    'SESSIONTIMEZONE',
    'SYS_EXTRACT_UTC',
    'SYSDATE',
    'SYSTIMESTAMP',
    'TO_CHAR',
    'TO_TIMESTAMP',
    'TO_TIMESTAMP_TZ',
    'TO_DSINTERVAL',
    'TO_YMINTERVAL',
    'TRUNC',
    'TZ_OFFSET',
    // comparison
    'GREATEST',
    'LEAST',
    // conversion
    'ASCIISTR',
    'BIN_TO_NUM',
    'CAST',
    'CHARTOROWID',
    'COMPOSE',
    'CONVERT',
    'DECOMPOSE',
    'HEXTORAW',
    'NUMTODSINTERVAL',
    'NUMTOYMINTERVAL',
    'RAWTOHEX',
    'RAWTONHEX',
    'ROWIDTOCHAR',
    'ROWIDTONCHAR',
    'SCN_TO_TIMESTAMP',
    'TIMESTAMP_TO_SCN',
    'TO_BINARY_DOUBLE',
    'TO_BINARY_FLOAT',
    'TO_CHAR',
    'TO_CLOB',
    'TO_DATE',
    'TO_DSINTERVAL',
    'TO_LOB',
    'TO_MULTI_BYTE',
    'TO_NCHAR',
    'TO_NCLOB',
    'TO_NUMBER',
    'TO_DSINTERVAL',
    'TO_SINGLE_BYTE',
    'TO_TIMESTAMP',
    'TO_TIMESTAMP_TZ',
    'TO_YMINTERVAL',
    'TO_YMINTERVAL',
    'TRANSLATE',
    'UNISTR',
    // largeObject
    'BFILENAME',
    'EMPTY_BLOB,',
    'EMPTY_CLOB',
    // collection
    'CARDINALITY',
    'COLLECT',
    'POWERMULTISET',
    'POWERMULTISET_BY_CARDINALITY',
    'SET',
    // hierarchical
    'SYS_CONNECT_BY_PATH',
    // dataMining
    'CLUSTER_ID',
    'CLUSTER_PROBABILITY',
    'CLUSTER_SET',
    'FEATURE_ID',
    'FEATURE_SET',
    'FEATURE_VALUE',
    'PREDICTION',
    'PREDICTION_COST',
    'PREDICTION_DETAILS',
    'PREDICTION_PROBABILITY',
    'PREDICTION_SET',
    // xml
    'APPENDCHILDXML',
    'DELETEXML',
    'DEPTH',
    'EXTRACT',
    'EXISTSNODE',
    'EXTRACTVALUE',
    'INSERTCHILDXML',
    'INSERTXMLBEFORE',
    'PATH',
    'SYS_DBURIGEN',
    'SYS_XMLAGG',
    'SYS_XMLGEN',
    'UPDATEXML',
    'XMLAGG',
    'XMLCDATA',
    'XMLCOLATTVAL',
    'XMLCOMMENT',
    'XMLCONCAT',
    'XMLFOREST',
    'XMLPARSE',
    'XMLPI',
    'XMLQUERY',
    'XMLROOT',
    'XMLSEQUENCE',
    'XMLSERIALIZE',
    'XMLTABLE',
    'XMLTRANSFORM',
    // encoding
    'DECODE',
    'DUMP',
    'ORA_HASH',
    'VSIZE',
    // nullRelated
    'COALESCE',
    'LNNVL',
    'NULLIF',
    'NVL',
    'NVL2',
    // env
    'SYS_CONTEXT',
    'SYS_GUID',
    'SYS_TYPEID',
    'UID',
    'USER',
    'USERENV',
    // aggregate
    'AVG',
    'COLLECT',
    'CORR',
    'CORR_S',
    'CORR_K',
    'COUNT',
    'COVAR_POP',
    'COVAR_SAMP',
    'CUME_DIST',
    'DENSE_RANK',
    'FIRST',
    'GROUP_ID',
    'GROUPING',
    'GROUPING_ID',
    'LAST',
    'MAX',
    'MEDIAN',
    'MIN',
    'PERCENTILE_CONT',
    'PERCENTILE_DISC',
    'PERCENT_RANK',
    'RANK',
    'REGR_SLOPE',
    'REGR_INTERCEPT',
    'REGR_COUNT',
    'REGR_R2',
    'REGR_AVGX',
    'REGR_AVGY',
    'REGR_SXX',
    'REGR_SYY',
    'REGR_SXY',
    'STATS_BINOMIAL_TEST',
    'STATS_CROSSTAB',
    'STATS_F_TEST',
    'STATS_KS_TEST',
    'STATS_MODE',
    'STATS_MW_TEST',
    'STATS_ONE_WAY_ANOVA',
    'STATS_T_TEST_ONE',
    'STATS_T_TEST_PAIRED',
    'STATS_T_TEST_INDEP',
    'STATS_T_TEST_INDEPU',
    'STATS_WSR_TEST',
    'STDDEV',
    'STDDEV_POP',
    'STDDEV_SAMP',
    'SUM',
    'VAR_POP',
    'VAR_SAMP',
    'VARIANCE',
    // Windowing functions (minus the ones already listed in aggregates)
    // window
    'FIRST_VALUE',
    'LAG',
    'LAST_VALUE',
    'LEAD',
    'NTILE',
    'RATIO_TO_REPORT',
    'ROW_NUMBER',
    // objectReference
    'DEREF',
    'MAKE_REF',
    'REF',
    'REFTOHEX',
    'VALUE',
    // model
    'CV',
    'ITERATION_NUMBER',
    'PRESENTNNV',
    'PRESENTV',
    'PREVIOUS',
];
//# sourceMappingURL=plsql.functions.js.map