<template>
<div class="vx-row">
  <div class="vx-col w-full">
    <p class="primary">Hola, {{ activeUserInfo.displayName }}!</p>
  </div>
  <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
    <statistics-card-line
        hideChart
        class="mb-base"
        icon="EyeIcon"
        statistic="36.9k"
        statisticTitle="Views" />
  </div>
</div>
</template>

<script>
import StatisticsCardLine from '@/layouts/components/statistics-cards/StatisticsCardLine.vue';

export default {
  name: 'home',
  components: {
    StatisticsCardLine
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>

<style lang="scss" scoped>
  .primary {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 44px;
    display: flex;
    align-items: center;
    color: #567DF4;
  }
</style>
