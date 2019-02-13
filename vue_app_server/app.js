// 1、加载模块 express pool
const express = require("express");
const pool = require("./pool");
const cors= require("cors");

// 2、创建express对象
const app = express();
// 3、指定监听端口3000
app.listen(3000,function(){
    console.log("web服务器创建成功");
});
// 4、指定静态目录 public
// c:/xmapp/htdocs/HCZ/第4阶段/1、Vueui/vue_app/server
app.use(express.static(__dirname+"/public"));
//跨源头资源共享 //npm i -save cors
app.use(cors({
    origin:[
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:4200",
        "http://127.0.0.1:4200"
    ],//来 地址:端口号，不能用*
    credentials:true//
}));
// 5、GET /imagimagelistelist 轮播图
app.get("/imagelist",(req,res)=>{
    var obj = [
        {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
        {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
        {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
        {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"}
    ];
    res.send(obj);
});

// 引入第三方模块：bodyParser 处理post请求
const bodyParser = require("body-parser");
// 配置bodyParser
app.use(bodyParser.urlencoded({
    // true:键值对 id:10任意数据类型；
    // false:           string/array
    extended:false 
}))
///7.1、nodejs app.js加载第三方模块；express-session
const session= require("express-session");
// 7.2、对模块进行配置；用户session //npm i -save express-session
app.use(session({
    secret:"128位随机字符", //安全字符串
    resave:false,          //请求保存
    saveUninitialized:true,//初始化保存
    cookie:{
        maxAge:1000 * 60 * 60 * 24 
    },//保存session 为1000毫秒*60*60*24 =1天
}))

//服务器创建完毕之后通过浏览器测试结果

// 功能二：新闻分页显示
app.get("/newslist",(req,res)=>{
    // 1、获取参数
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;// 查询结果是字符串，需要转换为数字 【代码67、68两行】
    // 2、设置默认值 1 7 
    if(!pno){pno=1}
    if(!pageSize){pageSize=7}
    // 3、创建正则表达式验证用户输入验证
    var reg = /^[0-9]{1,3}$/;//页数
    // 4、如果出错停止函数运行
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return;
    }

    var progress = 0;
    var obj = {code:1};
    // 5、创建sql1 查询总记录数 严格区分大小写
    var sql = "SELECT count(id) AS c FROM xz_news";
    pool.query(sql,(err,result)=>{
        if(err) throw err;//抛出错误
        var pageCount = Math.ceil(result[0].c/pageSize);
        progress+=50;
        obj.pageCount = pageCount;//返回页码
        if(progress==100){
            res.send(obj);
        }
    })
    // 6、创建sql2 查询当前页内容 严格区分大小写
    var sql =" SELECT id,title,ctime,img_url,point,content FROM xz_news LIMIT ?,?";//?占位符
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    //              开始位置 显示个数
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;//抛出错误
        progress+=50;
        obj.data = result;//返回数组
        if(progress==100){
            // 7、返回结果
            res.send(obj);
        }
    })
});

// 功能三：查找一条新闻详细信息
app.get("/newsinfo",(req,res)=>{
    //1、参数
    var id=req.query.id;
    //2、sql
    var sql="SELECT id,title,content,point,ctime FROM xz_news WHERE id= ?";
    //3、json
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    });
})

//功能四:分页查找指定新闻下评论列表
app.get("/getcomment",(req,res)=>{
    //1:获取参数
    var pno = req.query.pno;  //页码
    var pageSize = req.query.pageSize;//页大小
    var nid = req.query.nid; //新闻id
    //2:设置默认值 1 7
    if(!pno){pno = 1}
    if(!pageSize){pageSize=7}
    //3:创建正则表达式验证用户输入验证
    var reg = /^[0-9]{1,3}$/;
    //4:如果错出停止函数运行
    if(!reg.test(pno)){
       res.send({code:-1,msg:"页编格式不正确"});
       return;
    }
    if(!reg.test(pageSize)){
       res.send({code:-2,msg:"页大小格式不正确"});
       return;
    }
   
    var progress = 0;
    var obj = {code:1};
    //在obj里加了一个uname
    obj.uname = req.session.uname;//获取到session中存储的uname

    //5:创建sql1 查询总记录数   严格区分大小写
    var sql = "SELECT count(id) AS c FROM xz_comment WHERE nid = ?";
    nid = parseInt(nid);
    pool.query(sql,[nid],(err,result)=>{
      if(err)throw err;
      var pageCount = Math.ceil(result[0].c/pageSize);
      progress+=50;
      obj.pageCount = pageCount;
      if(progress==100){
        res.send(obj);
      }
    });
    //6:创建sql2 查询当前页内容 严格区分大小写
    var sql =" SELECT id,user_name,ctime, content FROM xz_comment WHERE nid = ? ORDER BY id DESC LIMIT ?,?";
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
      if(err)throw err;
      progress+=50;
      obj.data=result;
      if(progress==100){
        res.send(obj);
      }
    })
});

