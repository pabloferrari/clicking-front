<template>
  <div class="vx-row">
      <div v-for="card in cardsWelcome" :key="card.title" class="vx-col sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6">
          <vs-card>
              <div class="vx-row">
                  <div class="vx-col w-1/3">
                      <div :is="card.icon" class="m-1"></div>
                  </div>
                  <div class="vx-col w-2/3">
                      <h1 class="text-right font-bold">{{ card.count }}</h1>
                      <p class="subpixel-antialiased text-right">{{ card.title }}</p>
                  </div>
              </div>

              <!-- <div class="flex justify-between">
              <div :is="card.icon"></div>
              <div class="py-1 m-1">
                <h1>{{ card.count }}</h1>
              </div>
            </div>
            <div class="flex justify-between">
              <div class="flex items-end">
                <p class="subpixel-antialiased text-right">{{ card.title }}</p>
              </div>
            </div> -->
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
  }
}
</script>
