<template>
<div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">Paises</p>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <vs-prompt @accept="accept" :title="`${actionModal} Pais`" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePrompt" >
        <div class="con-exemple-prompt">
            <CountriesCreate ref="CountriesCreate" :isCreate="this.iscreated" :country="this.country" @close-modal="closeModal()"/>
        </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt @accept="acceptDelete" title="Elminar Pais" text="esta seguro de eliminar?" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePromptDelete">
    </vs-prompt>
    <!-- Modal -->

    <DataTable 
    :rowList="countries"
    :btnCreateShow="true"
    :btnCreateTitle="'Añadir Paises'"
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
import CountriesCreate from './CountriesCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'countries',
  components: {
    CountriesCreate,
    DataTable
  },
  data () {
    return {
      countriesList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      country: null,
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
          headerName: 'Pais',
          field: 'name'
        },
        {
          headerName: 'Codigo',
          field: 'code'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.country = (!iscreated) ? this.country : null
      this.actionModal = (iscreated) ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.country = Object.assign({}, this.$store.state.country.countries.find(x => x.id === id))
    },
    accept () {
      this.activePrompt = true
      this.$refs.CountriesCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('country/deleteCountry', this.idDeleted)
      this.idDeleted = null
    },
    getCountries () {
      this.$store.dispatch('country/getCountries')
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
    countries (data) {
      this.rowData = data
    }
  },
  computed: {
    ...mapGetters({ countries: 'country/getCountries' })
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
