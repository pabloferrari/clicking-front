<template>
  <div class="vx-row">

    <div class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8">

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
      :name="teacher.name"
      :avatar="teacher.user.image"
      @student-list-card="elementActiveDetail(teacher,'Docente')"
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
      :id="element.id"
      :name="element.student.name"
      :avatar="element.student.user.image"
      class="mt-5"
     @student-list-card="elementActiveDetail(element.student,'Alumno')"
      />
      <!-- :avatar="student.user.image" -->

    </div>

    <div class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8">

      <!-- CardAvatarDetail -->
      <CardAvatarDetail
       :name="this.cardsDetail.name"
       :description="this.cardsDetail.description"
       :rol="this.cardsDetail.rol"
       :avatar="this.cardsDetail.avatar"
      />

    </div>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import CardAvatar from './CardAvatar'
import CardAvatarDetail from './CardAvatarDetail'

export default {
  name: 'studentsList',
  props: {
    id: String
  },
  components: {
    CardAvatar,
    CardAvatarDetail
  },
  data () {
    return {
      courseStudents: [],
      courseTeachers: [],
      cardsDetail:{
        name: 'Docente',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ea dolore, voluptate modi optio repudiandae animi error? Praesentium quod harum, consequatur sequi expedita eveniet sunt libero doloremque debitis placeat ipsa.',
        rol: 'Docente',
        avatar: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      storeCourseById: 'course/getCourses'
    })
  },
  watch: {
    storeCourseById (data) {
      if (data) {
        data.map((element) => {
          this.courseStudents = Object.assign({}, element.classroom.classroom_students)
          this.courseTeachers = Object.assign(
            {},
            {
              teacher: element.teacher
            }
          )
        })
        // Load initial rol Teacher
        this.elementActiveDetail(this.courseTeachers.teacher, 'Docente')
      }
    }
  },
  methods: {
    getCourses () {
      this.$store.dispatch('course/getCourseById', this.id)
    },
    elementActiveDetail (data, rol) {
      const {name, user:{ image, description }} = data
      this.cardsDetail = Object.assign(
        {},
        {
          name,
          description,
          avatar:image,
          rol
        }
      )
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>

<style lang="css" >
  .principal-title {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #22215B;
  }
</style>
