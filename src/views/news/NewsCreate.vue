<template>
  <div class="">
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <vs-input
          class="w-full"
          label-placeholder="Titulo"
          v-model="form.title"
          name="Titulo"
          v-validate="'required'"
          :danger="errors.has('Titulo')"
        />
        <span class="text-danger text-sm" v-show="errors.has('Titulo')">{{
          errors.first("Titulo")
        }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <br />
        <!-- <label for="" class="vs-select--label">Fecha</label> -->
        <div>
          <flat-pickr
            class="w-full"
            :config="configdateTimePicker"
            v-model="form.date"
            placeholder="Fecha"
            name="Fecha"
            v-validate="'required'"
            :danger="errors.has('Fecha')"
          />
        </div>
        <span
          class="text-danger text-sm"
          v-show="errors.has('Fecha')"
          >{{ errors.first("Fecha") }}</span
        >
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <vs-checkbox v-model="form.public">Publico</vs-checkbox>
      </div>
      <div class="w-full p-2">
        <label for="" class="vs-select--label">Adjuntar Imagen</label>
       <file-pond
              name="file"
              ref="file"
              class-name="my-pond"
              label-idle="Arrastrar y soltar aquí..."
              accepted-file-types="image/jpeg, image/png, image/jpg"
              allow-multiple="false"
              max-files="1"
              instant-upload="false"
              v-on:updatefiles="handleFileUpload"
            />
      </div>
    </div>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'NewsCreate',
  components: {
    flatPickr,
    FilePond
  },
  props: {
    description: String
  },

  data () {
    return {
      form: {
        title: '',
        date: null,
        public:1,
        description:'',
        file: []
      },
      datetime: null,

      selectedDefault: null,
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'd-m-Y H:i'
      }

    }
  },
  methods: {
    save () {
      const create =  this.create()
      console.log(create)

    },
    create () {
      this.$validator.validateAll().then(result => {
        
        if (result) {
          
          const payload = new FormData()
          payload.append('title', this.form.title)
          payload.append('date', this.form.date)
          payload.append('public', this.form.public)
          payload.append('description', this.description)

          for (let i = 0; i < this.form.file.length; i++) {
            const file = this.form.file[i]
            payload.append(`files[${i}]`, file)
          }

          this.$store
            .dispatch('news/createNews', payload)
            .then(() => {
              this.$emit('close-modal')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    handleFileUpload (files) {
      this.form.file = files.map(files => files.file)
    }
  }
}
</script>
