<template>
    <div class="magic-square">
        <ul class="magic-square__navigation row mx-auto w-50 justify-content-between">
            <li 
                @click="levelChange('3x3')"
                class="magic-square__navigation__item list-unstyled" 
                :class="{'magic-square__navigation__item--active' : gameLevel === '3x3'}">3 x 3</li>
            <li 
                @click="levelChange('4x4')"
                class="magic-square__navigation__item list-unstyled" 
                :class="{'magic-square__navigation__item--active' : gameLevel === '4x4'}">4 x 4</li>
            <li 
                @click="levelChange('5x5')"
                class="magic-square__navigation__item list-unstyled" 
                :class="{'magic-square__navigation__item--active' : gameLevel === '5x5'}">5 x 5</li>
        </ul>
              
        <div class="magic-square__game-white-cont">
  
            <div class="d-flex align-items-center justify-content-between">
                <div 
                    class="magic-square__game-table"
                    :style="toCheck ? 'margin-left:auto; margin-right:auto' : ''"
                    :class="
                        gameLevel === '3x3' && !toCheck  ? 'magic-square__table-3x3' : 
                        gameLevel === '4x4' && !toCheck  ? 'magic-square__table-4x4' :
                        gameLevel === '5x5' && !toCheck  ? 'magic-square__table-5x5' : ''"
                >                 
                    <div class="row mx-0 magic-square__game-table--row" :key="i" v-for="i in levelNum">                
                        <div 
                            class="magic-square__game-table--item position-relative" 
                            :class="
                                gameLevel === '3x3' ? 'magic-square__game-table--item-3x3' : 
                                gameLevel === '4x4' ? 'magic-square__game-table--item-4x4' :
                                gameLevel === '5x5' ? 'magic-square__game-table--item-5x5' : ''"
                            :key="j"
                            v-for="j in levelNum">

                            <div 
                                @dragover.prevent 
                                @dragenter.prevent
                                @drop.prevent="drop" 
                                class="squars w-100 h-100 d-flex justify-content-center align-items-center"
                            ></div>

                            <template v-if="gameLevel === '3x3' && showResults">
                                <span 
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum3x3_1_y === 15}" 
                                    id="num3x3-1-top">{{sum3x3_1_y}}</span> 
                                <span 
                                    v-if="i === 1 && j === levelNum" 
                                    class="magic-square__num-result" 
                                    :class="{'magic-square__num-result--success' : sum3x3_3_y === 15}"
                                    id="num3x3-3-top">{{sum3x3_3_y}}</span>
                                <span 
                                    v-if="i === 1 && j === levelNum" 
                                    class="magic-square__num-result" 
                                    :class="{'magic-square__num-result--success' : sum3x3_diagonal_right_left === 15}"
                                    id="num3x3-3-right-corner">{{sum3x3_diagonal_right_left}}</span>
                                <span 
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum3x3_diagonal_left_right === 15}" 
                                    id="num3x3-1-left-corner">{{sum3x3_diagonal_left_right}}</span>
                                <span 
                                    v-else-if="i === 1 && j === 2" 
                                    class="magic-square__num-result" 
                                    :class="{'magic-square__num-result--success' : sum3x3_2_y === 15}"
                                    id="num3x3-2-top">{{sum3x3_2_y}}</span>
                                <span 
                                    v-else-if="i === 1 && j === 3" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum3x3_1_x === 15}" 
                                    id="num3x3-3-right">{{sum3x3_1_x}}</span>
                                <span 
                                    v-else-if="i === 2 && j === 3" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum3x3_2_x === 15}" 
                                    id="num3x3-6-right">{{sum3x3_2_x}}</span>
                                <span 
                                    v-else-if="i === 3 && j === 3" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum3x3_3_x === 15}"  
                                    id="num3x3-9-right">{{sum3x3_3_x}}</span>
                            </template>

                            <template v-if="gameLevel === '4x4' && showResults">
                                <span 
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result" 
                                    :class="{'magic-square__num-result--success' : sum4x4_1_y === 34}" 
                                    id="num4x4-1-top">{{sum4x4_1_y}}</span>
                                <span 
                                    v-if="i === 1 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_4_y === 34}" 
                                    id="num4x4-4-top">{{sum4x4_4_y}}</span>
                                <span 
                                    v-if="i === 1 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_diagonal_right_left === 34}" 
                                    id="num4x4-4-right-corner">{{sum4x4_diagonal_right_left}}</span>
                                <span 
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_diagonal_left_right === 34}"  
                                    id="num4x4-1-left-corner">{{sum4x4_diagonal_left_right}}</span>
                                <span 
                                    v-else-if="i === 1 && j === 2" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_2_y === 34}"  
                                    id="num4x4-2-top">{{sum4x4_2_y}}</span>
                                <span 
                                    v-else-if="i === 1 && j === 3" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_3_y === 34}"  
                                    id="num4x4-3-top">{{sum4x4_3_y}}</span>
                                <span 
                                    v-else-if="i === 1 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_1_x === 34}" 
                                    id="num4x4-4-right">{{sum4x4_1_x}}</span>
                                <span 
                                    v-else-if="i === 2 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_2_x === 34}"  
                                    id="num4x4-8-right">{{sum4x4_2_x}}</span>
                                <span 
                                    v-else-if="i === 3 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_3_x === 34}"  
                                    id="num4x4-12-right">{{sum4x4_3_x}}</span>
                                <span 
                                    v-else-if="i === 4 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum4x4_4_x === 34}"  
                                    id="num4x4-16-right">{{sum4x4_4_x}}</span>
                            </template>

                            <template v-if="gameLevel === '5x5' && showResults">
                                <span 
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_1_y === 65}"  
                                    id="num5x5-1-top">{{sum5x5_1_y}}</span>
                                <span 
                                    v-if="i === 1 && j ===5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_5_y === 65}" 
                                    id="num5x5-5-top">{{sum5x5_5_y}}</span>
                                <span 
                                    v-if="i === 1 && j ===5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_diagonal_right_left === 65}" 
                                    id="num5x5-5-right-corner">{{sum5x5_diagonal_right_left}}</span>                            
                                <span
                                    v-if="i === 1 && j === 1" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_diagonal_left_right === 65}" 
                                    id="num5x5-1-left-corner">{{sum5x5_diagonal_left_right}}</span>
                                <span
                                    v-else-if="i === 1 && j === 2" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_2_y === 65}" 
                                    id="num5x5-2-top">{{sum5x5_2_y}}</span>
                                <span
                                    v-else-if="i === 1 && j === 3" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_3_y === 65}" 
                                    id="num5x5-3-top">{{sum5x5_3_y}}</span>                                
                                <span
                                    v-else-if="i === 1 && j === 4" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_4_y === 65}"  
                                    id="num5x5-4-top">{{sum5x5_4_y}}</span>
                                <span
                                    v-else-if="i === 1 && j === 5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_1_x === 65}" 
                                    id="num5x5-5-right">{{sum5x5_1_x}}</span>
                                <span
                                    v-else-if="i === 2 && j === 5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_2_x === 65}" 
                                    id="num5x5-10-right">{{sum5x5_2_x}}</span>      
                                <span
                                    v-else-if="i === 3 && j === 5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_3_x === 65}"  
                                    id="num5x5-15-right">{{sum5x5_3_x}}</span>                                
                                <span
                                    v-else-if="i === 4 && j === 5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_4_x === 65}" 
                                    id="num5x5-20-right">{{sum5x5_4_x}}</span>
                                <span
                                    v-else-if="i === 5 && j === 5" 
                                    class="magic-square__num-result"
                                    :class="{'magic-square__num-result--success' : sum5x5_5_x === 65}" 
                                    id="num5x5-25-right">{{sum5x5_5_x}}</span>
                            </template> 
                        </div>
                    </div>

                </div>
       
                <div 
                    @dragover.prevent 
                    @dragenter.prevent
                    @drop.prevent="dropFirstPlace" v-if="!toCheck" class="magic-square__game-numbers">       
                    <span 
                        class="num position-relative magic-square__game-numbers--num"
                        :class="
                            gameLevel === '3x3' ? 'magic-square__game-numbers--num-3x3' : 
                            gameLevel === '4x4' ? 'magic-square__game-numbers--num-4x4' :
                            gameLevel === '5x5' ? 'magic-square__game-numbers--num-5x5' : ''"
                        :key="i"
                        :id="'num' + i"
                        draggable="true"
                        @dragstart="numDragStart"
                        @dragend="numDragEnd"       
                        @dragover.stop
                        v-for="i of getMagicsData"
                    >
                        {{i}}
                    </span>
                    
                </div> 
            </div> 
     
        </div>
        
    </div>
