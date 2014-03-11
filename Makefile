all:
	npm install
	mkdir -p data/session
	cat data.sql | sqlite3 data/data.db
