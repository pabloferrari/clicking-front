<template>
    <div id="classroom">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">Salones</p>
            </div>
        </div>
        <CardWelcome :cardsWelcome="this.cardsWelcome()"></CardWelcome>
        <!-- ADD NEW -->
        <div
            class="flex flex-wrap justify-end mt-1 data-list-btn-container"
            @click="activeModal()"
        >
            <vs-button
                color="primary"
                size="small"
                class="font-semibold btn-right"
                icon="icon-plus"
                icon-pack="feather"
                type="border"
                >Crear Salón</vs-button
            >
        </div>

        <!-- <ModalSection ModalTitle="" :action="popupActive" :children="this.children" v-bind="propsChildren"></ModalSection> -->

        <vs-popup title="" :active.sync="popupActive">
            <ClassroomForm
                title="Crear Salón"
                :shiftList="this.shifts"
                :subjectsList="this.subjects"
                :courseTypesList="this.courseTypes"
                :teachersList="this.teachers"
                :studentsList="this.storeStudents"
                :popupActive="this.popupActive"
                @close-modal="popupActive = false"
                @refresh-dashboard="getInstitutionCount()"
                :cardData="this.classroom"
            ></ClassroomForm>
        </vs-popup>

        <div class="mt-0">
            <vs-tabs>
                <vs-tab label="Salones" @click="getClassrooms()">
                    <div class="tab-content-courses" id="div-with-loading">
                        <div>
                            <CardList
                                :cardData="this.classroom"
                                v-if="this.classroom.length > 0"
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
                <vs-tab label="Talleres">
                    <div class="tab-content-workshop">
                        <div>
                            <p class="font-semibold text-center">
                                No se encontraron resultados
                            </p>
                        </div>
                    </div>
                </vs-tab>
            </vs-tabs>
        </div>
    </div>
</template>

<script>
import CardWelcome from '../components/CardWelcome'
import CardList from '../components/CardList'

import CourseLogo from '../components/icons/CourseLogo'
// import PencilLogo from '../components/icons/PencilLogo'
// import CheckLogo from '../components/icons/CheckLogo'
// import DocumentLogo from '../components/icons/DocumentLogo'
import SchoolIcon from '../components/icons/SchoolIcon'
import AppleIcon from '../components/icons/AppleIcon'

//import Tabs from '../components/Tabs'
//import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import ClassroomForm from './ClassroomForm'

import AvatarList from '../components/AvatarList'
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'

