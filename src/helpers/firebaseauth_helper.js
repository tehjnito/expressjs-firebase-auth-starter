const { fireAdmin } = require('../config/firebase');

const mdw_CHECK_FOR_VALID_FIREBASE_USER = function(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'api-auth/no-credentials' });
    }
    // console.log("NODE ENV: "+(process.env.NODE_ENV));
    var token = req.headers.authorization.replace("Bearer ", "");
    fireAdmin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            fireAdmin.auth().getUser(uid)
            .then(function(_record) {
                res.tjauth = {
                    fireUserAnonymous: (_record.providerData.length <= 0)? true : false,
                    fireUserToken: token,
                    fireUserUid: uid 
                };
            next();
          });
      })
      .catch(function(error) {
          // STICK-A-PIN: This helps me with testing locally with Postman...
          // Shouldn't matter since the NODE_ENV variable is always SUPPOSED to set to "production" --
          // in...production - still it's advised to remove this after testing.
          if((process.env.NODE_ENV || 'dev') == 'dev') {
              res.tjauth = {
                fireUserAnonymous: false, // LOL
                fireUserToken: 'suchtoken',
                fireUserUid: 'abcdefghijkellohmehnohpeeqrstuvwxyz' // LOL again
              };
              next();
        } else {
          return res.status(401).json({ error: 'api-auth/invalid-token' });
        }
    });
}

module.exports = { mdw_CHECK_FOR_VALID_FIREBASE_USER }