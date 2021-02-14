<template>
  <div class="folders">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex justify-between">
            <div class="w-1/2">
              <div>
                <FolderIcon></FolderIcon>
                <p class="primary p-3 inline">Clase A</p>
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

    <!-- Section Add and Get All Folders -->

    <div class="my-4">
      <div>
        <div class="inline text-center">
          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg">
            <div class="">
              <feather-icon icon="PlusIcon" svgClasses="mb-5" />
              <strong class="text-title"> Subir articulo</strong>
            </div>
          </div>
        </div>
        <div class="inline text-right" v-for="index in 24" :key="index">
          <div class="w-1/6 h-24 inline-block bg-white mx-2 my-2 rounded-lg">
            <strong class="p-2 text-title">PDF</strong>
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
export default {
  name:'FolderFiles',
  components: {
    ButtonPath,
    FolderList,
    FolderIcon
  },
  props: {

    folderId: String
  },
  data() {
    return {
      activePrompt: false,
      actionModal: '',
      path: '',

    }
  },

  methods: {
    acceptFolder() {

    }
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
</style>

