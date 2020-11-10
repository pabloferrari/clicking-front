<template>
  <div class="vx-row">
    <vx-card
      class="vx-col mx-2 w-full sm:w-1/8 md:w-1/4 lg:w-1/4 xl:w-1/4"
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :subtitle="card.subtitle"
    >
      <div class="flex footer">
        <div class="w-1/8">
          <vs-button :href="{ url: card.href }" size="small">{{
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
