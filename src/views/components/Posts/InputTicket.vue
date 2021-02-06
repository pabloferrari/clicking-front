<template>
  <vx-card>
    <div class="flex">
      <div class="">
        <div class="w-1/2">
          <vs-avatar class="m-3" size="30px" />
        </div>
      </div>
      <div class="w-full">
        <vs-textarea
          height="50px"
          label="Escriba aqui su consulta"
          v-model="message"
          name="message"
          v-validate="'required'"
          :danger="errors.has('message')"
        />
        <span class="text-danger text-sm" v-show="errors.has('message')">{{
          errors.first("message")
        }}</span>
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-end">
      <div class="">
        <vs-button @click="handlerPublish()" size="small">Enviar consulta</vs-button>
      </div>

    </div>
  </vx-card>
</template>

<script>
export default {
  name: 'InputTicket',

  data () {
    return {
      message: ''
    }
  },
  methods: {
    handlerPublish () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('handler-publish')
          this.$validator.reset()
          this.message = ''
        }
      })
    },
    sendInformation () {
      if (this.message) {
        // console.log(this.textarea)
      }
    }
  }
}
</script>
