<template>
  <div class="folders">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex justify-between">
            <div class="w-1/2">
              <div>
                <FolderIcon></FolderIcon>
                <p class="primary p-3 inline"> {{ folders_name }} </p>
              </div>
            </div>

            <div class="justify-end">
              <div class="">
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

    <div class="my-4">
      <div>
        <!-- <div class="inline text-center">
          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg">
            <div class="">
              <feather-icon icon="PlusIcon" svgClasses="mb-5" />
              <strong class="text-title"> Subir articulo</strong>
            </div>
          </div>
        </div> -->

        <div class="inline text-right" v-permission="['teacher']">
          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg div-card-file-plus" @click="showModal(true)">
              <div class="float-right-dropdown">&nbsp;</div>
              <strong class="text-title">
                +
                Adjuntar Archivo
              </strong>

          </div>
        </div>

        <div class="inline text-right" v-for="(folder, index) in this.dataFoldersId" :key="index">

          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg ">
            <ButtonDropDown
              :dataSelected="[]"
              :items="itemsDropdown()"
            ></ButtonDropDown>
            <div class="div-card-file">
              <a title="Clic para ver" :href="folder.url" target="__blank"> <strong class="p-2 text-title">{{ folder.name.toUpperCase().split(".")[folder.name.toUpperCase().split(".").length -1] }}</strong> </a>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--/ Section Add and Get All Folders -->
  </div>
</template>

<script>
import ButtonPath from '../components/ButtonPath'
import FolderIcon from '../components/icons/FolderIcon'
import FolderList from './FolderList'
import ButtonDropDown from '../components/ButtonDropDown.vue'

import { mapGetters } from 'vuex'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'

const FilePond = vueFilePond()

export default {
  name:'FolderFiles',
  components: {
    ButtonPath,
    FolderList,
    FolderIcon,
    FilePond,
    ButtonDropDown
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
      if (data.length > 0) {
        this.dataFoldersId = data
      }
    }
  },
  methods: {
    getFolderById () {
      console.log(`getFolderById -> ${this.folderId}`)
      this.$store.dispatch('folder/getFolderDataId', this.folderId)
    },
    handleFileUpload (files) {
      this.form.file = files.map(files => files.file)
    },
    accept () {
      console.log('Adjuntando archivo')

      if (this.form.file.length === 0) {
        return false
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = new FormData()
          payload.append('folder_id', this.folderId)

          for (let i = 0; i < this.form.file.length; i++) {
            const file = this.form.file[i]
            payload.append(`files[${i}]`, file)
          }

          this.$store.dispatch(
            'folder/createFileFolder',
            payload
          )
          //this.closeModalClass()
        }
      })

    },
    acceptFolder () { },
    showModal (iscreated) {
      console.log(iscreated)
      this.activePrompt = true
    },
    itemsDropdown () {
      return [
        {
          id: 1,
          title: 'Eliminar (in process)',
          action: this.delete
        }
      ]
    },
    delete (data) {
      console.log('Deleting...', data)
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
.div-card-file-plus{
  position: relative;
  text-align: center;
  padding-top: 45px;
}
.dropdown-button-container{
  float: right;
}
.float-right-dropdown{
  float: right;
}

</style>

