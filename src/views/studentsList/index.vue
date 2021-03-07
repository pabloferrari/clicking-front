<template>
  <div class="studentsList">
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex justify-between">
          <div class="w-1/2">
            <p class="primary-title">{{ title }}</p>
          </div>
          <!-- <div class=""> -->

          <div class="justify-end">
            <div class="mt-2">
              <vs-button
                v-permission="['institution', 'teacher']"
                class="mb-4 md:mb-0"
                :icon="'icon-plus'"
                :icon-pack="'feather'"
                @click="showModal"
                >{{ btnTitle }}</vs-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vx-row">
      <div
        class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8"
      >
        <div id="form-model" class="principal-title mb-10">
          <div class="vx-row">
            <div class="vx-col w-full">
              <p class="primary">Docente</p>
            </div>
          </div>
        </div>

        <!-- CardAvatar -->
        <CardAvatar
          v-for="(teacher, index) in this.courseTeachers"
          :key="index"
          :id="teacher.id"
          type="teacher"
          :name="teacher.name"
          :avatar="teacher.user.image"
          @student-list-card="elementActiveDetail(teacher, 'Docente')"
        />

        <div id="form-model" class="principal-title mb-10 mt-10">
          <div class="vx-row">
            <div class="vx-col w-full">
              <p class="primary">Alumnos</p>
            </div>
          </div>
        </div>

        <!-- CardAvatar -->
        <CardAvatar
          v-for="(element, index) in this.courseStudents"
          :key="index"
          type="student"
          :id="element.id"
          :name="element.student.name"
          :avatar="element.student.user.image"
          class="mt-5"
          @delete-student="getCourses()"
          @student-list-card="elementActiveDetail(element.student, 'Alumno')"
        />
        <!-- :avatar="student.user.image" -->
      </div>

      <div
        class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8"
      >
        <!-- CardAvatarDetail -->
        <CardAvatarDetail
          :name="this.cardsDetail.name"
          :description="this.cardsDetail.description"
          :rol="this.cardsDetail.rol"
          :avatar="this.cardsDetail.avatar"
        />
      </div>
    </div>

    <!-- Prompt Add Student in Course -->
    <vs-prompt
      @accept="acceptStudentInCourse"
      title="Agregar Estudiante a curso"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <StudentInCourseForm
        ref="StudentInCourse"
        :courseId="id"
        :studentData="storeStudentNotInCourse"
        @close-modal="closeModal()"
      >
      </StudentInCourseForm>
    </vs-prompt>
    <!--/  End Prompt Add Student in Course -->
  </div>
</template>

<script>
import StudentInCourseForm from "../studentsList/StudentInCourseForm";
import { mapGetters } from "vuex";
import CardAvatar from "./CardAvatar";
import CardAvatarDetail from "./CardAvatarDetail";

export default {
  name: "studentsList",
  props: {
    id: String,
    title: String,
  },
  components: {
    CardAvatar,
    CardAvatarDetail,
    StudentInCourseForm,
  },
  data() {
    return {
      courseStudents: [],

      activePrompt: false,
      form: {
        student_id: "",
      },
      courseTeachers: [],
      btnTitle: "Agregar Alumno",
      cardsDetail: {
        name: "Docente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ea dolore, voluptate modi optio repudiandae animi error? Praesentium quod harum, consequatur sequi expedita eveniet sunt libero doloremque debitis placeat ipsa.",
        rol: "Docente",
        avatar: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      storeCourseById: "course/getCourses",
      storeStudentNotInCourse: "course/getStudentNotInCourse",
    }),
  },
  watch: {
    storeStudentNotInCourse(data) {
      console.log(data);
    },
    storeCourseById(data) {
      if (data) {
        data.map((element) => {
          this.courseStudents = Object.assign(
            {},
            element.classroom.classroom_students
          );
          this.courseTeachers = Object.assign(
            {},
            {
              teacher: element.teacher,
            }
          );
        });
        // Load initial rol Teacher
        this.elementActiveDetail(this.courseTeachers.teacher, "Docente");
      }
    },
  },
  methods: {
    showModal() {
      this.activePrompt = true;
    },
    closeModal() {
      this.activePrompt = false;
      this.getStudentNotInCourse();
    },
    acceptStudentInCourse() {
      this.$refs.StudentInCourse.create();
    },
    getCourses() {
      this.$store.dispatch("course/getCourseById", this.id);
    },
    getStudentNotInCourse() {
      this.$store.dispatch("course/getStudentNotInCourseData", this.id);
    },

    elementActiveDetail(data, rol) {
      const {
        name,
        user: { image, description },
      } = data;
      this.cardsDetail = Object.assign(
        {},
        {
          name,
          description,
          avatar: image,
          rol,
        }
      );
    },
  },
  mounted() {
    this.getCourses();
    this.getStudentNotInCourse();
  },
};
</script>

<style lang="scss" scoped>
.primary-title {
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

<style lang="css" >
.principal-title {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #22215b;
}
</style>
