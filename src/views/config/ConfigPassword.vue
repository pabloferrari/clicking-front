<template>
  <div id="form-form" class="mt-2 mb-2">
    <form action="form" method="post">
      <div class="vx-row mb-4">
        <div class="vx-col w-1/3">
          <vx-input-group class="w-full mt-6 mb-2">
              <vs-input
                :type="typePassword"
                name="password"
                icon-no-border
                icon="icon icon-lock"
                icon-pack="feather"
                label-placeholder="Password"
                v-model="form.password"
                v-validate="'required|min:8'"
                :danger="errors.has('password')"
                />
              <template slot="append">
                  <div class="append-text btn-addon" v-bind:class="{ 'pt-5': !errors.has('password'), 'pt-3': errors.has('password')}">
                      <vs-button v-if="!showPassword" color="primary" icon-pack="feather" icon="icon-eye-off" @click="changeTypePassword()"></vs-button>
                      <vs-button v-if="showPassword" color="primary" icon-pack="feather" icon="icon-eye" @click="changeTypePassword()"></vs-button>
                  </div>
              </template>
          </vx-input-group>
          <span class="danger-message">{{ errors.first('password') }}</span>
        </div>

        <div class="vx-col w-1/3">
          <vx-input-group class="w-full mt-6 mb-2">
              <vs-input
                :type="typePassword"
                name="new_password"
                icon-no-border
                icon="icon icon-lock"
                icon-pack="feather"
                label-placeholder="Nueva Password"
                v-model="form.newPassword"
                v-validate="'required|min:8'"
                :danger="errors.has('new_password')"
                />

              <template slot="append">
                  <div class="append-text btn-addon" v-bind:class="{ 'pt-5': !errors.has('new_password'), 'pt-3': errors.has('new_password')}">
                      <vs-button v-if="!showPassword" color="primary" icon-pack="feather" icon="icon-eye-off" @click="changeTypePassword()"></vs-button>
                      <vs-button v-if="showPassword" color="primary" icon-pack="feather" icon="icon-eye" @click="changeTypePassword()"></vs-button>
                  </div>
              </template>
          </vx-input-group>
          <span class="danger-message">{{ errors.first('new_password') }}</span>
        </div>

        <div class="vx-col w-1/3">
          <vx-input-group class="w-full mt-6 mb-2">
              <vs-input
                :type="typePassword"
                name="password_confirm"
                icon-no-border
                icon="icon icon-lock"
                icon-pack="feather"
                label-placeholder="Confirmar Nueva Password"
                v-model="form.passwordConfirm"
                v-validate="'required|min:8'"
                :danger="errors.has('password_confirm')"
                />
              <template slot="append">
                  <div class="append-text btn-addon" v-bind:class="{ 'pt-5': !errors.has('password_confirm'), 'pt-3': errors.has('password_confirm')}">
                      <vs-button v-if="!showPassword" color="primary" icon-pack="feather" icon="icon-eye-off" @click="changeTypePassword()"></vs-button>
                      <vs-button v-if="showPassword" color="primary" icon-pack="feather" icon="icon-eye" @click="changeTypePassword()"></vs-button>
                  </div>
              </template>
          </vx-input-group>
          <span class="danger-message">{{ errors.first('password_confirm') }}</span>
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
  name: 'ConfigPassword',
  props: {
    user: {}
  },
  data () {
    return {
      form: {
        password: '',
        newPassword: '',
        passwordConfirm: ''
      },
      typePassword: 'password',
      showPassword: false
    }
  },
  mounted () {
  },
  methods: {
    changeTypePassword () {
      this.showPassword = !this.showPassword
      this.typePassword = this.showPassword ? 'text' : 'password'
    },
    save () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            'password': this.form.password,
            'new-password': this.form.newPassword,
            'new-password-validate': this.form.passwordConfirm
          }
          this.$store.dispatch('profile/resetPassword', payload)
        }
      });
    }
  }
}
</script>
<style lang="scss">
.danger-message {
  color: red;
  font-size: 10pt;
}
</style>
