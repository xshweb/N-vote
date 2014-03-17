DROP TABLE IF EXISTS "admin";
CREATE TABLE "admin" (
  "id" integer NULL PRIMARY KEY AUTOINCREMENT,
  "usr" text(100) NULL,
  "pwd" text(32) NULL
);

INSERT INTO "admin" ("id", "usr", "pwd") VALUES (1,	'admin',	'202cb962ac59075b964b07152d234b70');

-- DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);

INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('admin',	'1');
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('admin',	'1');
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('vote',	'4');

DROP TABLE IF EXISTS "vote";
CREATE TABLE "vote" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "f0" integer NOT NULL,
  "f1" integer NOT NULL,
  "f2" integer NOT NULL,
  "f3" integer NOT NULL,
  "f4" integer NOT NULL,
  "f5" integer NOT NULL,
  "f6" integer NOT NULL,
  "f7" integer NOT NULL,
  "f8" integer NOT NULL,
  "f9" integer NOT NULL,
  "f10" integer NOT NULL,
  "ip" text NULL,
  "time" integer NOT NULL
);
