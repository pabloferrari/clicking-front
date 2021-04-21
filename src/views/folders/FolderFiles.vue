<template>
  <div class="folders">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex justify-between">
            <div class="w-1/2">
              <div>
                <FolderIcon></FolderIcon>
                <p class="primary p-3 inline">
                  {{ folders_name }}
                </p>
              </div>
            </div>

            <div class="justify-end">
              <div class="flex mt-2">
                <div class="">
                  <vs-button
                    size="small"
                    @click="showModal(true)"
                    v-permission="['teacher']"
                    color="dark"
                    type="border"
                    icon-pack="feather"
                    icon="icon-plus"
                    class="mx-2"
                    >Adjuntar Archivo</vs-button
                  >
                </div>

                <ButtonPath
                  size="small"
                  color="primary"
                  :path="this.path"
                  icon-pack="feather"
                  icon="icon-folder"
                  buttonTitle="Ir a Curso"
                ></ButtonPath>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <vs-prompt
      @accept="accept"
      :title="`Adjuntar Archivo`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <file-pond
          name="file"
          ref="file"
          class-name="my-pond"
          label-idle="Arrastrar y soltar aquí..."
          allow-multiple="true"
          instant-upload="false"
          v-on:updatefiles="handleFileUpload"
        />
      </div>
    </vs-prompt>
    <!-- Modal -->

    <!-- Section Add and Get All Folders -->

    <div class="my-4 flex">
      <div
        class="vx-col mx-2 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/6"
        v-for="folder in dataFoldersId"
        :key="folder.id"
      >
        <vs-card class="active-card-welcome">
          <vs-row vs-type="flex" class="">
            <vs-col
              vs-type="flex"
              vs-justify="flex-end"
              vs-align="center"
              vs-w="12"
              v-permission="['teacher']"
            >
              <ButtonDropDown
                :dataSelected="[]"
                :items="itemsDropdown(folder)"
              ></ButtonDropDown>
            </vs-col>
          </vs-row>
          <vs-row vs-type="flex" class="mb-base">
            <vs-col
              vs-type="flex"
              vs-justify="flex-start"
              vs-align="center"
              vs-w="10"
            >
              <!-- <h4 :style="'color:' + getColorText(note.color)">
                {{ note.title }}
              </h4> -->
              <div class="div-card-file">
                <!-- <a title="Clic para ver" :href="folder.url" target="__blank">
                  <strong class="p-2 text-title">{{
                    folder.name.toUpperCase().split(".")[
                      folder.name.toUpperCase().split(".").length - 1
                    ]
                  }}</strong>
                </a> -->
                <a title="Clic para ver" :href="folder.url" target="__blank">
                  <strong class="p-2 text-title">{{
                    folder.name +
                      folder.name.toUpperCase().split(".")[
                        folder.name.toUpperCase().split(".").length - 1
                      ]
                  }}</strong>
                  <pdf :src="folder.url"></pdf>
                </a>
              </div>
            </vs-col>
          </vs-row>

          <!-- <div class="flex">
            <div class="flex mt-2 mb-2 h-6">
              <div class="vx-col">
                hola
              </div>
              <div class="vx-col items-end">
                <ButtonDropDown
                  :dataSelected="[]"
                  :items="itemsDropdown(folder)"
                ></ButtonDropDown>
                <div class="div-card-file">
                  <a title="Clic para ver" :href="folder.url" target="__blank"> <strong class="p-2 text-title">{{ folder.name.toUpperCase().split(".")[folder.name.toUpperCase().split(".").length -1] }}</strong> </a>
                  <a title="Clic para ver" :href="folder.url" target="__blank">
                    <pdf :src="folder.url"></pdf>
                  </a>
                </div>
              </div>
            </div>
          </div> -->
        </vs-card>
      </div>

      <!-- <div class="inline text-right" v-for="(folder, index) in this.dataFoldersId" :key="index"> -->
      <!-- <div class="inline text-right" v-for="folder in dataFoldersId" :key="folder.id">
          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg ">
            <ButtonDropDown
              :dataSelected="[]"
              :items="itemsDropdown(folder)"
            ></ButtonDropDown>
            <div class="div-card-file">
              <a title="Clic para ver" :href="folder.url" target="__blank"> <strong class="p-2 text-title">{{ folder.name.toUpperCase().split(".")[folder.name.toUpperCase().split(".").length -1] }}</strong> </a>
              <a title="Clic para ver" :href="folder.url" target="__blank">
                <pdf :src="folder.url"></pdf>
              </a>
            </div>

          </div>
        </div> -->
    </div>
    <!--/ Section Add and Get All Folders -->
  </div>
