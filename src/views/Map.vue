<template>
    <div class="map position-relative">
        <div class="row mx-0 map_heading-cont">
            <router-link class="map__back-btn" :to="'/'">
                <img src="@/assets/images/icons/back.svg" alt="">
            </router-link>

            <h1 class="map__heading">Famous Mathematics</h1>
        </div>

        <iframe 
            src="/map/index.html" 
            class="w-100 mx-auto map__iframe"  
            frameborder="0"></iframe>
    </div>
</template>

<script>
    import Vue from 'vue'
    import vClickOutside from 'v-click-outside'
 
    Vue.use(vClickOutside)

    export default({
        name : "Map",
        directives: {
            clickOutside: vClickOutside.directive
        },
        data(){
            return {
                showUserBadge : false,
                userInfo : {},
                mapStyles : {
                    transform: "scale(1)"
                }
            }
        },
        methods : {
            showUserInfo(e, user, birthInfo, userImg, userDesc) {
                this.userInfo = {
                    user : user,
                    birthInfo : birthInfo,
                    userImg : userImg,
                    userDesc : userDesc
                };
                
                this.showUserBadge = true;
            },

            onClickOutside () {
                this.showUserBadge = false; 
            },
        }   
    })
</script>

<style lang="scss" scoped>
    .map {
        background-color:#090C28;
        padding:2.65% 45px 0 45px;

        &__back-btn {
            margin-top:-5px;
        }

        &__heading {
            margin-left:375px;
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: bold;
            font-size: 36px;
            line-height: 32px;
            color: #FFFFFF;
        }

        &__map-cont  {
            margin-top:92px;
        }

        &__map-img {
            -webkit-transition:all 1.5s;
            transition:all 1.5s;
        }

        &__iframe {
            position:absolute;
            left:0;
            right:0;
            height:80vh;
            margin-top:25px;
        }
    }

    img.map-img, map area{
        outline: none;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.4s ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