</template>

<script>
    export default({
        name : "MagicSquare",
        props: ["fromHome"], 
        data() {
            return {
                gameLevel : "3x3",
                numbers : document.getElementsByClassName('num'),
                magics : {
                    "3x3" : [2,5,6,3,9,8,4,1,7],
                    "4x4" : [1,5,2,3,6,9,8,7,4,10,12,13,16,11,14,15],
                    "5x5" : [1,5,2,4,3,6,9,8,7,13,12,11,10,14,16,15,18,17,19,21,20,23,22,25,24]
                },
                drag : false,
                levelNum : 3,
                toCheck : false,
                showResults : false,
                sum3x3_1_x : 0,
                sum3x3_2_x : 0,
                sum3x3_3_x : 0,
                sum3x3_1_y : 0,
                sum3x3_2_y : 0,
                sum3x3_3_y : 0,
                sum3x3_diagonal_left_right : 0,
                sum3x3_diagonal_right_left : 0, 
                sum4x4_1_x : 0,
                sum4x4_2_x : 0,
                sum4x4_3_x : 0,
                sum4x4_4_x : 0,
                sum4x4_1_y : 0,
                sum4x4_2_y : 0,
                sum4x4_3_y : 0,
                sum4x4_4_y : 0,
                sum4x4_diagonal_left_right : 0,
                sum4x4_diagonal_right_left : 0,
                sum5x5_1_x : 0,
                sum5x5_2_x : 0,
                sum5x5_3_x : 0,
                sum5x5_4_x : 0,
                sum5x5_5_x : 0,
                sum5x5_1_y : 0,
                sum5x5_2_y : 0,
                sum5x5_3_y : 0,
                sum5x5_4_y : 0,
                sum5x5_5_y : 0,
                sum5x5_diagonal_left_right : 0,
                sum5x5_diagonal_right_left : 0    
            }
        },

        created() { 
            if(this.fromHome) {
                window.sessionStorage.removeItem("gameLevel");
                window.sessionStorage.removeItem("levelNum");
            }

            this.gameLevel = window.sessionStorage.gameLevel ? window.sessionStorage.gameLevel : "3x3";
            this.levelNum  = window.sessionStorage.levelNum ? +window.sessionStorage.levelNum : 3;

            if(this.gameLevel === '3x3'){
                this.magics['3x3'] = this.magics['3x3'].sort( () => .5 - Math.random() );
            }

            if(this.gameLevel === '4x4'){
                this.magics['4x4'] = this.magics['4x4'].sort( () => .5 - Math.random() );
            }

            if(this.gameLevel === '5x5'){
                this.magics['5x5'] = this.magics['5x5'].sort( () => .5 - Math.random() );
            }            
        },
    
        mounted() {
            for(let i = 0; i < this.numbers.length; i++) {
                this.numbers[i].style.cssText= `top: ${ Math.floor(Math.random() * (-30 - 10))}px;  left : ${Math.floor(Math.random() * (-30 - 10))}px;`
            }            
        },

        watch : {
            gameLevel() {
                const squars = document.getElementsByClassName("squars");
                for(let i = 0; i < squars.length; i++) {
                    squars[i].innerHTML = ""
                }

                if(this.gameLevel === '3x3'){
                    this.magics['3x3'] = this.magics['3x3'].sort( () => .5 - Math.random() );
                }

                else if(this.gameLevel === '4x4'){
                    this.magics['4x4'] = this.magics['4x4'].sort( () => .5 - Math.random() );
                }

                else if(this.gameLevel === '5x5'){
                    this.magics['5x5'] = this.magics['5x5'].sort( () => .5 - Math.random() );
                }

                setTimeout(() => {
                    for(let i = 0; i < this.numbers.length; i++) {
                        this.numbers[i].style.cssText= `top: ${ Math.floor(Math.random() * (-30 - 10))}px;  left : ${Math.floor(Math.random() * (-30 - 10))}px;`
                    } 
                },0)                  
            
            }            
        },

        methods : {
            drop(e){
                if(!this.toCheck) {
                    const num_id = e.dataTransfer.getData('num_id');
    
                    if (num_id) {
                        const num = document.getElementById(num_id); 
                        num.style.top = '0';
                        num.style.left = '0'; 
                        num.style.opacity = '1';
                        num.style.transform = "scale(1)"; 
                        let styles = num.getAttribute("style")            
                        
                        if(e.target.innerHTML === "") {
                            e.target.appendChild(num);
                        }else {
                            let checkedNum = e.target.getElementsByTagName("span")[0];
                            checkedNum.style.cssText = styles;
                            e.target.innerHTML = ""; 
                            document.getElementsByClassName("magic-square__game-numbers")[0].appendChild(checkedNum);    
                            e.target.appendChild(num);                   
                        } 
                    } 
                }                         
            },

            dropFirstPlace(e) {
                if(!this.toCheck) {
                    const num_id = e.dataTransfer.getData('num_id');

                    if (num_id) {
                        const num = document.getElementById(num_id);
                        num.style.opacity = '0';           
                        e.target.appendChild(num);   
                    }
                }            
  
            },
  
            numDragStart(e){
                if(!this.toCheck) {
                    if (e.target.id) {
                        const target = e.target;
                        e.dataTransfer.setData("num_id", target.id);
                    
                        setTimeout(() => {
                            target.style.opacity = '0';                                                         
                        },0)

                        target.style.transform = "scale(0.9)";
                    }
                }    
            },

            numDragEnd(e){
                if(!this.toCheck) {
                    if (e.target.id) {
                        const target = e.target;             
                        target.style.opacity = "1";                  
                        target.style.transform = "scale(1)"; 
                        
                        const squars = document.querySelectorAll(".squars > .num");   
                        if(squars.length === this.levelNum * this.levelNum) {
                            this.toCheck = true;

                            for(let i = 0; i < squars.length; i++) {
                                squars[i].setAttribute("draggable", "false");                   
                            } 
                            
                            this.$emit('toCheck', this.toCheck)
                        }else {
                            this.toCheck = false;
                        }
                    }
                }                
            },

            levelChange(level){
                let levelNum = 3;
                switch(level) {
                case "3x3":
                    levelNum = 3;
                    break;
                case "4x4":
                    levelNum = 4;
                    break;
                case "5x5":
                    levelNum = 5;
                    break;
                }
                
                window.sessionStorage.gameLevel = level;
                window.sessionStorage.levelNum = levelNum;
                location.reload();
            },

            check() {
                this.showResults = true;
                const squars = document.querySelectorAll(".squars > span");
                const nums = [];
            
                for(let i = 0; i < squars.length; i++) {
                    nums.push(+squars[i].innerHTML)                   
                } 

                if(this.gameLevel === "3x3") {
                    this.sum3x3_1_x = nums[0] + nums[1] + nums[2];
                    this.sum3x3_2_x = nums[3] + nums[4] + nums[5];
                    this.sum3x3_3_x = nums[6] + nums[7] + nums[8];
                    this.sum3x3_1_y = nums[0] + nums[3] + nums[6];
                    this.sum3x3_2_y = nums[1] + nums[4] + nums[7];
                    this.sum3x3_3_y = nums[2] + nums[5] + nums[8];
                    this.sum3x3_diagonal_left_right = nums[0] + nums[4] + nums[8];
                    this.sum3x3_diagonal_right_left = nums[2] + nums[4] + nums[6];
                }
                
                if(this.gameLevel === "4x4") {
                    this.sum4x4_1_x = nums[0] + nums[1] + nums[2] + nums[3];
                    this.sum4x4_2_x = nums[4] + nums[5] + nums[6] + nums[7];
                    this.sum4x4_3_x = nums[8] + nums[9] + nums[10] + nums[11];
                    this.sum4x4_4_x = nums[12] + nums[13] + nums[14] + nums[15];                    
                    this.sum4x4_1_y = nums[0] + nums[4] + nums[8] + nums[12];                    
                    this.sum4x4_2_y = nums[1] + nums[5] + nums[9] + nums[13];                    
                    this.sum4x4_3_y = nums[2] + nums[6] + nums[10] + nums[14];                    
                    this.sum4x4_4_y = nums[3] + nums[7] + nums[11] + nums[15];                    
                    this.sum4x4_diagonal_left_right = nums[0] + nums[5] + nums[10] + nums[15];
                    this.sum4x4_diagonal_right_left = nums[3] + nums[6] + nums[9] + nums[12];
                }

                if(this.gameLevel === "5x5") {
                    this.sum5x5_1_x = nums[0] + nums[1] + nums[2] + nums[3] + nums[4];
                    this.sum5x5_2_x = nums[5] + nums[6] + nums[7] + nums[8] + nums[9];
                    this.sum5x5_3_x = nums[10] + nums[11] + nums[12] + nums[13] + nums[14];
                    this.sum5x5_4_x = nums[15] + nums[16] + nums[17] + nums[18] + nums[19];
                    this.sum5x5_5_x = nums[20] + nums[21] + nums[22] + nums[23] + nums[24];
                    this.sum5x5_1_y = nums[0] + nums[5] + nums[10] + nums[15] + nums[20];
                    this.sum5x5_2_y = nums[1] + nums[6] + nums[11] + nums[16] + nums[21];
                    this.sum5x5_3_y = nums[2] + nums[7] + nums[12] + nums[17] + nums[22];
                    this.sum5x5_4_y = nums[3] + nums[8] + nums[13] + nums[18] + nums[23];
                    this.sum5x5_5_y = nums[4] + nums[9] + nums[14] + nums[19] + nums[24];
                    this.sum5x5_diagonal_left_right = nums[0] + nums[6] + nums[12] + nums[18] + nums[24];
                    this.sum5x5_diagonal_right_left = nums[4] + nums[8] + nums[12] + nums[16] + nums[20];
                }          
              
            }           
        },

        computed: {
            getMagicsData() {
                let gameData = {}
                
                switch(this.gameLevel) {
                case "3x3":
                    gameData = this.magics['3x3'];
                    break;
                case "4x4":
                    gameData = this.magics['4x4'];
                    break;
                case "5x5":
                    gameData = this.magics['5x5'];
                    break;
                }
                
                return gameData;
            },
        
            dragOptions() {
                return {
                    animation: 200,
                    group: "numbers",
                    disabled: false,                    
                };
            }
        }
    })
