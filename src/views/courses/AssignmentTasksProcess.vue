<template>
  <div class="vx-row">
    <div class="vx-col flex w-full">
      <vs-select
        label="Estado"
        v-model="state"
        class="mt-5 w-full"
        name="item-plan"
        v-validate="'required'"
      >
        <vs-select-item value="1" text="Aprobado" />
        <vs-select-item value="0" text="Reprobado" />
      </vs-select>
      <span class="text-danger text-sm" v-show="errors.has('Estado')">{{
        errors.first("Estado")
      }}</span>
    </div>
    <div class="vx-col flex w-full">
      <vs-input
        class="w-full"
        v-model="comment"
        label-placeholder="Escribe un comentario"
        name="name"
        v-validate="'required'"
        :danger="errors.has('name')"
      />
    </div>
  </div>
</template>



<script>
export default {
  name:'AssignmentTasksProcess',
  props: {
    assignmentId: Number,
    classRoomStudentId: Number
  },
  data() {
    return {
      comment: '',
      state:''
    }
  },
  methods: {
    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            score: 0,
            comment:this.comment,
            assignment_id: this.assignmentId,
            classroom_student_id: this.classRoomStudentId,
            assignment_status_id: (this.state === '1') ? 3 : 0
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
