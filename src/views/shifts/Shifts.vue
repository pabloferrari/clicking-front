<template>
<div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">Turnos</p>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <vs-prompt @accept="accept" :title="`${actionModal} Pais`" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePrompt" >
        <div class="con-exemple-prompt">
            <ShiftsCreate ref="ShiftsCreate" :isCreate="this.iscreated" :shift="this.shift" @close-modal="closeModal()"/>
        </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt @accept="acceptDelete" title="Elminar Turno" text="esta seguro de eliminar?" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePromptDelete">
    </vs-prompt>
    <!-- Modal -->

    <DataTable 
    :rowList="countries"
    :btnCreateShow="true"
    :btnCreateTitle="'Añadir Turno'"
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
import ShiftsCreate from './ShiftsCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'shifts',
  components: {
    ShiftsCreate,
    DataTable
  },
  data () {
    return {
      shiftsList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      shift: null,
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
            actionDelete: (id) => { this.idDeleted = id; this.showModalConfirm() }
          }
        },
        {
          headerName: 'id',
          field: 'id'
        },
        {
          headerName: 'Turno',
          field: 'name'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.shift = (!iscreated) ? this.shift : null
      this.actionModal = (iscreated) ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.shift = Object.assign({}, this.$store.state.shift.shifts.find(x => x.id === id))
    },
    accept () {
      this.activePrompt = true
      this.$refs.ShiftsCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('shift/deleteShift', this.idDeleted)
      this.idDeleted = null
    },
    getCountries () {
      this.$store.dispatch('shift/getShifts')
    },
    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.activePrompt = false
    }
  },
  mounted () {
    this.getCountries()
  },
  watch: {
    shifts (data) {
      this.rowData = data
    }
  },
  computed: {
    ...mapGetters({ countries: 'shift/getShifts' })
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
