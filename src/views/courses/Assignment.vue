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
          <!-- List Card Teacher-->
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
              <div class="">
                <div class="vx-row">
                  <!-- Cards -->
                  <div
                    class="bg-white p-2 rounded-2xl md:w-1/5 sm:w-1/5 lg:w-1/5 m-2 border-gray"
                    v-for="(data, index) in documentDataTeacher"
                    :key="index"
                  >
                    <div class="text-right">
                      <strong>{{ data.type }}</strong>
                    </div>

                    <p>
                      {{ data.url.toUpperCase().split(".")[1] }}
                    </p>

                    <br />
                    <div class="text-left">
                      <a :href="data.url" target="__blank">Ver Tarea</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vx-card>
        </div>
      </div>

      <div class="md:w-1/4 lg:1/2 sm:w-full xs:w-full">
        <div class="flex justify-end">
          <!-- List Card Student-->
          <vx-card>
            <h2 class="font-bold text-title pb-4">Trabajo</h2>
            <div class="" v-if="documentDataStudent.length > 0">
              <AttachDocumentCustomList
                v-for="(data, index) in documentDataStudent"
                :key="index"
                :dataAttach="data"
                :displayIcon="false"
                :assignmentStatus="assignmentStatus"
                :permission="rolUser"
                v-on:student-file-id="getFileStudentId"
              >
              </AttachDocumentCustomList>
            </div>
            <div class="text-center" v-else>No se encontraron resultados</div>

            <div class="vx-col w-full" v-permission="['student']" v-if="documentDataStudent.length == 0">
              <file-pond
                name="file"
                ref="file"
                class-name="my-pond"
                label-idle="Arrastrar y soltar aquí..."
                allow-multiple="true"
                instant-upload="false"
                v-on:updatefiles="handleFileUpload"
              />
            </div>

            <ButtonCardAction
              @handle-correct="activePromptCorrect = true"
              @handle-deliver="activePromptDeliver = true"
              @handle-give-back="activePromptGiveBack = true"
              :permission="rolUser"
              :assignmentStatus="parseInt(assignmentStatus)"
            ></ButtonCardAction>
          </vx-card>
        </div>
        <div class="flex w-full my-2">
          <vx-card>
            <div class="body-card p-2">
              <h4 class="text-title font-bold pb-4">Comentarios</h4>
              <div
                class=""
                v-for="(comments, index) in this.dataList"
                :key="index"
              >
                <CommentChild
                  :comment="comments.comment"
                  :user="comments.user.name"
                  :img="comments.user.image"
                ></CommentChild>

                <div v-if="comments.child.length > 0">
                  <CommentChild
                    v-for="(child, indexChild) in comments.child"
                    :key="indexChild"
                    :comment="child.comment"
                    :user="child.user.name"
                    :img="child.user.image"
                  ></CommentChild>
                </div>
              </div>
              <CommentResponse
                :avatarImg="avartarImage"
                :activeComment="
                  isStudent == 'student' ? true : this.activeCommentAssignment
                "
                :modelName="'assignments'"
                :modelId="id"
                :childrenId="this.commentId"
                :userStudentId="this.userStudentId"
              ></CommentResponse>
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
          <div
            v-if="
              student.assignmentstatus.id == 3 ||
              student.assignmentstatus.id === 2
            "
          >
            <CardAvatar
              :nameStatus="student.assignmentstatus.name"
              :idAssignmentStatus="student.assignmentstatus.id"
              :class="
                student.classroomstudents.student.user.id == activeClassCard
                  ? 'active-card'
                  : ''
              "
              @active-card="activeCard(student)"
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
              :class="
                student.classroomstudents.student.user.id == activeClassCard
                  ? 'active-card'
                  : ''
              "
              @active-card="activeCard(student)"
              class="active-card-assig"
              :name="student.classroomstudents.student.name"
              :nameStatus="student.assignmentstatus.name"
              :idAssignmentStatus="student.assignmentstatus.id"
              v-if="student.assignmentstatus.id === 1"
              :avatar="student.classroomstudents.student.user.image"
            ></CardAvatar>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog Modal Button Corregir -->
    <vs-prompt
      @accept="correctAssignment"
      title="Corregir"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptCorrect"
    >
      <AssignmentEvaluationProcess
        v-permission="['teacher']"
        ref="AssignmentEvaluationProcess"
        :assignmentId="parseInt(id)"
        :classRoomStudentId="classRoomStudentId"
        v-if="this.assignment.assignmentType === 2 || this.assignment.assignmentType === 3"
      ></AssignmentEvaluationProcess>
      <AssignmentTasksProcess
        ref="AssignmentTasksProcess"
        v-permission="['teacher']"
        :assignmentId="parseInt(id)"
        :classRoomStudentId="classRoomStudentId"
        v-if="this.assignment.assignmentType === 1"
      ></AssignmentTasksProcess>
    </vs-prompt>
    <!-- / Dialog Modal Button Corregir -->

    <!-- Dialog Modal Button Deliver-->
    <vs-prompt
      @accept="acceptDeliver"
      title="Entregar"
      text="esta seguro de entregar?"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptDeliver"
    >
    </vs-prompt>
    <!-- / Dialog Modal Button Deliver-->
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
      @accept="acceptDeleteAssignment"
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
            name="Reasignar"
            v-model="studentCorrectId"
            v-validate="'required'"
            :danger="errors.has('Reasignar')"
          >
            <vs-select-item key="" value="" text="seleccione un estudiante" />
            <vs-select-item
              v-for="(student, index) in this.studentCorrect"
              :key="index"
              :value="student.classroomstudents.id"
              :text="student.classroomstudents.student.name"
            />
          </vs-select>
        </div>

        <span class="text-danger text-sm" v-show="errors.has('Reasignar')">{{
          errors.first("Reasignar")
        }}</span>
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
import AttachDocumentCustomList from '../components/SectionAttach/AttachDocumentCustomList'
import ButtonCardAction from '../components/Buttons/ButtonCardAction'
import CardAvatar from '../components/Avatars/CardAvatar'
import { mapGetters } from 'vuex'
import ButtonDropDown from '../components/ButtonDropDown.vue'
import CommentChild from '../components/Posts/CommentChild'
import AssignmentEvaluationProcess from './AssignmentEvaluationProcess.vue'
import AssignmentTasksProcess from './AssignmentTasksProcess.vue'


