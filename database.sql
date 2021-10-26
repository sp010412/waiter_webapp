-- CREATE DATABASE waiter_app;
CREATE TABLE weeks (
    id serial not null primary key,
    week_day VARCHAR(100) NOT NULL
);

CREATE TABLE stuff (
    id serial not null primary key,
    user_name VARCHAR(10) NOT NULL
);

CREATE TABLE adminData (
    id serial not null primary key,
    user_id int,
    weeks_id int,
    foreign key (weeks_id) references weeks(id),
    foreign key (user_id) references stuff(id)
);

-- Script
INSERT INTO weeks (week_day) values('Monday');
INSERT INTO weeks (week_day) values('Tuesday');
INSERT INTO weeks (week_day) values('Wednesday'); 
INSERT INTO weeks (week_day) values('Thursday'); 
INSERT INTO weeks (week_day) values('Friday'); 
INSERT INTO weeks (week_day) values('Saturday'); 
INSERT INTO weeks (week_day) values('Sunday');