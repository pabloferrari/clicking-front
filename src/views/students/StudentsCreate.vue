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
export default {
  name: 'StudentsCreate',
  props: {
    isCreate: Boolean,
    student: {}

  },
  data () {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        active: 1
      }
    }
  },
  mounted () {
    this.setData()
  },
  methods: {
    setData () {
      if (this.student) {
        const student = this.student

        this.form.id = student.id
        this.form.name = student.name
        this.form.email = student.email
        this.form.active = student.active
      } else {
        const ObjectEmpty = Object.assign(this.form, this.student)
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
          this.$store.dispatch('student/createStudent', payload)
          this.$emit('close-modal')
        }
      })
    },
    update () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form
          console.log(payload)
          this.$store.dispatch('student/updateStudent', payload)
          this.$emit('close-modal')
        }
      })
    }
  }
}
</script>
