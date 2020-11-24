<template>
  <div class="classroom-detail">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ commission }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <div
      class="flex flex-wrap justify-end mt-1 data-list-btn-container"
      @click="activePrompt = true"
    >
      <vs-button
        color="primary"
        size="small"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        >Crear Curso</vs-button
      >
    </div>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos">
          <div class="tab-content-courses">
            <div>
              <CardList :cardData="this.course" description=" Alumnos cursando">
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
    <!-- Popup Course -->
    <vs-prompt
      @accept="create"
      title="Crear Curso"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <div class="w-full p-2">
          <vs-select
            v-model="form.subject_id"
            label="Curso"
            class="mt-5 w-full"
            name="item-shift"
            v-validate="'required'"
          >
            <vs-select-item key="" value="" selected text="seleccione Curso" />
            <vs-select-item
              :key="item.id"
              :value="item.id"
              :text="item.name"
              v-for="item in this.subjects"
            />
          </vs-select>
        </div>
        <div class="w-full p-2">
          <div class="">
            <vs-select
              v-model="form.teacher_id"
              label="Docente"
              class="mt-5 w-full"
              name="item-shift"
              v-validate="'required'"
            >
              <vs-select-item key="" value="" selected text="seleccione docente" />
              <vs-select-item
                :key="item.id"
                :value="item.id"
                :text="item.name"
                v-for="item in this.teachers"
              />
            </vs-select>
          </div>
        </div>
      </div>
    </vs-prompt>
    <!-- Modal -->
  </div>
</template>

<script>
import CardList from "../components/CardList";
import CardWelcome from "../components/CardWelcome";
import CourseLogo from "../components/icons/CourseLogo";
import PencilLogo from "../components/icons/PencilLogo";
import CheckLogo from "../components/icons/CheckLogo";
import DocumentLogo from "../components/icons/DocumentLogo";
import SchoolIcon from "../components/icons/SchoolIcon";
import AppleIcon from "../components/icons/AppleIcon";
import vSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  name: "ClassroomDetail",
  props: {
    commission: String
  },
  components: {
    CardWelcome,
    CourseLogo,
    PencilLogo,
    CheckLogo,
    DocumentLogo,
    SchoolIcon,
    CardList,
  },
  data() {
    return {
      coursesName: "",
      teachers: "",
      subjects: "",
      activePrompt: false,
      activePromptSave: false,
      teachersList: [],
      form: {
        subject_id:     '',
        teacher_id:     '',
        classroom_id:   '',
	      course_type_id: ''
      },
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: "Cursos",
          count: 2,
        },
        {
          icon: SchoolIcon,
          title: "Alumnos",
          count: 40,
        },
        {
          icon: AppleIcon,
          title: "Docentes",
          count: 2,
        },
      ],

      course: [
        {
          title: "Matematica",
          subtitle: "4A-Comisión A - Turno Mañana",
          buttonTitle: "Ir al curso",
          path: "/courses/Matematica",
        },
        {
          title: "Programacion",
          subtitle: "4A-Comisión A - Turno Tarde",
          buttonTitle: "Ir al curso",
          path: "/courses/Programacion",
        },
      ],
      workshop: [
        {
          title: "Matematica",
          subtitle: "2 Talleres - Turno Mañana",
          buttonTitle: "Ir a taller",
        },
        {
          title: "Programacion II",
          subtitle: "4 Talleres - Turno Tarde",
          buttonTitle: "Ir a taller",
        },
      ],
    };
  },
  mounted() {
    this.getTeachers()
    this.getSubjects()
  },
  methods: {
    accept() {
      if(this.activePrompt == true){
        this.create();
      }else{
        this.activePrompt = true;
      }
    },
    getTeachers() {
      this.$store.dispatch("teacher/getTeachers")
    },
    getSubjects() {
      this.$store.dispatch("subject/getSubjects")
    },
    create () {
      console.log('Creando...');
      //this.$validator.validateAll().then((result) => {
        //if (result) {
          const payload = this.form
          this.$store.dispatch('course/createCourse', payload)
          //this.$emit("close-modal");
        //}
      //})
    },
  },
  watch: {
    storeTeachers(data) {
      this.teachers = data
    },
    storeSubjects(data) {
      this.subjects = data
    }
  },
  computed: {
    ...mapGetters({ storeTeachers: 'teacher/getTeachers', storeSubjects: 'subject/getSubjects' }),
  },
};
</script>

<style lang="css">
.btn-right {
  position: absolute;
  right: 1rem;
  z-index: 999;
}

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
