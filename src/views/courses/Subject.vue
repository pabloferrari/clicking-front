<template>
  <div class="subjects">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ subject }}</p>
      </div>
    </div>

    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <div class="flex flex-wrap justify-end mt-1">
      <ButtonDropDownVue
        class="btn-right button-dropdown"
        v-show="dropdown"
        title="Crear"
        itemOne="Crear Clase"
        :items="this.items"
        v-model="popupCreate"
      ></ButtonDropDownVue>
    </div>

    <!-- START MODAL -->
    <vs-popup title="Crear Clase" :active.sync="itemOne" >

    </vs-popup>

    <vs-popup title="Crear Tarea Práctica" :active.sync="itemTwo">

    </vs-popup>

     <vs-popup title="Crear Éxamen" :active.sync="itemThree">

    </vs-popup>
    <!-- END MODAL -->

    <div class="mt-0">
      <vs-tabs v-model="tab.value">
        <vs-tab label="Muro" v-on="clickTag(tab.value)">
          <div class="tab-content-wall">
            <Wall></Wall>
            <WallComment></WallComment>
          </div>
        </vs-tab>
        <vs-tab label="Clases">
          <div class="tab-content-classes">
            <div>
              <Collapse :classesList="this.classesList"></Collapse>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>

</template>

<script>
import Wall from "../components/Wall";
import WallComment from "../components/WallComment";
import Collapse from "../components/Collapse";
import CardWelcome from "../components/CardWelcome";
import ButtonDropDownVue from "../components/ButtonDropDown.vue";
import { mapGetters } from "vuex";
export default {
  name: "Subject",
  components: {
    Wall,
    WallComment,
    CardWelcome,
    Collapse,
    ButtonDropDownVue,
  },
  props: {
    subject: String,
    value: false
  },
  methods: {
    clickTag(e) {
      this.dropdown = e !== 0;
    },

    getCourseClass() {
      this.$store.dispatch("courseClass/getCourseClassesData");
    },
  },

  mounted() {
    this.getCourseClass();
  },

  computed: {
    ...mapGetters({ storeCoursesClass: "courseClass/getCourseClasses" }),
  },

  watch: {
    storeCoursesClass(data) {
      const courseClassData = [];
      data.map((element) => {
        courseClassData.push({
          id: element.id,
          title: element.title,
          description: element.description,
          assignments: element.assignments,
        });
      });
      this.classesList = courseClassData;
      // console.log(courseClassData);
    },
  },
  watch: {
    popupCreate: function() {
      if( this.popupCreate == 'itemOne' ) {
        this.itemOne = !this.itemOne
      }else if(this.popupCreate == 'itemTwo'){
        this.itemTwo = !this.itemTwo
      }else if(this.popupCreate == 'itemThree'){
        this.itemThree = !this.itemThree
      }
      console.log('Actualizado')
    },
  },
  data() {
    return {
      console,
      dropdown: true,
      popupCreate: false,
      itemOne: false,
      itemTwo: false,
      itemThree: false,
      items: [
        {
          id: 1,
          title: "Crear Tarea Practica",
          action: "itemTwo",
        },
        {
          id: 2,
          title: "Crear Examen",
          action: "itemThree",
        },
      ],

      tab: {
        value: 1,
      },
      cardsWelcome: [
        {
          icon: "",
          title: "Asistencia",
          count: 3,
        },
        {
          icon: "",
          title: "Tareas",
          count: 1,
        },
      ],
      classesList: null,
      // classesList: [
      //   {
      //     subject: {
      //       id: 1,
      //       name: "1. Números Reales",
      //       content: [
      //         {
      //           id: 1,
      //           type: "Tarea",
      //           title: "Estructura de los numeros reales",
      //           dateend: "Vence 10/11/2020 11:00 PM",
      //           status: "Pendiente",
      //           icon: "ClockIcon",
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     subject: {
      //       id: 2,
      //       name: "2. Números Primos",
      //       content: [
      //         {
      //           id: 2,
      //           type: "Examen",
      //           title: "Estructura de los numeros Primos",
      //           dateend: "Vence 19/11/2020 11:00 PM",
      //           status: "Pendiente",
      //           icon: "ClockIcon",
      //         },
      //       ],
      //     },
      //   },
      // ],
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

.btn-right {
  position: absolute;
  right: 1rem;
  z-index: 999;
}
</style>
