<template>
    <div class="classroom-detail">
        <div class="vx-row">
            <div class="vx-col w-full">
                <p class="primary">{{ title.split("-").join(" ") }}</p>
            </div>
        </div>
        <CardWelcome :cardsWelcome="this.cardsWelcome()"></CardWelcome>
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
                <vs-tab label="Cursos" @click="getCourses()">
                    <div class="tab-content-courses">
                        <div>
                            <CardList
                                :cardData="this.courses"
                                description="cursando"
                            >
                            </CardList>
                        </div>
                    </div>
                </vs-tab>
                <vs-tab label="Talleres">
                    <div class="tab-content-workshop">
                        <div>
                            <CardList
                                v-if="this.workshop.length > 0"
                                :cardData="this.workshop"
                                description="cursando"
                            >
                            </CardList>
                            <div v-else>
                                <p class="font-semibold text-center">
                                    No se encontraron resultados
                                </p>
                            </div>
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
                        <vs-select-item
                            key=""
                            value=""
                            selected
                            text="seleccione Curso"
                        />
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
                            <vs-select-item
                                key=""
                                value=""
                                selected
                                text="seleccione docente"
                            />
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
import { mapGetters } from "vuex";
export default {
  name: "ClassroomDetail",
  props: {
    title: String,
    id: String,
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
  mounted() {
    this.getCourses();
    //this.getClassroomCount();
    this.getTeachers()
    this.getSubjects()
  },
  computed: {
    ...mapGetters({
      storeCourses: "course/getCourses",
      storeClassroomCount: "classroom/getClassroom",
      storeTeachers: 'teacher/getTeachers',
      storeSubjects: 'subject/getSubjects'
    }),
  },
  methods: {
    accept() {
      this.activePrompt = true;
    },
    getCourses() {
      this.$store.dispatch("course/getCourseByClassroom", this.id);
    },
    getClassroomCount() {
      this.$store.dispatch("classroom/getClassroomCount", this.id);
    },
    cardsWelcome() {
      return [
        {
          icon: CourseLogo,
          title: "Cursos",
          count: this.countClassroom.courses,
          // path: "/classrooms",
        },
        {
          icon: SchoolIcon,
          title: "Alumnos",
          count: this.countClassroom.students,
          path: "/students",
        },
        {
          icon: AppleIcon,
          title: "Docentes",
          count: this.countClassroom.teachers,
          path: "/teachers",
        },
      ];
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
    storeClassroomCount(data) {
      this.countClassroom = {
        courses: data.courses,
        students: data.students,
        teachers: data.teachers,
      };
    },
    storeCourses(data) {
      const courseData = [];
      data.map((element) => {
        courseData.push({
          title: element.subject.name,
          subtitle: `${element.classroom.name} - ${element.classroom.shift.name}`,
          buttonTitle: "Ir a curso",
          path: `/courses/${element.subject.name.split(" ").join("-")}/${
            element.id
          }`,
          avatarData: element.classroom.classroom_students,
        });
      });
      console.log(data);
      this.courses = courseData;
    },
    storeTeachers(data) {
      this.teachers = data
    },
    storeSubjects(data) {
      this.subjects = data
    },
  },

  data() {
    return {
      coursesName: "",
      teachers: "",
      subjects: "",
      activePrompt: false,
      activePromptSave: false,
      countClassroom: [],
      courses: [],
      workshop: [],
      form: {
        subject_id:     '',
        teacher_id:     '',
        classroom_id:   this.id,
	      course_type_id: ''
      },
    };
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