</script>

<style lang="scss" scoped>
    .magic-square {
        width:100%;

        &__draggable-num {
            transform: scale(2);
        }

        &__navigation  {
            margin-bottom: 5.3vmin;
        }
    
        &__navigation__item {
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: bold;
            font-size: 2.5vmin;
            color:white;
            cursor:pointer;
            padding:7px 15px;
            border-bottom: 2px solid transparent;
            -webkit-transition:all 0.4s;
            transition:all 0.4s;

            &--active {
                color: #8760ff;
                border-bottom: 2px solid #8760ff;
                
            }
        }

        &__game-white-cont {
            background: #FFFFFF;
            box-shadow: 5px 20px 50px rgba(74, 153, 211, 0.2);
            border-radius: 10px;
            padding: 5vmin 8.18vmin;
        }

        &__game-table {
            width: max-content;
            &--row {
                width:max-content;
            }

            &--item {
                background: #8760ff;
                box-shadow: 5px 20px 50px rgba(74, 153, 211, 0.2);
                border-radius: 10px;

                & .magic-square__game-numbers--num {
                    margin:unset!important;
                }
            }

            &--item-3x3 {
                width: 11.80vmin;
                height: 11.80vmin;
                margin: 2.3vmin;
            }

            &--item-4x4 {
                width: 10.7vmin;
                height: 10.7vmin;
                margin: 1.235vmin;
            }

            &--item-5x5{
                width: 8vmin;
                height: 8vmin;
                margin: 1vmin;
            }
        }

        &__table-3x3 {
            margin-left:23%;
            padding-right:1%;
        }

        &__table-4x4 {
            padding-right:1%;
        }

        &__table-5x5 {
            margin-left:6%;
            padding-right:2%;
        }


        &__game-numbers{
            display: flex;
            flex-wrap: wrap;
            padding:3%;
            -webkit-transition:all 0.4s!important;
            transition:all 0.4s!important;
            min-height:400px;
            min-width:300px;
            align-items:center;
            justify-content: center;
             &--num {
                @extend %game-number; 
             }   

            &--num-3x3 {                
                @extend %game-number-3x3-4x4;
                
            }

            &--num-4x4{ 
                @extend %game-number-3x3-4x4;
            }

            &--num-5x5{
                font-size: 3.6vmin;
                width:5.34vmin;
                height:5.34vmin;
                margin: 1vmin;
            }
        }

        &__num-result {
            background: #DA251D;
            padding:2px;
            display: flex;
            align-items:center;
            justify-content: center;
            font-family: "Noto Sans";
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 32px;
            position:absolute;
            color: #FFFFFF;
            border-radius:50%;
            width:35px;
            height:35px;
            z-index:999;

            &::after {
                content : url("../../assets/images/icons/red-arrow.svg");
                position:absolute;              
                z-index:-1;
                margin:auto;
            }

            &--success {
                background:#45B43B;                
                -webkit-transition:unset!important;
                 transition:unset!important;

                &::after {
                    content : url("../../assets/images/icons/green-arrow.svg");
                }
            }
        }
        
    }

    %game-number {
        display: inline-flex;
        align-items:center;
        justify-content:center;
        background: #090C28;
        box-shadow: 0px 20px 50px rgba(74, 153, 211, 0.2); 
        font-family: "Noto Sans";
        font-style: normal;
        font-weight: bold;
        color: #FFFFFF;
        cursor:pointer;
        border-radius:50%;
        -webkit-transition:all 0.4s;
        transition: all 0.4s;
    }

    %game-number-3x3-4x4 {
        width: 8.4vmin;
        height: 8.4vmin;
        margin: 9px;
        font-size: 4.8vmin;
    }

    #num3x3-1-top, 
    #num3x3-2-top, 
    #num3x3-3-top,
    #num4x4-1-top,
    #num4x4-2-top, 
    #num4x4-3-top,
    #num4x4-4-top,
    #num5x5-1-top,
    #num5x5-2-top,
    #num5x5-3-top,
    #num5x5-4-top,
    #num5x5-5-top  {
        top:-70px;
        left:0;
        right:0;
        margin:auto;

        &::after {
            left:0;
            right:0;
            top:22px;
        }

    }

    #num3x3-1-left-corner,
    #num4x4-1-left-corner,
    #num5x5-1-left-corner  {
        top: -50px;
        left: -50px;

        &::after{
            top: 11px;
            left: 21px;
            transform: rotate(-45deg);
        }
    
    } 

    #num3x3-3-right-corner,
    #num4x4-4-right-corner,
    #num5x5-5-right-corner {
        top: -50px;
        right: -50px;

        &::after{
            top: 11px;
            right: 21px;
            transform: rotate(45deg);
        }
    }

    #num3x3-3-right, 
    #num3x3-6-right, 
    #num3x3-9-right,
    #num4x4-4-right,
    #num4x4-8-right,
    #num4x4-12-right,
    #num4x4-16-right,
    #num5x5-5-right,
    #num5x5-10-right,
    #num5x5-15-right,
    #num5x5-20-right,
    #num5x5-25-right
     {
        right:-70px;
        top:0;
        bottom:0;
        margin:auto;

        &::after {
            transform: rotate(90deg);
            top: -10px;
            left: -33px;
        }
    }
    
    
    
</style>

