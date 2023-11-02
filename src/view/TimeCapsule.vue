<template>
    <div id="timeMain">
        <img src="../assets/images/logo_big.png" alt="药丸">
        <h1 class="title">时间胶囊</h1>
        <!-- 采用声明式导航 -->
        <div id="action">
            <router-link   to='/funCapsule' class="custom-link">
                    <span class="english">Put</span>
                    <span class="chinese">添加</span>
            </router-link>
            <router-link  to='/funCapsule/tab2' class="custom-link">
                    <span class="english">Open</span>
                    <span class="chinese">打开</span>
            </router-link>
        </div>
    </div> 
</template>

<script>
export default {

}
</script>

<style scoped>
#timeMain{
    width: 40%;
    margin: 0 auto;
    display: flex;
    justify-content:center;
    flex-direction: column;
}
#timeMain img{
    margin: 100px 0 20px 0;
}
#timeMain  .title{
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
}
#timeMain #action{
    display: flex;
    justify-content:space-between;
}
#timeMain #action .custom-link{
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: column;
}
#timeMain #action .custom-link .english{
    font-size: 48px;
    padding-bottom: 10px;
}
#timeMain #action .custom-link .chinese{
    font-size: 16px;
    text-align: center;
}

</style>

