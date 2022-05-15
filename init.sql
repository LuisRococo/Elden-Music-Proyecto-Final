use db_elden_music;

create table tbl_user (
	id_user int unsigned primary key AUTO_INCREMENT,
    user_name varchar (20) unique not null,
    email varchar (60) unique not null,
    password varchar(64) not null,
    is_admin bool default (false) not null
);

create table tbl_user_address (
	id_address int unsigned primary key auto_increment,
    id_user int unsigned not null,
    address varchar (40) not null,
    is_main_adress bool default(false) not null,
    
    foreign key (id_user) references tbl_user (id_user)
);

create table tbl_file (
	id_file int unsigned primary key auto_increment,
    file_content MEDIUMTEXT not null,
    is_song bool not null,
    is_song_complete bool default(false) not null
);

create table tbl_singer (
	id_singer int unsigned primary key auto_increment,
    singer_name varchar (40) not null,
    stage_name varchar(16) not null,
    nationality varchar (20) not null,
    id_image int unsigned not null,
    
    foreign key (id_image) references tbl_file (id_file) ON DELETE CASCADE
);

create table tbl_album (
	id_album int unsigned primary key auto_increment,
    album_name varchar(20) not null,
    release_date date default(now()) not null,
    is_single bool default(false) not null,
    id_singer int unsigned not null,
    id_image int unsigned not null,
    price_album decimal(8, 2) not null,
    price_album_digital decimal(8,2) not null,
    price_song decimal(8, 2) not null,
    
    foreign key (id_singer) references tbl_singer (id_singer),
    foreign key (id_image) references tbl_file (id_file)
);


create table tbl_song (
	id_song int unsigned primary key auto_increment,
    song_name varchar(30) not null,
    duration int not null,
    id_preview_song_file int unsigned not null,
    id_song_file int unsigned not null,
    id_album int unsigned not null,
    
    foreign key (id_preview_song_file) references tbl_file (id_file),
    foreign key (id_album) references tbl_album (id_album),
    foreign key (id_song_file) references tbl_file (id_file)
);

create table tbl_top_singer_songs (
	id_singer int unsigned not null,
    id_song int unsigned not null,
    
    primary key (id_singer, id_song),
    
    foreign key (id_singer) references tbl_singer (id_singer),
    foreign key (id_song) references tbl_song (id_song)
);

create table tbl_genre (
	id_genre int unsigned primary key auto_increment,
    genre_name varchar(10)
);

create table tbl_album_genre (
	id_album int unsigned not null,
    id_genre int unsigned not null,
    
    primary key (id_album, id_genre),
    
    foreign key (id_album) references tbl_album (id_album),
    foreign key (id_genre) references tbl_genre (id_genre)
);

create table tbl_user_song (
	id_user int unsigned not null,
    id_song int unsigned not null,
    
    primary key (id_user, id_song),
    
    foreign key (id_user) references tbl_user (id_user),
    foreign key (id_song) references tbl_song (id_song)
);

create table tbl_playlist (
	id_playlist int unsigned primary key auto_increment,
    id_user int unsigned not null,
    playlist_name varchar (20) not null,
    
    foreign key (id_user) references tbl_user (id_user)
);

create table tbl_playlist_song (
	id_playlist int unsigned not null,
    id_song int unsigned not null,
    
    primary key (id_playlist, id_song),
    
    foreign key (id_playlist) references tbl_playlist (id_playlist),
    foreign key (id_song) references tbl_song (id_song)
);

-- ADD VALUES
insert into tbl_genre (genre_name) values ('Pop');
insert into tbl_genre (genre_name) values ('Rock');
insert into tbl_genre (genre_name) values ('Classic');
insert into tbl_genre (genre_name) values ('Metal');
insert into tbl_user (user_name, email, password, is_admin) values ("root", "root@root.com", "/rMnGERzd75qGAptEe++WM9K4ESeJz6NgvF2w9/CQ9Q=", true);