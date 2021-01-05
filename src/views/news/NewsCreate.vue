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
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'NewsCreate',
  components: {
    flatPickr
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
        description:''
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
        // console.log(result)
        if (result) {
          const payload = Object.assign(
            this.form, {
              description: this.description
            }
          )
          this.$store
            .dispatch('news/createNews', payload)
            .then(response => {

              this.$emit('close-modal')
              console.log(response)
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
