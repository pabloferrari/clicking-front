<template>
  <div class="vx-col w-full lg:w-1/3 mb-base">
    <vx-card title="Sessions By Device">
      <!-- SLOT = ACTION -->
      <template slot="actions">
        <change-time-duration-dropdown />
      </template>

      <!-- CHART -->
      <div slot="no-body">
        <vue-apex-charts
          type="donut"
          height="340"
          class="mb-12 mt-4"
          :options="sessionsByDeviceDonut.chartOptions"
          :series="sessionsData.series"
        />
      </div>

      <!-- CHART DATA -->
      <ul>
        <li
          v-for="deviceData in sessionsByDeviceDonut.analyticsData"
          :key="deviceData.device"
          class="flex mb-3"
        >
          <feather-icon
            :icon="deviceData.icon"
            :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"
          ></feather-icon>
          <span class="ml-2 inline-block font-semibold">{{
            deviceData.device
          }}</span>
          <span class="mx-2">-</span>
          <span class="mr-4">{{ deviceData.sessionsPercentage }}%</span>
          <div class="ml-auto flex -mr-1">
            <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
            <feather-icon
              :icon="
                deviceData.comparedResultPercentage < 0
                  ? 'ArrowDownIcon'
                  : 'ArrowUpIcon'
              "
              :svgClasses="[
                deviceData.comparedResultPercentage < 0
                  ? 'text-danger'
                  : 'text-success',
                'stroke-current h-4 w-4 mb-1 mr-1',
              ]"
            ></feather-icon>
          </div>
        </li>
      </ul>
    </vx-card>
  </div>
</template>

<script>
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'DonutsChart',

  components: {
    VueApexCharts,
    ChangeTimeDurationDropdown
  },
  data () {
    return {
      sessionsData: {},
      sessionsByDeviceDonut: {
        analyticsData: [
          {
            device: 'Dekstop',
            icon: 'MonitorIcon',
            color: 'primary',
            sessionsPercentgae: 58.6,
            comparedResultPercentage: 2
          },
          {
            device: 'Mobile',
            icon: 'SmartphoneIcon',
            color: 'warning',
            sessionsPercentgae: 34.9,
            comparedResultPercentage: 8
          },
          {
            device: 'Tablet',
            icon: 'TabletIcon',
            color: 'danger',
            sessionsPercentgae: 6.5,
            comparedResultPercentage: -5
          }
        ],
        comparedResult: [2, -3, 8],
        series: [58.6, 34.9, 6.5],
        chartOptions: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          dataLabels: {
            enabled: false
          },
          legend: { show: false },
          chart: {
            offsetY: 30,
            type: 'donut',
            toolbar: {
              show: false
            }
          },
          stroke: { width: 0 },
          colors: ['#7961F9', '#FF9F43', '#EA5455'],
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ['#9c8cfc', '#FFC085', '#f29292']
            }
          }
        }
      }
    }
  },

  methods: {},
  mounted () {
    // console.log(this.$http)
    // Sessions By Device
    //   this.$http
    //     .get('/api/card/card-analytics/session-by-device')
    //     .then(response => {
    //       this.sessionsData = response.data
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
  }
}
</script>
