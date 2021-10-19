-- CREATE DATABASE waiter_app;

create table weeks (
    id serial not null primary key,
    week_day VARCHAR(10) NOT NULL,
);

create table stuffData (
    id serial not null primary key,
    user_name VARCHAR(10) NOT NULL,
);

create table adminData (
    id serial not null primary key,
    user_id text NOT NULL,
    weeks_id int,
    foreign key (user_id) references stuff(id)
    foreign key (weeks_id) references weeks(id)
);

-- Script
insert into weeks (week_day) values('Monday');
insert into weeks (week_day) values('Tuesday');
insert into weeks (week_day) values('Wednesday'); 
insert into weeks (week_day) values('Thursday'); 
insert into weeks (week_day) values('Friday'); 
insert into weeks (week_day) values('Saturday'); 
insert into weeks (week_day) values('Sunday'); 
