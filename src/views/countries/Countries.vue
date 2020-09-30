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
            <vs-prompt
                @cancel="val = ''" 
                @close="close" 
                @accept="accept"
                title="Añadir Pais"
                accept="Guardar"
                cancel="Cancelar"
                :active.sync="activePrompt">
                <div class="con-exemple-prompt">
                    <CountriesCreate />
                </div>
            </vs-prompt>
        <!-- Modal -->

        <div class="vx-row p-5">
            <div class="w-full">
                <div class="flex mb-4">

                <!-- Button Search -->
                    <div class="w-1/2">
                        <div class="flex justify-start">
                        <InputSearch />
                        </div>
                    </div>
                <!-- Button Search -->

                <!-- Button Add -->
                    <div class="w-1/2">
                        <div class="flex justify-end">
                        <ButtonRight
                            buttonTitle="Añadir Paises"
                            @handler-click="showModal"
                        />
                        </div>
                    </div>
                <!-- Button Add -->
                </div>
            </div>
        </div>

        <vx-card>
            <ag-grid-vue
            
                ref="agGridTable"
                :gridOptions="gridOptions"
                class="ag-theme-material w-100 my-4 ag-grid-table"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                rowSelection="multiple"
                colResizeDefault="shift"
                :animateRows="true"
                :pagination="true"
                :paginationAutoPageSize="true"
                :suppressPaginationPanel="true"
            
            >
            </ag-grid-vue>
            <vs-pagination :total="totalPages" :max="5" v-model="currentPage" />
        </vx-card>
  </div>
</template>




<script>
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
import { AgGridVue } from "ag-grid-vue";

import ButtonRight from "../components/ButtonRight.vue";
import InputSearch from "../components/InputSearch.vue";
// import ModalDialogs from "../components/ModalDialogs.vue";
import CountriesCreate from "./CountriesCreate.vue";


import CountryService from '../../services/Countries'


export default {
  name: "countries",

  components: {
      ButtonRight,
      InputSearch,
      AgGridVue,
      CountriesCreate
  },

  data() {
     
    return {

        val:"",
        close:false,
        acceptAlert:false,
        activePrompt: false,

        rowData:[],
        gridApi: null,
        close: false,
        val: "",
        gridOptions: {
           pagination: true,

            // sets 10 rows per page (default is 100)
            paginationPageSize: 5,
        },
      columnDefs: [
    
        {
          headerName: "Pais",
          field: "name",
          width:400,
         
        },

        {
          headerName: "Codigo",
          field: "code",
            width:450,
        },
        
      ],
      defaultColDef: {
       
        sortable: true,
        resizable: true,
      
      },
    };
  
  },

  methods: {
      showModal() {
          this.activePrompt = true
 
      },
      accept() { 
         
        console.log('si')
      }
  },

  async beforeMount() {
       let countriesData = []
      try {
          countriesData = await CountryService.getAll();  
      } catch (error) {
          console.log(error)
      }
    this.rowData = countriesData.data.data
  },

  mounted() {
    this.gridApi       = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  computed: {


    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      },
    },
  },

  mounted() {
    this.gridApi = this.gridOptions.api;

    /* =================================================================
      NOTE:
      Header is not aligned properly in RTL version of agGrid table.
      However, we given fix to this issue. If you want more robust solution please contact them at gitHub
    ================================================================= */
    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector(
        ".ag-header-container"
      );
      header.style.left = `-${String(
        Number(header.style.transform.slice(11, -3)) + 9
      )}px`;
    }
  },



};
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