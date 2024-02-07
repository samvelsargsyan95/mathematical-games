<template>
  <div class="app">
    <router-view/>
  </div>

</template>

<script>


export default {
  name : "App",
}
</script>


<style>
  @font-face {
    font-family: "Noto Sans";
    src: url("~@/assets/fonts/NotoSans-Regular.ttf");
  }

  *{
    font-family: "Noto Sans";
  }

  a {
    text-decoration:none!important;
  }

  body {
    background-color:#090C28;
  }

  .h-100vh {
    height:100vh;
  }

  @media (max-width:1800px) {
    .pascals {
      margin-bottom: -100px!important;
      margin-top: -100px!important; 
      -webkit-transform: scale(0.8)!important;
      transform: scale(0.75)!important;
    } 

    .pascals__hexagon {
      margin: 12.5px 1px!important;
    }

    .pascals__hexagon::before {
      bottom: 97%!important;
    }

    .pascals__hexagon::after {
      top: 97%!important;
    }
  }

  @media (max-width:1600px) {
    .magic-square__game-white-cont {
      padding: 3vmin 7.18vmin!important;
    }

    .left-part__game-img-cont {
      width:68%!important;
    }

    .magic-square__game-table--item-3x3 {
      margin:1.5vmin!important;
      width: 10vmin!important;
      height: 10vmin!important;
    }

    .magic-square__game-numbers--num-3x3[data-v-32d14e48], .magic-square__game-numbers--num-4x4[data-v-32d14e48] {
      width: 7.5vmin!important;
      height: 7.5vmin!important;
      margin: 8px!important;
      font-size: 4vmin!important;
    }

    .right-part__btns-cont {
      margin-top: 10vmin!important;
    }

    .right-part__reset_btn {
      padding: 1vmin 0!important;
      width: 19vmin!important;
      font-size:19px!important;
    }

  }

  /* @media ( max-width: 1500px) {
    .main-game__right-part__game-heading {
      margin-bottom: 3.5vmin!important;
    }
  } */

  @media (max-width: 1400px) {
    .magic-square__navigation{
      margin-bottom: 4vmin!important;
    }

    .magic-square__game-table--item-4x4 {
      width: 9.5vmin!important;
      height: 9.5vmin!important;
      margin: 1vmin!important;
    }
  }
</style>
