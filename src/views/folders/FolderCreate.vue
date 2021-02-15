<template>
  <div class="con-exemple-prompt">
    <div class="w-full p-2">
      <vs-input
        class="w-full"
        label-placeholder="Nombre de la carpeta"
        v-model="form.name"
        name="Nombre de la carpeta"
        v-validate="'required'"
        :danger="errors.has('Nombre de la carpeta')"
      />
      <span
        class="text-danger text-sm"
        v-show="errors.has('Nombre de la carpeta')"
        >{{ errors.first("Nombre de la carpeta") }}</span
      >
    </div>

    <div class="w-full p-2">
      <vs-button
        color="primary"
        size="small"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        >Adjuntar</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name:'FolderCreate',
  props: {
    courseId: Number
  },

  data() {
    return {
      form: {
        name: ''

      }
    }
  },

  methods: {
    save () {
      this.create()
    },
    closeModalClass () {
      this.$emit('close-modal')
    },
    create () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = {
            name: this.form.name,
            course_id: this.courseId
          }
          this.$store.dispatch(
            'folder/createFolder',
            payload
          )
          this.closeModalClass()
        }
      })
    }
  }


}
</script>
