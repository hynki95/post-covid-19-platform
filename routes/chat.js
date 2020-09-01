const express = require('express');
const router = express.Router();
const JSONResponse  = dicontainer.get( "JSONResponse" );
const DB              = dicontainer.get( "DB" );
const pathUtil        = dicontainer.get( "pathUtil" );
const module_path     = pathUtil.basename( __filename );

router.post('/savechat', JSONResponse.isLoggedin, async function(req, res) {
    let rb = req.body;
    let room = rb.room;
    let msg = rb.msg;
    let userid = req.user.userid;
    let user_idx = req.user.user_idx;
    var sendData = {};
    var sql = `INSERT INTO chatting
    (room, messege, user_idx, reg_id, reg_time)
    VALUES(?, ?, ?, ?, current_timestamp);
    `;
    console.log(room,msg)
    let savechat = await DB.Sql( sql, [room, msg, user_idx, userid ]);
    console.log(savechat)
    if(savechat.affectedRows==1){
        res.send({data : sendData, status : true});
    }else{
        res.send({data : sendData, status : false});
    };
  });

  /* POST */
router.post('/getlist', JSONResponse.isLoggedin, async function(req, res, next) {
    let query = `
    select DISTINCT room from chatting where user_idx = ? ;
    `;
    
    let result = await DB.Sql( query,[req.user.user_idx]);
    console.log(result)
    if(result.length>0){
        res.send({"data":result, "itemsCount":result.length});
    }else{
        res.send({status : false});
    }
  });

  router.post('/loadchat', JSONResponse.isLoggedin, async function(req, res, next) {
    let room = req.body.room;
    console.log("room",room)
    let query = `
    select ch.messege,tu.user_id from chatting ch, tb_user tu  where room = ? and ch.user_idx = tu.user_idx order by reg_time;
    `;
    
    let result = await DB.Sql( query,room);
    console.log(result)
    if(result!=[]){
        res.send({data : result, status :true});
    }else{
        res.send({status : false});
    }
  });

  module.exports = router;