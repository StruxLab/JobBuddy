CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS jobapps;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS portals;
DROP TABLE IF EXISTS appstatuscodes;

CREATE TABLE IF NOT EXISTS portals (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title VARCHAR(125) NOT NULL,
  url VARCHAR(355)
);

CREATE TABLE appstatuscodes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  title VARCHAR(125) NOT NULL
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  github INTEGER UNIQUE,
  email VARCHAR(155),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jobapps (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  portal INTEGER NOT NULL REFERENCES portals (id),
  external_id VARCHAR(70) NOT NULL DEFAULT uuid_generate_v4(),
  status_code INTEGER NOT NULL REFERENCES appstatuscodes (id) DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  position VARCHAR (255),
  salary VARCHAR (100),
  location VARCHAR (255),
  employer VARCHAR (255),
  description VARCHAR (5000),
  UNIQUE (user_id, external_id, portal)
);

CREATE INDEX jobpostings_user ON jobapps (user_id);
CREATE INDEX external_id ON jobapps (external_id);
CREATE INDEX githubids ON users (github);

INSERT INTO appstatuscodes (id, title) VALUES
(-1, 'No status'),
(0, 'Not Interested'),
(1, 'Interested'),
(2, 'Applied'),
(3, 'Interviewing'),
(4, 'Offer Received'),
(5, 'No Longer Pursuing');

INSERT INTO portals (id, title, url) VALUES
(-1, 'Other', NULL),
(0, 'Indeed', 'indeed.com'),
(1, 'LinkedIn', 'linkedin.com'),
(2, 'Google', 'google.com'),
(3, 'Glassdoor', 'glassdoor.com'),
(4, 'Monster', 'monster.com'),
(5, 'ZipRecruiter', 'ziprecruiter.com');
