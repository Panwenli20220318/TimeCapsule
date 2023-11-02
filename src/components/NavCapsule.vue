<template>
    <div id="navMain">
        <div class="nav_item">
            <img src="../assets/images/logo.gif" alt="pill">
            <span>时间胶囊</span>   
            <ul>
                <li>
                    <a href="/timeCapsule">首页</a>
                </li>
                <!-- 编程式导航栏 -->
                <li @click="navigateTo('tab1')">   
                    <a href="javascript:;">添加</a>
                </li>
                <li @click="navigateTo('tab2')">
                    <a href="javascript:;">打开</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  methods:{
    navigateTo(tab){
        this.$router.push('/funCapsule/'+tab)
    }
  }
};
</script>

<style scoped>
#navMain{
    box-shadow: 0px 2px #eee;
}
#navMain .nav_item{
    width: 40%;
    margin: 0 auto;
    display: flex;
    align-items:center;
}
#navMain .nav_item span{
    font-size: 24px;
    font-weight: bold;
    margin: 0 15px;
}
#navMain .nav_item ul{
    list-style: none;
    display: flex;
}
#navMain .nav_item ul li a{
    display: block;
    padding: 15px;
    font-size: 18px;
    text-decoration: none;
    color: inherit;
}
#navMain .nav_item ul li a:hover{
    color: rgb(90, 90, 90);
    background-color: #dadada;
    cursor:pointer;
}
</style>
