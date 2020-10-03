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
import {mapGetters} from 'vuex'
export default {
  name: "CountriesCreate",
  props: {
      isCreate: Boolean ,
      id: Number
     
  },

  data() {
    return {
      form: {
          id:0,
        name: "",
        code: "",
    },
    }
  },

watch:{
    country(data){
        console.log(data)
    }
},

 computed: {

     country () {
        return this.$store.getters.country.getCountryId(this.id)
      }
        //   ...mapGetters(['country/getCountryId']),country: () => {
            //   console.log(this.id)
            //   return this.getCountryId(this.id)
        //   }
 },
  methods: {
      save() {

          if(!this.isCreate) {
              console.log('update')
              this.update()
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
           const  payload = this.form
          this.$store.dispatch('country/updateCountry',payload)
        //   console.log(payload)
      }
  }
};
</script>