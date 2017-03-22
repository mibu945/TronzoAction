import React from 'react';
import { Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';

import BookClient from '../action/BookClient';
import UserClient from '../action/UserClient';
var FileReader = require('filereader')
, fileReader = new FileReader();
export default class UnRegister extends React.Component {
	constructor(){
		super();
        this.state = {
            file: null
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    handlePostContent(e, { formData }) {
		e.preventDefault();
        BookClient.postBookContent(formData.bookID, formData.title, (err, res) => {
            if(err){
                console.log("fail:" + err);
            } else {
                console.log(res.suc);
            }
        });
	}
    handlePutContent(e, { formData }) {
		e.preventDefault();
        BookClient.putBookContent({
            _id: formData.contentID, 
            title: formData.title, 
            data: formData.content
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


    handleUpload(e, { formData }) {
		e.preventDefault();
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

                    <Form onSubmit={this.handleSearchUser}>
                        <Form.Input label="帳號" name="account" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

                    <Form onSubmit={this.handleDefault}>
                        <Button type="submit">推薦書籍</Button>
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
                   
                    <Form onSubmit={this.handlePostComment}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="意見" name="comment" type="text" ></Form.Input>
                        <Button type="submit">留言</Button>
                    </Form>

                    <Form onSubmit={this.handlePostContent}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="標題" name="title" type="text" ></Form.Input>
                        <Button type="submit">創建新章節</Button>
                    </Form>

                    <Form onSubmit={this.handlePutContent}>
                        <Form.Input label="章節ID" name="contentID" type="text" ></Form.Input>
                        <Form.Input label="內文" name="content" type="text" ></Form.Input>
                        <Button type="submit">修改</Button>
                    </Form>


                    <Form onSubmit={this.handlePutBasic}>
                        <Form.Input label="書ID" name="bookID" type="text" ></Form.Input>
                        <Form.Input label="第幾章" name="num" type="text" ></Form.Input>
                        <Button type="submit">查詢</Button>
                    </Form>

               </div>

		);
	}
}
