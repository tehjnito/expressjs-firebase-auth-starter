if((process.env.NODE_ENV || 'dev') == 'dev') {
    require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const timeout = require('connect-timeout');
const { mdw_CHECK_FOR_VALID_FIREBASE_USER } = require('./helpers/firebaseauth_helper');
const { mdw_CHECK_APP_VERSION } = require("./config/appsettings");


let app = express();
let appMainAPI = express();
let appMainAPIv0 = express();

app.use(cors());
app.use(bodyParser.json());

appMainAPI.use(mdw_CHECK_FOR_VALID_FIREBASE_USER);
appMainAPIv0.use(function(req, res, next){
    mdw_CHECK_APP_VERSION(req, res, next, 'v0');
});


//////////////////////////////////////
////////////// ROUTES ////////////////
//////////////////////////////////////

// TODO: Bruh, remember to pree this in case it get in the way lol...
appMainAPIv0.get('/tj', (req, res) => { res.send('chubble...'); });
appMainAPIv0.post('/tj', (req, res) => { res.json(req.body); });

//////////////////////////////////////
//////////////////////////////////////



appMainAPI.use('/api/v0', appMainAPIv0);
app.use('/a', appMainAPI);


const listeningPort = process.env.PORT || 7555;
app.listen(listeningPort, () => {
  console.log('> Ready on http://localhost:'+listeningPort);
  console.log("NODE ENV: "+(process.env.NODE_ENV || 'dev?'));
});