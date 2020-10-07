const QueryHelper = {
    pageSize: 50, // MAX (DEFAULT) PAGE SIZE THAT CAN BE REQUESTED
    minSearchTermLength: 3
}

const DB_StringEscape = function(str) {
    if(typeof str == 'number'){
        return Number(str).toString();
    }
    else if(typeof str != 'string' || !str || str.length <= 0){
        return '';
    }
    return str.replace(/\\/g, "\\\\")
            .replace(/[^\x00-\x7F]/g, "")
            .replace(/\'/g, "\\\'")
            .replace(/\"/g, "\\\"")
            .replace(/\n/g, "\\\n")
            .replace(/\r/g, "\\\r")
            .replace(/\x00/g, "\\\x00")
            .replace(/\x1a/g, "\\\x1a")
            //.replace(/-+/g, ' ')
            //.replace(/[^A-Za-z0-9\s._?@:\/\-&=+*!#%,]/g,'')
            .replace(/(\-\-)+/g,'')
            .split(' ').join(' ');
}

const STR_StripDown = function(str){
    if(typeof str != 'string' || !str || str.length <= 0){
        return null;
    }
    return str.toLowerCase().replace(/\s/g,'');
}

const REMOVE_PUNCTUATION_ESCAPE = function(str){
    return str.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g,",");
}

function IS_NUMERIC(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }



module.exports = { QueryHelper, DB_StringEscape, STR_StripDown, IS_NUMERIC, REMOVE_PUNCTUATION_ESCAPE }