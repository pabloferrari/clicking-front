<template>
  <div id="form-form" class="mt-4 mb-2">
    <form action="form" method="post">
      <div class="vx-row mb-4">
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
            label-placeholder="E-mail"
            v-model="form.email"
            disabled
            name="email"
            v-validate="'required'"
            :danger="errors.has('email')"
          />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{
            errors.first("email")
          }}</span>
        </div>
      </div>

      <vs-row vs-align="flex-end" vs-type="flex" vs-justify="flex-end" vs-w="12" class="mt-2">
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end">
          <vs-button @click="save()"
            >Guardar</vs-button
          >
        </vs-col>
      </vs-row>
    </form>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'ConfigProfile',
  props: {
    user: {}
  },
  data () {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.authUser
    }
  },
  mounted () {
    this.form.name = this.activeUserInfo.name
    this.form.email = this.activeUserInfo.email
  },
  methods: {
    save () {
      this.$store.dispatch('profile/updateProfile', { name: this.form.name})
    }
  }
}
</script>
