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
    <vs-prompt @cancel="closeModal()" @close="closeModal()" @accept="accept"  :title="`${actionModal} Institución`" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePrompt" >
        <div class="con-exemple-prompt">
            <InstitutionsCreate ref="InstitutionsCreate" :isCreate="this.iscreated" :plansList="this.plans" :countriesList="this.countries" :institution="this.institution" :idEdit="this.idEdit" @close-modal="closeModal()"/>
        </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt @cancel="val = ''" @accept="acceptDelete" title="Elminar Institución" text="esta seguro de eliminar?" accept-text="Guardar" cancel-text="Cancelar" :active.sync="activePromptDelete">
    </vs-prompt>
    <!-- Modal -->

    <vx-card>
        <div class="flex flex-wrap justify-between items-center">
            <div class="w-1/6 mb-4 ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                        <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ rowData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : rowData.length }} of {{ rowData.length }}</span>
                        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                            <span>20</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                            <span>50</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                            <span>100</span>
                        </vs-dropdown-item>
                        <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                            <span>150</span>
                        </vs-dropdown-item>
                    </vs-dropdown-menu>
                </vs-dropdown>
            </div>
            <!-- Button Add -->
            <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
                <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Buscando..." />
                <div class="mb-4 md:mb-0">
                    <ButtonRight buttonTitle="Añadir Institución" @handler-click="showModal(true)" />
                </div>
            </div>
            <!-- Button Add -->
        </div>
        <ag-grid-vue 
          ref="agGridTable" 
          :gridOptions="gridOptions" 
          class="ag-theme-material w-full ag-grid-table" 
          :columnDefs="columnDefs" 
          :defaultColDef="defaultColDef" 
          :rowData="rowData" 
          rowSelection="multiple" 
          colResizeDefault="shift" 
          :animateRows="true" 
          :pagination="true" 
          :paginationAutoPageSize="true" 
          :suppressPaginationPanel="true"
          @first-data-rendered="onFirstDataRendered"
        >
        </ag-grid-vue>
        <vs-pagination :total="totalPages" :max="5" v-model="currentPage" />
    </vx-card>
</div>
</template>

<script>
import Vue from 'vue'

import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import { AgGridVue } from 'ag-grid-vue'
import ButtonRight from '../components/ButtonRight.vue'
import InputSearch from '../components/InputSearch.vue'
import ButtonEdit from '../components/cellRenderButtons/ButtonEdit'
import InstitutionsCreate from './InstitutionsCreate.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'institutions',
  components: {
    ButtonRight,
    InputSearch,
    AgGridVue,
    InstitutionsCreate,
    ButtonEdit
  },
  data () {
    return {
      searchQuery: '',
      val: '',
      close: false,
      acceptAlert: false,
      activePrompt: false,
      activePromptDelete: false,
      actionModal: '',
      idDeleted: null,
      iscreated: null,
      institution: null,
      countries: null,
      plans:null,
      rowData: [],
      gridApi: null,
      gridColumnApi: null,
      idEdit: null,
      gridOptions: {
        pagination: true,
        paginationPageSize: 5
      },
      columnDefs: [
        {
          headerName: 'Accion',
          field: 'id',
          cellRendererFramework: Vue.extend(ButtonEdit),
          cellRendererParams: {
            edit: (id) => {
              this.getData(id)
              this.showModal(false)
            },
            delete: (id) => {
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
        },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      components: {
        ButtonEdit
      }
    }
  },
  methods: {
    showModal (iscreated) {
      this.institution = (!iscreated) ? this.institution : null
      this.actionModal = (iscreated) ? 'Añadir' : 'Editar'
      this.iscreated = iscreated
      this.activePrompt = true
      this.idEdit = (!iscreated) ? this.idEdit : null
    },
    showModalConfirm () {
      this.activePromptDelete = true
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    getData (id) {
      this.idEdit = id
      this.institution = Object.assign({}, this.$store.state.institution.institutions.find(x => x.id === id))
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
    getPlans() {
        this.$store.dispatch('plan/getPlans')
    },
    getCities() {
        this.$store.dispatch('city/getCities')
    },
    getCountries() {
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
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
    this.getInstitutions()
    this.getPlans()
    this.getCountries()

    this.gridApi = this.gridOptions.api
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  },
  watch: {
    institutions(data) {
        let rows = []
        data.map((value) => {
            rows.push({
                id: value.id,
                name: value.name,
                email: value.email,
                students: 0,
                teachers: 0,
                course: 0,
                country: value.city.province.country.name
            })
        })
      this.rowData = rows
    },
    storeCountries(data){
        this.countries = data
    },
    storePlans(data){
        this.plans = data
    }
  },
  computed: {
    ...mapGetters({ institutions: 'institution/getInstitutions',storeCountries:'country/getCountries',storePlans:'plan/getPlans' }),
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 50
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
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
</style>
