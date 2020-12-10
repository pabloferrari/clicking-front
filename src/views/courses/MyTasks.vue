<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ titleHeader }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"> </CardWelcome>
    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Por Corregir">
          <div class="tab-content-courses">
            <div v-for="(assignment, index) in this.cardStatus" :key="index">
              <CardStatus :data="assignment"></CardStatus>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Completado">
          <div class="tab-content-workshop">
            <div class="text-center">No se encontraron resultados</div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import CardWelcome from '../components/CardWelcome'
import CourseLogo from '../components/icons/CourseLogo'
import PencilLogo from '../components/icons/PencilLogo'
import CheckLogo from '../components/icons/CheckLogo'
import DocumentLogo from '../components/icons/DocumentLogo'

import CardStatus from '../components/CardStatus'
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  components: {
    CardWelcome,
    CardStatus
  },
  props: {
    assignment: String
  },
  data () {
    return {
      cardStatus: [],

      cardsWelcome: [
        {
          icon: CourseLogo,
          title: 'Cursos',
          count: 2,

          path: '/courses'
        },
        {
          icon: DocumentLogo,
          title: 'Tareas',
          count: 3,
          path: '/courses/tasks'
        },
        {
          icon: PencilLogo,
          title: 'Trabajos Prácticos',
          count: 1,
          path: '/courses/workpractices'
        },
        {
          icon: CheckLogo,
          title: 'Exámenes',
          count: 2,
          path: '/courses/evaluations'
        }
      ],

      titleHeader: this.title ? this.title.split('-').join(' ') : 'Mis Cursos'
    }
  },
  computed: {
    ...mapGetters({ storeMyAssignments: 'assignment/getMyAssignments' })
  },
  watch: {
    storeMyAssignments (data) {
      const myAssignmentData = []
      data.map((element) => {
        const statusName = this.parseStatus(element.studentsassignment, 'name')
        const statusId = this.parseStatus(element.studentsassignment, 'id')
        console.log(statusName, statusId)
        myAssignmentData.push({
          name: `${element.class.course.classroom.name} - ${element.class.course.classroom.shift.name}`,

          type: element.assignmenttype.id,
          typeStatusId: statusId[0],
          typeStatus: statusName[0],

          title: element.title,
          limit_date: element.limit_date
        })
      })
      this.cardStatus = myAssignmentData
      // console.log(data)
    }
  },
  methods: {
    parseStatus (data, field) {
      return  [... new Set(data.map((e) => e.assignmentstatus[field]))]
    },

    getMyAssignments () {
      this.$store.dispatch('assignment/getMyAssignmentsData', 1)
    }
  },
  mounted () {
    this.getMyAssignments()
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
</style>
