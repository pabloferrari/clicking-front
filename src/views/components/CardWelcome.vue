<template>
  <div class="flex">
    <div
      v-for="card in cardsWelcome"
      :key="card.title"
      class="vx-col mx-2 sm:w-4/3 md:w-4/3 lg:w-4/3 xl:w-4/3"
      @click="handlerRoute(card.path)"
    >
      <vs-card
        class="active-card-welcome"
        :class="[routeActive(card.path) ? 'active-card-welcome-route' : '']"
      >
        <div class="flex mt-4">
          <!-- <div class=""> -->
          <div class="vx-col" v-if="card.icon">
            <div :is="card.icon" class="m-1"></div>
          </div>

          <div class="vx-col text-center" v-else>
            <p>Ver {{ card.title }}</p>
          </div>
          <div class="vx-col">
            <h1 class="text-center font-bold">{{ card.count }}</h1>

            <p class="subpixel-antialiased text-center">{{ card.title }}</p>
          </div>
          <!-- </div> -->
        </div>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardWelcome",
  components: {},
  props: {
    cardsWelcome: null,
  },
  methods: {
    handlerRoute(path) {
      if (this.$router.currentRoute.path !== path) {
        this.$router.push(path);
      }
    },

    routeActive(path) {
      const activeRoute =
        this.$router.currentRoute.path === path ? true : false;

      return activeRoute;
    },
  },
  mounted() {
    this.routeActive();
  },
};
</script>
<style>
.active-card-welcome {
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card-welcome:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.active-card-welcome-route {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
</style>
