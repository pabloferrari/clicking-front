<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ title.split("-").join(" ") }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>

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
import AvatarList from '../components/AvatarList'
import CardWelcome from '../components/CardWelcome'
import CourseLogo from '../components/icons/CourseLogo'
import PencilLogo from '../components/icons/PencilLogo'
import CheckLogo from '../components/icons/CheckLogo'
import DocumentLogo from '../components/icons/DocumentLogo'
import CardList from '../components/CardList'
import Tabs from '../components/Tabs'
import { mapGetters } from 'vuex'
export default {
  name: 'courses',
  components: {
    AvatarList,
    CardWelcome,
    CourseLogo,
    CardList,
    Tabs
  },
  props: {
    title: String,
    id: String
  },

  mounted () {
    this.getCourses()
  },

  computed: {
    ...mapGetters({ storeCourses: 'course/getCourses' })
  },
  methods: {
    getCourses () {
      this.$store.dispatch('course/getCoursesClassroomData', this.id)
    }
  },
  watch: {
    storeCourses (data) {
      // console.log(data);
      const courseData = []
      data.map((element) => {
        courseData.push({
          title: element.subject.name,
          subtitle:
            `${element.classroom.name} - ${  element.classroom.shift.name}`,
          buttonTitle: 'Ir a curso',
          path:
            `/courses/${
              element.subject.name.split(' ').join('-')
            }/${
              element.subject.id}`,
          avatarData: element.classroom.classroom_students
        })
      })
      console.log(courseData)
      this.courses = courseData
    }
  },
  data () {
    return {
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: 'Cursos',
          count: 2,

          path: ''
        },
        {
          icon: DocumentLogo,
          title: 'Tareas',
          count: 3,
          path: ''
        },
        {
          icon: PencilLogo,
          title: 'Trabajos Prácticos',
          count: 1
        },
        {
          icon: CheckLogo,
          title: 'Exámenes',
          count: 2
        }
      ],
      courses: [],
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
