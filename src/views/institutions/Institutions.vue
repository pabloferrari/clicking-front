<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Institución</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Institución`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <InstitutionsCreate
          ref="InstitutionsCreate"
          :isCreate="this.iscreated"
          :countriesList="this.storeCountries"
          :plansList="this.storePlans"
          :institution="this.institution"
          :idEdit="this.idEdit"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Institución"
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
      :btnCreateTitle="'Añadir Institución'"
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
import DataTable from '../components/DataTable'
import InstitutionsCreate from './InstitutionsCreate.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'institutions',
  components: {
    DataTable,

    InstitutionsCreate
  },
  data () {
    return {
      idDeleted: null,
      iscreated: null,
      institution: null,
      countries: null,
      idEdit: null,
      plans: null,
      rowData: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
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
          headerName: 'Nombre',
          field: 'name'
        },
        {
          headerName: 'Email',
          field: 'email'
        },
        {
          headerName: 'Alumnos',
          field: 'students'
        },
        {
          headerName: 'Docentes',
          field: 'teachers'
        },
        {
          headerName: 'Cursos',
          field: 'course'
        },
        {
          headerName: 'Pais',
          field: 'country'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.institution = !iscreated ? this.institution : null
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
      this.idEdit = !iscreated ? this.idEdit : null
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },

    getData (id) {
      this.idEdit = id
      this.institution = Object.assign(
        {},
        this.$store.state.institution.institutions.find((x) => x.id === id)
      )

    },
    accept () {
      this.activePrompt = true
      this.$refs.InstitutionsCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('institution/deleteInstitution', this.idDeleted)
      this.idDeleted = null
    },
    getInstitutions () {
      this.$store.dispatch('institution/getInstitutions')
    },
    getPlans () {
      this.$store.dispatch('plan/getPlans')
    },
    getCities () {
      this.$store.dispatch('city/getCities')
    },
    getCountries () {
      this.$store.dispatch('country/getCountries')
    },
    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.iscreated = false
      this.activePrompt = false
      this.idEdit = null
    }
  },
  mounted () {
    this.getInstitutions()
    this.getPlans()
    this.getCountries()
  },
  watch: {
    institutions (data) {
      const rows = []
      data.map((value) => {

        console.log(value);
        rows.push({
          id: value.id,
          name: value.name,
          email: value.email,
          students: value.students,
          teachers: value.teachers,
          course: value.courses,
          country: value.city.province.country.name
        })
      })
      this.rowData = rows
    },
    storeCountries (data) {
      this.countries = data
    },
    storePlans (data) {
      this.plans = data
    }
  },
  computed: {
    ...mapGetters({
      institutions: 'institution/getInstitutions',
      storeCountries: 'country/getCountries',
      storePlans: 'plan/getPlans'
    })
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
