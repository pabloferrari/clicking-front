<template>
  <div id="form-countries">
        <form action="form" method="post">
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Nombre Pais"
                        v-model="countries.name"
                    />
                </div>
            </div>
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Codigo"
                        v-model="countries.code"
                    />
                </div>
            </div>
        </form>
  </div>
</template>


<script>

export default {
  name: "CountriesCreate",
  props: {
      isCreate: Boolean 
  },

  data() {
    return {
      countries: {
        name: "",
        code: "",
    },
    }
  },

  methods: {
      save() {

          if(this.isCreate) {
              console.log('update')
          }else{
              this.create()
              console.log('create')
          }
      },
      create() {
          const  form = this.form
          console.log(form)
      },

      update() {
          const  form = this.form
          console.log(form)
      }
  }
};
</script>