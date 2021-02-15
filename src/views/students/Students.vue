<template>
  <div id="countries">
    <div
      id="form-model"
      v-if="!titleHide"
      class="grid-layout-container alignment-block"
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Alumno</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Alumno`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <StudentsCreate
          ref="StudentsCreate"
          :institutionId="this.institutionID"
          :isCreate="this.iscreated"
          :student="this.student"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Alumno"
      text="esta seguro de eliminar?"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePromptDelete"
    >
    </vs-prompt>
    <!-- Modal -->

    <DataTable
      :rowList="rowData"
      :btnCreateShow="true"
      :btnCreateTitle="'Añadir Alumno'"
      :btnCreateIcon="'icon-plus'"
      :btnCreateIconPack="'feather'"
      @create-action="showModal(true)"
      :columns="columnDefs"
      ref="dataTable"
    >
    </DataTable>
  </div>
</template>

<script>
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import StudentsCreate from './StudentsCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'students',
  props: {
    titleHide: Boolean,
    institutionID: String
  },
  components: {
    StudentsCreate,
    DataTable
  },
  data () {
    return {
      rowData: [],

      teachersList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      student: null,
      columnDefs: [
        {
          headerName: 'Acciones',
          field: 'id',
          type: 'actionColumn',
          cellRendererParams: {
            buttonSearch: false,
            // actionSearch: (id) => { /** action **/ },
            buttonEdit: true,
            actionEdit: id => {
              this.getData(id)
              this.showModal(false)
            },
            buttonDelete: true,
            actionDelete: id => {
              this.idDeleted = id
              this.showModalConfirm()
            }
          }
        },
        {
          headerName: 'Nombre Completo',
          field: 'name'
        },
        {
          headerName: 'Email',
          field: 'email'
        },
        {
          headerName: 'Turno',
          field: 'turn'
        },

        {
          headerName: 'Comisión',
          field: 'commission'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.student = !iscreated ? this.student : null
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.student = Object.assign(
        {},
        this.$store.state.student.students.find(x => x.id === id)
      )
    },
    accept () {
      this.activePrompt = true
      this.$refs.StudentsCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('student/deleteStudent', this.idDeleted)
      this.idDeleted = null
    },
    getStudents () {
      if (!this.institutionID) {
        this.$store.dispatch('student/getStudents')
      } else {
        this.$store.dispatch(
          'student/getStudentsByInstitution',
          this.institutionID
        )
      }
    },

    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.activePrompt = false
    }
  },
  mounted () {
    this.getStudents()
  },
  watch: {
    students (data) {
      const studentData = []
      data.map(e => {
        studentData.push({
          id: e.id,
          name: e.name,
          active: e.active,
          email: e.email
        })
      })
      this.rowData = studentData
    }
  },
  computed: {
    ...mapGetters({ students: 'student/getStudents' })
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
