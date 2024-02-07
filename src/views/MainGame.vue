<template>
  <div class="main-game h-100vh d-flex justify-content-center">
    <div class="main-game__left-part" v-if="showLeftPart">
      <div class="main-game__close-btn float-right" @click="closeLeftPart()">
        <img src="@/assets/images/icons/close-icon.svg" />
      </div>
      <left-part
        :heading="gameInfosData.heading"
        :gameInfos="gameInfosData.gameInfos"
        :gameImg="gameInfosData.gameImg"
      ></left-part>
    </div>

    <router-link v-else class="main-game__back-btn" :to="'/'">
      <img src="@/assets/images/icons/back.svg" alt="" />
    </router-link>

    <div class="main-game__right-part w-100">
      <right-part
        @gameBtnClick="gameBtnClick"
        @checkMagicSquare="checkMagicSquare"
        :magicSquareToCheck="magicSquareToCheck"
        :routerParams="$route.params"
      >
        <h1
          slot="gameHeading"
          class="main-game__right-part__game-heading align-self-start"
        >
          {{ gameHeading }}
        </h1>

        <div
          class="w-100 d-flex justify-content-center"
          :class="{ 'h-100': $route.name === 'Sierpinski Triangle' }"
          slot="gameContent"
        >
          <div
            class="w-100 d-flex justify-content-center"
            v-if="$route.name === 'Pascals Triangle' && showGame"
          >
            <pascals-triangle :checkPascals="checkPascals"></pascals-triangle>
          </div>

          <div
            class="w-100 d-flex justify-content-center"
            v-if="$route.name === 'Magic Square Builder' && showGame"
          >
            <magic-square
              ref="magicSquare"
              :fromHome="fromHome"
              @toCheck="magicSquareCheck"
            ></magic-square>
          </div>
        </div>
      </right-part>
    </div>
  </div>
</template>

<script>
import PascalsTriangle from "@/components/games/PascalsTriangle";
import MagicSquare from "@/components/games/MagicSquare";

export default {
  name: "MainGame",
  props: ["fromHome"],
  components: {
    PascalsTriangle,
    MagicSquare,
  },
  data() {
    return {
      gameInfosData: {},
      showGame: true,
      showLeftPart: true,
      checkPascals: 0,
      gameHeading: "",
      magicSquareToCheck: false,
    };
  },

  created() {
    this.checkPascals = 0;
    switch (this.$route.name) {
      case "Pascals Triangle":
        this.gameHeading = "Pascal’s Triangle";

        this.gameInfosData = {
          heading: "Instructions",
          gameInfos: [
            "To build the triangle, start with &#34;1&#34; at the top, then continue placing numbers below it in a triangular pattern.",
            "Each number is the numbers directly above it added together.",
          ],
          gameImg: "pascals.gif",
        };

        break;

      case "Magic Square Builder":
        this.gameHeading = "Magic Square Builder";

        this.gameInfosData = {
          heading: "Instructions",
          gameInfos: [
            "This game is clearly a great way to practice addition, but that's not the most significant mathematical structure of the puzzle.",
            "The Magic Square is complete when all rows, all columns, and both diagonals add up to the same number.",
            "Drag and Drop numbers to solve logic",
          ],
          gameImg: "magic_square.gif",
        };

        break;

      case "Sierpinski Triangle":
        this.gameHeading = "Sierpinski Triangle";

        this.gameInfosData = {
          heading: "Instructions",
          gameInfos: [
            "The Sierpinski triangle is a self-similar fractal. It consists of an equilateral triangle, with smaller equilateral triangles recursively removed from its remaining area. , which is named after the Polish mathematician Wacław Sierpiński. Wacław Franciszek Sierpiński (1882 – 1969) was a Polish mathematician.",
          ],
          gameImg: "sierpinski.gif",
        };
        break;
      default:
    }
  },

  methods: {
    gameBtnClick(buttonType) {
      if (buttonType === "check") {
        this.checkPascals++;
      } else if (buttonType === "reset" || buttonType === "clear") {
        this.showGame = false;
        this.magicSquareToCheck = false;
        setTimeout(() => {
          this.showGame = true;
        }, 0);
      }
    },

    closeLeftPart() {
      this.showLeftPart = false;
    },

    magicSquareCheck(toCheck) {
      this.magicSquareToCheck = toCheck;
    },

    checkMagicSquare() {
      this.$refs.magicSquare.check();
    },
  },
};
</script>

<style lang="scss">
* {
  -webkit-transition: all 0.7s linear;
  transition: all 0.7s linear;
}

.main-game {
  // height:100vh;
  &__left-part {
    width: 400px;
    padding: 2.36vmin 3.25vmin 0 3.4vmin;
    background-color: white;
  }

  &__close-btn {
    width: max-content;
    cursor: pointer;
  }

  &__back-btn {
    position: absolute;
    left: 45px;
    top: 45px;
  }

  &__right-part {
    &__game-heading {
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: bold;
      font-size: 3.6vmin;
      line-height: 32px;
      color: #ffffff;
      margin-bottom: 6vmin;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
