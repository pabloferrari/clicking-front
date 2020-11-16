<template>
  <div id="form-form">
    <form action="form" method="post">

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Nombre Ciudad"
            v-model="form.name"
            name="name"
            v-validate="'required'"
            :danger="errors.has('name')"
          />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Código Postal"
            v-model="form.zip_code"
            name="zip_code"
            v-validate="'required'"
            :danger="errors.has('zip_code')"
          />
          <span class="text-danger text-sm" v-show="errors.has('zip_code')">{{
            errors.first("zip_code")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-select v-model="form.country_id" @change="changeCountry($event)" label="País" class="mt-5 w-full" name="País" v-validate="'required'">
              <vs-select-item key="" value="" selected text="seleccione país" />
              <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in countriesList" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('País')">{{ errors.first('País') }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-select v-model="form.province_id"  label="Provincia" class="mt-5 w-full" name="Provincia" v-validate="'required'">
              <vs-select-item key="" value="" selected text="seleccione pronvincia" />
              <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in provinceList" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('Provincia')">{{ errors.first('Provincia') }}</span>
        </div>
      </div>

    </form>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'CitiesCreate',
  props: {
    isCreate: Boolean,
    city: {},
    countriesList: null
  },

  data () {
    return {
      form: {
        id: null,
        name: '',
        zip_code: '',
        // dataCountries: "",
        // dataProvinces: '',
        // country_id: "",
        // province_id: "",
        active: 1
      },
      provinceList: null
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.city) {
        const city = Object.assign({}, this.city)
        this.form = city

        this.form.country_id = city.province.country.id
        this.form.province_id = city.province.id
        //console.log(city.country.id);

        //this.form.dataCountries = institution.city.city.country.id
      }
    },
    save () {
      if (!this.isCreate) {
        this.update()
      } else {
        this.create()
      }
    },
    create () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form
          this.$store.dispatch('city/createCity', payload)
          //this.$emit("close-modal");
        }
      })
    },
    update () {
      const payload = this.form
      this.$store.dispatch('city/updateCity', payload)
      //this.$emit("close-modal");
    },
    changeCountry (id) {
      const country = this.countriesList.find(x => x.id === id)
      this.provinceList = country.provinces
      // this.form.country_id = id ? id : 0
    }
    // changeProvince (id) {
    //   this.form.province_id = id ? id : 0
    // }
  }
}
</script>
