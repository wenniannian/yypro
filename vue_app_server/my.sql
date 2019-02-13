use xz;
create table xz_shop(
    id int primary key auto_increment,
    img_url varchar(255),
    name varchar(255),
    addr varchar(255),
    tel varchar(25),
    mtime varchar(25),
    star int
);
insert into xz_shop values
    (null,"http://127.0.0.1:3000/img/niu.png","芭菲盛宴(北城国际店)","(023)63506666","重庆市渝北区龙华大道66号","周一到周日(11:00:00-21:00:00)",88),
    (null,"http://127.0.0.1:3000/img/niu.png","芭菲盛宴(袁家岗店)","(023)68193333","重庆市九龙坡区袁家岗奥体路1号中新城上城B2-1五楼","周一到周日(11:00:00-21:00:00)",88),
    (null,"http://127.0.0.1:3000/img/niu.png","芭菲盛宴(解放碑店)","(023)63919999","民权路26号英利国际购物中心7层","周一到周日(11:00:00-21:00:00)",88),
    (null,"http://127.0.0.1:3000/img/niu.png","四海一家(重庆店)","(023)61883338","重庆江北区江北嘴文华街东路重庆大剧院B2楼","周一到周日(11:00:00-21:00:00)",88)
