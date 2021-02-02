<template>
  <div>
    <div class="vx-row">
      <div class="vx-col flex w-full">
        <vs-select
          v-model="score"
          label="Puntos"
          class="mt-5 w-full"
          name="Puntos"
          v-validate="'required'"
          :danger="errors.has('Puntos')"
        >
          <vs-select-item v-for="n in 10" :key="n" :value="n" :text="n" />
        </vs-select>
      </div>
      <div class="vx-col flex w-full">
        <vs-input
          v-model="comment"
          class="w-full"
          label-placeholder="Escribe un comentario"
          name="comentario"
          v-validate="'required'"
          :danger="errors.has('comentario')"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name:'AssignmentEvaluationProcess',
  props: {
    assignmentId: Number,
    classRoomStudentId: Number
  },
  data() {
    return {
      score:'',
      comment:''
    }
  },
  methods: {
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            score: this.score,
            comment:this.comment,
            assignment_id: this.assignmentId,
            classroom_student_id: this.classRoomStudentId,
            assignment_status_id:2
          }

          this.$store
            .dispatch('assignment/createAssignmentStudent', payload)
            .then(response => {
              console.log(response)
              //this.$emit('close-modal')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>
