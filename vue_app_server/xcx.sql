#学子商城 “消息列表”
create table xz_message(
    id int primary key auto_increment,
    title varchar(255),
    ctime date,
    img_url varchar(255),
    desc1 varchar(255),
    content varchar(2000)
);
insert into xz_message values
    (null,'2018平安夜','2018-12-24',"http://127.0.0.1:3000/img/banner1.png",'444','4444'),
    (null,'2018圣诞节','2018-12-25',"http://127.0.0.1:3000/img/banner2.png",'444','4444'),
    (null,'2019元旦节','2019-01-01',"http://127.0.0.1:3000/img/banner3.png",'444','4444'),
    (null,'黄崇桎的生日','1993-10-28',"http://127.0.0.1:3000/img/banner4.png",'444','4444');