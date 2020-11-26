<template>
  <div class="subjects">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ subject }}</p>
      </div>
    </div>
    <CardCount :cardCount="this.cardCount"></CardCount>

    <div class="flex flex-wrap justify-end mt-1">
      <ButtonRight
        class="btn-right"
        v-permission="['teacher']"
        buttonTitle="Crear Clase"
      ></ButtonRight>
    </div>

    <!-- START MODAL -->
    <vs-popup title="Crear Clase" :active.sync="itemOne" >

    </vs-popup>

    <vs-popup title="Crear Tarea Práctica" :active.sync="itemTwo">

    </vs-popup>

     <vs-popup title="Crear Éxamen" :active.sync="itemThree">

    </vs-popup>
    <!-- END MODAL -->

    <div class="mt-0">
      <vs-tabs v-model="tab.value">
        <vs-tab label="Muro" v-on="clickTag(tab.value)">
          <div class="tab-content-wall">
            <Wall></Wall>
            <WallComment></WallComment>
          </div>
        </vs-tab>
        <vs-tab label="Clases">
          <div class="tab-content-classes">
            <div>
              <Collapse
                v-if="this.classesList.length > 0"
                :DropDownList="this.DropDownList"
                :classesList="this.classesList"
              ></Collapse>
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
import Wall from '../components/Wall'
import WallComment from '../components/WallComment'
import Collapse from '../components/Collapse'
// import CardWelcome from "../components/CardWelcome";
import CardCount from '../components/CardCount'
import ButtonRight from '../components/ButtonRight'
// import ButtonDropDownVue from "../components/ButtonDropDown.vue";
import { mapGetters } from 'vuex'
export default {
  name: 'Subject',
  components: {
    Wall,
    WallComment,
    // CardWelcome,
    CardCount,
    Collapse,
    ButtonRight
  },
  props: {
    subject: String,
    subjectId: String
  },
  methods: {
    clickTag (e) {
      this.dropdown = e !== 0
    },

    getCourseClass () {
      this.$store.dispatch(
        'courseClass/getCourseClassesSubjectData',
        this.subjectId
      )
    }
  },

  mounted () {
    this.getCourseClass()
  },

  computed: {
    ...mapGetters({ storeCoursesClass: 'courseClass/getCourseClasses' })
  },

  watch: {
    storeCoursesClass (data) {
      const courseClassData = []
      data.map((element) => {
        courseClassData.push({
          id: element.id,
          title: element.title,
          description: element.description,
          assignments: element.assignments
        })
      })
      this.classesList = courseClassData
      // console.log(courseClassData);
    }
  },
  data () {
    return {
      console,
      dropdown: true,
      DropDownList: [
        {
          id: 1,
          title: 'Crear Tarea'
        },
        {
          id: 2,
          title: 'Crear Examen'
        },
        {
          id: 3,
          title: 'Crear Trabajo Practico'
        }
      ],

      tab: {
        value: 1
      },
      cardCount: [
        {
          title: 'Asistencia',
          count: 3
        },
        {
          title: 'Tareas',
          count: 1
        },
        {
          title: 'Evaluaciones',
          count: 1
        }
      ],
      classesList: []
      // classesList: [
      //   {
      //     subject: {
      //       id: 1,
      //       name: "1. Números Reales",
      //       content: [
      //         {
      //           id: 1,
      //           type: "Tarea",
      //           title: "Estructura de los numeros reales",
      //           dateend: "Vence 10/11/2020 11:00 PM",
      //           status: "Pendiente",
      //           icon: "ClockIcon",
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     subject: {
      //       id: 2,
      //       name: "2. Números Primos",
      //       content: [
      //         {
      //           id: 2,
      //           type: "Examen",
      //           title: "Estructura de los numeros Primos",
      //           dateend: "Vence 19/11/2020 11:00 PM",
      //           status: "Pendiente",
      //           icon: "ClockIcon",
      //         },
      //       ],
      //     },
      //   },
      // ],
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

.btn-right {
  position: absolute;
  right: 1rem;
  z-index: 999;
}
</style>
