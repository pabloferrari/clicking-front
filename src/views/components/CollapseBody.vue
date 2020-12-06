<template>
  <div class="collapse-body">
    <div class="w-full backgroud-internal mx-10 my-3 mt-3">
      <div class="grid grid-cols-3 divide-x divide-gray-400">
        <div class="">
          <div class="flex content-between">
            <div
              class="m-6 p-2 rounded-full bg-white"
              v-permission="['teacher', 'student']"
            >
              <ListIcon
                v-if="dataCollapseBody.assignmenttype.id == 1"
              ></ListIcon>
              <CheckAssignmentIcon
                v-if="dataCollapseBody.assignmenttype.id == 2"
              >
              </CheckAssignmentIcon>
              <PencilAssignmentlIcon
                v-if="dataCollapseBody.assignmenttype.id == 3"
              ></PencilAssignmentlIcon>
            </div>
            <div class="w-2/3 px-4 py-4">
              <p class="m-2">
                {{ dataCollapseBody.assignmenttype.name }}
              </p>
              <h4 class="text-title font-bold">
                {{ dataCollapseBody.title }}
              </h4>
            </div>
          </div>
        </div>
        <div class="grid justify-items-center">
          <div class="w-2/3 p-6">
            <p class="text-center">
              {{ this.formatDateTime(dataCollapseBody.limit_date) }}
            </p>
          </div>
        </div>
        <div class="grid justify-items-end">
          <div class="w-2/6 p-4">
            <div class="rounded-full h-10 p-4">
              <vs-chip class="bg-white">
                <feather-icon
                  :icon="this.renderIcons(1)"
                  svgClasses="h-5 w-8 text-red"
                >
                </feather-icon>
                <p class="text-center text-red font-bold">
                  {{ messageStatus(1) }}
                </p>
              </vs-chip>

          <div class="mb-2 p-1" v-if=" dataCollapseBody.assignmenttype.group_enabled ===1">
            <ButtonDropDown :dataSelected="[]" :items="this.dataDropDown(dataCollapseBody)"></ButtonDropDown>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ButtonDropDown from './ButtonDropDown'
import ListIcon from '../components/icons/ListIcon'
import PencilAssignmentlIcon from '../components/icons/PencilAssignmentlIcon'
import CheckAssignmentIcon from '../components/icons/CheckAssignmentIcon'
export default {
  name: 'CollapseBody',
  components: {
    ListIcon,
    PencilAssignmentlIcon,
    CheckAssignmentIcon,
    ButtonDropDown
  },
  props: {
    dataCollapseBody: Object
  },
  methods: {
    dataDropDown (data) {
      return   [
        {
          id:data.id,
          title:'Crear Grupos',
          action: this.showModalGroup
        }
      ]
    },
    showModalGroup (data) {
      const assignmentId = data.target.dataset.id
      console.log(assignmentId)
    },
    messageStatus () {
      return 'Pendiente'
    },
    renderIcons () {
      // switch (status) {
      // case 1:
      //   return 'ClockIcon'
      //   break
      // default:
      //   break
      // }
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM/YYYY hh:mm A')
    }
  },
  mounted () {
    // console.log(this.dataCollapseBody);
  }
}
</script>