/*
    https://www.cnblogs.com/chyingp/p/nodejs-learning-express-body-parser.html
    Express 常用中间件 body-parser 实现解析
    body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。使用非常简单，以下两行代码已经覆盖了大部分的使用场景。
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
*/
//功能五、发表评论
app.post("/addComment",(req,res)=>{
    // 三个参数
    // 需要第三方模块支持 bodyParser
    var nid = req.body.nid;
    var content = req.body.content;
    // var user_name = req.body.user_name; //没加session前的操作
    var user_name = req.session.uname;//加session以后添加的user_name，登录以后就不会是匿名评论了
    // 脚手架：将登录和添加ajax

    // 2、创建sql语句
    var sql="insert into xz_comment(`id`,`nid`,`user_name`,`ctime`,`content`) values(null,?,?,now(),?)";
    nid = parseInt(nid);// 将nid转为数字
    pool.query(sql,[nid,user_name,content],(err,result)=>{
        if(err) throw err;
        // 返回添加结果
        res.send({code:1,msg:"评论发表成功"});
    })
})

//功能六、商品列表
app.get("/goodslist",(req,res)=>{
    var obj=[];
    obj.push({id:1,title:"小辣椒",old:1999,now:999,img_url:"http://127.0.0.1:3000/img/banner1.png"});
    obj.push({id:2,title:"中辣椒",old:2999,now:1999,img_url:"http://127.0.0.1:3000/img/banner2.png"});
    obj.push({id:3,title:"大辣椒",old:3999,now:2999,img_url:"http://127.0.0.1:3000/img/banner3.png"});
    obj.push({id:4,title:"超大辣椒",old:4999,now:3999,img_url:"http://127.0.0.1:3000/img/banner4.png"});
    // 返回值
    res.send(obj);

    // // 请求数据库
    // var sql="SELECT * FROM xz_laptop";
    // pool.query(sql,(err,result)=>{
    //     if(err) throw err;
    //     res.send(result);
    // })
})

// 功能七、用户登录
app.get("/login",(req,res)=>{
    // 1、获取参数 uname upwd
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    // 2、创建正则表达式验证
    // 3、创建sql
    var sql = "select count(id) as c from xz_login where uname=? and upwd=md5(?)";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        var obj = result[0].c;
        if(obj == 1){
            // 7.3、将用户名保存session对象中
            req.session.uname = uname;//在session中保存一个属性，叫uname
            res.send({code:1,msg:"登录成功"});
        }else{
            res.send({code:-1,msg:"用户名或密码有误！"});
        }
    })
})

// 功能八、添加购物车
app.get("/addCart",(req,res)=>{
    //1:获取3个参数
    //需要第三方模块支持 bodyParser
    var uid = req.query.uid;
    var pid = req.query.pid;
    var c = req.query.count;
    //2:创建sql语句
    var sql  =" INSERT INTO `xz_shoppingcart_item`(`iid`, `user_id`, `product_id`, `count`, `is_checked`) VALUES (null,?,?,?,0)"
  
    pool.query(sql,[uid,pid,c],(err,result)=>{
         if(err)throw err;
         res.send({code:1,msg:"购物车添加成功"});
    });
    //3:返回添加结果
  })

// 功能九、查询购物车
app.get("/getCarts",(req,res)=>{
    // 1、获取参数
    var uid = req.query.uid;

    // 创建sql
    var sql ="SELECT c.iid,c.user_id,c.count,p.price,p.lname FROM `xz_laptop` p,`xz_shoppingcart_item` c WHERE p.lid = c.product_id AND c.user_id = ?";
    uip = parseInt(uid);
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
})

// 功能十、更新购物数量
app.get("/updateCart",(req,res)=>{
    // 1、参数 iid/count
    var iid = req.query.iid;
    var count = req.query.count;
    // 2、sql
    var sql = "update xz_shoppingcart_item set count=? where iid=?";
    iid = parseInt(iid);//修改格式为
    pool.query(sql,[count,iid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:1,msg:"数量修改成功"});//返回对象
        }else{
            res.send({code:-1,msg:"数量修改失败"});
        }
    })
    // 3、json {code:1,msg:"数量修改成功"}
})

// 功能十一、搜索商品名称
app.get("/search",(req,res)=>{
    // 如果搜索参数有多个
    // var color = req.query.color; //颜色
    // var are =req.query.are; //地址，比如从哪里发货
    // var sql = "select ..."
    // if(color != undefined){
    //     sql+=" and color="+color;
    // }else if(are != undefined){
    //     sql+=" and are="+are;
    // }

    // 获取商品名称关键字
    var keyword = req.query.keyword;
    var low = parseInt(req.query.low);
    var high = parseInt(req.query.high);
    // 创建sql语句
    var sql = "select lid,lname,price from xz_laptop where lname like ? and price >= ? and price <= ?";
    pool.query(sql,[`%${keyword}%`,low,high],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            res.send({code:-1,msg:"您搜索的商品不存在"})
        }else{
            res.send({code:1,data:result});
        }
    });
})

