<template>
    <div class="card__action__group">
        <div class="vx-col w-full my-2" v-permission="['student']">
            <vs-button
                class="w-full"
                icon-pack="feather"
                icon="icon-paperclip"
                type="border"
                >Adjuntar</vs-button
            >
        </div>
        <div class="vx-col w-full my-2" v-permission="['teacher']">
            <vs-button class="w-full" type="border">Devolver</vs-button>
        </div>

        <div class="vx-col w-full" v-permission="['student']">
            <vs-button class="w-full">Entregar</vs-button>
        </div>
        <div class="vx-col w-full" v-permission="['teacher']">
            <vs-button @click="correct()" class="w-full">Corregir</vs-button>
        </div>
    </div>
</template>

<script>
export default {
  name:'ButtonCardAction',

  methods: {
    correct () {
      this.$emit('handle-correct')
    }
  }
}
</script>
