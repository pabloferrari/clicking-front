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
      <file-pond
        name="file"
        ref="file"
        class-name="my-pond"
        label-idle="Arrastrar y soltar aquí..."
        allow-multiple="true"
        instant-upload="false"
        v-on:updatefiles="handleFileUpload"
      />
    </div>
  </div>
</template>

<script>

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

export default {
  name:'FolderCreate',
  props: {
    courseId: Number
  },
  components: {
    FilePond
  },
  data () {
    return {
      form: {
        name: '',
        file: []
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

      if (this.form.file.length === 0) {
        return false
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          // const payload = {
          //   name: this.form.name,
          //   course_id: this.courseId
          // }
          const payload = new FormData()
          payload.append('name', this.form.name)
          payload.append('course_id', this.courseId)

          for (let i = 0; i < this.form.file.length; i++) {
            const file = this.form.file[i]
            payload.append(`files[${i}]`, file)
          }

          this.$store.dispatch(
            'folder/createFolder',
            payload
          )
          this.closeModalClass()
        }
      })
    },
    handleFileUpload (files) {
      this.form.file = files.map(files => files.file)
    }
  }


}
</script>
