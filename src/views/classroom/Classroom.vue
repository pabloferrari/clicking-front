<template>
  <div id="classroom">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Salones</p>
      </div>
    </div>

    <CardWelcome :cardsWelcome="this.cardsWelcome" >
    </CardWelcome>

    <!-- Modal Create -->
    <div
      class="flex flex-wrap justify-end mt-1 data-list-btn-container"
      @click="popupActive = true"
    >
      <vs-button
        color="primary"
        size="small"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        >Crear Salón</vs-button
      >
    </div>

    <!-- <ModalSection ModalTitle="" :action="popupActive" :children="this.children" v-bind="propsChildren"></ModalSection> -->


    <vs-popup title="" :active.sync="popupActive">

      <ClassroomForm title="Crear Salón"></ClassroomForm>

    </vs-popup>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Salones" @click="getClassrooms()">
          <div class="tab-content-courses">
            <div>
              <CardList
                :cardData="this.classroom"
                description=" Alumnos cursando"
              >
              </CardList>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <CardList
                :cardData="this.workshop"
                description=" Alumnos cursando"
              >
              </CardList>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>

  </div>
</template>

<script>
import CardWelcome from "../components/CardWelcome";
import CardList from "../components/CardList";

import CourseLogo from "../components/icons/CourseLogo";
import PencilLogo from "../components/icons/PencilLogo";
import CheckLogo from "../components/icons/CheckLogo";
import DocumentLogo from "../components/icons/DocumentLogo";
import SchoolIcon from "../components/icons/SchoolIcon";
import AppleIcon from "../components/icons/AppleIcon";

import Tabs from '../components/Tabs'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import ClassroomForm from './ClassroomForm'

import AvatarList from "../components/AvatarList";
import vSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  name: "classroom",
  components: {
    CardWelcome,
    CourseLogo,
    CardList,

    SchoolIcon,
    AppleIcon,
    ClassroomForm,
    AvatarList,
    "v-select": vSelect,
  },
  props: {
    shiftsList: null,
    institutionsList: null,
  },

  methods: {
    getClassrooms() {
      const userAuth = localStorage.userAuth;
      const parseJson = JSON.parse(userAuth);
      this.$store.dispatch(
        "classroom/getClassroomsData",
        parseJson.institution_id
      );
    },
  },
  watch: {
    classrooms(data) {
      const classroomsData = [];
      data.map((element, index) => {
        classroomsData.push({
          title: element.name,
          subtitle: `${element.courses_count} Cursos - ` + element.shift.name,
          buttonTitle: "Ir a salon",
          path: "/classroom/" + element.name.split(" ").join("-"),
          avatarData: element.classroom_students,
        });
      });

      this.classroom = classroomsData;
    },
  },
  computed: {
    ...mapGetters({ classrooms: "classroom/getClassrooms" }),
  },

  mounted() {
    this.getClassrooms();
  },
  data () {
    return {
      description: 'Cursando',
      popupActive: false,
      users: [
        {
          id: 1,
          name: "Curso",
          username: "Bret",
          email: "Matemática",
          website: "Laura Perez",
        },
        {
          id: 2,
          name: "Examén",
          username: "Antonette",
          email: "Ingles",
          website: "Claudia Colmenarez",
        },
        {
          id: 3,
          name: "Taller",
          username: "Samantha",
          email: "Ciencias",
          website: "Berta Gomez",
        },
      ],
      selected: [],
      options: ["Daniel", "Nestor", "Oscar", "Gregorio", "Pablo"],
      form: {
        id: null,
        dataShifts: "",
        dataInstitutions: "",
      },
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: "Salones",
          count: 10,
        },
        {
          icon: SchoolIcon,
          title: "Alumnos",
          count: 106,
        },
        {
          icon: AppleIcon,
          title: "Docentes",
          count: 11,
        },
      ],
      classroom: null,
      course: [
        {
          title: "4A-Comisión A",
          subtitle: "2 Cursos - Turno Mañana",
          buttonTitle: "Ir al salón",
          path: "/classroom/4A-Comisión-A",
        },
        {
          title: "4B-Comisión B",
          subtitle: "5 Cursos - Turno Tarde",
          buttonTitle: "Ir al salón",
          path: "/classroom/4B-Comisión-B",
        },
        {
          title: '4C-Comisión C',
          subtitle: '1 Cursos - Turno Mañana',
          buttonTitle: 'Ir al salón',
          path: '/classroom/4C-Comisión-C'
        }
      ],
      workshop: [
        {
          title: "4A-Comisión A",
          subtitle: "2 Talleres - Turno Mañana",
          buttonTitle: "Ir a taller",
        },
        {
          title: "4B-Comisión B",
          subtitle: "4 Talleres - Turno Tarde",
          buttonTitle: "Ir a taller",
        },
      ],
      tabs: [
        {
          title: "Salones",
        },
        {
          title: "Talleres",
        },
      ],
    };
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

<style lang="css">
  .con-vs-popup .vs-popup {
    width: 800px !important;
  }
  .btn-right {
    position: absolute;
    right: 1rem;
    z-index: 999;
  }
</style>
