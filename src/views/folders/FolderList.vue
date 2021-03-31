<template>
  <div class="inline-block">
    <div class="vx-col bg-white rounded-3xl p-3">
      <div class="flex justify-between mt-2">
        <div class="items-start cursor" @click="handlerClick(folderId)">
          <FolderIcon></FolderIcon>
          <div class="items-start">
            <h3 class="text-title font-bold">{{ name }} </h3>
          </div>
        </div>

        <div class="cursor">

          <ButtonDropDown
            :dataSelected="[]"
            :items="this.itemsDropdown()"
          ></ButtonDropDown>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FolderIcon from '../components/icons/FolderIcon'
import ButtonDropDown from '../components/ButtonDropDown.vue'

export default {
  name:'Folder',
  components: {
    FolderIcon,
    ButtonDropDown
  },
  props: {
    name: String,
    folderId: Number
  },
  methods: {
    handlerClick (id) {
      console.log(id)
      if (id) {
        const path = `/courses/folders/files/${id}`
        this.$router.push(path)
      }
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
    delete () {
      console.log('Deleting...')
    }
  }
}
</script>
<style scoped>
.text-title {
  color: #22215b;
}
.cursor {
  cursor: pointer;
}
</style>
