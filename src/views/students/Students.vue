<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
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
            actionEdit: (id) => {

              this.getData(id)
              this.showModal(false)
            },
            buttonDelete: true,
            actionDelete: (id) => {
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
        this.$store.state.student.students.find((x) => x.id === id)
      )
      console.log(this.student)
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
      this.$store.dispatch('student/getStudents')
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
      data.map((e) => {
        studentData.push({
          id:e.id,
          name:e.name,
          active:e.active,
          email:(e.user) ? e.user.email : ''
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
