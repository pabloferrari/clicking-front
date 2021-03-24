<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Calificaciones</p>
        </div>
      </div>
    </div>

    <div class="mt-0">
      <vs-tabs v-if="courseTypes.length > 0">
        <div v-for="(data, indexx) in courseTypes" :key="indexx">
          <vs-tab
            active
            :label="data.name"
            @click="getRatingsData(data.id)"
            class="mx-4"
          >
            <div class="tab-content-courses">
              <div class="vx-row" v-if="dataStudentRatings.length > 0">
                <vx-card
                  v-for="(rating, index) in dataStudentRatings"
                  :key="index"
                  class="vx-col mx-4 my-4 w-full pb-6 sm:w-2/8 md:w-2/4 lg:w-2/4 xl:w-1/2 text-information active-card"
                >
                  <h4 class="text-title-h4 pb-4">{{ rating.title }}</h4>
                  <div
                    class="flex justify-between"
                    v-for="(data, index2) in rating.scores"
                    :key="index2"
                  >
                    <div class="flex items-start my-2">
                      <strong class="text-information">
                        {{ data.date }}.  {{ data.assignment_type }}: {{ data.name_task }}
                      </strong>
                    </div>
                    <div class="">

                      <div v-if="data.assignment_type == 'Tarea'" class="flex justify-end">
                        <strong v-if="data.score_student >= 7" class="text-information">Aprobado</strong>
                        <strong v-if="data.score_student < 7" class="text-information">Reprobado</strong>
                      </div>

                      <div v-if="data.assignment_type != 'Tarea'" class="flex justify-end">
                        <strong class="text-information">{{ data.score_student }}</strong> / <strong class="text-information">{{ data.score_assignment > 0 ? data.score_assignment : 10 }}</strong>
                      </div>

                    </div>
                  </div>
                </vx-card>
              </div>
              <div v-else class="text-center">
                <h4>No se encontraron resultados.</h4>
                <small>Seleccione un curso o taller</small>
              </div>
            </div>
          </vs-tab>
        </div>
      </vs-tabs>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
  name: 'ratings',
  components: {

  },
  data () {
    return {
      dataStudentRatings: []
    }
  },
  methods: {

    getStudentRatings () {
      this.$store.dispatch('student/getStudentRatingsData')
    },

    getCourseTypes () {
      this.$store.dispatch('courseType/getCourseTypesData')
    },
    getRatingsData (id) {
      this.$store.dispatch('student/getStudentRatingsData', id)
    }

  },
  mounted () {
    this.getCourseTypes()
    // this.getStudentRatings()
  },
  watch: {
    courseTypes (data) {
      if (data.length > 0) {
        this.getRatingsData(data[0].id)
      }
    },
    ratings (data) {
      console.log(JSON.stringify(data));
      // const rows = []
      const dataArray = []
      for (const index in data) {
        const keys = Object.keys(data[index])
        dataArray.push({
          title: index,
          scores: data[index]
        })
      }
      this.dataStudentRatings  = dataArray
    }
  },
  computed: {
    ...mapGetters({ ratings: 'student/getStudentRatings', courseTypes:'courseType/getCourseTypes' })
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
  color: #567df4;
}

.text-information {
  opacity: 0.8;
  color: #22215b;
}
.text-title-h4 {
  font-weight: 600;
  font-size: 20px;
  color: #22215b !important;
}

.active-card {
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
</style>
