<template>
    <div class="pascals text-center">
        <div 
            class="divblock"
            :key="index"
            v-for="(i, index) in pascalsData">
            <span 
                class="pascals__hexagon" 
                ref="pascalsHexagon"
                :key="jIndex"
                v-for="(j, jIndex) in i">
                
                <input 
                    type="number"
                    min="0"
                    class="text-center pascals__input" 
                    :class="{'pascals__input-pointer': pascalsData[index][jIndex] === 1}"
                    :readonly="pascalsData[index][jIndex] === 1"
                    :value="j === 1 ? pascalsData[index][jIndex] : ''"
                    :dataValue="hashValue(pascalsData[index][jIndex]+'')">
            </span>

        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import md5 from "js-md5";
Vue.prototype. $md5=md5;

    export default({
        name  : "PascalsTriangle",
        props : ["checkPascals"],
        data() {
            return {
                pascalsData : [],
                numRows : 9,
                pascalsValues : {}
            }
        },
        methods : {
            generatePascals(numRows) {
                if (numRows === 0) return [];
                if (numRows === 1) return [[1]];
                let result = [];
                for (let row = 1; row <= numRows; row++) {
                    let arr = [];
                    for (let col = 0; col < row; col++) {
                        if (col === 0 || col === row - 1) {
                            arr.push(1);
                        } else {
                            arr.push((result[row-2][col-1] + result[row-2][col]));
                        }
                    }
                    result.push(arr);
                }
                return result;
            },

            hashValue(value) {
                return md5(value);
            },
        },
        
        watch : {
            checkPascals(newVal) {
                const hexegons = this.$refs.pascalsHexagon;

                if(newVal > 0) {                   
                    for (var i = 0; i < hexegons.length; i++) {
                        if(md5(hexegons[i].querySelector(".pascals__input").value) === hexegons[i].querySelector(".pascals__input").getAttribute("datavalue")) {
                            hexegons[i].classList.remove("pascals__green");
                            hexegons[i].classList.remove("pascals__red");
                            hexegons[i].classList.add("pascals__green");
                        }else {
                            hexegons[i].classList.remove("pascals__green");
                            hexegons[i].classList.remove("pascals__red");
                            hexegons[i].classList.add("pascals__red");
                        }
                    }
                }
            }
        },
        created() {
            this.pascalsData = this.generatePascals(this.numRows);
        }
    })
</script>

<style lang="scss" scoped>
    .pascals {
        margin-bottom:28px;

        &__hexagon {
            position: relative;
            width: 86.13px;
            height: 44.88px;
            background-color: #8760ff;
            margin: 14px 2px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            -webkit-transition:all 0.5s!important;
            transition:all 0.5s!important; 

            &:before, &:after {
                content: "";
                position: absolute;
                width: 0;
                border-left: 44.065px solid transparent;
                border-right: 44.065px solid transparent;
                -webkit-transition:all 0.5s!important;
                transition:all 0.5s!important; 
            }

            &:before {
                bottom: 100%;
                border-bottom: 25.44px solid #8760ff;
            }

            &:after {
                top: 100%;
                width: 0;
                border-top: 25.44px solid #8760ff;
            }
        }

        &__green {
            background-color: #45B43B;

            &:before {
                bottom: 100%;
                border-bottom: 25.44px solid #45B43B;
            }

            &:after {
                top: 100%;
                width: 0;
                border-top: 25.44px solid #45B43B;
            }
        }

        &__red {
            background-color: #DA251D;

            &:before {
                bottom: 100%;
                border-bottom: 25.44px solid #DA251D;
            }

            &:after {
                top: 100%;
                width: 0;
                border-top: 25.44px solid #DA251D;
            }
        }

        &__input {
            width:44px;
            background:unset;
            border:0;
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 600;
            font-size: 24px;
            line-height: 33px;
            color: #090C28;
            -moz-appearance: textfield;

            &:focus {
                outline-width: 0;
                outline: none;
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        &__input-pointer {
            cursor:unset;
        }
    }
    

</style>

