DROP TABLE IF EXISTS "admin";
CREATE TABLE "admin" (
  "id" integer NULL PRIMARY KEY AUTOINCREMENT,
  "usr" text(100) NULL,
  "pwd" text(32) NULL
);

INSERT INTO "admin" ("id", "usr", "pwd") VALUES (1,	'admin',	'202cb962ac59075b964b07152d234b70');

-- DROP TABLE IF EXISTS "sqlite_sequence";
-- CREATE TABLE sqlite_sequence(name,seq);
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('admin',	'1');
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('vote',	'1');

DROP TABLE IF EXISTS "vote";
CREATE TABLE "vote" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,

  "a0" integer NOT NULL,
  "a1" integer NOT NULL,
  "a2" integer NOT NULL,
  "a3" integer NOT NULL,
  "a4" integer NOT NULL,
  "a5" integer NOT NULL,
  "at" text(500) NOT NULL DEFAULT '',

  "b0" integer NOT NULL,
  "b1" integer NOT NULL,
  "b2" integer NOT NULL,
  "b3" integer NOT NULL,
  "b4" integer NOT NULL,
  "bt" text(500) NOT NULL DEFAULT '',

  "c0" integer NOT NULL,
  "c1" integer NOT NULL,
  "c2" integer NOT NULL,
  "c3" integer NOT NULL,
  "c4" integer NOT NULL,
  "ct" text(500) NOT NULL DEFAULT '',

  "d0" integer NOT NULL,
  "d1" integer NOT NULL,
  "d2" integer NOT NULL,
  "d3" integer NOT NULL,
  "d4" integer NOT NULL,
  "dt" text(500) NOT NULL DEFAULT '',

  "e0" integer NOT NULL,
  "e1" integer NOT NULL,
  "e2" integer NOT NULL,
  "e3" integer NOT NULL,
  "e4" integer NOT NULL,
  "et" text(500) NOT NULL DEFAULT '',

  "ip" text NULL,
  "time" integer NOT NULL
);
