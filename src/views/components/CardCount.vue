<template>
  <div class="flex">
    <div
      v-for="card in cardCount"
      :key="card.title"
      class="vx-col mx-2 sm:w-4/3 md:w-4/3 lg:w-4/3 xl:w-4/3"
    >
      <vs-card class="active-card-welcome px-4">
        <div class="flex items-center">
          <div class="flex mt-4">
            <!-- <div class=""> -->

            <div class="vx-col text-center h-5">
              <p>{{ card.title }}</p>
            </div>
            <div class="items-start mr-2 my-4 h-10">
              <h1 class="font-bold mr-1 text-title-count">{{ card.count }}</h1>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCount",
  props: {
    cardCount: null,
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
.text-title-count {
  color: #22215b;
}
</style>
