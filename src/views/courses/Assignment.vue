<template>
  <div class="">
    <div class="vx-row">
      <div class="vx-col flex w-full">
        <div class="flex w-full">
          <div class="rounded-full p-0  bg-white h-12 w-12 flex items-center justify-center mr-2">
            <component :is="this.renderIcon(this.assignment.assignmentType)" ></component>
          </div>
          <p class="primary">{{ this.assignment.title }}</p>

        </div>
      </div>
      <div class="vx-col flex">
        <div class="flex w-full mx-6 my-2">
          <small>{{this.assignment.limitDate}}</small>
        </div>
      </div>
    </div>

    <div class="flex justify-between my-8">
      <div class="vx-col w-2/3 mx-4">
        <vx-card class="body-card">
          <div class="flex mb-1 w-full">
            <!-- <div class="justify-between"> -->
            <!-- <div class=""> -->
            <vs-avatar
              src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
              size=""
              class="border-2 border-white border-solid -m-1"
            ></vs-avatar>
            <p class="mx-2 font-bold justify-items-start">{{this.assignment.teacher}}</p>
            <!-- </div> -->
            <!-- </div> -->
            <div class="grid justify-items-end" v-permission="['teacher']">
              <feather-icon
                icon="Edit3Icon"
                svgClasses="h-5 w-5 cursor-pointer"
              />
            </div>
          </div>

          <div class="p-4">
            <p>
              {{this.assignment.description}}
            </p>
          </div>
          <div>
            <div class="flex">
              <div
                class="flex bg-white p-2 rounded-2xl md:w-1/5 sm:w-1/5 lg:w-1/5 mx-2"
              >
                <div class="text-right">
                  <strong>PDF</strong>
                </div>
                <div class="text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
              </div>
              <div
                class="flex bg-white p-2 rounded-2xl md:w-1/5 sm:w-1/5 lg:w-1/5"
              >
                <div class="text-right">
                  <strong>PDF</strong>
                </div>
                <div class="text-left">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <div class=" flex flex-col  w-1/3">
        <div class="vx-col w-full">
          <vx-card>
             <h2 class="font-bold text-title pb-4">Trabajo</h2>
             <div class="" v-for="(data,index) in documentData" :key="index">
                <AttachDocumentList :dataAttach="data" :displayIcon="false" :displayRemove="true"></AttachDocumentList>
             </div>
              <ButtonCardAction></ButtonCardAction>
          </vx-card>
        </div>
        <div class="flex w-full my-2">
          <vx-card>
            <div class="body-card p-2">
              <h2 class="text-title">Comentarios</h2>
              <div class="flex p-3 ml-2">
                <ul class="user-comments-list">
                  <li class="commented-user flex items-center mb-4">
                    <div class="mr-3">
                      <vs-avatar class="m-0" size="30px" />
                    </div>
                    <div class="leading-tight">
                      <p class="font-bold text-title">Auther Red</p>
                      <span class="text-xs"
                        >Lorem ipsum dolor sit, amet consectetur adipisicing
                        eli.</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="flex mb-3">
                <div class="w-full ml-2">
                  <div class="chat__input flex p-4">
                    <div class="">
                      <div class="mr-3 ml-2">
                        <vs-avatar class="m-0" size="30px" />
                      </div>
                    </div>
                    <vs-input
                      class="flex-1"
                      icon-pack="feather"
                      icon="icon-send"
                      icon-no-border
                      icon-after
                      placeholder="Type Your Message"
                      v-model="commentResponse"
                    />
                  </div>
                </div>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
    </div>

    <div class="">
      <div class="vx-col" v-permission="['teacher']">
      <h2 class="font-bold text-title">Entregado</h2>
    </div>
    <div class="vx-row" v-permission="['teacher']">
      <div class="flex w-full my-2" v-for="(student, index) in this.assignment.students" :key="index"  >
        <div >
          <CardAvatar :name="student.classroomstudents.student.name" v-if="student.assignmentstatus.id==2" :avatar="student.classroomstudents.student.user.image ? student.classroomstudents.student.user.image: ''" ></CardAvatar>
        </div>
        <!-- <div  class="">
          <p>No se encontraron resultados</p>
        </div> -->
      </div>
    </div>

    <div class="vx-col" v-permission="['teacher']">
      <h2 class="font-bold text-title">Pendiente por Entregar</h2>
    </div>
    <div class="vx-row" v-permission="['teacher']">
       <div  v-permission="['teacher']">
      <div class="flex w-full my-2" v-for="(student, index) in this.assignment.students" :key="index" >
        <CardAvatar :name="student.classroomstudents.student.name" v-if="student.assignmentstatus.id==1" :avatar="student.classroomstudents.student.user.image ? student.classroomstudents.student.user.image: ''" ></CardAvatar>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import ListIcon from '../components/icons/ListIcon';
import PencilAssignmentlIcon from '../components/icons/PencilAssignmentlIcon';
import CheckAssignmentIcon from '../components/icons/CheckAssignmentIcon';

import moment from 'moment'
import AttachDocumentList from '../components/SectionAttach/AttachDocumentList';
import ButtonCardAction from '../components/Buttons/ButtonCardAction'
import CardAvatar from '../components/Avatars/CardAvatar'
import { mapGetters } from 'vuex'
export default {
  name: 'Assignment',
  props: {
    id: String
  },
  components: {
    CardAvatar,
    ListIcon,
    PencilAssignmentlIcon,
    CheckAssignmentIcon,
    AttachDocumentList,
    ButtonCardAction
  },
  data() {
    return {
      commentResponse: "",
      assignment:[],
      titleAssignment: "Titulo Asignacion",
      documentData: [
        {
          title: 'Numero Reales',
          type:'PDF'
        },
        {
          title: 'Numero Primos',
          type:'Imagen',
        }
      ]
    }
  },
  computed: {
    ...mapGetters({ storeAssignment: 'assignment/getAssignmentDetail' })
  },
  watch: {
    storeAssignment (data) {
       this.assignment = {}
      if(data){
       this.assignment  = {
          title: data.title,
          limitDate: this.formatDateTime(data.limit_date),
          description: data.description,
          assignmentType: data.assignmenttype.id,
          teacher: data.class.course.teacher.name,
          students: data.studentsassignment,
        }
      }
    }
  },
  methods: {
    getAssignment () {
      this.$store.dispatch('assignment/getMyAssignmentsDetailData',this.id)
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM/YYYY hh:mm A')
    },
    renderIcon(type) {
      switch (type) {
        case 1: // Tasks
            return ListIcon;
            break;
        case 2: // Evaluations
            return CheckAssignmentIcon;
            break;
        case 3: // Work Practice
            return PencilAssignmentlIcon;
            break;
      }
    },
  },
  mounted () {
    this.getAssignment()
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
.body-card {
  background: #eef7fe;
}

.active-card-assig {
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card-assig:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.text-title {
  color: #22215b;
}
</style>
