<template>
  <div class="toolbars">
    <div class="flex space-x-4">
      <vs-button
        icon-pack="feather"
        icon="icon-play"
        color="primary"
        type="border"
      >
        <span class="font-semibold"> {{ titleButton }} </span></vs-button
      >
      <vs-button
        color="primary"
        type="border"
        icon-pack="feather"
        icon="icon-folder"
      ></vs-button>
      <ButtonDropDown :itemsDropdown="itemsDropdown"></ButtonDropDown>
      <!-- <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
        <feather-icon
          icon="MoreVerticalIcon"
          svgClasses="h-5 w-5 cursor-pointer"
        />
        <vs-dropdown-menu class="vx-navbar-dropdown">
          <ul style="min-width: 9rem">
            <li
              class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            >
              <span class="ml-2">Crear Tarea</span>
            </li>
          </ul>
        </vs-dropdown-menu>
      </vs-dropdown> -->
    </div>
  </div>
</template>

<script>
import ButtonDropDown from "./ButtonDropDown";

export default {
  name: "Toolbars",

  props: {
    itemsDropdown: Array,
    titleButton: String,
  },
};
</script>
