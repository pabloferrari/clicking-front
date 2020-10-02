<template>
  <div id="form-form">
        <form action="form" method="post">
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Nombre Pais"
                        v-model="form.name"
                    />
                </div>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Codigo"
                        v-model="form.code"
                    />
                </div>
            </div>
        </form>
  </div>
</template>


<script>

export default {
  name: "formCreate",
  props: {
      isCreate: Boolean 
  },

  data() {
    return {
      form: {
        name: "",
        code: "",
    },
    }
  },

  methods: {
      save() {

          if(!this.isCreate) {
              console.log('update')
          }else{
              this.create()
              console.log('create')
          }
      },


      create() {
          const  payload = this.form
          this.$store.dispatch('country/createCountry',payload)
          console.log(payload)
      },

      update() {
          const  form = this.form
          console.log(form)
      }
  }
};
</script>