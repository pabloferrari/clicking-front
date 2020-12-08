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


// import { mapGetters } from 'vuex'
export default {
  name: 'Course',
  components: {
    CardWelcome,
    CardStatus
  },
  props: {
    assignment: String
  },

  mounted () {
    // this.getCourses()
  },

  // computed: {
  //   ...mapGetters({ storeCourses: 'course/getCourses' })
  // },
  // methods: {
  //   getCourses () {
  //     this.$store.dispatch('course/getMyCoursesData')

  //     this.$store.dispatch('course/getCoursesClassroomData', this.id)
  //   }
  // },
  // watch: {
  //   storeCourses ({Curso}) {
  //     if (Curso) {
  //       const courseData = []
  //       Curso.map((element) => {
  //         courseData.push({
  //           title: element.subject.name,
  //           subtitle: `${element.classroom.name} - ${element.classroom.shift.name}`,
  //           buttonTitle: 'Ir a curso',
  //           path: `/courses/${element.subject.name.split(' ').join('-')}/${
  //             element.id
  //           }`,
  //           avatarData: element.classroom.classroom_students
  //         })
  //       })
  //       this.courses = courseData
  //     }
  //   }
  // },
  data () {
    return {
      cardStatus: [
        {
          title: 'Estructura Basica',
          name: '3B-Comision - Mañana',
          type: 1,
          limit_date: '2020-12-08 14:30:00'
        },
        {
          title: 'Estructura Basica 2',
          name: '3B-Comision - Mañana',
          type: 1,
          limit_date: '2020-12-08 14:30:00'
        }
      ],

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
          path: '/courses/workpractice'
        },
        {
          icon: CheckLogo,
          title: 'Exámenes',
          count: 2,
          path: '/courses/evaluation'
        }
      ],
      courses: [],
      titleHeader: this.title ? this.title.split('-').join(' ') : 'Mis Cursos',
      // course: [
      //   {
      //     title: "Matematica",
      //     subtitle: "Comision A -Turno Mañana",
      //     buttonTitle: "Ir a curso",
      //     path: "/courses/Matematica",
      //   },
      //   {
      //     title: "Lenguaje",
      //     subtitle: "Comision A -Turno Tarde",
      //     buttonTitle: "Ir a curso",
      //     path: "/courses/Lenguaje",
      //   },
      // ],
      workshop: [],
      tabs: [
        {
          title: 'Cursos'
        },
        {
          title: 'Talleres'
        }
      ]
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
