<template>
  <div class="vx-row">
    <div
      v-for="card in cardsWelcome"
      :key="card.title"
      class="vx-col sm:w-1/2 md:w-1/6 lg:w-1/6 xl:w-1/6 "
      @click="handlerRoute(card.path)"
    >
      <vs-card class="active-card-welcome">
        <div class="vx-row">
          <div class="vx-col w-1/3 ">
            <div :is="card.icon" class="m-1"></div>
          </div>
          <div class="vx-col w-2/3">
            <h1 class="text-center font-bold">{{ card.count }}</h1>
            <p class="subpixel-antialiased text-center">{{ card.title }}</p>
          </div>
        </div>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWelcome',
  components: {},
  props: {
    cardsWelcome: null
  },
  methods: {
    handlerRoute (path) {
      if (path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
<style>
.active-card-welcome{
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card-welcome:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
</style>
