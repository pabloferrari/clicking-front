<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <p class="primary">Hola, {{ activeUserInfo.name }}!</p>
    </div>

    <calendar :events="events"></calendar>
    <!-- <div class="donuts__chart">
      <DonutsChart></DonutsChart>
    </div> -->
  </div>
</template>

<script>
// import DonutsChart from '../components/Analytics/DonutsChart'

import calendar from '../components/Calendar';


export default {
  name: 'home',
  components: {
    calendar
    // DonutsChart
  },
  data() {
    return {
      events: [
        {
            title  : 'event1',
            start  : '2021-01-01',
        },
        {
            title  : 'event2',
            start  : '2021-01-05',
            end    : '2021-01-07',
        },
        {
            title  : 'event3',
            start  : '2021-01-09T12:30:00',
            allDay : false,
        },
      ]
    }
    
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.auth.authUser
    }
  },
  methods: {},
  mounted() {}
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
