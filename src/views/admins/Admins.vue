<template>
  <div id="countries">
    <div id="form-model" v-if="!titleHide" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Admins</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Admins`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <AdminsCreate
          ref="AdminsCreate"
          :isCreate="this.iscreated"
          :admins="this.admin"
          :idEdit="this.idEdit"
          :institutionId="this.institutionID"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Admin"
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
      :btnCreateTitle="'Añadir Admin'"
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
import AdminsCreate from './AdminsCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'admins',
  props: {
    titleHide: Boolean,
    institutionID: String
  },
  components: {
    AdminsCreate,
    DataTable
  },
  data () {
    return {
      rowData: [],
      adminsList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idEdit: null,
      idDeleted: null,
      iscreated: null,
      admin: null,
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
          headerName: 'Año',
          field: 'year'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.admin = !iscreated ? this.admin : null
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.idEdit = id

      this.admin = Object.assign(
        {},
        this.$store.state.admin.admins.find((x) => x.id === id)
      )
    },
    accept () {
      this.activePrompt = true
      this.$refs.AdminsCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('admin/deleteAdmin', this.idDeleted)
      this.idDeleted = null
    },
    getadmins () {
      if (!this.institutionID) {
        this.$store.dispatch('admin/getAdmins')
      } else {
        this.$store.dispatch('admin/getAdminsByInstitution', this.institutionID)
      }
    },

    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.idEdit = null
      this.activePrompt = false
    }
  },
  mounted () {
    this.getadmins()
  },
  watch: {
    admins (data) {
      this.rowData = data
    }
  },
  computed: {
    ...mapGetters({
      admins: 'admin/getAdmins'
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
