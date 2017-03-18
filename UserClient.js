import Client from './Utility'
import Config from './config'
export default class UserClient {
    static login(account, password, cb) {
        return Client._fetch(Config.serverIP + "get/userToken", "POST", JSON.stringify({
            account : account,
            password: password
        }), (err, res) => {
            if(!err){
                localStorage.setItem("jwt", res.token);
                localStorage.setItem("_id", res._id);
            }           
            cb(err, res);
        });
    }
    //取得基本資訊
    static getUserByAccount(account, cb) {
        return Client._fetch(Config.serverIP + "get/userByAccount?account=" + account, "GET", null, cb);
    }
    //取得基本資訊
    static getBasicFromID(userID, cb) {
        return Client._fetch(Config.serverIP + "get/userBasicFromID?userID=" + userID, "GET", null, cb);
    }
    //註冊新用戶
    static register(user, cb) {
        return Client._fetch(Config.serverIP + "post/user", "POST", JSON.stringify({
            name: user.name,
            account : user.account,
            password: user.password,
            gender: user.gender,
            birthday: user.birthday
        }), cb);
    }   
    //修改基本資料
    static putBasic(user, cb) {
        return Client._fetch(Config.serverIP + "put/userBasic", "POST", JSON.stringify({
            describe : user.describe
        }), cb);
    }
    //追隨其他user
    static followUser(userID, cb) {
        return Client._fetch(Config.serverIP + "put/followUser", "POST", JSON.stringify({
            userID : userID
        }), cb);
    }
    //取消追蹤某人
    static cancelFollowUser(userID, cb){
        return Client._fetch(Config.serverIP + "put/cancelFollowUser", "POST", JSON.stringify({
            userID : userID
        }), cb);
    }
    //收藏某book
    static collectBook(bookID, cb) {
        return Client._fetch(Config.serverIP + "put/collectBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }
    //取消收藏
    static cancelCollectBook(bookID, cb){
        return Client._fetch(Config.serverIP + "put/cancelCollectBook", "POST", JSON.stringify({
            bookID : bookID
        }), cb);
    }
}
