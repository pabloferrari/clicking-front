<template>
    <div class="subjects">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">{{ subject }}</p>
            </div>
        </div>
        <CardCount :cardCount="this.cardCountCourseClass()"></CardCount>

        <div
            class="flex flex-wrap justify-end mt-1"
            @click="activePrompt = true"
        >
            <ButtonRight
                class="btn-right"
                v-permission="['teacher']"
                buttonTitle="Crear Clase"
            ></ButtonRight>
        </div>

        <!-- Popup Course -->
        <vs-prompt
            @accept="create"
            title="Crear Clase"
            accept-text="Guardar"
            cancel-text="Cancelar"
            :active.sync="activePrompt"
        >
            <div class="con-exemple-prompt">
                <div class="w-full p-2">
                    <vs-input
                        class="w-full"
                        label-placeholder="Nombre Clase"
                        v-model="form.title"
                        name="title"
                        v-validate="'required'"
                        :danger="errors.has('title')"
                    />
                </div>
                <div class="w-full p-2">
                    <div class="">
                        <vs-input
                            class="w-full"
                            label-placeholder="Descripción"
                            v-model="form.description"
                            name="description"
                            v-validate="'required'"
                            :danger="errors.has('description')"
                        />
                    </div>
                </div>
            </div>
        </vs-prompt>

        <!-- START MODAL -->
        <vs-popup title="" :active.sync="itemOne" class="rounded-lg">
            <TaskForm
                title="Crear Tarea"
                :studentsList="studentsList"
            ></TaskForm>
        </vs-popup>

        <vs-popup title="" :active.sync="itemTwo">
            <ExamForm
                title="Crear Exámen"
                :studentsList="studentsList"
            ></ExamForm>
        </vs-popup>

        <vs-popup title="" :active.sync="itemThree">
            <PracticalWorkForm
                title="Crear Trabajo Práctica"
                :studentsList="studentsList"
            ></PracticalWorkForm>
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
                                v-model="ActiveModal"
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
import TaskForm from './TaskForm'
import ExamForm from './ExamForm'
import PracticalWorkForm from './PracticalWorkForm'

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
    ButtonRight,
    TaskForm,
    ExamForm,
    PracticalWorkForm
  },
  props: {
    subject: String,
    subjectId: String,
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
    },
    getCourseClassesCount() {
      this.$store.dispatch('courseClass/getCourseClassesCountData', this.subjectId)
    },

    cardCountCourseClass() {
      // const {assistance,tasks,evaluations} = this.cardCount
      // console.log(this.cardCount)
      return [

        {
          count:  this.cardCount.assistance,
          title: 'Asistencia'
        },
        {
          count: this.cardCount.tasks,
          title: 'Tareas'
        },
        {
          count: this.cardCount.evaluations,
          title: 'Evaluaciones'
        }

      ]
    },

    accept() {
      this.activePrompt = true;
    },
    create () {
      console.log('Creando... test');
      const payload = this.form
      console.log(payload);
      this.$store.dispatch('courseClass/createCourseClass', payload)
    },
  },

  mounted () {
    this.getCourseClass()
    this.getCourseClassesCount()
  
  },

  computed: {
    ...mapGetters({ storeCoursesClass: 'courseClass/getCourseClasses',storeCourseAssignments:'courseClass/getCourseClassesCount' })
  },

  watch: {

    storeCourseAssignments(data){
    
      if(data) {
        
        this.cardCount = data
      }
        
    },

    storeCoursesClass (data) {
      const courseClassData = []
      if(data.length > 0) {
           data.map((element) => {
          courseClassData.push({
            id: element.id,
            title: element.title,
            description: element.description,
            assignments: element.assignments
          })
        })
      }
   
      this.classesList = courseClassData
     
    },
    ActiveModal: function() {
      if( this.ActiveModal == 'itemOne' ) {
        this.itemOne = !this.itemOne
      }else if(this.ActiveModal == 'itemTwo'){
        this.itemTwo = !this.itemTwo
      }else if(this.ActiveModal == 'itemThree'){
        this.itemThree = !this.itemThree
      }

      console.log('Actualizado.... ', this.ActiveModal)
    }
    // storeCoursesClassCount(data){
    //   this.cardCount = data;
    // }
  },

  data () {
    return {
      console,
      dropdown: true,
      activePrompt: false,
      ActiveModal: false,
      itemOne: false,
      itemTwo: false,
      itemThree: false,
      studentsList: [{
        id:1,
        name:'Nestor Infante'
      },
      {
        id:2,
        name:'Gregorio Lucena',
      },
      {
        id:3,
        name:'Roberto'
      }],
      form: {
        title: '',
        description: '',
        course_id: this.subjectId
      },
      cardCount:[],
      DropDownList: [
        {
          id: 1,
          title: 'Crear Tarea',
          action: "itemOne",
        },
        {
          id: 2,
          title: 'Crear Examen',
          action: "itemTwo",
        },
        {
          id: 3,
          title: 'Crear Trabajo Practico',
          action: "itemThree",
        }
      ],

      tab: {
        value: 1
      },

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
