<template>
  <div class="collapse-body">
    <div class="w-full backgroud-internal mx-10 my-3 mt-3">
      <div class="grid grid-cols-3 divide-x divide-gray-400">
        <div class="">
          <div class="flex content-between">
            <div
              class="m-6 p-2 rounded-full bg-white"
              v-permission="['teacher', 'student']"
            >
              <ListIcon
                v-if="dataCollapseBody.assignmenttype.id == 1"
              ></ListIcon>
              <CheckAssignmentIcon
                v-if="dataCollapseBody.assignmenttype.id == 2"
              >
              </CheckAssignmentIcon>
              <PencilAssignmentlIcon
                v-if="dataCollapseBody.assignmenttype.id == 3"
              ></PencilAssignmentlIcon>
            </div>
            <div class="w-2/3 px-4 py-4">
              <p class="m-2">
                {{ dataCollapseBody.assignmenttype.name }}
              </p>
              <h4 class="text-title font-bold">
                {{ dataCollapseBody.title }}
              </h4>
            </div>
          </div>
        </div>
        <div class="grid justify-items-center">
          <div class="w-2/3 p-6">
            <p class="text-center">
              {{ this.formatDateTime(dataCollapseBody.limit_date) }}
            </p>
          </div>
        </div>
        <div class="grid justify-items-end">
          <div class="w-2/6 p-4">
            <div class="rounded-full h-10 p-4">
              <vs-chip class="bg-white">
                <feather-icon
                  :icon="this.renderIcons(1)"
                  svgClasses="h-5 w-8 text-red"
                >
                </feather-icon>
                <p class="text-center text-red font-bold">
                  {{ messageStatus(1) }}
                </p>
              </vs-chip>

          <div class="mb-2 p-1" v-if=" dataCollapseBody.assignmenttype.group_enabled ===1">
            <ButtonDropDown :dataSelected="[]" :items="this.dataDropDown(dataCollapseBody)"></ButtonDropDown>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- START MODAL -->
        <vs-prompt
            @accept="saveGroup"
            title="Armar Grupos"
            cancel-text="Cancelar"
            accept-text="Crear"
            :active.sync="itemOne"
        >

            <div
                  class=""
                  v-for="i in this.form.groupqty"
                  :key="i"
              >
              <label class="typo__label">Grupo {{i}}</label>
              <multiselect
                  @select="addTagMultiSelect"
                  @remove="removeTagMultiSelect"
                  v-model="form.student_id[i]"
                  :options="dataStudentsList"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="'Asignar Alumnos ' + i"
                  label="name"
                  track-by="id"
                  selectLabel="Seleccionar"
                  deselectLabel="Quitar"
                  >
              </multiselect>
              <br />
          </div>
        </vs-prompt>

  </div>
</template>

<script>
import moment from 'moment'
import ButtonDropDown from './ButtonDropDown'
import ListIcon from '../components/icons/ListIcon'
import PencilAssignmentlIcon from '../components/icons/PencilAssignmentlIcon'
import CheckAssignmentIcon from '../components/icons/CheckAssignmentIcon'
import Multiselect from 'vue-multiselect'

export default {
  name: 'CollapseBody',
  components: {
    ListIcon,
    PencilAssignmentlIcon,
    CheckAssignmentIcon,
    ButtonDropDown,
    Multiselect
  },
  props: {
    dataCollapseBody: Object,
    studentsList: null
  },
  data () {
    return {
      itemOne: false,
      dataStudentsList: [],
      dataResult: [],
      form: {
        assignmentId: null,
        groupqty: this.dataCollapseBody.groupqty,
        student_id: []
      }
    }
  },
  // watch : {
  //   studentsList () {
  //     this.studentsList.students.map(element => {
  //       this.dataStudentsList.push(
  //         {
  //           id: element.id,
  //           name: element.student.name
  //         }
  //       )
  //     })
  //     console.log('dataStudentsList', this.dataStudentsList)
  //   }
  // },

  // watch : {
  //   assignmentGroup (data) {
  //     this.form.student_id = data
  //   }
  // },
  methods: {
    getAssignmentGroupByAssignment (id) {
      this.$store.dispatch('assignmentGroup/getAssignmentGroupByAssignment', id).then((response) => {
        this.form.student_id = response
      })
    },
    addTagMultiSelect (searchQuery) {
      console.log('Add tagMultiSelect', searchQuery)
      console.log('id', searchQuery.id)
      console.log('name', searchQuery.name)
    },
    removeTagMultiSelect (searchQuery) {
      console.log('Remove tagMultiSelect', searchQuery)
      console.log('id', searchQuery.id)
      console.log('name', searchQuery.name)
    },
    LoadstudentsList () {
      this.studentsList.students.map(element => {
        this.dataStudentsList.push(
          {
            id: element.id,
            name: element.student.name
          }
        )
      })
      //console.log('dataStudentsList', this.dataStudentsList)
    },
    saveGroup () {
      // this.form.student_id.map((element, index) => {
      //   console.log('Grupo', index)
      // })
      const payload = this.form
      this.$store.dispatch('assignmentGroup/createAssignmentGroup', payload)
      //console.log('Save Group', payload)
    },
    dataDropDown (data) {
      //console.log(data)
      return   [
        {
          id:data.id,
          title:'Crear Grupos',
          action: this.showModalGroup
        }
      ]
    },
    showModalGroup (data) {
      this.form.student_id = []
      this.form.assignmentId = data.target.dataset.id
      this.itemOne = true

      this.dataStudentsList = []

      this.LoadstudentsList()
      this.getAssignmentGroupByAssignment(this.form.assignmentId)
      // console.log(this.dataResult )
      //console.log(this.assignmentGroup)
      //this.form.student_id = this.assignmentGroup
      //console.log(data)
      // console.log('assignmentId', assignmentId)
      // console.log('groupqty', this.groupqty)
    },
    messageStatus () {
      return 'Pendiente'
    },
    renderIcons () {
      // switch (status) {
      // case 1:
      //   return 'ClockIcon'
      //   break
      // default:
      //   break
      // }
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM/YYYY hh:mm A')
    }
  },
  mounted () {

  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
