<template>
  <div class="home h-100vh">
    <p class="home__heading">Mathematical Games</p>
    <div class="home__container">
      <div class="home__flex-cont">
        <router-link
          class="home__content me-40"
          :to="{ name: 'Magic Square Builder', params: { fromHome: true } }"
        >
          <div
            class="d-flex w-100 h-100 mx-0 align-items-center justify-content-center"
          >
            <div class="home__img-cont">
              <img
                src="@/assets/images/icons/magic_icon.svg"
                alt="Magic Square Builder"
              />
            </div>
          </div>
          <p
            class="home__content--text mb-0 justify-content-center d-flex align-items-center bg-white"
          >
            Magic Square Builder
          </p>
        </router-link>

        <router-link class="home__content me-40" :to="'/pascals-triangle'">
          <div
            class="d-flex w-100 h-100 mx-0 align-items-center justify-content-center"
          >
            <div class="home__img-cont">
              <img
                src="@/assets/images/icons/pascals_icon.svg"
                alt="Pascal’s Triangle"
              />
            </div>
          </div>
          <p
            class="home__content--text mb-0 justify-content-center d-flex align-items-center bg-white"
          >
            Pascal’s Triangle
          </p>
        </router-link>

        <router-link class="home__content" :to="'/famous-mathematics'">
          <div
            class="d-flex w-100 h-100 mx-0 align-items-center justify-content-center"
          >
            <div class="home__img-cont" style="width: 82%">
              <img
                src="@/assets/images/icons/map_icon.svg"
                alt="Famous Mathematics"
              />
            </div>
          </div>
          <p
            class="home__content--text mb-0 justify-content-center d-flex align-items-center bg-white"
          >
            Famous Mathematics
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #090c28;
  background-image: url("~@/assets/images/math_background3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  padding-left: 3.29%;
  padding-right: 3.29%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__flex-cont {
    &:nth-child(1) {
      margin-bottom: 6.5%;
    }
  }

  &__content {
    background: #8760ff;
    box-shadow: 5px 20px 50px rgba(74, 153, 211, 0.2);
    border-radius: 10px;
    width: 38.8vmin;
    height: 28.2vmin;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 5px 20px 50px rgba(74, 153, 211, 0.2);

    &--text {
      width: 100%;
      height: 50px;
      border-radius: 0 0 10px 10px;
      box-shadow: 5px 20px 50px rgba(74, 153, 211, 0.2);
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 27px;
      color: #090c28;
    }
  }

  &__flex-cont {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  &__heading {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    color: #8760ff;
    text-align: center;
    text-shadow: 1px 0px 3px black;
    background: #ffffffd4;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    padding: 3px 17px;
    border-radius: 30px 0 30px 0;
    box-shadow: 1px 0px 4px 2px #ffffff;
  }

  &__img-cont {
    width: 41%;
    & img {
      width: 100%;
    }
  }
}

.me-40 {
  margin-right: 40px;
}
</style>
