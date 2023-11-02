<template>
        <div id="openMain">
                <h1>打开胶囊</h1>
                <label for="openKey">胶囊Key：</label>
                <input type="text" id="openKey" v-model="keyInput">
                <button class="openButton" @click="checkKey">打开胶囊</button>
            <div id="openContent" v-if="isSubmit">
                <p class="openShow">{{reminder}}</p>
                <span class="realTime">{{ countdownTime }}</span>
                <div class="show" v-if="isValid">{{ showContent }}</div>
            </div>
        </div>
</template> 

<script>

export default{
    data(){
        return{
            keyInput:"",
            isSubmit:false,
            reminder:"",
            countdownTime:"",
            isValid:false,
            showContent:""
        }
    },
    methods:{
        //倒计时
        countdown(openTime,currentTime){
            let openDate = new Date(openTime);
            let wait = (openDate - currentTime)/1000; 
            let waitDay = parseInt(wait/(3600*24));
            let waithour =parseInt((wait%(3600*24))/3600);
            let waitMinute =parseInt((wait%(3600))/60);
            let waitSecond =parseInt(wait%60);
            this.countdownTime = "打开时间在 "+openTime+",距离现在 "+waitDay+"天"+waithour+":"+waitMinute+":"+waitSecond+"秒";
        },
        checkKey(){
            this.isSubmit = true;
            //获取localStorage存储内容,如果获取的数据为null或undefined，则将users赋值为一个空数组[]。
            let users = JSON.parse(localStorage.getItem('users'))||[];
            //通过key进行查找指定的用户对象
            let currentUser = users.find(element => element.key === this.keyInput);
            if(currentUser){
                this.isValid = true;
                //将时间转化为可以比较大小的形式
                let openTime= new Date(currentUser.time); 
                const currentTime = new Date();
                if(currentTime>openTime){
                    this.reminder = currentUser.name +" 在 "+currentUser.time+" 对你说: ";
                    this.showContent = currentUser.content;
                }else{
                    this.reminder = "这颗胶囊未到提取时间，不能打开";
                    //调用倒计时函数，计算间隔时间
                    this.countdown(currentUser.time,currentTime);
                    this.showContent = currentUser.name+" 给你留的提示信息:\n"+currentUser.clue;
                }
            }else{
                this.reminder= "请检查你输入的密匙";
           }
        }
    }
    
};
</script>


<style scoped>
#openMain{
    color:rgb(100, 100, 100);
    width: 40%;
    margin: 0 auto;
}
#openMain h1{
    font-size: 30px;
    font-weight: lighter;
    padding: 20px 0;
}
#openMain input{
    height: 2rem;
    width: 250px;
}
#openMain button{
    border: none;
    color: white;
    background-color: red;
    width: 80px;
    padding: 10px 0;
    margin-left: 10px;
}
#openContent {
    margin-top: 20px;
}
#openContent .openShow{
    font-weight: bold;
    font-size: 24px;
    padding: 10px 0;
}
#openContent .realTime{
    font-size: 16px;
}
#openContent .show{
    border: 1px solid red;
    padding: 10px;
    margin: 10px 0;
}
</style>