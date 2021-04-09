<template>
  <div class="folders">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex justify-between">
            <div class="flex w-1/2">
              <p class="primary inline">{{ subject }}</p>
            </div>
            <div class="justify-end">
              <div class="flex mt-2">
                <!-- <div class=""> -->
                <vs-button
                  @click="openModal()"
                  size="small"
                  class="mx-2"
                  icon-pack="feather"
                  icon="icon-plus"
                  v-permission="['teacher']"
                  >Crear Carpeta</vs-button
                >
                <ButtonPath
                  size="small"
                  color="primary"
                  :path="this.path"
                  icon-pack="feather"
                  icon="icon-folder"
                  buttonTitle="Ir a Curso"
                ></ButtonPath>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Add and Get All Folders -->

    <div class="my-4">
      <!-- <div > -->
      <!-- <div class=""> -->
      <FolderList
        v-for="(folder, index) in this.dataFolders"
        :key="index"
        :folderId="folder.id"
        :name="folder.folders_name"
        class="vx-col mx-2 sm:w-1/8 md:w-1/4 lg:w-1/6 xl:w-1/6 p-2"
      ></FolderList>
      <!-- </div> -->
      <!-- </div> -->
    </div>
    <!--/ Section Add and Get All Folders -->

    <!-- Modal -->
    <vs-prompt
      @accept="acceptFolder"
      :title="`${actionModal} Carpeta`"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <div class="con-exemple-prompt">
        <FolderCreate
          ref="FolderCreate"
          :courseId="parseInt(this.courseId)"
          @close-modal="closeModal()"
        />
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import ButtonPath from '../components/ButtonPath'
import ButtonRight from '../components/ButtonRight'
import FolderList from './FolderList'
import FolderCreate from './FolderCreate'
import { mapGetters } from 'vuex'
export default {
  name: 'Folders',
  components: {
    ButtonPath,
    FolderList,
    ButtonRight,
    FolderCreate
  },
  props: {
    courseId: String,
    subject: String
  },
  data () {
    return {
      dataFolders: [],
      activePrompt: false,
      actionModal: '',
      path: `/courses/${this.subject
        .split(' ')
        .join('-')}/${this.courseId}`

    }
  },


  computed: {
    ...mapGetters({
      storeFolderCourse: 'folder/getFolders'
    })
  },

  watch: {
    storeFolderCourse (data) {
      //if (data.length > 0) {
      this.dataFolders = data
      //}
    }
  },


  methods: {
    acceptFolder () {
      this.activePrompt = true
      this.$refs.FolderCreate.save()
    },
    closeModal () {
      this.activePrompt = false
    },
    openModal () {
      this.activePrompt = true
      this.actionModal = 'Crear'
    },

    getFolderByCourse () {
      this.$store.dispatch('folder/getFolderByCourse', this.courseId)
    }
  },

  mounted () {
    this.getFolderByCourse()
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
</style>

