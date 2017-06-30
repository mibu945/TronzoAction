import React from 'react';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

import PostClient from '../action/PostClient';
import BookClient from '../action/BookClient';
import UserClient from '../action/UserClient';
import FB from 'fb';
var FileReader = require('filereader')
, fileReader = new FileReader();
export default class UnRegister extends React.Component {
	constructor(){
		super();
        this.state = {
            file: null,
            pic: null
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleProfilePicChange = this.handleProfilePicChange.bind(this);
        this.handleProfilePic = this.handleProfilePic.bind(this);
    }
    handleGetUser(e, {formData}) {
		e.preventDefault();
        UserClient.getMe((err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(user));
        });
    }

    handleBookID(e, {formData}) {
		e.preventDefault();
        BookClient.getBookByID(formData.bookID, (err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(user));
        });
    }
    handlePutUser(e, {formData}) {
		e.preventDefault();
        UserClient.putUser(formData, (err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(user));
        });
    }
    handleSearchUser(e, { formData }) {
		e.preventDefault();
        UserClient.getUserByID(formData.userID, (err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(user));
        });
	}

    handlePutStoredList(e, { formData }) {
		e.preventDefault();
        var bookIDs = [];
        bookIDs.push(formData.id1);
        bookIDs.push(formData.id2);
        bookIDs.push(formData.id3);
        bookIDs.push(formData.id4);
        bookIDs.push(formData.id5);
        bookIDs.push(formData.id6);
        bookIDs.push(formData.id7);
        bookIDs.push(formData.id8);
        BookClient.putStoredList(bookIDs, (err, res) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(res));
        });
	}
    handleLogin(e, { formData }) {
		e.preventDefault();
        UserClient.login(formData.account, formData.password, (err, books) => {
            if(err){
                console.log("fail:" + err);
            } 
        });
	}
    handleLoginByFB(e, { formData }) {
		e.preventDefault();
        UserClient.loginByFB(formData.token, (err, books) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log("suc");
            }
        });
	}
	handleSearch(e, { formData }) {
		e.preventDefault();
        BookClient.getBooksByTitle(formData.bookName, (err, books) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}
    handleSearch2(e, { formData }) {
		e.preventDefault();

        BookClient.getBooksByUser(formData.userID, (err, books) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}
    handleUserBookAndPost(e, { formData }) {
		e.preventDefault();
        BookClient.getBooksAndPostsByUser(formData.userID, (err, datas) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(datas));
            }
        });
	}
    handleCreate(e, { formData }) {
	   e.preventDefault();
       console.log(this.state.file.size);
       formData.cover = this.state.file;
       BookClient.postBook(formData, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handleProfilePicChange(e) {
		e.preventDefault();

        var filelist = e.target.files;
        var str = '';
        for(var i = 0; i < filelist.length ; i++ ) {
            var file = filelist[i];
            str += "name：" + escape(file.name) + "\n" + "type：" + file.type + "\n" + 
                "size：" + file.size + "\n";
        }
        this.setState({pic: filelist[0]});
        console.log(str);
	}
    handleChange(e) {
		e.preventDefault();

        var filelist = e.target.files;
        var str = '';
        for(var i = 0; i < filelist.length ; i++ ) {
            var file = filelist[i];
            str += "name：" + escape(file.name) + "\n" + "type：" + file.type + "\n" + 
                "size：" + file.size + "\n";
        }
        this.setState({file: filelist[0]});
        console.log(str);
	}
    handlePostComment(e, { formData }) {
		e.preventDefault();
        BookClient.postBookComment(formData.bookID, formData.num, formData.pageNum, formData.content, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handleDeleteSection(e, { formData }) {
		e.preventDefault();
        BookClient.deleteBookSection(formData.sectionID, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handlePostSection(e, { formData }) {
		e.preventDefault();
        BookClient.postBookSection(formData.bookID, formData.title, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handlePutSection(e, { formData }) {
		e.preventDefault();
        BookClient.putBookSection({
            sectionID: formData.sectionID, 
            title: formData.title, 
            content: formData.content
        }, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handleRegister(e, { formData }) {
		e.preventDefault();
		UserClient.register(formData, (err, res) =>{
        });
	}

    handleInterest(e, { formData }) {
		e.preventDefault();
		BookClient.getStoredBooks((err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}
    handleInterest2(e, { formData }) {
		e.preventDefault();
		BookClient.getInterestedBooksAndPosts((err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}

    handleMyBooks(e, { formData }) {
		e.preventDefault();
		BookClient.getBooksByUser(localStorage.getItem("_id"), (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}
    handleHistory(e, { formData }) {
		e.preventDefault();
		BookClient.getHistoricalBooks((err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}

    handleStoredList(e, { formData }) {
		e.preventDefault();
		BookClient.getStoredListBooks((err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}

    handleRecommend(e, { formData }) {
		e.preventDefault();
		BookClient.getRecommendedEntries((err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
	}
    handleSharePost(e, { formData }) {
		e.preventDefault();
	    PostClient.putSharePost(formData.postID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleLikePost(e, { formData }) {
		e.preventDefault();
	    PostClient.putLikePost(formData.postID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleCancelLikePost(e, { formData }) {
		e.preventDefault();
	    PostClient.putCancelLikePost(formData.postID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleShare(e, { formData }) {
		e.preventDefault();
	    BookClient.putShareBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleLike(e, { formData }) {
		e.preventDefault();
	    BookClient.putLikeBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleCancelLike(e, { formData }) {
		e.preventDefault();
	    BookClient.putCancelLikeBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleStore(e, { formData }) {
		e.preventDefault();
	    BookClient.putStoreBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleCancelStore(e, { formData }) {
		e.preventDefault();
	    BookClient.putCancelStoreBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleProfilePic(e, { formData }) {
		e.preventDefault();
	    UserClient.putUserProfilePic(this.state.pic, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(books));
            }
        });
    }
    handleGetSection(e, { formData }) {
		e.preventDefault();
        if(formData.sectionID != ""){
            BookClient.getBookSection(formData.sectionID, (err, section) =>{
                if(err){
                    console.log("fail:" + err);
                } else {
                    console.log(JSON.stringify(section));
                }
            });
        } else {
            BookClient.getBookSectionByNum(formData.bookID, formData.num, (err, section) =>{
                if(err){
                    console.log("fail:" + err);
                } else {
                    console.log(JSON.stringify(section));
                }
            });
        }
    }
    handleGetPost(e, { formData }) {
		e.preventDefault();
	    PostClient.getPostsByUser(formData.userID, (err, posts) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(posts));
            }
        });
    }
    handleGetComments(e, { formData }) {
		e.preventDefault();
	    BookClient.getBookComments(formData.bookID, formData.sectionNum, formData.pageNum, (err, posts) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(posts));
            }
        }, formData.amount, formData.times);
    }
    handlePostPost(e, { formData }) {
		e.preventDefault();
	    PostClient.postPost(formData.bookID, formData.content, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res._id);
            }
        });
    }
    handlePutPost(e, { formData }) {
		e.preventDefault();
	    PostClient.putPost(formData.postID, formData.content, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleDeletePost(e, { formData }) {
		e.preventDefault();
	    PostClient.deletePost(formData.postID, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleFollow(e, { formData }) {
		e.preventDefault();
	    UserClient.followUser(formData.userID, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(res));
            }
        });
    }
    handleCancelFollow(e, { formData }) {
		e.preventDefault();
	    UserClient.cancelFollowUser(formData.userID, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(res));
            }
        });
    }

    /*handlePostComment(e, { formData }) {
		e.preventDefault();
	    PostClient.postPostComment(formData.postID, formData.content, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(res));
            }
        });
    }*/
    handleDeletePostComment(e, { formData }) {
		e.preventDefault();
	    PostClient.deletePostComment(formData.postID, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(res));
            }
        });
    }
    handleDeleteBookComment(e, { formData }) {
		e.preventDefault();
	    BookClient.deleteBookComment(formData.commentID, (err, res) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(res));
            }
        });
    }
	render (){
		return (
                <div className="">
                {localStorage.getItem("jwt")}
                {localStorage.getItem("_id")}
                    
                    <Form onSubmit={this.handleRegister} >
                        <Form.Input label="名稱" name="name" type="text" ></Form.Input>
                        <Form.Input label="帳號" name="account" type="text" ></Form.Input>
                        <Form.Input label="密碼" name="password" type="text" ></Form.Input>
                        <Form.Input label="生日" name="birthday" type="text" ></Form.Input>
                        <Form.Input label="性別" name="gender" type="text" ></Form.Input>
                        <Button type="submit">註冊</Button>
                    </Form>
                    <Form onSubmit={this.handlePutUser} >
                        <Form.Input label="敘述" name="description" type="text" ></Form.Input>
                        <Button type="submit">更改</Button>
                    </Form>
                    <Form onSubmit={this.handleFollow} >
                        <Form.Input label="UserID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">追隨</Button>
                    </Form>
                    <Form onSubmit={this.handleCancelFollow} >
                        <Form.Input label="UserID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">不追隨</Button>
                    </Form>

                    <Form onSubmit={this.handleProfilePic} onChange={(e)=>this.handleProfilePicChange(e)} encType="multipart/form-data">
                        <Form.Input id="test" label="圖片" name="pic" type="file"></Form.Input>
                        <Button type="submit">改大頭貼</Button>
                     </Form>

                    <Form onSubmit={this.handleSearchUser}>
                        <Form.Input label="userID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleUserBookAndPost}>
                        <Form.Input label="userID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleBookID}>
                        <Form.Input label="bookID" name="bookID" type="text" ></Form.Input>
                    <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleRecommend}>
                        <Button type="submit">推薦書籍</Button>
                    </Form>

                    <Form onSubmit={this.handleInterest}>
                        <Button type="submit">有興趣書籍</Button>
                    </Form>
                    <Form onSubmit={this.handleInterest2}>
                        <Button type="submit">有興趣書籍2</Button>
                    </Form>

                    <Form onSubmit={this.handleMyBooks}>
                        <Button type="submit">自己的書籍</Button>
                    </Form>
                    <Form onSubmit={this.handleHistory}>
                        <Button type="submit">最近看過書籍</Button>
                    </Form>
                    <Form onSubmit={this.handleStoredList}>
                        <Button type="submit">珍藏的書籍</Button>
                    </Form>

                    <Form onSubmit={this.handleGetUser}>
                        <Button type="submit">查詢自己</Button>
                    </Form>


                    <Form onSubmit={this.handleLogin}>
                        <Form.Input label="帳號" name="account" type="text" ></Form.Input>
                        <Form.Input label="密碼" name="password" type="text" ></Form.Input>
                        <Button type="submit">登入</Button>
                    </Form>
                    <Form onSubmit={this.handleLoginByFB}>
                        <Form.Input label="token" name="token" type="text" ></Form.Input>
                        <Button type="submit">登入</Button>
                    </Form>

                    <Form onSubmit={this.handleCreate} onChange={(e)=>this.handleChange(e)} encType="multipart/form-data">
                        <Form.Input label="書名" name="title" type="text" ></Form.Input>
                        <Form.Input label="類別" name="type" type="text" ></Form.Input>
                        <Form.Input label="說明" name="description" type="text" ></Form.Input>
                        <Form.Input id="test" label="圖片" name="cover" type="file" multiple></Form.Input>
                        <Button type="submit">創書</Button>
                     </Form>
                    
                    <Form onSubmit={this.handleSearch}>
                        <Form.Input label="書名" name="bookName" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleSearch2}>
                        <Form.Input label="使用者ID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>
                     <Form onSubmit={this.handlePutStoredList}>
                        <Form.Input label="書ID" name="id1" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id2" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id3" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id4" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id5" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id6" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id7" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="id8" type="text" ></Form.Input>
                        <Button type="submit">送出</Button>
                    </Form>
                    <Form onSubmit={this.handleShare}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Button type="submit"> 分享</Button>
                    </Form>

                     <Form onSubmit={this.handleSharePost}>
                        <Form.Input label="PostID" name="postID" type="text" ></Form.Input>
                        <Button type="submit"> 分享</Button>
                    </Form>

                    <Form onSubmit={this.handleLikePost}>
                        <Form.Input label="PostID" name="postID" type="text" ></Form.Input>
                        <Button type="submit">點贊</Button>
                    </Form>
                     <Form onSubmit={this.handleCancelLikePost}>
                        <Form.Input label="PostID" name="postID" type="text" ></Form.Input>
                        <Button type="submit">取消點贊</Button>
                    </Form>


                    <Form onSubmit={this.handleLike}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Button type="submit">點贊</Button>
                    </Form>
                     <Form onSubmit={this.handleCancelLike}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Button type="submit">取消點贊</Button>
                    </Form>
                    <Form onSubmit={this.handleStore}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Button type="submit">收藏</Button>
                    </Form>
                     <Form onSubmit={this.handleCancelStore}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Button type="submit">取消收藏</Button>
                    </Form>

                   
                    <Form onSubmit={this.handlePostComment}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="哪一章" name="num" type="text" ></Form.Input>
                        <Form.Input label="哪一頁" name="pageNum" type="text" ></Form.Input>
                        <Form.Input label="意見" name="content" type="text" ></Form.Input>
                        <Button type="submit">留言</Button>
                    </Form>

                    <Form onSubmit={this.handlePostSection}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="標題" name="title" type="text" ></Form.Input>
                        <Button type="submit">創建新章節</Button>
                    </Form>

                    <Form onSubmit={this.handlePutSection}>
                        <Form.Input label="章節ID" name="sectionID" type="text" ></Form.Input>
                        <Form.Input label="標題" name="title" type="text" ></Form.Input>
                        <Form.Input label="內文" name="content" type="text" ></Form.Input>
                        <Button type="submit">修改</Button>
                    </Form>

                    <Form onSubmit={this.handleDeleteSection}>
                        <Form.Input label="章節ID" name="sectionID" type="text" ></Form.Input>
                        <Button type="submit">刪除</Button>
                    </Form>


                    <Form onSubmit={this.handleGetSection}>
                        <Form.Input label="章節ID" name="sectionID" type="text" ></Form.Input>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="第幾章" name="num" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleGetPost}>
                        <Form.Input label="使用者ID" name="userID" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handlePostPost}>
                        <Form.Input label="bookID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="內容" name="content" type="text" ></Form.Input>
                        <Button type="submit">po文</Button>
                    </Form>

                    <Form onSubmit={this.handlePutPost}>
                        <Form.Input label="postID" name="postID" type="text" ></Form.Input>
                        <Form.Input label="內容" name="content" type="text" ></Form.Input>
                        <Button type="submit">改文</Button>
                    </Form>
                   
                    <Form onSubmit={this.handleDeletePost}>
                        <Form.Input label="postID" name="postID" type="text" ></Form.Input>
                        <Button type="submit">刪除文</Button>
                    </Form>
                    <Form onSubmit={this.handleGetComments}>
                        <Form.Input label="bookID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="哪一章" name="sectionNum" type="text" ></Form.Input>
                        <Form.Input label="哪一頁" name="pageNum" type="text" ></Form.Input>
                        <Form.Input label="多少量" name="amount" type="text" ></Form.Input>
                        <Form.Input label="第幾次" name="times" type="text" ></Form.Input>
                        <Button type="submit">查評論</Button>
                    </Form>

                    <Form onSubmit={this.handlePostComment}>
                        <Form.Input label="postID" name="postID" type="text" ></Form.Input>
                        <Form.Input label="內容" name="content" type="text" ></Form.Input>
                        <Button type="submit">留言</Button>
                    </Form>
                    <Form onSubmit={this.handleDeletePostComment}>
                        <Form.Input label="commentID" name="postID" type="text" ></Form.Input>
                        <Button type="submit">刪除留言</Button>
                    </Form>
                    <Form onSubmit={this.handleDeleteBookComment}>
                        <Form.Input label="commentID" name="commentID" type="text" ></Form.Input>
                        <Button type="submit">刪除書的留言</Button>
                    </Form>

               </div>

		);
	}
}
