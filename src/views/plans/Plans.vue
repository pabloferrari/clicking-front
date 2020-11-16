<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Planes</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Plan`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <PlansCreate
          ref="PlansCreate"
          :isCreate="this.iscreated"
          :plan="this.plan"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Plan"
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
      :btnCreateTitle="'Añadir Plan'"
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
import PlansCreate from './PlansCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'plans',
  components: {
    PlansCreate,
    DataTable
  },
  data () {
    return {
      rowData: [],
      plansList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      plan: null,
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
          headerName: 'Estatus',
          field: 'activeText'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.plan = !iscreated ? this.plan : null
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.plan = Object.assign(
        {},
        this.$store.state.plan.plans.find((x) => x.id === id)
      )
    },
    accept () {
      this.activePrompt = true
      this.$refs.PlansCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('plan/deletePlan', this.idDeleted)
      this.idDeleted = null
    },
    getPlans () {
      this.$store.dispatch('plan/getPlans')
    },
    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.activePrompt = false
    }
  },
  mounted () {
    this.getPlans()
  },
  watch: {
    plans (data) {
      this.rowData = data
    }
  },
  computed: {
    ...mapGetters({ plans: 'plan/getPlans' })
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
