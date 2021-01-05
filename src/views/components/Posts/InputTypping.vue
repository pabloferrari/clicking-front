<template>
  <vx-card>
    <div class="flex">
      <div class="">
        <div class="w-1/2">
          <vs-avatar class="m-3" size="30px" />
        </div>
      </div>
      <div class="w-full">
        <vs-textarea height="50px" label="Escribe aquí una descripción" v-model="textarea" name="Descripción"
            v-validate="'required'"
            :danger="errors.has('Descripción')" />
            <span
            class="text-danger text-sm"
            v-show="errors.has('Descripción')"
            >{{ errors.first("Descripción") }}</span
          >
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-end">
      <div class="">
        <vs-button @click="handlerPublish()" size="small">Publicar</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
export default {
  name: 'InputTypping',

  data () {
    return {
      textarea: ''
    }
  },
  methods: {
    handlerPublish () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('handler-publish')
        }
      })

    },
    sendInformation () {
      if (this.textarea) {
        console.log(this.textarea)
      }
    }
  }
}
</script>
