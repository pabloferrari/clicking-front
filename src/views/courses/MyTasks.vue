<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ titleHeader }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.getCourseAssignments()"> </CardWelcome>
    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Pendiente" @click="getMyAssignmentsPending()">
          <div class="tab-content-courses" v-if="this.cardStatus.length > 0">
            <div v-for="(assignment, index) in this.cardStatus" :key="index">
              <CardStatus :data="assignment"></CardStatus>
            </div>
          </div>
          <div v-else>
            <p class="font-semibold text-center">
              No se encontraron resultados
            </p>
          </div>
        </vs-tab>
        <vs-tab label="Entregado" @click="getMyAssignmentsInProcess()">
          <div class="tab-content-courses" v-if="this.cardStatus.length > 0">
            <div v-for="(assignment, index) in this.cardStatus" :key="index">
              <CardStatus :data="assignment"></CardStatus>
            </div>
          </div>
          <div v-else>
            <p class="font-semibold text-center">
              No se encontraron resultados
            </p>
          </div>
        </vs-tab>
        <vs-tab label="Completado" @click="getMyAssignmentsComplete()">
          <div class="tab-content-workshop" v-if="this.cardStatus.length > 0">
            <div v-for="(assignment, index) in this.cardStatus" :key="index">
              <CardStatus :data="assignment"></CardStatus>
            </div>
          </div>
          <div v-else>
            <p class="font-semibold text-center">
              No se encontraron resultados
            </p>
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
  name: 'MyTasks',
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
      courseAssignmentCount: [],
      titleHeader: this.title ? this.title.split('-').join(' ') : 'Mis Cursos'
    }
  },
  computed: {
    ...mapGetters({ storeMyAssignments: 'assignment/getMyAssignments', storeCourseAssignmentsCount:'course/getCourseAssignmentCount' })
  },
  watch: {
    storeMyAssignments (data) {
      const myAssignmentData = []
      data.map((element) => {
        const statusName = this.parseStatus(element.studentsassignment, 'name')
        const statusId = this.parseStatus(element.studentsassignment, 'id')
        let classrooms = ''
        if (element.class.course.classroom) {
          classrooms = `${element.class.course.classroom.name} - ${element.class.course.classroom.shift.name}`
          // classrooms = `${element.class.course.classroom.name}`
        } else {
          classrooms = `${element.assignmenttype.name} ${element.class.course.subject.name}`
        }
        myAssignmentData.push({
          name: classrooms,
          type: element.assignmenttype.id,
          typeStatusId: statusId[0],
          typeStatus: statusName[0],
          id:element.id,
          title: element.title,
          limit_date: element.limit_date
        })
      })
      this.cardStatus = myAssignmentData
    },
    storeCourseAssignmentsCount (data) {
      const defaultCourseAssignment = {
        courses: 0,
        tasks: 0,
        workpractice: 0,
        exams: 0
      }
      if (!data) {
        this.courseAssignmentCount = defaultCourseAssignment
      }
      this.courseAssignmentCount = data

    }
  },
  methods: {
    parseStatus (data, field) {
      const flt = data.filter((e) => e.itsme);
      return  [... new Set(flt.map((e) => e.assignmentstatus[field]))]
    },
    getCourseAssignments () {
      return [
        {
          icon: CourseLogo,
          title: 'Cursos',
          count: this.courseAssignmentCount.courses ? this.courseAssignmentCount.courses : 0,
          path: '/courses'
        },
        {
          icon: DocumentLogo,
          title: 'Tareas',
          count: this.courseAssignmentCount.tasks ? this.courseAssignmentCount.tasks : 0,
          path: '/courses/tasks'
        },
        {
          icon: PencilLogo,
          title: 'Trabajos Prácticos',
          count: this.courseAssignmentCount.workpractice ? this.courseAssignmentCount.workpractice : 0,
          path: '/courses/workpractices'
        },
        {
          icon: CheckLogo,
          title: 'Exámenes',
          count: this.courseAssignmentCount.exams ? this.courseAssignmentCount.exams : 0,
          path: '/courses/evaluations'
        }
      ]
    },

    getMyAssignmentsPending () {
      const params = {
        id: 1, //  Id Tasks
        status: 1 // assingment Status Pending
      }
      this.$store.dispatch('assignment/getMyAssignmentsData', params)

    },
    getMyAssignmentsInProcess () {
      const params = {
        id: 1, //  Id Tasks
        status: 2 // assingment Status in process
      }
      this.$store.dispatch('assignment/getMyAssignmentsData', params)

    },
    getMyAssignmentsComplete () {
      const params = {
        id: 1, // Id Tasks
       status: 3 // assingment Status Complete
      }
      this.$store.dispatch('assignment/getMyAssignmentsData', params)

    },
    getCoursesAssignmentsCount () {
      this.$store.dispatch('course/getCoursesAssignmentsCountData')
    }
  },
  mounted () {
    this.getCoursesAssignmentsCount()
    this.getMyAssignmentsPending()
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
