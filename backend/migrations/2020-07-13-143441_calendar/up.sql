CREATE TABLE users (
    username VARCHAR NOT NULL PRIMARY KEY,
    registerdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username) VALUES ("tmp_name");


CREATE TABLE schedules (
    id VARCHAR PRIMARY KEY,
    username VARCHAR,
    fromtime TIMESTAMP,
    totime TIMESTAMP
)

--INSERT INTO schedules (username, fromtime, totime) VALUES ("komi", "2020-07-18 00:00:00", "2020-07-20 00:00:00");
--INSERT INTO schedules (username, fromtime, totime) VALUES ("komi", "2020-07-21 08:00:00", "2020-07-21 18:00:00");
