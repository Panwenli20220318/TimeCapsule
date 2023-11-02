<template>
    <div id="implementMain">
        <nav-capsule></nav-capsule>
        <router-view></router-view>
    </div>
</template>

<script>
import NavCapsule from '../components/NavCapsule'

export default{
    components:{
        NavCapsule,
    },
};
</script>