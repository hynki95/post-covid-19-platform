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
    let user_idx = req.user.user_idx;
    var sendData = {};
    var sql = `INSERT INTO chatting
    (room, messege, user_idx)
    VALUES(?, ?, ?);
    `;
    let savechat = await DB.Sql( sql, [room, msg, user_idx ]);
    console.log(savechat)
    if(savechat.affectedRows==1){
        res.send({data : sendData, status : true});
    }else{
        res.send({data : sendData, status : false});
    };
  });

  module.exports = router;