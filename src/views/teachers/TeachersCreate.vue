<template>
  <div id="form-form">
    <form action="form" method="post">
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Nombre y Apellido"
            v-model="form.name"
            name="Nombre y Apellido"
            v-validate="'required'"
            :danger="errors.has('Nombre y Apellido')"
          />
          <span
            class="text-danger text-sm"
            v-show="errors.has('Nombre y Apellido')"
            >{{ errors.first("Nombre y Apellido") }}</span
          >
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
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
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Teléfono"
            v-model="form.phone"
            v-validate="'required'"
            name="Teléfono"
            :danger="errors.has('Teléfono')"
          />
          <span class="text-danger text-sm" v-show="errors.has('Teléfono')">{{
            errors.first("Teléfono")
          }}</span>
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
             v-if="this.isCreate"
            label-placeholder="Contraseña"
            v-model="form.password"
            name="contraseña"
            v-validate="'required'"
            :danger="errors.has('contraseña')"
          />
          <span class="text-danger text-sm" v-show="errors.has('contraseña')">{{
            errors.first("contraseña")
          }}</span>
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
import { mapGetters } from 'vuex'
export default {
  name: 'TeachersCreate',
  props: {
    isCreate: Boolean,
    teachers: {},
    idEdit: null,
    institutionId: String
  },
  data () {
    return {
      form: {
        id: null,
        name: '',
        phone: '',
        email: '',
        password: '',
        institution_id: '',
        active: 1
      }
    }
  },
  mounted () {
    this.setData()
  },

  computed: {
    ...mapGetters({ error: 'teacher/getError' })
  },

  methods: {
    setData () {
      // console.log(this.idEdit)
      if (this.teachers) {
        if (this.idEdit) {
          const teacher = Object.assign(
            {},
            this.$store.state.teacher.teachers.find((x) => x.id === this.idEdit)
          )
          if (teacher) {
            this.form.id = this.idEdit
            this.form.name = teacher.name
            this.form.email = teacher.email
            this.form.phone = teacher.phone
            this.form.active = teacher.active
          }
        }
      } else {
        const ObjectEmpty = Object.assign(this.form, this.teachers)
        this.form.institution_id = this.institutionId
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
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form

          this.$store.dispatch('teacher/createTeacher', payload)
          // if(this.error ) {
          this.$emit('close-modal')
          // }
        }
      })
    },
    update () {

      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form
          this.$store.dispatch('teacher/updateTeacher', payload)
          // if(this.error) {
          this.$emit('close-modal')
          // }
        }
      })
    }
  }
}
</script>
