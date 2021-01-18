<template>
  <div class="">
    <div class="vx-row">
      <div class="vx-col flex w-full">
        <div class="flex w-full">
          <div
            class="rounded-full p-0 bg-white h-12 w-12 flex items-center justify-center mr-2"
          >
            <component
              :is="this.renderIcon(this.assignment.assignmentType)"
            ></component>
          </div>
          <p class="primary">{{ this.assignment.title }}</p>
        </div>
      </div>
      <div class="vx-col flex">
        <div class="flex w-full mx-16 my-2">
          <h6>{{ this.assignment.limitDate }}</h6>
        </div>
      </div>
    </div>
    <div class="vx-row">
      <div
        class="flex justify-between my-8 md:w-3/4 lg:w-3/4 sm:w-full xs:w-full"
      >
        <div class="vx-col mx-4 w-full">
          <vx-card class="body-card">
            <div class="flex">
              <div class="vx-col flex mb-1 w-1/2">
                <vs-avatar
                  src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
                  size=""
                  class="border-2 border-white border-solid -m-1"
                ></vs-avatar>
                <p class="mx-2 font-bold">
                  {{ this.assignment.teacher }}
                </p>
              </div>
              <div
                class="vx-col flex w-1/2 justify-end"
                v-permission="['teacher']"
              >
                <feather-icon
                  icon="Edit3Icon"
                  svgClasses="h-5 w-5 cursor-pointer"
                />

                <ButtonDropDown
                  :dataSelected="[]"
                  :items="this.itemsDropdown()"
                ></ButtonDropDown>
              </div>
            </div>

            <div class="p-4">
              <p>
                {{ this.assignment.description }}
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
      </div>

      <div class="md:w-1/4 lg:1/2 sm:w-full xs:w-full">
        <div class="flex justify-end">
          <vx-card>
            <h2 class="font-bold text-title pb-4">Trabajo</h2>
            <div class="" v-for="(data, index) in documentData" :key="index">
              <AttachDocumentList
                :dataAttach="data"
                :displayIcon="false"
                :displayRemove="true"
              ></AttachDocumentList>
            </div>
            <ButtonCardAction
              @handle-correct="activePromptCorrect = true"
              @handle-give-back="activePromptGiveBack = true"
            ></ButtonCardAction>
          </vx-card>
        </div>
        <div class="flex w-full my-2">
          <vx-card>
            <div class="body-card p-2">
              <h4 class="text-title font-bold pb-4">Comentarios</h4>
              <div class="" v-for="(comments, index) in this.dataList" :key="index">
                <CommentChild :comment="comments.comment" :user="comments.username" :img="comments.image"></CommentChild>

                <div v-if="comments.child.length > 0" >
                  <CommentChild v-for="(child ,indexChild) in comments.child" :key="indexChild" :comment="child.comment" :user="child.user.name" :img="child.user.image"></CommentChild>
                </div>
              </div>
              <CommentResponse
                :avatarImg="avartarImage"
                :modelName="'assignments'"
                :modelId="id"
                :childrenId="this.commentId"
              ></CommentResponse>
              <!-- <ListInformation v-for="(posts, index) in this.dataList" :key="index" :data="posts" :componentDynamic="mountComponentComment" :componentDynamicProps="posts.comments"
            :modelProps="{modelId:id,childrenId:posts.id,modelName:'assignments'}" ></ListInformation> -->
              <!-- <div class="flex p-3 ml-2">
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
              </div> -->
              <!-- <div class="flex mb-3">
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
              </div> -->
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
        <div
          class="flex w-full my-2"
          v-for="(student, index) in this.assignment.students"
          :key="index"
        >
          <div v-if="student.assignmentstatus.id == 2">
            <CardAvatar
              :name="student.classroomstudents.student.name"
              :avatar="student.classroomstudents.student.user.image"
            ></CardAvatar>
          </div>
        </div>
      </div>

      <div class="vx-col" v-permission="['teacher']">
        <h2 class="font-bold text-title">Pendiente por Entregar</h2>
      </div>
      <div class="vx-row" v-permission="['teacher']">
        <div v-permission="['teacher']">
          <div
            class="flex w-full my-2"
            v-for="(student, index) in this.assignment.students"
            :key="index"
          >
            <CardAvatar
              :name="student.classroomstudents.student.name"
              v-if="student.assignmentstatus.id == 1"
              :avatar="student.classroomstudents.student.user.image"
            ></CardAvatar>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog Modal Button Corregir -->
    <vs-prompt
      @accept="correct"
      title="Corregir"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptCorrect"
    >
      <div class="vx-row">
        <div class="vx-col flex w-full">
          <vs-select
            label="Estado"
            class="mt-5 w-full"
            name="item-plan"
            v-validate="'required'"
          >
            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
            <vs-select-item value="1" text="Aprobado" />
          </vs-select>
        </div>
        <div class="vx-col flex w-full">
          <vs-input
            class="w-full"
            label-placeholder="Escribe un comentario"
            name="name"
            v-validate="'required'"
            :danger="errors.has('name')"
          />
        </div>
      </div>
    </vs-prompt>
    <!-- / Dialog Modal Button Corregir -->

    <!-- Dialog Modal Button Give Back -->
    <vs-prompt
      @accept="acceptGiveBack"
      title="Devolver"
      text="esta seguro de devolver?"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptGiveBack"
    >
    </vs-prompt>
    <!-- / Dialog Modal Button Give Back -->

    <!-- Dialog Modal Button Delete -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Asignación"
      text="esta seguro de eliminar?"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptDelete"
    >
    </vs-prompt>
    <!-- / Dialog Modal Button Delete -->

    <!-- Dialog Modal Button ReAsign -->
    <vs-prompt
      @accept="correctReAsign"
      title="ReAsignar"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptReAsign"
    >
      <div class="vx-row">
        <div class="vx-col flex w-full">
          <vs-select
            label="Reasignar a"
            class="mt-5 w-full"
            name="item-plan"
            v-validate="'required'"
          >
            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
            <vs-select-item value="1" text="todos los estudiantes" />
          </vs-select>
        </div>
      </div>
    </vs-prompt>
    <!-- / Dialog Modal Button ReAsign -->
  </div>
