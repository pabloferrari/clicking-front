<template>
  <div class="vx-row">
    <div class="vx-col w-full">
      <label class="typo__label">Estudiantes</label>
      <multiselect
        @select="addTagMultiSelect"
        @remove="removeTagMultiSelect"
        v-model="form.student_id"
        :options="studentData"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Todos"
        label="name"
        name="Estudiante"
        v-validate="'required'"
        :danger="errors.has('Estudiante')"
        track-by="id"
        selectLabel="Seleccionar estudiante"
        deselectLabel="Quitar"
      >
      </multiselect>
      <span class="text-danger text-sm" v-show="errors.has('Estudiante')">{{
        errors.first("Estudiante")
      }}</span>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'StudentInCourse',
  components: {
    Multiselect
  },
  props: {
    courseId: String,
    studentData: Array
  },

  data () {
    return {
      form: {
        student_id: []
      }
    }
  },

  methods: {
    addTagMultiSelect (searchQuery) {
      return searchQuery
    },
    removeTagMultiSelect (searchQuery) {
      return searchQuery
    },

    create () {
      this.$validator
        .validateAll()
        .then((result) => {
          console.log('hoal', result)
          if (result) {
            const payload = {
              students: this.form.student_id,
              course_id: this.courseId
            }
            this.$store
              .dispatch('course/addStudentInCourse', payload)
              .then(() => {
                this.$emit('close-modal')
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
