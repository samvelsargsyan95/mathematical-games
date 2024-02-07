<template>
    <div class="user-badge position-relative">
        <slot name="closBtn"></slot>

        <div class="user-badge__users-part d-flex align-items-center">
            <img class="user-badge__user-img" :src="require(`@/assets/images/users/${userInfo.userImg}`)">

            <div class="user-badge__main-info-cont">
                <b class="user-badge__user-name">{{userInfo.user}}</b>
                <p class="user-badge__birth-info mb-0">France, 1623-1662</p>
            </div>
        </div>

        <p class="user-badge__user-txt">{{userInfo.userDesc}}</p>
        
    </div>    
</template>

<script>
export default({
    name : "UserBadge",
    props : ["userInfo"],
    data() {
        return {
            hideUserBadge : true
        }
    }
})
</script>

<style lang="scss" scoped>
    .user-badge {
        padding:30px 20px 50px 30px;
        background-color:white;
        border-radius:10px;
        max-height:441px;
        max-width:670px;

        &__users-part {
             margin-bottom:20px;
        }

        &__user-img {
            margin-right:20px;
            object-fit:cover;
            width:100px;
            height:100px;
        }

        &__user-txt {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 32px;
            color: #000000;
            max-height:247px;
            overflow-y: auto;
            padding-right:20px;
            
            &::-webkit-scrollbar {
                width: 6px;
            }

            /* Track */
            &::-webkit-scrollbar-track {
                background:transparent; 
            }
            
            /* Handle */
            &::-webkit-scrollbar-thumb {
                background: #C4C4C4; 
            }

        }
    }
</style>