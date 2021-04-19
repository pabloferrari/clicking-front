<template>
<div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="sm:w-0 md:w-0 lg:w-1/3 xl:w-2/3 bg-grid-color h-12 sm:m-0"></div>
    <div class="vx-col sm:1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 sm:m-0">
        <vx-card>
            <div slot="no-body" class="full-page-bg-color">
                <div class="vx-row no-gutter justify-center items-center">
                    <div class="vx-col sm:w-full md:w-full lg:w-full d-theme-dark-bg">
                        <div class="flex">
                            <div class="w-1/4"></div>
                            <div class="w-2/4">
                                <img src="../../assets/images/logo/login-logo.svg" alt="">
                            </div>
                            <div class="w-1/4"></div>
                        </div>

                        <div v-if="login" class="p-10 mb-12 login-tabs-container">
                            <div class="vx-card__title mb-12 sm:w-full">
                                <p class="mb-4 text-primary title">Ingresá a la plataforma</p>
                            </div>

                            <form>
                                <div class="mb-12">
                                    <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="Email" v-model="email" class="w-full" v-validate="'required|email'" :danger="errors.has('email')" />
                                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>

                                    <vx-input-group class="w-full mt-6 mb-2">
                                        <vs-input :type="typePassword" name="password" icon-no-border icon="icon icon-lock" icon-pack="feather" label-placeholder="Password" v-model="password" v-validate="'required|min:8'" :danger="errors.has('password')" />
                                        <template slot="append">
                                            <div class="append-text btn-addon" v-bind:class="{ 'pt-5': !errors.has('password'), 'pt-3': errors.has('password')}">
                                                <vs-button v-if="!showPassword" color="primary" icon-pack="feather" icon="icon-eye-off" @click="changeTypePassword()"></vs-button>
                                                <vs-button v-if="showPassword" color="primary" icon-pack="feather" icon="icon-eye" @click="changeTypePassword()"></vs-button>
                                            </div>
                                        </template>
                                    </vx-input-group>
                                    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

                                    <div class="flex flex-wrap justify-center my-5 mb-6 alt-text">
                                        ¿Olvidaste tu contraseña? &nbsp;<a @click="forgot()"><b>Click aqui</b></a>
                                    </div>
                                </div>

                                <div class="vx-row">
                                    <div class="vx-col px-12 w-full ml-auto">
                                        <vs-button class="w-full mr-3 mb-2 vs-con-loading__container" @click.prevent="submitForm" :disabled="loading" ref="loadableButton" id="button-with-loading" type="relief">Ingresar</vs-button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div v-if="forgotPassword" class="p-10 mb-12 login-tabs-container">
                            <div class="vx-card__title mb-12 sm:w-full">
                                <p class="mb-4 text-primary title">Reestablecé la contraseña</p>
                            </div>

                            <form>
                                <div class="mb-12">
                                    <vs-input name="email" icon-no-border icon="icon icon-user" icon-pack="feather" label-placeholder="Email" v-model="forgotEmail" class="w-full" v-validate="'required|email'" :danger="errors.has('email')" />
                                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                </div>

                                <div class="flex flex-wrap justify-center my-5 mb-6 alt-text">
                                        Volver &nbsp;<a @click="goToLogin()"><b>Click aqui</b></a>
                                    </div>

                                <div class="vx-row">
                                    <div class="vx-col px-12 w-full ml-auto">
                                        <vs-button class="w-full mr-3 mb-2 vs-con-loading__container" @click.prevent="refreshPassword" :disabled="loading" ref="loadableButton" id="button-with-loading" type="relief">Recuperar</vs-button>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      login: true,
      forgotPassword: false,
      email: '',
      password: '',
      forgotEmail: '',
      showPassword: false,
      typePassword: 'password',
      loading: false,
      backgroundLoading: 'primary',
      colorLoading: '#fff'
    }
  },
  computed: {
    ...mapGetters({
      authLoading: 'auth/getAuthLoading'
    })
  },
  watch: {
    authLoading (newValue) {
      if (newValue) {
        this.openLoadingContained()
      } else {
        this.closeLoadingContained()
      } 
    }
  },
  methods: {
    forgot() {
      this.login = false
      this.forgotPassword = true
    },

    goToLogin() {
      this.login = true
      this.forgotPassword = false
    },

    openLoadingContained () {
      this.$vs.loading({
        background: this.backgroundLoading,
        color: this.colorLoading,
        container: '#button-with-loading',
        scale: 0.45
      })
    },
    closeLoadingContained () {
      this.$vs.loading.close('#button-with-loading > .con-vs-loading')
    },
    changeTypePassword () {
      this.showPassword = !this.showPassword
      this.typePassword = this.showPassword ? 'text' : 'password'
    },
    submitForm () {
      // console.log('submitForm');
      if (!this.authLoading) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$store.dispatch('auth/login', {email: this.email, password: this.password})
          }
        })
      }
    },
    refreshPassword() {
      this.$store.dispatch('auth/refresh', {email: this.forgotEmail})
      this.goToLogin()
    }

  }
}
</script>

<style lang="scss">
.title {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 29px;
}

.alt-text {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}
</style>
