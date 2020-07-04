drop table if exists users;
CREATE TABLE users(
    userid int PRIMARY KEY,
    email_address varchar(50),
    username varchar(45),
    password varchar(45),
    signin_date float(12,2),
    credits int,
    nb_answer int,
    nb_accept int,
    nb_val int,
    nb_val_tp int,
    UNIQUE KEY (email_address, username, password)
);

drop table if exists admin;
CREATE TABLE admin(
    adminid int PRIMARY KEY,
    email_address varchar(50),
    adminname varchar(45),
    password varchar(45),
    access_level int,
    UNIQUE KEY (email_address, adminname, password)   
);

drop table if exists source;
CREATE TABLE source(
    sourceid int PRIMARY KEY,
    sourcename varchar(45),
    nb_finished int,
    publisher int,
    publish_date float(12,2),
    description varchar(500),
    priority int,
    nb_json int,
    fault_tolerance_degree int,
    FOREIGN KEY (publisher) REFERENCES admin(adminid)
);

drop table if exists text_data;
CREATE TABLE text_data(
    dataid int PRIMARY KEY,
    datasource int,
    data_index int,
    data_path varchar(200),
    final_labelid int,
    nb_label int,
    FOREIGN KEY (datasource) REFERENCES source(sourceid)
);

drop table if exists text_label;
CREATE TABLE text_label(
    labelid int,
    dataid int,
    userid int,
    labeldate float(12,2),
    label_path varchar(200),
    label_content varchar(200),
    correct int,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (dataid) REFERENCES text_data(dataid)
);

