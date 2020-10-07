const { IS_NUMERIC } = require("../helpers/queryhelper");

const VERSION_REQUIREMENTS = {
    "v0": {
        min_client_version: 1, 
        max_client_version: 1 
    }
}

const mdw_CHECK_APP_VERSION = function(req, res, next, leCurrentAPIVersion) {
    try {
      if (!req.headers.thisappversion) {
        return res.json({error: 'api-client/no-app-version'});
      }
      if(!IS_NUMERIC(req.headers.thisappversion)){
        return res.json({error: 'api-client/invalid-app-version'});
      }
      if(leCurrentAPIVersion == null || leCurrentAPIVersion.trim().length < 0){
        return res.json({error: 'api-api/required-app-version-not-specified-by-api'});
      }
    
      // TRED-CAREFULLY: JavaScript rounds up decimal numbers when they hit 9 (I think) places --
      // ...this is me trying to account for that ._.
      let theAppVersion = req.headers.thisappversion.toString();
      theAppVersion = parseFloat(theAppVersion);
    
      if(theAppVersion < VERSION_REQUIREMENTS[leCurrentAPIVersion].min_client_version 
            || theAppVersion > VERSION_REQUIREMENTS[leCurrentAPIVersion].max_client_version){
        return res.json({error: 'api-client/client-out-dated'});
      }
      next();
    } catch(error) {
      return res.json({error: 'api-client/invalid-app-version-header'});
    }
}  

module.exports = { mdw_CHECK_APP_VERSION }; 