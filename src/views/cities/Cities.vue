<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Ciudades</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Ciudad`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <CitiesCreate
          ref="CitiesCreate"
          :isCreate="this.iscreated"
          :city="this.city"
          :countriesList="this.countries"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Ciudad"
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
      :btnCreateTitle="'Añadir Ciudad'"
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
import CitiesCreate from './CitiesCreate.vue'
import { mapGetters } from 'vuex'
import DataTable from '../components/DataTable'

export default {
  name: 'cities',
  components: {
    CitiesCreate,
    DataTable
  },
  data () {
    return {
      rowData: [],
      citiesList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      city: null,
      countries: null,
      provinces: null,
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
          headerName: 'Código Postal',
          field: 'zip_code'
        },
        {
          headerName: 'Provincia',
          field: 'province'
        },
        {
          headerName: 'País',
          field: 'country'
        }
      ]
    }
  },
  methods: {
    showModal (iscreated) {
      this.city = !iscreated ? this.city : null
      this.actionModal = iscreated ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    getData (id) {
      this.city = Object.assign(
        {},
        this.$store.state.city.cities.find((x) => x.id === id)
      )
    },
    accept () {
      this.activePrompt = true
      this.$refs.CitiesCreate.save()
    },
    acceptDelete () {
      this.$store.dispatch('city/deleteCity', this.idDeleted)
      this.idDeleted = null
    },
    getCities () {
      this.$store.dispatch('city/getCities')
    },
    getCountries () {
      this.$store.dispatch('country/getCountries')
    },
    getProvinces () {
      this.$store.dispatch('province/getProvinces')
    },
    onFirstDataRendered (params) {
      params.api.sizeColumnsToFit()
    },
    closeModal () {
      this.activePrompt = false
    }
  },
  mounted () {
    this.getCities()
    this.getCountries()
    this.getProvinces()
  },
  watch: {
    cities (data) {
      const rows = []
      data.map((value) => {
        rows.push({
          id: value.id,
          name: value.name,
          zip_code: value.zip_code,
          province: value.province.name,
          country: value.province.country.name
        })
      })
      this.rowData = rows
    },
    storeCountries (data) {
      this.countries = data
    },
    storeProvinces (data) {
      this.provinces = data
    }
  },
  computed: {
    ...mapGetters({ cities: 'city/getCities', storeCountries:'country/getCountries', storeProvinces:'province/getProvinces' })
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