export default {
  name: 'classroom',
  components: {
    CardWelcome,
    CourseLogo,
    CardList,

    SchoolIcon,
    AppleIcon,
    ClassroomForm,
    AvatarList,
    'v-select': vSelect
  },
  props: {
    shiftsList: null,
    institutionsList: null
  },
  methods: {

    // openLoadingInDiv(){
    //   this.$vs.loading({
    //     container: '#div-with-loading',
    //     scale: 0.6
    //   })
    //   setTimeout( ()=> {
    //     this.$vs.loading.close('#div-with-loading > .con-vs-loading')
    //   }, 3000);
    // },

    activeModal () {
      this.popupActive = true
    },

    getInstitutionCount () {
      this.$store.dispatch('institution/getInstitutionCount', 2)
    },

    getClassrooms () {
      this.$store.dispatch('classroom/getClassroomsData')
    },

    cardsWelcome () {
      return [
        {
          icon: CourseLogo,
          title: 'Salones',
          count: this.countInstitution.classrooms,
          path: '/classrooms'
        },
        {
          icon: SchoolIcon,
          title: 'Alumnos',
          count: this.countInstitution.students,
          path: '/students'
        },
        {
          icon: AppleIcon,
          title: 'Docentes',
          count: this.countInstitution.teachers,
          path: '/teachers'
        }
      ]
    },
    getShifts () {
      this.$store.dispatch('shift/getShifts')
    },
    getSubjects () {
      this.$store.dispatch('subject/getSubjects')
    },
    getCourseTypes () {
      this.$store.dispatch('courseType/getCourseTypes')
    },
    getTeachers () {
      this.$store.dispatch('teacher/getTeachers')
    },
    getStudents () {
      this.$store.dispatch('student/getStudents')
    }
  },
  watch: {
    storeClassrooms (data) {
      const classroomsData = []
      data.map((element) => {
        const count = element.courses_count ? element.courses_count : 0
        classroomsData.push({
          title: element.name,
          subtitle: `${count} Cursos - ${element.shift.name}`,
          buttonTitle: 'Ir a salon',
          path: `/classrooms/${element.name.split(' ').join('-')}/${
            element.id
          }`,
          avatarData: element.classroom_students
        })
      })

      this.classroom = classroomsData
    },
    storeShifts (data) {
      this.shifts = data
    },
    storeSubjects (data) {
      this.subjects = data
    },
    storeCourseTypes (data) {
      this.courseTypes = data
    },
    storeTeachers (data) {
      this.teachers = data
    },
    storeStudents (data) {
      console.log(data)
    },
    storeInstitutionCount (data) {

      console.log(data)
      this.countInstitution = {
        classrooms: data.classrooms,
        students: data.students,
        teachers: data.teachers
      }
    }
  },
  computed: {
    ...mapGetters({
      classrooms: 'classroom/getClassrooms',
      storeShifts: 'shift/getShifts',
      storeSubjects: 'subject/getSubjects',
      storeCourseTypes: 'courseType/getCourseTypes',
      storeTeachers: 'teacher/getTeachers',
      storeClassrooms: 'classroom/getClassrooms',
      storeInstitutionCount: 'institution/getInstitution',
      storeStudents: 'student/getStudents'
    })
  },
  mounted () {
    this.getClassrooms()
    this.getInstitutionCount()

    this.getShifts()
    this.getSubjects()
    this.getCourseTypes()
    this.getTeachers()

    this.getStudents()
  },
  data () {
    return {
      description: 'Cursando',
      popupActive: false,
      shifts: null,
      subjects: null,
      courseTypes: null,
      teachers: null,
      countInstitution: [],
      users: [
        {
          id: 1,
          name: 'Curso',
          username: 'Bret',
          email: 'Matemática',
          website: 'Laura Perez'
        },
        {
          id: 2,
          name: 'Examén',
          username: 'Antonette',
          email: 'Ingles',
          website: 'Claudia Colmenarez'
        },
        {
          id: 3,
          name: 'Taller',
          username: 'Samantha',
          email: 'Ciencias',
          website: 'Berta Gomez'
        }
      ],
      selected: [],
      options: ['Daniel', 'Nestor', 'Oscar', 'Gregorio', 'Pablo'],
      form: {
        id: null,
        dataShifts: '',
        dataInstitutions: ''
      },
      userPosts: [
        {
          likes: 100,
          usersLiked: [
            {
              name: 'Trina Lynes',
              img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
            },
            {
              name: 'Lilian Nenez',
              img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
            },
            {
              name: 'Alberto Glotzbach',
              img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
            }
          ]
        }
      ],

      classroom: [],
      course: [
        {
          title: '4A-Comisión A',
          subtitle: '2 Cursos - Turno Mañana',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4A-Comisión-A'
        },
        {
          title: '4B-Comisión B',
          subtitle: '5 Cursos - Turno Tarde',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4B-Comisión-B'
        },
        {
          title: '4C-Comisión C',
          subtitle: '1 Cursos - Turno Mañana',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4C-Comisión-C'
        }
      ],
      workshop: [],
      tabs: [
        {
          title: 'Salones'
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

<style lang="css">
.con-vs-popup .vs-popup {
    width: 800px !important;
}
.btn-right {
    position: absolute;
    right: 1rem;
    z-index: 999;
}
</style>
