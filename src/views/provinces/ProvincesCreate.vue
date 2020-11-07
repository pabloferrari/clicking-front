<template>
  <div id="form-form">
    <form action="form" method="post">

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Nombre Provincia"
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
            label-placeholder="ISO 31662"
            v-model="form.iso31662"
            name="iso31662"
            v-validate="'required'"
            :danger="errors.has('iso31662')"
          />
          <span class="text-danger text-sm" v-show="errors.has('iso31662')">{{
            errors.first("iso31662")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
          <div class="vx-col w-full">
              <vs-select v-model="form.country_id" label="País" class="mt-5 w-full" name="País" v-validate="'required'">
                  <vs-select-item key="" value="" selected text="seleccione país" />
                  <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in countriesList" />
              </vs-select>
              <span class="text-danger text-sm" v-show="errors.has('País')">{{ errors.first('País') }}</span>
          </div>
      </div>

    </form>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'ProvincesCreate',
  props: {
    isCreate: Boolean,
    province: {},
    countriesList: null
  },

  data () {
    return {
      form: {
        id: null,
        name: '',
        iso31662: '',
        active: 1
      },
      citiesList: null
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.province) {
        const province = Object.assign({}, this.province)
        this.form = province
        this.form.country_id = province.country.id
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
          this.$store.dispatch('province/createProvince', payload)
          //this.$emit("close-modal");
        }
      })
    },
    update () {
      const payload = this.form
      this.$store.dispatch('province/updateProvince', payload)
      //this.$emit("close-modal");
    }
  }
}
</script>
