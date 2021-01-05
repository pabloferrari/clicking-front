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
import { mapGetters } from 'vuex'
export default {
  name: 'AdminsCreate',
  props: {
    isCreate: Boolean,
    admins: {},
    idEdit: null,
    institutionId: 0
  },
  data () {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        password: '',
        active: '',
        institutionId: 0
      }
    }
  },
  mounted () {
    this.setData()
  },

  computed: {
    ...mapGetters({ error: 'admin/getError' })
  },

  methods: {
    setData () {
      // console.log(this.idEdit)
      if (this.admins) {
        if (this.idEdit) {
          const admin = Object.assign(
            {},
            this.$store.state.admin.admins.find((x) => x.id === this.idEdit)
          )
          if (admin) {
            this.form.id = this.idEdit
            this.form.name = admin.name
            this.form.email = admin.email,
            this.form.institution_id = this.institutionId,
            this.form.active = admin.active
          }
        }
      } else {
        const ObjectEmpty = Object.assign(this.form, this.admins)
        this.form = ObjectEmpty
        this.form.institution_id = this.institutionId
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

          this.$store.dispatch('admin/createAdmin', payload)
          // if(this.error ) {
          this.$emit('close-modal')
          // }
        }
      })
    },
    update () {
      console.log(this.error)
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form
          this.$store.dispatch('admin/updateAdmin', payload)
          // if(this.error) {
          this.$emit('close-modal')
          // }
        }
      })
    }
  }
}
</script>
