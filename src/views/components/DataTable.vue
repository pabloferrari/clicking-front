<!-- =========================================================================================
    File Name: AgGridTable.vue
    Description: Ag Grid table
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <vx-card>
      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">
        <!-- ITEMS PER PAGE -->
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer" :disabled="rowList.length == 0">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ rowList.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : rowList.length }} of {{ rowList.length }}</span>
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

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-input class="mb-4 md:mb-0 mr-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Buscar..." />
          <vs-button v-if="btnCreateShow" class="mb-4 md:mb-0" :icon="btnCreateIcon" :icon-pack="btnCreateIconPack" @click="$emit('create-action')" >{{btnCreateTitle}}</vs-button>
        </div>
      </div>
      <ag-grid-vue
        ref="agGridTable"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columns"
        :defaultColDef="defaultColDef"
        :rowData="rowList"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :pagination="true"
        :columnTypes="columnTypes"
        :overlayLoadingTemplate="overlayLoadingTemplate"
        :overlayNoRowsTemplate="overlayNoRowsTemplate"  
        :suppressDragLeaveHidesColumns="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage" />
    </vx-card>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import Vue from 'vue'
import ButtonGroup from './ButtonGroup'

export default {
  name: 'DataTable',
  props: {
    rowList: null,
    btnCreateShow: Boolean,
    btnCreateTitle: '',
    btnCreateIcon: '',
    btnCreateIconPack: '',
    columns: null
  },
  components: {
    AgGridVue,
    ButtonGroup
  },
  data () {
    return {
      searchQuery: '',
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      overlayLoadingTemplate: `<div class="vx-row w-full">
    <span class="w-full"><h2 class="text-grey">No hay resultados</h2></span>
</div>`,
      overlayNoRowsTemplate: `<div class="vx-row w-full">
    <span class="w-full"><h2 class="text-grey">No hay resultados</h2></span>
</div>`,
      defaultColDef: {
        rowDrag: false,
        sortable: false,
        editable: false,
        resizable: false,
        suppressMenu: false,
        suppressMovable: true
      },
      columnTypes: {
        'actionColumn': {
          cellRendererFramework: Vue.extend(ButtonGroup),
          cellRendererParams: {
            buttonSearch: false,
            buttonEdit: false,
            buttonDelete: false
          }
        }
      }
    }
  },
  watch: {
    '$store.state.windowWidth' (val) {
      this.sizeToFit()
      console.log(val)
      if (val <= 576) {
        this.maxPageNumbers = 4
        this.gridOptions.columnApi.setColumnPinned('id', null)
      } else this.gridOptions.columnApi.setColumnPinned('id', 'left')
    }
  },
  computed: {
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
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    sizeToFit () {
      this.gridApi.sizeColumnsToFit()
    },
    onBtShowLoading () {
      this.gridApi.showLoadingOverlay()
    },
    onBtHide () {
      this.gridApi.hideOverlay()
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.sizeToFit()
    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  }
}

</script>

<style>
.ag-pivot-off .ag-header-cell-label {
    color: #22215B;
    font-style: normal;
    font-weight: 600;
}
</style>