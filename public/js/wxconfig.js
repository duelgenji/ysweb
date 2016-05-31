/**
 * Created by knight on 16/5/31.
 */



function createNonceStr() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var str = "";
    var random = 0;
    for (var i = 0; i < 16; i++) {
        random = parseInt(Math.random()*chars.length);
        str += chars.substring(random,random+1);
    }
    return str;
}