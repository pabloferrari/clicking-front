<template>
  <div class="con-exemple-prompt">
    <div class="w-full p-2">
      <vs-input
        class="w-full"
        label-placeholder="Titulo Articulo"
        v-model="form.article"
        name="Titulo Articulo"
        v-validate="'required'"
        :danger="errors.has('Titulo Articulo')"
      />
      <span
        class="text-danger text-sm"
        v-show="errors.has('Titulo Articulo')"
        >{{ errors.first("Titulo Articulo") }}</span
      >
    </div>
    <div class="w-full p-2">
      <div class="">
        <vs-input
          class="w-full"
          label-placeholder="Descripción"
          v-model="form.description"
          name="Descripción"
          v-validate="'required'"
          :danger="errors.has('Descripción')"
        />
        <span class="text-danger text-sm" v-show="errors.has('Descripción')">{{
          errors.first("Descripción")
        }}</span>
      </div>
    </div>
    <div class="w-full p-2">
       <file-pond
              name="file"
              ref="file"
              class-name="my-pond"
              label-idle="Arrastrar y soltar aquí..."
              allow-multiple="false"
              max-files="1"
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
  name:'CreateLibrary',
  components: {
    FilePond
  },
  data () {
    return {
      form: {
        title: '',
        article: '',
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          //const payload = this.form

          const payload = new FormData()
          payload.append('article', this.form.article)
          payload.append('description', this.form.description)

          for (let i = 0; i < this.form.file.length; i++) {
            const file = this.form.file[i]
            payload.append(`files[${i}]`, file)
          }

          this.$store.dispatch('library/createLibrary', payload)
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
