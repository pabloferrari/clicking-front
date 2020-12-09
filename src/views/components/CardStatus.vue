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
              <ListIcon v-if="data.type == 1"></ListIcon>
              <CheckAssignmentIcon v-if="data.type == 2"> </CheckAssignmentIcon>
              <PencilAssignmentlIcon
                v-if="data.type == 3"
              ></PencilAssignmentlIcon>
            </div>
            <div class="w-2/3 px-4 py-4">
              <p class="m-2">
                {{ data.name }}
              </p>
              <h4 class="text-title font-bold">
                {{ data.title }}
              </h4>
            </div>
          </div>
        </div>
        <div class="grid justify-items-center">
          <div class="w-2/3 p-6">
            <p class="text-center">
              {{ this.formatDateTime(data.limit_date) }}
            </p>
          </div>
        </div>
        <div class="grid justify-items-end">
          <div class="w-2/6 p-4">
            <div class="rounded-full h-10 p-4">
              <vs-chip class="bg-white">
                <feather-icon
                  :icon="this.parseStatus(data.typeStatusId)"
                  svgClasses="h-5 w-8 text-red"
                >
                </feather-icon>
                <p class="text-center text-red font-bold">
                  {{ data.typeStatus }}
                </p>
              </vs-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";

import ListIcon from "../components/icons/ListIcon";
import PencilAssignmentlIcon from "../components/icons/PencilAssignmentlIcon";
import CheckAssignmentIcon from "../components/icons/CheckAssignmentIcon";
export default {
  name: "CardStatus",
  components: {
    ListIcon,
    PencilAssignmentlIcon,
    CheckAssignmentIcon,
  },
  props: {
    data: Object,
  },
  methods: {
    parseStatus(status) {
      switch (status) {
        case 1:
          return "ClockIcon";
          break;

        default:
          break;
      }
    },

    formatDateTime(datetime) {
      if (!datetime) {
        return null;
      }
      return moment(String(datetime)).format("DD/MM/YYYY hh:mm A");
    },
  },
};
</script>
<style>
.backgroud-internal {
  background: #eef7fe;
}
.text-red {
  color: #ff5a5a;
}
.text-title {
  color: #22215b;
}
.success {
  color: green;
}
.backgroud-internal-content {
  border-left: 2px solid;
}
.show {
  display: none;
}
</style>
