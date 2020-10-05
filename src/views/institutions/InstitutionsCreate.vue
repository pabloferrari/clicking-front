<template>
  <div id="form-form">
        <form action="form" method="post">
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Nombre"
                        v-model="form.name"
                        name="name"
                        v-validate="'required'" :danger="errors.has('name')"
                    />
                    <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </div>
            </div>
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Email"
                        v-model="form.email"
                        name="email"
                       v-validate="'required|email'" :danger="errors.has('email')"
                    />
                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
            </div>
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="Telefono"
                        v-model="form.phone"
                       
                        :danger="errors.has('phone')"
                    />
                    
                </div>
            </div>
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-input
                    class="w-full"
                        label-placeholder="CUIT"
                        v-model="form.cuit"
                    
                        :danger="errors.has('cuit')"
                    />
                   
                </div>
            </div>
            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-select v-model="form.dataPlans" label="Plan" class="mt-5 w-full" name="item-plan" v-validate="'required'">
                    <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in this.plansList" />
                    </vs-select>
                    <span class="text-danger text-sm" v-show="errors.has('item-plan')">{{ errors.first('item-plan') }}</span>
                </div>
            </div>

            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-select v-model="form.dataCountries" @change="changeCountry($event)"  label="País" class="mt-5 w-full" name="País" v-validate="'required'">
                        <vs-select-item key="" value="" selected text="seleccione país" />
                    <vs-select-item :key="item.id" :value="item.id"  :text="item.name" v-for="item in countriesList" />
                    </vs-select>
                    <span class="text-danger text-sm" v-show="errors.has('País')">{{ errors.first('País') }}</span>
                </div>
            </div>

            <div class="vx-row mb-2" >
                <div class="vx-col w-full">
                    <vs-select v-model="form.dataProvinces" @change="changeProvince($event)" label="Provincia" class="mt-5 w-full" name="Provincia" v-validate="'required'">
                        <vs-select-item key="" value="" selected text="seleccione pronvincia" />
                        <vs-select-item :key="item.id" :value="item.id"  :text="item.name"  v-for="item in provinceList" />
                    </vs-select>
                    <span class="text-danger text-sm" v-show="errors.has('Provincia')">{{ errors.first('Provincia') }}</span>
                </div>
            </div>

            <div class="vx-row mb-2">
                <div class="vx-col w-full">
                    <vs-select v-model="form.dataCities" label="Ciudad" class="mt-5 w-full" name="Ciudad" v-validate="'required'">
                    <vs-select-item key="" value="" selected text="seleccione ciudad" />
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in citiesList" />
                    </vs-select>
                    <span class="text-danger text-sm" v-show="errors.has('Ciudad')">{{ errors.first('Ciudad') }}</span>
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
    plansList:null,
    cities:null,
    countriesList:null,
    provinceList:null,
    citiesList:null,
    idEdit: null
  },

  data () {
    return {
      form: {
        id: null,
        dataPlans: '',
        dataCities: '',
        dataProvinces:'',
        dataCountries: '',
        name: '',
        phone: '',
        cuit: '',
        
        // active: '',
      },
     
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.institution) {
          if(this.form.id) {
            const id = this.form.id
            const institution    = Object.assign({}, this.$store.state.institution.institutions.find(x => x.id === id))
            this.form.name       = institutions.name
            this.form.email      = institutions.email
            this.form.phone      = institutions.phone
            this.form.cuit       = institutions.cuit
            this.form.dataPlans  = institutions.plan.id
            // this.form.dataCountries = institutions.city.province.country.id
            // this.form.dataProvinces = institutions.city.province.id
            // this.form.dataCities = institutions.city.id
        }else{
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
          const  payload = this.form
          this.$store.dispatch('institution/createInstitution', payload)
          this.$emit('close-modal')
        }
      })
    },

    update () {
      const  payload = this.form
      console.log(payload)
      this.$store.dispatch('institution/updateInstitution', payload)
      this.$emit('close-modal')
    },

    changeCountry(id){
        
        const country = this.countriesList.find( x => x.id === id)
        console.log()
        this.provinceList =  country.provinces
    },

    changeProvince(id){
        
        const provinces = this.provinceList.find( x => x.id === id)
      
        this.citiesList =  provinces.cities
    }
  }
}
</script>