</template>

<script>
import ButtonPath from '../components/ButtonPath'
import FolderIcon from '../components/icons/FolderIcon'
import FolderList from './FolderList'
import ButtonDropDown from '../components/ButtonDropDown.vue'
import pdf from 'vue-pdf'
import { mapGetters } from 'vuex'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

export default {
  name: 'FolderFiles',
  components: {
    ButtonPath,
    FolderList,
    FolderIcon,
    FilePond,
    ButtonDropDown,
    pdf
  },
  props: {
    folderId: String
  },
  data () {
    return {
      activePrompt: false,
      actionModal: '',
      folders_name: '',
      path: '',
      dataFoldersId: [],
      form: {
        name: '',
        file: []
      }
    }
  },
  computed: {
    ...mapGetters({ storeFolderId: 'folder/getFolders' })
  },
  watch: {
    storeFolderId (data) {
      //console.log(JSON.stringify(data), this.$store.state.folder.folderInfo)
      this.folders_name = this.$store.state.folder.folderInfo.name
      this.path = `/courses/${this.$store.state.folder.folderInfo.subject}/${this.$store.state.folder.folderInfo.course_id}`
      //if (data.length > 0) {
      this.dataFoldersId = data
      //}
    }
  },
  methods: {
    getFolderById () {
      // console.log(`getFolderById -> ${this.folderId}`)
      this.$store.dispatch('folder/getFolderDataId', this.folderId)
    },
    handleFileUpload (files) {
      this.form.file = files.map(files => files.file)
    },
    accept () {
      // console.log('Adjuntando archivo')

      if (this.form.file.length === 0) {
        return false
      }

      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = new FormData()
          payload.append('folder_id', this.folderId)

          for (let i = 0; i < this.form.file.length; i++) {
            const file = this.form.file[i]
            payload.append(`files[${i}]`, file)
          }

          this.$store.dispatch('folder/createFileFolder', payload)
          //this.closeModalClass()
        }
      })
    },
    acceptFolder () {},
    showModal (iscreated) {
      console.log(iscreated)
      this.activePrompt = true
    },
    itemsDropdown (data) {
      return [
        {
          id: data.id,
          title: 'Eliminar',
          action: this.delete
        }
      ]
    },
    delete (data) {
      //this.$emit('editNote', data.target.dataset.id.replace('u.', ''))
      // console.log('Deleting...', data.target.dataset.id)
      const payload = {
        id: data.target.dataset.id
      }
      this.$store.dispatch('folder/deleteFileFolder', payload)
    }
  },
  mounted () {
    this.getFolderById()
  }
}
</script>

<style lang="css">
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
.text-title {
  color: #22215b;
}
.primary_inline {
  display: inline-block !important;
}
.div-card-file {
  position: relative;
  text-align: center;
  padding-top: 18px;
  overflow: hidden;
  clear: both;
}
.div-card-file-plus {
  position: relative;
  text-align: center;
  padding-top: 45px;
}
.dropdown-button-container {
  float: right;
}
.float-right-dropdown {
  float: right;
}
.active-card-welcome {
  border: solid 2px #fff;
  border-radius: 10px !important;
  box-sizing: border-box;
}
.active-card-welcome:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.text-title-count {
  color: #22215b;
}
</style>
