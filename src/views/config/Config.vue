<template>
  <div id="config">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">Configuración</p>
        </div>
      </div>

      <vx-card>
        <div class="flex flex-wrap justify-between items-center">
          <vs-tabs>
            <vs-tab label="Perfil" icon="account_circle">
              <form action="form" method="post">
                <div class="vx-row w-full mt-6 mb-6">
                  <vs-col vs-type="flex" vs-w="1" class="ml-2 p-2">
                    <img
                      key="onlineImg"
                      :src="activeUserInfo.image || defaultUser.photoURL"
                      alt="user-img"
                      width="50"
                      height="50"
                      class="rounded-full shadow-md cursor-pointer block"
                    />
                  </vs-col>

                  <vs-col
                    vs-type="flex"
                    vs-w="10"
                    vs-justify="flex-start"
                    vs-align="flex-start"
                  >
                    <div class="w-1/2">
                      <a href="#" @click="save()">
                        <label
                          style="cursor: pointer;"
                          for=""
                          class="vs-select--label primary-text"
                          >Cambiar foto</label>
                      </a>
                      <file-pond
                        name="file"
                        ref="file"
                        class-name="my-pond"
                        label-idle="Arrastrar y soltar aquí..."
                        accepted-file-types="image/jpeg, image/png, image/jpg"
                        allow-multiple="false"
                        max-files="1"
                        instant-upload="false"
                        v-on:updatefiles="handleFileUpload"
                      />
                    </div>
                  </vs-col>
                </div>
              </form>

              <ConfigProfile />
            </vs-tab>
            <vs-tab label="Contraseña" icon="remove_red_eye">
              <div>
                <ConfigPassword />
              </div>
            </vs-tab>
          </vs-tabs>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import ConfigProfile from './ConfigProfile.vue'
import ConfigPassword from './ConfigPassword.vue'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

export default {
  name: 'config',
  components: {
    ConfigProfile,
    ConfigPassword,
    FilePond
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.authUser
    },
    defaultUser () {
      return this.$store.state.AppActiveUser
    }
  },
  data () {
    return {
      photoURL: require('@/assets/images/portrait/small/incognito.png'),
      avatar: String,
      form: {
        file: []
      }
    }
  },
  methods: {
    imageEmpty (image) {
      return image !== null ? image : null
    },
    handleFileUpload (files) {
      this.form.file = files.map(files => files.file)
    },
    save () {
      if (this.form.file.length > 0) {
        const payload = new FormData()
        for (let i = 0; i < this.form.file.length; i++) {
          const file = this.form.file[i]
          payload.append(`files[${i}]`, file)
        }

        this.$store.dispatch('profile/updateAvatar', payload)
          .then(() => {
            console.log('success')
            // this.$emit('close-modal')
          })
          .catch(err => {
            console.log(err)
          })

      } else {
        this.$store.dispatch('notification/danger', {title: 'Data incompleta', text: 'Seleccione una foto'})
      }
    }
  },
  mounted () {
    this.avatar = ''
  }
}
</script>

<style lang="scss" scoped>
.primary {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 44px;
  display: flex;
  align-items: center;
  color: #567df4;
}
.primary-text {
  color: #567df4;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
}
</style>
