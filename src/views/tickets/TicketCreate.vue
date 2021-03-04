<template>
  <div class="">
    <div class="vx-row mb-2">
      <div class="vx-col w-full">
        <vs-input
          class="w-full"
          label-placeholder="Mensaje"
          v-model="form.message"
          name="message"
          v-validate="'required'"
          :danger="errors.has('message')"
        />
        <span class="text-danger text-sm" v-show="errors.has('message')">{{
          errors.first("message")
        }}</span>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mb-2">
        <vs-checkbox v-model="form.public">Enviar Consulta</vs-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'TicketCreate',
  components: {
    flatPickr
  },
  props: {
    description: String
  },

  data () {
    return {
      form: {
        message: ''
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
            .then(() => {
              this.$emit('close-modal')
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
