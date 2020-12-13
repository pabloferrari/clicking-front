<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ titleHeader }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.getCourseAssignments()"></CardWelcome>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos" @click="getCourses()">
          <div class="tab-content-courses">
            <div>
              <CardList :cardData="this.courses" description="cursando">
              </CardList>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <CardList
                v-if="this.workshop.length > 0"
                :cardData="this.workshop"
                description="cursando"
              >
              </CardList>
              <div v-else>
                <p class="font-semibold text-center">
                  No se encontraron resultados
                </p>
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
// import AvatarList from '../components/AvatarList'
import CardWelcome from '../components/CardWelcome'
import CourseLogo from '../components/icons/CourseLogo'
import PencilLogo from '../components/icons/PencilLogo'
import CheckLogo from '../components/icons/CheckLogo'
import DocumentLogo from '../components/icons/DocumentLogo'
import CardList from '../components/CardList'
import { mapGetters } from 'vuex'
export default {
  name: 'courses',
  components: {

    CardWelcome,
    CardList

  },
  props: {
    title: String,
    id: String
  },
  data () {
    return {
      courses: [],
      workshop: [],
      courseAssignmentCount: [],


      titleHeader: this.title ? this.title.split('-').join(' ') : 'Mis Cursos'
    }
  },

  mounted () {
    this.getCoursesAssignmentsCount()
    this.getCourses()
  },

  computed: {
    ...mapGetters({ storeCourses: 'course/getCourses', storeCourseAssignmentsCount:'course/getCourseAssignmentCount' })
  },
  methods: {

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


    getCourses () {
      this.$store.dispatch('course/getMyCoursesData')

      // this.$store.dispatch('course/getCoursesClassroomData', this.id)
    },
    getCoursesAssignmentsCount () {
      this.$store.dispatch('course/getCoursesAssignmentsCountData')
    }
  },
  watch: {
    storeCourses ({ Curso }) {
      if (Curso) {
        const courseData = []
        Curso.map((element) => {
          courseData.push({
            title: element.subject.name,
            subtitle: `${element.classroom.name} - ${element.classroom.shift.name}`,
            buttonTitle: 'Ir a curso',
            path: `/courses/${element.subject.name.split(' ').join('-')}/${
              element.id
            }`,
            avatarData: element.classroom.classroom_students
          })
        })
        this.courses = courseData
      }
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
