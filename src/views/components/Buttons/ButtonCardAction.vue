<template>
  <div class="card__action__group">
    <div
      class="vx-col w-full my-2"
      v-if="
        assignmentStatus === 2 ||
        (assignmentStatus === 3 && permission === 'teacher')
      "
      v-permission="['teacher']"
    >
      <vs-button class="w-full" @click="giveBack()" type="border"
        >Devolver</vs-button
      >
    </div>

    <div
      class="vx-col w-full"
      v-if="assignmentStatus === 1 && permission === 'student'"
      v-permission="['student']"
    >
      <vs-button @click="deliver()" class="w-full">Entregar</vs-button>
    </div>
    <div
      class="vx-col w-full"
      v-permission="['teacher']"
      v-if="assignmentStatus === 2 && permission === 'teacher'"
    >
      <vs-button @click="correct()" class="w-full">Corregir</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'ButtonCardAction',
  props: {
    assignmentStatus: Number,
    permission: String
  },

  methods: {
    correct () {
      this.$emit('handle-correct')
    },
    deliver () {
      this.$emit('handle-deliver')
    },
    giveBack () {
      this.$emit('handle-give-back')

    }
  }
}
</script>
