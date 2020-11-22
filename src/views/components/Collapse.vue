<template>
  <div class="collapse">
    <div
      class="vx-row my-2"
      v-for="(classes, index) in classesList"
      :key="index"
    >
      <div class="w-full p-1">
        <div class="flex justify-between">
          <div class="w-full bg-white rounded-full">
            <div class="flex justify-between">
              <div
                class="text-center px-4 py-2 m-2 cursor-pointer"
                @click="showContent(classes.assignments)"
              >
                <div class="px-6 py-2">
                  <div class=" ">
                    <feather-icon
                      icon="CheckIcon"
                      svgClasses="h-8 w-8 text-success "
                    />
                    <span class="text-xl text-title font-semibold text-justify">
                      {{ index + 1 }}. {{ classes.title }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="text-center px-2 py-2 m-2">
                <div class="items-end">
                  <Toolbars />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full backgroud-internal-content mx-10"
        v-show="!classes.assignments.showDetails"
      >
        <div
          class=""
          v-for="(assignments, index) in classes.assignments"
          :key="index"
        >
          <CollapseBody :dataCollapseBody="assignments"></CollapseBody>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ListIcon from "../components/icons/ListIcon";
import Toolbars from "./Toolbars";
import CollapseBody from "./CollapseBody";
export default {
  name: "Collapse",
  components: {
    // ListIcon,
    Toolbars,
    CollapseBody,
  },
  props: {
    classesList: Array,
  },
  data() {
    return {
      console,
      showDetails: false,
      collapseBodyProp: null,
    };
  },
  methods: {
    showContent(data) {
      // console.log(data);
      this.$set(data, "showDetails", !data.showDetails);
      // this.collapseBodyProp = data;
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
