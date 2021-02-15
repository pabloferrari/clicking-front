<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <p class="primary">Hola, {{ activeUserInfo.name }}!</p>
    </div>

    <calendar></calendar>
    <!-- <div class="donuts__chart">
      <DonutsChart></DonutsChart>
    </div> -->
  </div>
</template>

<script>
// import DonutsChart from '../components/Analytics/DonutsChart'

import calendar from '../components/Calendar'


export default {
  name: 'home',
  components: {
    calendar
    // DonutsChart
  },
  data () {
    return {
      
    }
    
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.authUser
    }
  },
  methods: {},
  mounted () {}
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
  color: #567df4;
}
</style>
