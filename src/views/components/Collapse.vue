<template>
  <div class="collapse">
    <div class="vx-row" v-for="(classes, index) in classesList" :key="index">
      <div class="w-full">
        <div class="flex justify-between">
          <div class="w-full bg-white">
            <div class="flex justify-between">
              <div class="text-center px-4 py-2 m-2">
                <div class="px-6 py-2">
                  <div
                    class="text-xl mb-1 text-title font-semibold"
                    @click="showContent(index)"
                  >
                    <feather-icon
                      icon="CheckIcon"
                      svgClasses="h-5 w-5"
                      color="success"
                    />
                    {{ classes.subject.name }}
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
      <div class="w-full backgroud-internal mx-8 mt-3" v-if="display === index">
        <div class="grid grid-cols-3 divide-x divide-gray-400">
          <div class="">
            <div class="flex content-between">
              <div class="m-4 p-2">
                <ListIcon></ListIcon>
              </div>
              <div class="w-2/3 p-2">
                <p>{{ classes.subject.content[0].type }}</p>
                <h4 class="text-title">
                  {{ classes.subject.content[0].title }}
                </h4>
              </div>
            </div>
          </div>
          <div class="grid justify-items-center">
            <div class="w-2/3 p-6">
              <p class="text-center">
                {{ classes.subject.content[0].dateend }}
              </p>
            </div>
          </div>
          <div class="grid justify-items-end">
            <div class="w-2/6 p-4">
              <div class="rounded-full h-10 p-2">
                <vs-chip class="bg-white">
                  <feather-icon
                    :icon="classes.subject.content[0].icon"
                    svgClasses="h-5 w-8 text-red"
                  >
                  </feather-icon>
                  <p class="text-center text-red font-semibold">
                    {{ classes.subject.content[0].status }}
                  </p>
                </vs-chip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListIcon from "../components/icons/ListIcon";
import Toolbars from "./Toolbars";
export default {
  name: "Collapse",
  components: {
    ListIcon,
    Toolbars,
  },
  props: {
    classesList: Array,
  },
  data() {
    return {
      console,
      display: true,
    };
  },
  methods: {
    showContent(index) {
      this.display = index;
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
</style>
