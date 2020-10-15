<template>
  <div id="countries">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Docentes</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`${actionModal} Docente`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <TeachersCreate
          ref="TeachersCreate"
          :isCreate="this.iscreated"
          :teachers="this.teacher"
          :turnList="this.turns"
          :commissionListData="this.commissions"
          :idEdit="this.idEdit"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptDelete"
      title="Elminar Docente"
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
      :btnCreateTitle="'Añadir Docente'"
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
import TeachersCreate from "./TeachersCreate.vue";
import { mapGetters } from "vuex";
import DataTable from "../components/DataTable";

export default {
  name: "teachers",
  components: {
    TeachersCreate,
    DataTable,
  },
  data() {
    return {
      rowData: [],
      teachersList: [],
      turns: null,
      commissions: null,
      activePrompt: false,
      activePromptDelete: false,
      actionModal: "",
      idEdit: null,
      idDeleted: null,
      iscreated: null,
      teacher: null,
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
          headerName: "Nombre Completo",
          field: "name",
        },
        {
          headerName: "Email",
          field: "email",
        },
        {
          headerName: "Turno",
          field: "turn",
        },
        {
          headerName: "Año",
          field: "year",
        },
        {
          headerName: "Comisión",
          field: "commission",
        },
      ],
    };
  },
  methods: {
    showModal(iscreated) {
      this.teacher = !iscreated ? this.teacher : null;
      this.actionModal = iscreated ? "Añadir" : "Editar";
      this.iscreated = iscreated;
      this.activePrompt = true;
    },
    showModalConfirm() {
      this.activePromptDelete = true;
    },
    getData(id) {
      this.idEdit = id;

      this.teacher = Object.assign(
        {},
        this.$store.state.teacher.teachers.find((x) => x.id === id)
      );
    },
    accept() {
      this.activePrompt = true;
      this.$refs.TeachersCreate.save();
    },
    acceptDelete() {
      this.$store.dispatch("teacher/deleteTeacher", this.idDeleted);
      this.idDeleted = null;
    },
    getteachers() {
      this.$store.dispatch("teacher/getTeachers");
    },
    getTurns() {
      this.$store.dispatch("turn/getTurns");
    },
    getComission() {
      this.$store.dispatch("commission/getCommissions");
    },
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },
    closeModal() {
      this.idEdit = null;
      this.activePrompt = false;
    },
  },
  mounted() {
    this.getteachers();
    this.getTurns();
    this.getComission();
  },
  watch: {
    teachers(data) {
      const teachersData = [];
      let cont = 0;
      const defaults = {
        turno: ''
      }
      data.map((elements,index) => {
        let turns
        let commissions
        elements.turns.forEach((t) => { turns = Object.assign({},t) })
        elements.commissions.forEach((c) => { commissions = Object.assign({},c) })


        teachersData.push({
          id:elements.id,
          name: elements.name,
          email: elements.email,
          phone: elements.phone,
          turn: turns.name,
          year: "",
          commission: commissions.name,
        });

        cont++;
      });

      this.rowData = teachersData;
    },

    storeTurns(data) {
      const institution_id = 1; // debe venir por props
      const turnInstitution = data.filter(
        (t) => t.institution.id === institution_id
      );
      this.turns = turnInstitution;
    },
    storeCommissions(data) {
      this.commissions = data;
    },
  },
  computed: {
    ...mapGetters({
      teachers: "teacher/getTeachers",
      storeTurns: "turn/getTurns",
      storeCommissions: "commission/getCommissions",
    }),
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
