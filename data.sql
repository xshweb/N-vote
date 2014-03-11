-- Adminer 4.0.3 SQLite 3 dump

DROP TABLE IF EXISTS "admin";
CREATE TABLE "admin" (
  "id" integer NULL PRIMARY KEY AUTOINCREMENT,
  "usr" text(100) NULL,
  "pwd" text(32) NULL
);

INSERT INTO "admin" ("id", "usr", "pwd") VALUES (1,	'admin',	'202cb962ac59075b964b07152d234b70');

DROP TABLE IF EXISTS "imgs";
CREATE TABLE "imgs" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" text(100) NOT NULL,
  "description" text(300) NULL,
  "name" text(100) NOT NULL
);

-- DROP TABLE IF EXISTS "sqlite_sequence";
-- CREATE TABLE sqlite_sequence(name,seq);

INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('admin',	'1');
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('vote',	'0');
INSERT INTO "sqlite_sequence" ("name", "seq") VALUES ('imgs',	'0');

DROP TABLE IF EXISTS "vote";
CREATE TABLE "vote" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "stu_id" text(20) NOT NULL,
  "imgs_id" integer NOT NULL,
  "ip" text(15) NULL,
  "time" integer NOT NULL,
  FOREIGN KEY ("imgs_id") REFERENCES "imgs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

--
