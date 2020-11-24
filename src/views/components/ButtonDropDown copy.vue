<template>
  <div class="dropdown-button-container">
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <feather-icon
        icon="MoreVerticalIcon"
        svgClasses="h-5 w-5 cursor-pointer"
      />
      <vs-dropdown-menu>
        <vs-dropdown-item class="py-2 text-xl color-text-menu font-semibold" @click="popupCreateActive = 'itemOne'" v-model="popupCreateActive">
          {{ itemOne }}
        </vs-dropdown-item>
        <vs-divider />
        <vs-dropdown-item
          class="color-text-menu font-semibold"
          v-for="item in items"
          :key="item.id"
          @click="popupCreateActive = item.action" v-model="popupCreateActive"
        >
          {{ item.title }}
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  name: 'ButtonDropDown',
  props:
    {
    title: String,
    itemOne: String,
    items: Array,
    value: false
  },
  computed: {
    popupCreateActive: {
      get() {
        return this.value
      },
      set(value){
        this.$emit("input", value);
      }
    },
    popupCreateTaskActive: {
      get() {
        return this.value
      },
      set(value){
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss">
.con-vs-dropdown--menu {
  width: 18rem !important;
}
.dropdown-button-container {
  display: flex;
  align-items: center;

  .btnx {
    border-radius: 5px 0px 0px 5px;
  }
  .color-text-menu {
    color: #22215b;
  }
  .btn-drop {
    border-radius: 0px 5px 5px 0px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
