<template>
  <div class="vx-row">
    <div
      v-for="card in cardsWelcome"
      :key="card.title"
      class="vx-col w-full sm:w-1/4 md:w-1/6 lg:w-1/6 xl:w-1/9"
    >
      <vs-card>
        <div class="flex justify-between">
          <div :is="card.icon"></div>
          <div class="py-1 m-1">
            <h1>{{ card.count }}</h1>
          </div>
        </div>
        <div class="flex justify-between flex-wrap">
          <p class="subpixel-antialiased">{{ card.title }}</p>
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
};
</script>
