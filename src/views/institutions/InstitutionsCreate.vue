<template>
  <div id="form-form">
    <form action="form" method="post">
      <div class="vx-row mb-2">
        <div class="vx-col w-1/2">
          <vs-input
            class="w-full"
            label-placeholder="Nombre"
            v-model="form.name"
            name="name"
            v-validate="'required'"
            :danger="errors.has('name')"
          />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>
        </div>

        <div class="vx-col w-1/2">
          <vs-input
            class="w-full"
            label-placeholder="Email"
            v-model="form.email"
            name="email"
            v-validate="'required|email'"
            :danger="errors.has('email')"
          />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{
            errors.first("email")
          }}</span>
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-1/2">
          <vs-input
            class="w-full"
            label-placeholder="Telefono"
            v-model="form.phone"
            :danger="errors.has('phone')"
          />
        </div>

        <div class="vx-col w-1/2">
          <vs-input
            class="w-full"
            label-placeholder="CUIT"
            v-model="form.cuit"
            :danger="errors.has('cuit')"
          />
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-1/2">
          <vs-select
            v-model="form.dataPlans"
            label="Plan"
            class="mt-5 w-full"
            name="item-plan"
            v-validate="'required'"
          >
            <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
            <vs-select-item
              :key="item.id"
              :value="item.id"
              :text="item.name"
              v-for="item in this.plansList"
            />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('item-plan')">{{
            errors.first("item-plan")
          }}</span>
        </div>

        <div class="vx-col w-1/2">
          <vs-select
            v-model="form.dataCountries"
            @change="changeCountry($event)"
            label="País"
            class="mt-5 w-full"
            name="País"
            v-validate="'required'"
          >
            <vs-select-item key="" value="" selected text="seleccione país" />
            <vs-select-item
              :key="item.id"
              :value="item.id"
              :text="item.name"
              v-for="item in countriesList"
            />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('País')">{{
            errors.first("País")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-1/2">
          <vs-select
            v-model="form.dataProvinces"
            @change="changeProvince($event)"
            label="Provincia"
            class="mt-5 w-full"
            name="Provincia"
            v-validate="'required'"
          >
            <vs-select-item
              key=""
              value=""
              selected
              text="seleccione pronvincia"
            />
            <vs-select-item
              :key="item.id"
              :value="item.id"
              :text="item.name"
              v-for="item in provinceList"
            />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('Provincia')">{{
            errors.first("Provincia")
          }}</span>
        </div>

        <div class="vx-col w-1/2">
          <vs-select
            v-model="form.dataCities"
            label="Ciudad"
            class="mt-5 w-full"
            name="Ciudad"
            v-validate="'required'"
          >
            <vs-select-item key="" value="" selected text="seleccione ciudad" />
            <vs-select-item
              :key="item.id"
              :value="item.id"
              :text="item.name"
              v-for="item in citiesList"
            />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('Ciudad')">{{
            errors.first("Ciudad")
          }}</span>
        </div>
      </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-checkbox v-model="form.active">Activo</vs-checkbox>
        </div>
      </div>

      <div class="vx-row relative h-32">
        <div
          class="vx-col w-full mb-2 flex flex-wrap justify-end sm:flex-row absolute bottom-0 right-0 left-15"
        >
          <vs-button
            color="primary"
            type="flat"
            @click="closeModal"
            class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto cancel-btn"
            >Cancelar</vs-button
          >
          <vs-button @click="accept" class="w-full sm:w-auto">Crear</vs-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'InstitutionsCreate',
  props: {
    isCreate: Boolean,
    institution: {},
    plansList: null,
    cities: null,
    countriesList: null,
    idEdit: null
  },
  data () {
    return {
      form: {
        id: null,
        dataPlans: '',
        dataCities: '',
        dataProvinces: '',
        dataCountries: '',
        name: '',
        phone: '',
        cuit: '',
        active: true
      },
      provinceList: null,
      citiesList: null
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    accept () {
      //this.activePrompt = true
      this.save()
      // this.$refs.InstitutionsCreate.save()
    },
    closeModal () {
      this.$emit('close-modal')
    },
    setData () {
      if (this.institution) {
        if (this.idEdit) {
          const institution = Object.assign(
            {},
            this.$store.state.institution.institutions.find(
              x => x.id === this.idEdit
            )
          )
          if (institution) {
            this.form.id = institution.id
            this.form.name = institution.name
            this.form.email = institution.email
            this.form.phone = institution.phone
            this.form.cuit = institution.cuit
            this.form.dataPlans = institution.plan.id
            this.form.dataCountries = institution.city.province.country.id
            this.form.dataProvinces = institution.city.province.id
            this.form.dataCities = institution.city.id
            this.form.active = !!institution.active
          }
        } else {
          this.form = Object.assign({}, this.institution)
        }
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
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = this.form
          this.$store
            .dispatch('institution/createInstitution', payload)
            .then(() => {
              this.$emit('close-modal')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    update () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = this.form
          this.$store
            .dispatch('institution/updateInstitution', payload)
            .then(() => {
              this.$emit('close-modal')
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    changeCountry (id) {
      const country = this.countriesList.find(x => x.id === id)

      this.provinceList = country.provinces
    },
    changeProvince (id) {
      const provinces = this.provinceList.find(x => x.id === id)
      this.citiesList = provinces.cities
    }
  }
}
</script>
