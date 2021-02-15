<template>
  <div class="vx-col w-full section__color my-2">
    <div class="p-2 body-card rounded space-y-6">
      <div class="flex justify-between">
        <div class="items-start">
          <div class="flex">
            <div
              v-if="displayIcon"
              class="rounded-full p-0 m-0 bg-white h-12 w-12 flex items-center justify-center"
            >
              <component
                :is="this.renderIcon(dataAttach.typeAssignmentId)"
              ></component>
            </div>

            <div class="divide-y m-2">
              <h6 class="text-title text-left font-bold mr-2">
                {{ dataAttach.title }}
              </h6>
              <p class="text-left">{{ dataAttach.type }}</p>
            </div>
          </div>
        </div>

        <div class="items-end mb-2" v-if="displayRemove">
          <feather-icon
            icon="XIcon"
            @click="deleteAttach(dataAttach.id)"
            svgClasses="h-5 w-5 m-4 hover:text-danger cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListIcon from '../icons/ListIcon'
import PencilAssignmentlIcon from '../icons/PencilAssignmentlIcon'
import CheckAssignmentIcon from '../icons/CheckAssignmentIcon'

export default {
  name: 'AttachDocument',
  props: {
    displayIcon: Boolean,
    displayRemove: Boolean,
    dataAttach: Object
  },
  components: {
    ListIcon,
    PencilAssignmentlIcon,
    CheckAssignmentIcon
  },
  methods: {
    renderIcon (type) {
      switch (type) {
      case 1: // Tasks
        return ListIcon
        break
      case 2: // Evaluations
        return CheckAssignmentIcon
        break
      case 3: // Work Practice
        return PencilAssignmentlIcon
        break
      }
    },
    deleteAttach (id) {
      // this.dataAttach.splice(id, 1)

      // this.dataAttach.splice(dataAttach, 1)
      console.log(id)
    }
  }
}
</script>

<style>
.section__color {
  background: #eef7fe;
}
</style>
