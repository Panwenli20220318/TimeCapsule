<template>
        <div id="putMain">
            <div id="form">
                <h1>添加胶囊</h1>
                <label for="name">你的名字</label>
                <p v-if="nameError" style="font-size:12px;color:red;line-height: 16px;">{{ nameError }}</p>
                <input type="text" id="name" v-model="name" @blur="validateName">
                <label for="emil">你的邮箱</label>
                <p v-if="emailError" style="font-size:12px;color: red;line-height: 16px;">{{ emailError }}</p>
                <input type="text" id="emil"  v-model="email" @blur="validateEmail">
                <label>打开时间</label> 
                <p v-if="timeError" style="font-size:12px;color:red;line-height: 16px;">{{ timeError }}</p>
                <input type="text" id="time" v-model="time" @blur="validateTime">
                <span class="tip"> 打开时间之前，胶囊的内容是看不到的。</span>
                <label>胶囊内容</label>
                <p v-if="contentError" style="font-size:12px;color:red;line-height: 16px;">{{ contentError }}</p>
                <textarea  id="content" cols="110" rows="8" v-model="content" @blur="validateContent"></textarea>
                <span class="tip">胶囊内容不能超过5000字</span>
                <label>未到期提示信息</label> 
                <textarea  id="clue" cols="110" rows="5" v-model="clue"></textarea>
                <span class="tip">在打开时间之前打开胶囊会看到提示信息</span>
                <p style="margin-top: 20px;"></p>
                <input type="submit" value="添加胶囊"  @click="handleSubmit">
            </div>
            <div class="password" v-if="formValid">
                提交成功!Key:<input type="text" v-model="key">
            </div>
        </div>
</template>

<script>

export default{
    data(){
        return {
            name:"",
            email:"",
            time:this.getDefultTime(), //默认显示当前时间
            content:"",
            clue:"",
            key:"",
            nameError:"", //出错提示
            emailError:"",
            timeError:"",
            contentError:"",
            formValid:"", //表单验证标志位
            hasSubmitted:false // 是否已经提交的标志位
        }
    },
    methods:{
        validateName(){
            const nameRegExp = /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,20}$/;
            if(this.name){
                if(!nameRegExp.test(this.name)){
                    this.nameError = "格式不正确（密码不能含有非法字符,长度在3-20之间）";
                }else {
                    this.nameError ="";
                    return true;
                }
            }else{
                this.nameError ="请输入用户名";
            }
        },
        validateEmail(){
            const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(this.email){
                if(!emailRegExp.test(this.email)){
                    this.emailError = "邮箱格式不正确，请检查";
                }else{
                    this.emailError ="";
                    return true;
                }
            }else{
                this.emailError ="请输入邮箱";
            }
        },     
        getDefultTime(){
            let date = new Date();
            let year = date.getFullYear();
            let month = ("0"+(date.getMonth()+1)).slice(-2);
            let day = ("0"+date.getDate()).slice(-2);
            let hour = ("0"+date.getHours()).slice(-2);
            let minute = ("0"+date.getMinutes()).slice(-2);
            let second = ("0"+date.getSeconds()).slice(-2);
            return year + "-" + month + "-" + day +" "+ hour + ":" + minute + ":" + second;
        },
        validateTime(){
            var timeRegExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])\s(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])$/;
            if(!timeRegExp.test(this.time)){
                this.timeError="请按照格式输入";
            }else{
                let timeInput =new Date(this.time); //将时间转化为可比较的形式
                let currentTime = new Date();
                if(currentTime>=timeInput){
                    this.timeError="请输入正确的时间";
                }else{
                    this.timeError="";
                    return true;
                }
            }
        },
        validateContent(){
            if(this.content){
                if(this.content.length>5000){
                    this.contentError = "内容长度超出限制";
                }else{
                    this.contentError =""; 
                    return true;
                }
            }else{
                this.contentError ="内容不能为空"; 
            }
        },  
        generateRandomKey() {
            //产生Key值:使用Web Crypto API生成安全的随机密钥
            let array = new Uint8Array(16);
            window.crypto.getRandomValues(array);
            let hexString = '';
            for (let i = 0; i < array.length; i++) {
                        hexString += (array[i] < 16 ? '0' : '') + (array[i]).toString(16);
            }
            return hexString;
        },
        handleSubmit() {
            //要求四个验证函数的返回值都为true才进行提交
            this.formValid = this.validateName() && this.validateEmail() && this.validateTime() && this.validateContent() && true;
            //数据都通过验证且为第一次提交,否则多次点击提交按钮时，key的值会一直发生变化
            if(this.formValid && !this.hasSubmitted){
                this.key = this.generateRandomKey();
                //创建用户对象
                const user = {
                    name: this.name,
                    email: this.email,
                    time: this.time,
                    content: this.content,
                    clue: this.clue,
                    key:this.key
                };
                // 从localStorage中获取已有的用户信息，如果为null或undefined返回[]
                let users = JSON.parse(localStorage.getItem('users'))|| [];
                users.push(user);
                // 将用户信息保存到localStorage
                localStorage.setItem('users', JSON.stringify(users));
                this.hasSubmitted = true;  //防止用户重复提交
            }  
        },
        created() {
            this.time = this.getDefaultTime(); // 在created生命周期钩子中调用函数，设置默认时间
        },
     }
};
</script>

<style scoped>
#putMain{
    color:rgb(100, 100, 100);
    width: 40%;
    margin: 0 auto;
}
#putMain h1{
    font-size: 30px;
    font-weight: lighter;
    padding: 20px 0;
}
label{
    display: block;
    margin: 10px 0;
}
input[type="text"],input[type="text"]{
    width: 220px;
    padding: 10px;
    color: #333;
    border: 1px solid #D9D9D9;
    margin-bottom: 5px;
}
.tip{
    font-size: 13px;
    background-color: #f6f6f6;
    color: #999;
}
.textarea{
    margin-bottom: 20px;
}
input[type="submit"]{
    padding: 10px 15px;
    background: #ff0033;
    filter: none;
    border: 1px solid #ff0033;
    color: #fff;
}
</style>

