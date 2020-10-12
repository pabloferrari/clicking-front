<template>
<div id="form-form">
    <form action="form" method="post">
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Nombre y Apellido" v-model="form.name" name="Nombre y Apellido" v-validate="'required'" :danger="errors.has('Nombre y Apellido')" />
                <span class="text-danger text-sm" v-show="errors.has('Nombre y Apellido')">{{ errors.first('Nombre y Apellido') }}</span>
            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Email" v-model="form.email" name="email" v-validate="'required|email'" :danger="errors.has('email')" />
                <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-input class="w-full" label-placeholder="Telefono" v-model="form.phone" :danger="errors.has('phone')" />

            </div>
        </div>
        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-select v-model="form.dataTurns" label="Turno" class="mt-5 w-full" name="Turno" v-validate="'required'">
                    <!-- <vs-select-item key="" value="" text="seleccione plan" /> -->
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in this.turnList" />
                </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('Turno')">{{ errors.first('Turno') }}</span>
            </div>
        </div>

        <div class="vx-row mb-2">
            <div class="vx-col w-full">
                <vs-select v-model="form.dataComissions"  label="Comisión" class="mt-5 w-full" name="Comisión" v-validate="'required'">
                    <!-- <vs-select-item key="" value="" selected text="seleccione país" /> -->
                    <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in comissionList" />
                </vs-select>
                <span class="text-danger text-sm" v-show="errors.has('Comisión')">{{ errors.first('Comisión') }}</span>
            </div>
        </div>

      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-checkbox v-model="form.active">Activo</vs-checkbox>
        </div>
      </div>
    </form>
</div>
</template>

<script>
export default {
  name: 'TeachersCreate',
  props: {
    isCreate: Boolean,
    teachers: {},
    turnList: null,
    cities: null,
    comissionList: null,
    idEdit: null
  },
  data () {
    return {
      form: {
        id: null,
        name: '',
        phone: '',
        email:'',
        active:1,
        dataTurns: '',
        dataComissions:''
      },
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.teachers) {
        const teacher = this.teachers
        
        this.form.id = teacher.id
        this.form.name = teacher.name
        this.form.email = teacher.email
        this.form.phone = teacher.phone
        this.form.active = teacher.active
        this.form.dataTurns = teacher.turn_id
        this.form.dataComissions = teacher.comission_id

      }else {
        const ObjectEmpty = Object.assign(this.form, this.teachers)
        this.form = ObjectEmpty
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
          this.$store.dispatch('teacher/createTeacher', payload)
          this.$emit('close-modal')
        }
      })
    },
    update () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = this.form
          console.log(payload)
          this.$store.dispatch('teacher/updateTeacher', payload)
          this.$emit('close-modal')
        }
      })
    }
  }
}
</script>