import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

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
    AttachDocumentCustomList,
    ButtonCardAction,
    ButtonDropDown,
    ListInformation,
    CommentResponse,
    CommentChild,
    AssignmentEvaluationProcess,
    AssignmentTasksProcess,
    FilePond
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL_STORAGE,
      correct: false,
      acceptDelete: false,
      assignmentStatus: '',

      studentCorrectId: '',
      // acceptGiveBack: false,
      dataList: [],
      studentCorrect: [],
      file: [],
      commentId: '',
      userStudentId: '',
      mountComponentComment: CommentResponse,
      activePromptReAsign: false,
      activePromptDeliver: false,
      activePromptCorrect: false,
      activePromptGiveBack: false,
      activePromptDelete: false,
      activeCommentAssignment: false,
      activeClassCard:'',
      classRoomStudentId:'',
      // commentResponse: '',
      assignment: [],
      titleAssignment: 'Titulo Asignacion',
      documentDataStudent: [],
      documentDataTeacher: []
    }
  },
  computed: {
    ...mapGetters({
      storeAssignment: 'assignment/getAssignmentDetail',
      storeComments: 'comment/getCommentsAssignment',
      storeFileTeacher: 'assignment/setAssignmentFileTeacher',
      storeFileStudent: 'assignment/setAssignmentFileStudent'
      // storeComment: 'comment/getComments'
    }),

    avartarImage () {
      console.log(this.$store.state.auth.authUser)
      return this.$store.state.auth.authUser.image
    },
    userId () {
      return this.$store.state.auth.authUser.id
    },
    rolUser() {
      return this.$store.state.auth.authUser.roles[0].slug
    },
    isStudent () {
      return this.$store.state.auth.authUser.roles[0].slug
    }
  },
  watch: {

    storeAssignment (data) {
      this.assignment = {}


      if (data) {
        this.assignmentStatus = data.studentsassignment[0].assignmentstatus.id
        this.studentCorrect = data.studentsassignment.filter((e) => e.assignmentstatus.id ===3)
        this.assignment = {
          title: data.assignment.title,
          limitDate: this.formatDateTime(data.assignment.limit_date),
          description: data.assignment.description,
          assignmentType: data.assignment.assignmenttype.id,
          teacher: data.assignment.class.course.teacher.name,
          user_id: data.assignment.class.course.teacher.user_id,
          students: data.studentsassignment
        }
      }

    },
    storeFileTeacher (data) {
      this.documentDataTeacher = {}

      if (data) {
        this.documentDataTeacher = data
      }
    },
    storeFileStudent (data) {
      this.documentDataStudent = {}

      if (data) {
        this.documentDataStudent = data
      }
    },
    storeComments (comments) {
      const rows = []

      if (comments) {
        comments.map((element) => {

          rows.push({
            id: element.id,
            comment: element.comment,
            user: element.user,
            image: element.image,
            child: element.child
          })
          this.commentId = element.id.toString()
        })
      }
      this.dataList = rows
    }
  },
  methods: {
    getFileStudentId (id) {
      // console.log('return id hijo', id)
      this.setDeleteFileStudent(id)
    },
    setDeleteFileStudent (id) {

      const payload = {
        id,
        assignment_id: this.id,
        user_id: this.userId // students
      }

      this.$store
        .dispatch('assignment/deleteFileStudent', payload)
        .then(response => {
          console.log(response)
          //this.$emit('close-modal')
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleFileUpload (files) {
      this.file = files.map(files => files.file)
    },
    activeCard ({ classroomstudents,assignmentstatus }) {
      this.assignmentStatus = ''
    this.assignmentStatusSelected(assignmentstatus.id)
      this.commentId = ''
      this.activeCommentAssignment = true
      const params = {
        id: this.id,
        userId: classroomstudents.student.user.id
      }
      this.classRoomStudentId = classroomstudents.id
      this.activeClassCard = params.userId
      this.userStudentId = params.userId.toString()
      this.$store.dispatch('comment/getCommentByAssignmentData', params)
      this.getFileStudent(this.userStudentId)
    },

    assignmentStatusSelected(status) {
      this.assignmentStatus  = status
    },

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

    correctAssignment () {
      if (this.assignment.assignmentType === 1) {
        this.$refs.AssignmentTasksProcess.save()
      } else {
        this.$refs.AssignmentEvaluationProcess.save()
      }
    },

    deleteAssignment () {
      this.activePromptDelete = true


    },
    acceptDeleteAssignment () {
      this.$store.dispatch('assignment/deleteAssignment', this.id).then((result) => {
        if (result.deleted) {
          this.$router.push('/courses')
        }
      }).catch((err) => console.log(err))
      console.log('eliminando')
    },
    acceptGiveBack () {
      const payload = {
        score: 0,

        assignment_id: this.id,
        classroom_student_id: this.classRoomStudentId,
        assignment_status_id:1
      }

      this.$store
        .dispatch('assignment/createAssignmentStudent', payload)
        .then(response => {
          console.log(response)
          //this.$emit('close-modal')
        })
        .catch(err => {
          console.log(err)
        })
    },
    correctReAsign () {
      this.$validator.validateAll().then(result => {

        if (result) {
          const payload = {
            score: 0,
            assignment_id: this.id,
            classroom_student_id: this.studentCorrectId,
            assignment_status_id:1
          }
        this.$store
          .dispatch('assignment/createAssignmentStudent', payload)
          .then(response => {
            console.log(response)
            //this.$emit('close-modal')
          })
          .catch(err => {

            console.log(err)
          })
        }
      })

    },
    acceptDeliver () {
      const { classroomstudents } = this.assignment.students.find((element) => element.classroomstudents.student.user.id === this.userId)
      // const payload = {
      //   score: 0,
      //   assignment_id: this.id,
      //   classroom_student_id: classroomstudents.id,
      //   assignment_status_id:2
      // }

      const payload = new FormData()
      payload.append('score', 0)
      payload.append('assignment_id', this.id)
      payload.append('classroom_student_id', classroomstudents.id)
      payload.append('assignment_status_id', 2)
      //payload.append('user_id', '')

      //console.log('this.file ', this.file)

      for (let i = 0; i < this.file.length; i++) {
        const file = this.file[i]
        payload.append(`files[${i}]`, file)
      }

      this.$store
        .dispatch('assignment/createAssignmentStudentMultipartForm', payload)
        .then(response => {
          if (response) {
            this.$router.push('/courses')
          }
          // console.log(response)
          //this.$emit('close-modal')
        })
        .catch(err => {
          console.log(err)
        })
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
    getAssignmentDetailStudentByIdData () {
      this.$store.dispatch('assignment/getAssignmentDetailStudentByIdData', this.id)
    },
    getFileTeacher () {

      const payload = {
        id: this.id,
        user_id: this.assignment.user_id
      }
      this.$store.dispatch('assignment/getMyFileTeacherData', payload)
    },
    getFileStudent (userId) {
      const payload = {
        id: this.id,
        user_id: userId ? userId : this.userId
      }
      this.$store.dispatch('assignment/getMyFileStudentData', payload)
    },
    getCommentsAssignment () {
      // console.log(this.assignment)
      const params = {
        id: this.id,
        userId: ''
      }
      this.$store.dispatch('comment/getCommentByAssignmentData', params)
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
    this.getCommentsAssignment()
    this.getFileTeacher()
    if (this.$store.state.auth.authUser.roles[0].slug === 'student') {
      this.getFileStudent()
      this.getAssignmentDetailStudentByIdData()
    }else{

      this.getAssignment()
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
.body-card {
  background: #eef7fe;
}

.active-card-assig {
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card {
  border: solid 2px #567df4;
  outline: none;
}
.active-card-assig:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.text-title {
  color: #22215b;
}
/* div .border-gray{
  border: 1px solid #9f9c9c8c;
} */
div .border-gray {
  width: 100px;
  height: 100px;
  left: 339px;
  top: 506px;

  /* White */
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
div .border-gray p {
  position: relative;
  float: right;
  margin-right: 10px;

  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 140.1%;
  /* or 20px */
  color: rgba(34, 33, 91, 0.6);
}
div .border-gray a {
  margin-top: 20px;
  text-align: center;
  display: block;
}
</style>