</template>

<script>

import CommentResponse from '../components/Posts/CommentResponse'
import ListIcon from '../components/icons/ListIcon'
import PencilAssignmentlIcon from '../components/icons/PencilAssignmentlIcon'
import CheckAssignmentIcon from '../components/icons/CheckAssignmentIcon'
import ListInformation from '../components/Posts/List'
import moment from 'moment'
import AttachDocumentList from '../components/SectionAttach/AttachDocumentList'
import ButtonCardAction from '../components/Buttons/ButtonCardAction'
import CardAvatar from '../components/Avatars/CardAvatar'
import { mapGetters } from 'vuex'
import ButtonDropDown from '../components/ButtonDropDown.vue'
import CommentChild from '../components/Posts/CommentChild'
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
    ButtonCardAction,
    ButtonDropDown,
    ListInformation,
    CommentResponse,
    CommentChild
  },
  data () {
    return {
      correct: false,
      acceptDelete: false,
      correctReAsign: false,
      acceptGiveBack: false,
      dataList:[],
      commentId:'',
      mountComponentComment: CommentResponse,
      activePromptReAsign: false,
      activePromptCorrect: false,
      activePromptGiveBack: false,
      activePromptDelete: false,
      // commentResponse: '',
      assignment: [],
      titleAssignment: 'Titulo Asignacion',
      documentData: [
        {
          id: 1,
          title: 'Numero Reales',
          type: 'PDF'
        },
        {
          id: 2,
          title: 'Numero Primos',
          type: 'Imagen'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      storeAssignment: 'assignment/getAssignmentDetail',
      storeComments: 'comment/getCommentsAssignment'
    }),

    avartarImage () {
      return this.$store.state.auth.authUser.image
    }
  },
  watch: {
    storeAssignment (data) {
      this.assignment = {}
      if (data) {
        this.assignment = {
          title: data.title,
          limitDate: this.formatDateTime(data.limit_date),
          description: data.description,
          assignmentType: data.assignmenttype.id,
          teacher: data.class.course.teacher.name,
          students: data.studentsassignment
        }
      }
      //console.log(this.assignment)
    },
    storeComments ({comments}) {
      const rows = []
      if (comments) {

        rows.push({
          comment: comments.comment,
          username:comments.username,
          image: comments.image,
          child:comments.child
        })
        this.commentId = comments.id.toString()
        this.dataList = rows
      }
      // const newData = Object.assign([], data)
      // newData.comments.map((element) => {

      //   rows.push({
      //     comment: element.comment,
      //     username:element.username,
      //     image: element.image,
      //     child: element.child
      //   })
      // })
      console.log(this.dataList)
      // }

    }
  },
  methods: {
    itemsDropdown () {
      return [
        {
          id: 1,
          title: 'Editar',
          action: this.editAssignment
        },
        {
          id: 2,
          title: 'Reasignar',
          action: this.reAssignAssignment
        },
        {
          id: 3,
          title: 'Eliminar',
          action: this.deleteAssignment
        }
      ]
    },

    deleteAssignment () {
      this.activePromptDelete = true
      console.log('eliminando')
    },
    editAssignment () {
      console.log('editAssignment')
    },
    reAssignAssignment () {
      this.activePromptReAsign = true
      console.log('reAssignAssignment')
    },
    getAssignment () {
      this.$store.dispatch('assignment/getMyAssignmentsDetailData', this.id)
    },
    getCommentsAssignment () {
      this.$store.dispatch('comment/getCommentByAssignmentData', this.id)
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM/YYYY hh:mm A')
    },
    renderIcon (type) {
      switch (type) {
      case 1: // Tasks
        return ListIcon
        break
      case 2: // Evaluations
        return CheckAssignmentIcon
        break
      case 3: // Work Practice
        return PencilAssignmentlIcon
        break
      }
    }
  },
  mounted () {
    this.getAssignment()
    this.getCommentsAssignment()
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
