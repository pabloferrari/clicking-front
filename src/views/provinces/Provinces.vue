<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Provincias</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Provincia`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <ProvincesCreate
          ref="ProvincesCreate"
          :isCreate="this.iscreated"
          :province="this.province"
          :countriesList="this.countries"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Provincia"
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
      :btnCreateTitle="'Añadir Provincia'"
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
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
import ProvincesCreate from "./ProvincesCreate.vue";
import { mapGetters } from "vuex";
import DataTable from "../components/DataTable";

export default {
  name: "provinces",
  components: {
    ProvincesCreate,
    DataTable,
  },
  data() {
    return {
      rowData: [],
      provincesList: [],
      activePrompt: false,
      activePromptDelete: false,
      actionModal: "",
      idDeleted: null,
      iscreated: null,
      province: null,
      countries: null,
      columnDefs: [
        {
          headerName: "Acciones",
          field: "id",
          type: "actionColumn",
          cellRendererParams: {
            buttonSearch: false,
            // actionSearch: (id) => { /** action **/ },
            buttonEdit: true,
            actionEdit: (id) => {
              this.getData(id);
              this.showModal(false);
            },
            buttonDelete: true,
            actionDelete: (id) => {
              this.idDeleted = id;
              this.showModalConfirm();
            },
          },
        },
        {
          headerName: "Nombre",
          field: "name",
        },
        {
          headerName: "ISO 31662",
          field: "iso31662",
        },
        {
          headerName: "País",
          field: "country",
        },
      ],
    };
  },
  methods: {
    showModal(iscreated) {
      this.province = !iscreated ? this.province : null;
      this.actionModal = iscreated ? "Añadir" : "Editar";
      this.iscreated = iscreated;
      this.activePrompt = true;
    },
    showModalConfirm() {
      this.activePromptDelete = true;
    },
    getData(id) {
      this.province = Object.assign(
        {},
        this.$store.state.province.provinces.find((x) => x.id === id)
      );
    },
    accept() {
      this.activePrompt = true;
      this.$refs.ProvincesCreate.save();
    },
    acceptDelete() {
      this.$store.dispatch("province/deleteProvince", this.idDeleted);
      this.idDeleted = null;
    },
    getProvinces() {
      this.$store.dispatch("province/getProvinces");
    },
    getCountries () {
      this.$store.dispatch('country/getCountries')
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },
    closeModal() {
      this.activePrompt = false;
    },
  },
  mounted() {
    this.getProvinces();
    this.getCountries()
  },
  watch: {
    provinces(data) {
      const rows = []
      data.map((value) => {
        rows.push({
          id: value.id,
          name: value.name,
          iso31662: value.iso31662,
          country: value.country.name
        })
      })
      this.rowData = rows
    },
    storeCountries (data) {
      this.countries = data
    },
  },
  computed: {
    ...mapGetters({ provinces: "province/getProvinces", storeCountries:'country/getCountries' }),
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
