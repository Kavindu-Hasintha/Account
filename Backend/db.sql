use accounting;

create user 'account'@'%' identified with mysql_native_password by 'account';

grant all privileges on *.* to 'account'@'%';

flush privileges;

create table users(
    u_id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    pword VARCHAR(100),
    dob DATE,
    sex VARCHAR(10),
    constraint users_pk PRIMARY KEY(u_id)
);

insert into users VALUES
(1, 'Kamal', 'kamal@gmail.com', '123456', '1995-04-29', 'Male'),
(2, 'Nimal', 'nimal@gmail.com', 'abcd1234', '1990-11-10', 'Male'),
(3, 'Sunil', 'sunil@gmail.com', 'abcdef@21A', '1987-12-27', 'Male');

insert into users(username, email, pword, dob, sex) VALUE ('Jehan', 'jehan@gmail.com', '00000', '1985-05-28', 'Male');

create table sales(
    s_id int not null AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint sales_pk primary key(s_id),
    constraint sales_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table costofsales(
    cid int not null AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint costofsales_pk primary key(cid),
    constraint costofsales_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table otherincome(
    o_id int NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint otherincome_pk primary key(o_id),
    constraint otherincome_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table administrativeexpenses(
    aid int NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint administrativeexpenses_pk primary key(aid),
    constraint administrativeexpenses_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table salesexpenses(
    s_id INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint salesexpenses_pk primary key(s_id),
    constraint salesexpenses_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table financialexpenses(
    fid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint financialexpenses_pk primary key(fid),
    constraint financialexpenses_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table noncurrentassets(
    ncaid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint noncurrentassets_pk primary key(ncaid),
    constraint noncurrentassets_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table currentassets(
    caid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint currentassets_pk primary key(caid),
    constraint currentassets_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table equity(
    eqid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint equity_pk primary key(eqid),
    constraint equity_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table noncurrentliabilities(
    nclid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint noncurrentliabilities_pk primary key(nclid),
    constraint noncurrentliabilities_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table currentliabilities(
    clid INT NOT NULL AUTO_INCREMENT,
    user_id int,
    year int,
    namevalue varchar(50),
    valu real,
    constraint currentliabilities_pk primary key(clid),
    constraint currentliabilities_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

create table totalvalues(
    user_id int not null,
    year int,
    grossprofit real,
    netprofit real,
    totalAssets real,
    totalequlia real,
    constraint totalvalues_pk primary key(user_id),
    constraint totalvalues_fk foreign key(user_id) references users(u_id) on delete cascade on update cascade
);

insert into grossprofit values(1, '2015', 1, 1, 1, 1, 1, 1, 1);