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
  name:'CreateLibrary',

  data () {
    return {
      form: {
        title: '',
        article: ''
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
          const payload = this.form
          this.$store.dispatch(
            'library/createLibrary',
            payload
          )
          this.closeModalClass()
        }
      })
    }
  }


}
</script>
