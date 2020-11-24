<template>
  <div class="vx-row">
    <Card
      class="vx-col mx-2 w-full sm:w-1/8 md:w-1/4 lg:w-1/3 xl:w-1/5"
      v-for="(card, index) in cardData"
      :key="index"
      :title="card.title"
      :subtitle="card.subtitle"
      :buttonTitle="card.buttonTitle"
      :path="card.path"
      :description="description"
      :dataAvatar="card.avatarData"
    >
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card";
export default {
  name: "CardList",
  components: {
    Card,
  },
  props: {
    cardData: Array,
    description: String,
    dataAvatar: Array,
  },
};
</script>
