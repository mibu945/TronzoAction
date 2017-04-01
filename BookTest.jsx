import React from 'react';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

import PostClient from '../action/PostClient';
import BookClient from '../action/BookClient';
import UserClient from '../action/UserClient';
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
        UserClient.getUser((err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(JSON.stringify(user));
        });
    }
    handleSearchUser(e, { formData }) {
		e.preventDefault();
        UserClient.getUserByAccount(formData.account, (err, user) => {
            if(err){
                console.log("fail:" + err);
            }
            console.log(user._id);
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
        BookClient.postBookComment(formData.bookID, formData.comment, (err, res) => {
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
    handleDefault(e, { formData }) {
		e.preventDefault();
		BookClient.getBooksDefault((err, books) =>{
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
            } 
        });
    }
    handleCancelLike(e, { formData }) {
		e.preventDefault();
	    BookClient.putCancelLikeBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleStore(e, { formData }) {
		e.preventDefault();
	    BookClient.putStoreBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleCancelStore(e, { formData }) {
		e.preventDefault();
	    BookClient.putCancelStoreBook(formData.bookID, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleProfilePic(e, { formData }) {
		e.preventDefault();
	    UserClient.putUserProfilePic(this.state.pic, (err, books) =>{
            if(err){
                console.log("fail:" + err);
            } 
        });
    }
    handleGetSection(e, { formData }) {
		e.preventDefault();
	    BookClient.getBookSection(formData.sectionID, (err, section) =>{
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(JSON.stringify(section));
            }
        });
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
                    
                    <Form onSubmit={this.handleProfilePic} onChange={(e)=>this.handleProfilePicChange(e)} encType="multipart/form-data">
                        <Form.Input id="test" label="圖片" name="pic" type="file"></Form.Input>
                        <Button type="submit">改大頭貼</Button>
                     </Form>

                    <Form onSubmit={this.handleSearchUser}>
                        <Form.Input label="帳號" name="account" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleDefault}>
                        <Button type="submit">推薦書籍</Button>
                    </Form>
                    <Form onSubmit={this.handleGetUser}>
                        <Button type="submit">查詢自己</Button>
                    </Form>


                    <Form onSubmit={this.handleLogin}>
                        <Form.Input label="帳號" name="account" type="text" ></Form.Input>
                        <Form.Input label="密碼" name="password" type="text" ></Form.Input>
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
                        <Form.Input label="意見" name="comment" type="text" ></Form.Input>
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


                    <Form onSubmit={this.handleGetSection}>
                        <Form.Input label="章節ID" name="sectionID" type="text" ></Form.Input>
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

               </div>

		);
	}
}
