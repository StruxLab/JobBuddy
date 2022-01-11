SELECT	pg_terminate_backend (pid)
FROM	pg_stat_activity
WHERE	pg_stat_activity.datname = ':v1';

DROP DATABASE IF EXISTS :v1;

CREATE DATABASE :v1;