// 功能十二、返回用户信息列表
app.get("/users",(req,res)=>{
    // http://127.0.0.1:3000/users
    var rows = [
        {id:1,uname:'tom'},
        {id:2,uname:'jerry'},
        {id:3,uname:'jack'}
      ];
    var req = req.query.id;// 获取参数
    console.log(req);// undefined
    res.send(rows);// 返回
});

// 功能十三、删除指定用户
app.get("/delUser",(req,res)=>{
    // http://127.0.0.1:3000/delUser?id=3
    var id = req.query.id;
    res.send({code:1,msg:"删除成功"+id});
});

// 功能十四:分页查找指定商家列表
app.get("/findshops",(req,res)=>{
    // 1、获取参数
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;// 查询结果是字符串，需要转换为数字 【代码67、68两行】
    // 2、设置默认值 1 7 
    if(!pno){pno=1}
    if(!pageSize){pageSize=7}
    // 3、创建正则表达式验证用户输入验证
    var reg = /^[0-9]{1,3}$/;//页数
    // 4、如果出错停止函数运行
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return;
    }

    var progress = 0;
    var obj = {code:1};
    // 5、创建sql1 查询总记录数 严格区分大小写
    var sql = "SELECT count(id) AS c FROM xz_news";
    pool.query(sql,(err,result)=>{
        if(err) throw err;//抛出错误
        var pageCount = Math.ceil(result[0].c/pageSize);
        progress+=50;
        obj.pageCount = pageCount;//返回页码
        if(progress==100){
            res.send(obj);
        }
    })
    // 6、创建sql2 查询当前页内容 严格区分大小写
    var sql =" SELECT id,name,img_url,addr,mtime,tel,star FROM xz_shop LIMIT ?,?";//?占位符
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    //              开始位置 显示个数
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;//抛出错误
        progress+=50;
        obj.data = result;//返回数组
        if(progress==100){
            // 7、返回结果
            res.send(obj);
        }
    })
});

// 功能十五、添加一个商品
app.get("/addProduct",(req,res)=>{
    var pno = req.query.pno;
    var pname = req.query.pname;
    console.log(pno+":"+pname)
    res.send({code:1,msg:"商品添加成功"});
})

// 功能十六、分页查询日志消息（）
app.get("/getMessage",(req,res)=>{
    // 1、获取参数
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;// 查询结果是字符串，需要转换为数字 【代码67、68两行】
    // 2、设置默认值 1 7 
    if(!pno){pno=1}
    if(!pageSize){pageSize=7}
    // 3、创建正则表达式验证用户输入验证
    var reg = /^[0-9]{1,3}$/;//页数
    // 4、如果出错停止函数运行
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页码格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return;
    }

    var progress = 0;
    var obj = {code:1};
    // 5、创建sql1 查询总记录数 严格区分大小写
    var sql = "SELECT count(id) AS c FROM xz_message";
    pool.query(sql,(err,result)=>{
        if(err) throw err;//抛出错误
        var pageCount = Math.ceil(result[0].c/pageSize);
        progress+=50;
        obj.pageCount = pageCount;//返回页码
        if(progress==100){
            res.send(obj);
        }
    })
    // 6、创建sql2 查询当前页内容 严格区分大小写
    var sql =" SELECT id,title,img_url,ctime,desc1,content FROM xz_message LIMIT ?,?";//?占位符
    var offset = parseInt((pno-1)*pageSize);
        pageSize = parseInt(pageSize);
    //              开始位置 显示个数
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;//抛出错误
        progress+=50;
        obj.data = result;//返回数组
        if(progress==100){
            // 7、返回结果
            res.send(obj);
        }
    })
});

// 功能十七、上传商品名称与商品参数
const multer = require("multer");
const fs = require("fs");
// 1、创建对象 upload
var upload = multer({dest:"upload/"});
// 2、接收客户请求 post /upload
app.post("/upload",upload.single("mypic"),(req,res)=>{
    // 3、判断大小 2MB
    var size = req.file.size/1000/1000; // 字节
    if(size>2){
        res.send({code:-1,msg:"上传文件过大 不能超过2MB"});
        return;
    }
    // 4、判断类型 image/png image/gif image/jpeg ...
    var type = req.file.mimetype;
    var i2 = type.indexOf("image");// 查找image
    if(i2 == -1){// 如果不是图片
        res.send({code:-2,msg:"上传不是图片"});
    }
    // 5、创建新文件名
    var src = req.file.originalname;// 原来的name
    var t = new Date().getTime();// 时间戳—1970年1月1日到现在的毫秒数
    var r = Math.floor(Math.random()*9999);// 随机数
    var i3 = src.lastIndexOf(".");
    var suff = src.substring(i3,src.length);// 后缀
    var newFile = "./upload/"+t+r+suff;// 20181225 8888 .png
    // 6、移动文件操作
    fs.renameSync(req.file.path,newFile);// fs.renameSync(临时文件，目录文件)
    // 7、返回值
    res.send({code:1,msg:"上传成功"});
});