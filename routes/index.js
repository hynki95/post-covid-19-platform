const express = require('express');
const router = express.Router();
const JSONResponse  = dicontainer.get( "JSONResponse" );
const DB              = dicontainer.get( "DB" );
const pathUtil        = dicontainer.get( "pathUtil" );
const module_path     = pathUtil.basename( __filename );



/* GET home page. */
router.get('/', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let sql = 'SELECT /* ?getUserid */ user_idx, userrealnamefield  FROM tb_user WHERE user_id = ? ';
  let basic = await DB.Sql( sql, [ module_path, userid])

  console.log("sql : " + sql);
  res.render('index', { title: '환영합니다❤'} );
});

router.get('/chatting_room', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let room = req.query.room;
  console.log("chatting_roomroute",room)
  res.render('chatting_room', { title: 'Chatting', userid: userid,room : room});
});

router.get('/chatting', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  res.render('chatting', { title: 'Chatting', userid: userid});
});

router.get('/map', async function(req, res, next) {
  res.render('map', { title: 'map'});
});

router.get('/schedule', async function(req, res, next) {
  res.render('schedule', { title: 'schedule'});
});

router.get('/chargeUZPAY', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let sql = 'SELECT /* ?.getBalanceofKpay */ K_pay, UZ_pay FROM tb_user WHERE user_id = ? ';
  let getBalanceContent = await DB.Sql( sql, [ module_path, userid])
  console.log(getBalanceContent);
  console.log(getBalanceContent[0].K_pay)
  console.log(getBalanceContent[0].UZ_pay)
  console.log("sql : " + sql);
  res.render('chargeUZPAY', { title: 'Charge UZpay', UZ_pay : getBalanceContent[0].UZ_pay.toLocaleString() });
});

router.get('/sendKPAY', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let sql = 'SELECT /* ?.getBalanceofKpay */ K_pay, UZ_pay FROM tb_user WHERE user_id = ? ';
  let getBalanceContent = await DB.Sql( sql, [ module_path, userid])
  res.render('sendKPAY', { title: 'Send KRpay', KPAY: getBalanceContent[0].K_pay, KPAY_dispay: getBalanceContent[0].K_pay.toLocaleString()});
});

router.get('/sendUZPAY', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let sql = 'SELECT /* ?.getBalanceofKpay */ K_pay, UZ_pay FROM tb_user WHERE user_id = ? ';
  let getBalanceContent = await DB.Sql( sql, [ module_path, userid])
  res.render('sendUZPAY', { title: 'Send UZpay', UZ_PAY:  getBalanceContent[0].UZ_pay, UZPAY_dispay : getBalanceContent[0].UZ_pay.toLocaleString()});
});

router.get('/shop', JSONResponse.isLoggedin, function(req, res, next) {
  res.render('shop', { title: 'SHOP' });
});

router.get('/withdraw', JSONResponse.isLoggedin, async function(req, res, next) {
  let userid = req.user.userid;
  let sql = 'SELECT /* ?.getBalanceofKpay */ K_pay FROM tb_user WHERE user_id = ? ';
  let getBalanceContent = await DB.Sql( sql, [ module_path, userid])
  res.render('withdraw', { title: 'Cash Withdrawal', KPAY: getBalanceContent[0].K_pay.toLocaleString()});
});

router.get('/History', JSONResponse.isLoggedin, function(req, res, next) {
  res.render('History', { title: 'Transaction History' });
});

router.get('/autherror', JSONResponse.isLoggedin, function(req, res, next) {
  res.render('autherror');
});

module.exports = router;
