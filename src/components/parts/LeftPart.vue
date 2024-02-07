<template>
    <div class="left-part">
        <h1 class="text-center left-part__heading">{{heading}}</h1>
        <ul class="left-part__infos-cont pl-0">  
            <li 
                :key="key" v-for="(info, key) of gameInfos"
                class="left-part__infos-txt d-flex align-items-start">
                    <img src="@/assets/images/icons/infos_icon.svg" class="">
                    <span class="left-part__infos-txt-span" v-html="info"></span>
            </li>
        </ul>

        <div class="d-flex mx-auto justify-content-center left-part__game-img-cont">
            <img :src="require(`@/assets/images/${gameImg}`)" class="left-part__game-img">
        </div>
    </div>
</template>

<script>
    export default({
        name : "LeftPart",
        props : ["heading", "gameInfos", "gameImg"],
        data() {
            return {
                gameInfoData : {}
            }
        },

    })
</script>

<style lang="scss">
    .left-part {
        &__heading {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 600;
            font-size: 23px;
            line-height: 32px;
            color: #8760ff;
            margin-bottom: 7.5vmin;
            margin-top: 19px;

        }

        &__infos-txt {
            margin-bottom: 3.1vmin;
            font-size: 15px;
            & img {
                width: 3.5vmin;
            }
        }

        &__infos-txt-span {
            padding-left: 2vmin;
            font-weight:600;
        }

        &__game-img-cont {
            margin-top: 4.5vmin;
            margin-bottom: 9vmin;
            width: 20.5vmin;
        }

        &__game-img {            
            width:100%;    
        }
    }
</style>