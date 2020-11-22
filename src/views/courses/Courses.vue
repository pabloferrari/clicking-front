<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Mis Cursos</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos" @click="getCourses()">
          <div class="tab-content-courses">
            <div>
              <CardList :cardData="this.courses" description="cursando">
              </CardList>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <CardList :cardData="this.workshop" description="cursando">
              </CardList>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import AvatarList from "../components/AvatarList";
import CardWelcome from "../components/CardWelcome";
import CourseLogo from "../components/icons/CourseLogo";
import PencilLogo from "../components/icons/PencilLogo";
import CheckLogo from "../components/icons/CheckLogo";
import DocumentLogo from "../components/icons/DocumentLogo";
import CardList from "../components/CardList";
import Tabs from "../components/Tabs";
import { mapGetters } from "vuex";
export default {
  name: "courses",
  components: {
    AvatarList,
    CardWelcome,
    CourseLogo,
    CardList,
    Tabs,
  },

  mounted() {
    this.getCourses();
  },

  computed: {
    ...mapGetters({ storeCourses: "course/getCourses" }),
  },
  methods: {
    getCourses() {
      this.$store.dispatch("course/getCoursesData");
    },
  },
  watch: {
    storeCourses(data) {
      // console.log(data);
      const courseData = [];
      data.map((element, index) => {
        courseData.push({
          title: element.subject.name,
          subtitle:
            `${element.classroom.name} - ` + element.classroom.shift.name,
          buttonTitle: "Ir a curso",
          path: "/courses/" + element.subject.name.split(" ").join("-"),
          avatarData: element.classroom.classroom_students,
        });
      });
      console.log(courseData);
      this.courses = courseData;
    },
  },
  data() {
    return {
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: "Cursos",
          count: 2,

          path: "",
        },
        {
          icon: DocumentLogo,
          title: "Tareas",
          count: 3,
          path: "",
        },
        {
          icon: PencilLogo,
          title: "Trabajos Prácticos",
          count: 1,
        },
        {
          icon: CheckLogo,
          title: "Exámenes",
          count: 2,
        },
      ],
      courses: null,
      // course: [
      //   {
      //     title: "Matematica",
      //     subtitle: "Comision A -Turno Mañana",
      //     buttonTitle: "Ir a curso",
      //     path: "/courses/Matematica",
      //   },
      //   {
      //     title: "Lenguaje",
      //     subtitle: "Comision A -Turno Tarde",
      //     buttonTitle: "Ir a curso",
      //     path: "/courses/Lenguaje",
      //   },
      // ],
      workshop: [
        {
          title: "Programacion",
          subtitle: "Comision A - Turno Mañana",
          buttonTitle: "Ir a taller",
        },
        {
          title: "Lenguaje",
          subtitle: "Comision A - Turno Tarde",
          buttonTitle: "Ir a taller",
        },
      ],
      tabs: [
        {
          title: "Cursos",
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
