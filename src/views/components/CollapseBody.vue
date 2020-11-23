<template>
  <div class="collapse-body">
    <div class="w-full backgroud-internal mx-10 my-3 mt-3">
      <div class="grid grid-cols-3 divide-x divide-gray-400">
        <div class="">
          <div class="flex content-between">
            <div class="m-4 p-2 rounded-full bg-white">
              <ListIcon></ListIcon>
            </div>
            <div class="w-2/3 p-2">
              <!-- <p>{{ assignments.subject.content[0].type }}</p> -->
              <h4 class="text-title font-bold">
                {{ dataCollapseBody.title }}
              </h4>
            </div>
          </div>
        </div>
        <div class="grid justify-items-center">
          <div class="w-2/3 p-6">
            <!-- <p class="text-center">
                  {{ classes.subject.content[0].dateend }}
                </p> -->
          </div>
        </div>
        <div class="grid justify-items-end">
          <div class="w-2/6 p-4">
            <div class="rounded-full h-10 p-2">
              <!-- <vs-chip class="bg-white">
                    <feather-icon
                      :icon="classes.subject.content[0].icon"
                      svgClasses="h-5 w-8 text-red"
                    >
                    </feather-icon>
                    <p class="text-center text-red font-semibold">
                      {{ classes.subject.content[0].status }}
                    </p>
                  </vs-chip> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListIcon from "../components/icons/ListIcon";
export default {
  name: "CollapseBody",
  components: {
    ListIcon,
  },
  props: {
    dataCollapseBody: Object,
  },
  mounted() {
    // console.log(this.dataCollapseBody);
  },
};
</script>
