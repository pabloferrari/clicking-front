<template>
  <div class="vx-row">
    <vx-card
      class="vx-col mx-2 w-full sm:w-1/8 md:w-1/4 lg:w-1/4 xl:w-1/4"
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :subtitle="card.subtitle"
    >
      <div class="flex justify-between">
        <div class="flex items-start">
          <ul class="user-comments-list">
            <li class="commented-user flex items-center mb-4">
              <div class="mr-3">
                <vs-avatar class="m-0" size="30px" />
                <vs-avatar class="m-0" size="30px" />
                <vs-avatar class="m-0" size="30px" />
              </div>
              <div class="leading-tight">
                <p class="font-medium">Alumnos</p>
                <span class="text-xs">+ 12</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="">
        <div class="flex justify-between">
          <vs-button class="mr-8" :to="{ path: card.href }" size="small">{{
            card.buttonTitle
          }}</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    cards: Array,
  },
};
</script>
<style>
.backgroud-internal {
  background: #eef7fe;
}
.text-red {
  color: #ff5a5a;
}
.text-title {
  color: #22215b;
}
</style>
