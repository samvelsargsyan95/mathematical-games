<template>
    <div 
        class="right-part d-flex justify-content-between align-items-center flex-column"
        :class="{'px-0' : $route.name === 'Sierpinski Triangle'}">

        <slot name="gameHeading"></slot>

        <slot name="gameContent"></slot>
        
        <div 
            class="right-part__btns-cont row mx-0 justify-content-center align-items-center">
            
            <button 
                class="right-part__reset_btn" 
                :style="showToCheckBtn ? 'margin-right:200px;' : ''"
                @click="gameBtn">
                {{
                    $route.name === 'Pascals Triangle' ? 'Check' :
                    $route.name === 'Magic Square Builder' ? 'Clear' :
                    $route.name === 'Sierpinski Triangle' ? 'Reset' : ''
                }}
            </button>

            <button 
                class="right-part__reset_btn"
                v-if="showToCheckBtn"
                @click="checkMagicSquare">
                Check
            </button>
        </div>
    </div>
</template>

<script>
    export default({
        name : "RightPart",
        props : ["magicSquareToCheck", "routerParams"],
        data() {
            return {
                buttonType : "",
                showToCheckBtn : false
            }          
        },
     
        methods : {
            gameBtn() {
                switch(this.$route.name) {
                    case "Pascals Triangle":
                        this.buttonType = "check";
                        break;
                        
                    case 'Magic Square Builder':
                        this.buttonType = "clear";
                        break;

                    case 'Sierpinski Triangle':
                        this.buttonType = "reset";
                        break;
                    default:
                }

                this.$emit('gameBtnClick', this.buttonType);
            },

            checkMagicSquare() {
                this.$emit("checkMagicSquare")
            }
        },

        watch : {
            magicSquareToCheck(newVal) {
                this.showToCheckBtn = newVal;                
            }
        }
    })
</script>

<style lang="scss">
    .right-part {
        background-color:#090C28;
        height:100%;
        width:100%;
        padding: 5.34vmin 8.54vmin 3.1vmin 8.54vmin;
        -webkit-transition:all 0.4s;
        transition:all 0.4s;

        &__reset_btn {
            width: 21vmin;
            background-color:transparent;
            border:1px solid white;
            padding: 1.6vmin 0;
            border-radius:5px;
            font-family:"Noto Sans";
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 32px;
            text-align: center;
            color: #8760ff;
            margin-left: auto;
            margin-right: auto;
            -webkit-transition:all 0.8s linear;
            transition:all 0.8s linear;
             
            &:hover {
                background-color:white;
            }
        }

        &__btns-cont {
            margin-top:3.1vmin;
        }
    }
</style>
