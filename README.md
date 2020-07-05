# postgreSQL-playground



# Setup:


## Install postgreSQL


```bash
apt-get install postgresql postgresql-contrib   # install
update-rc.d postgresql enable                   # psql starts on boot
service postgresql start                        # start psql on port 5432 (default)
```

Setup Node.js stuff for a new project:
-----

```bash
npm init
npm i express pg

```

Basic commands to get started:
-----

```bash
psql postgres           # Enter default db
psql -d db -U user -W   # Enter db via user with password
=> \conninfo            # Displays connection info
=> \q                   # Exit psql connection
=> \c                   # Connect to a new database
=> \dt                  # List all tables
=> \du                  # List all roles
=> \list                # List databases
```

Basic SQL:
-----

```SQL
CREATE ROLE user WITH LOGIN PASSWORD 'password';

ALTER ROLE user CREATEDB;

CREATE DATABASE api;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO users (name, email)
  VALUES ('Name1', 'email@example.com'), ('Name2', 'ex@example.com');

SELECT * FROM users;
```

## Template for environment variables in a .env file:

```python
HOST=localhost
IP=ip
PORT=port
PGUSER=username
PGHOST=localhost
PGPASSWORD=password
PGDATABASE=database
PGPORT=5432
```