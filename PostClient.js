import Client from './Utility'
import Config from './config'

export default class PostClient {
    static getPostByID(postID, cb) {
        Client._fetch(Config.serverIP + "get/postByID?postID=" + postID, "GET", null, cb);
    }
    static getPostsByUser(userID, cb) {
        Client._fetch(Config.serverIP + "get/postsByUser?userID=" + userID, "GET", null, cb);
    }

    static postPost(bookID, content, cb) {  
        Client._fetch(Config.serverIP + "post/post", "POST", JSON.stringify({bookID: bookID, content: content}), cb);
    }
    static postPostComment(postID, content, cb) {  
        Client._fetch(Config.serverIP + "post/postComment", "POST", JSON.stringify({postID: postID, content: content}), cb);
    }

    static putPost(postID, content, cb) {  
        Client._fetch(Config.serverIP + "put/post", "POST", JSON.stringify({postID: postID, content: content}), cb);
    }
    static putSharePost(postID, cb) {
        Client._fetch(Config.serverIP + "put/sharePost", "POST", JSON.stringify({
            postID : postID
        }), cb);
    }

    static putLikePost(postID, cb) {
        Client._fetch(Config.serverIP + "put/likePost", "POST", JSON.stringify({
            postID : postID
        }), cb);
    }
    static putCancelLikePost(postID, cb) {
        Client._fetch(Config.serverIP + "put/cancelLikePost", "POST", JSON.stringify({
            postID : postID
        }), cb);
    }
    static deletePost(postID, cb) {  
        Client._fetch(Config.serverIP + "delete/post", "POST", JSON.stringify({postID: postID}), cb);
    }
    static deletePostComment(commentID, cb) {  
        Client._fetch(Config.serverIP + "delete/postComment", "POST", JSON.stringify({commentID: commentID}), cb);
    }
}


