<template>
  <div class="toolbars">
    <div class="flex space-x-4">
      <vs-button
        icon-pack="feather"
        icon="icon-play"
        color="primary"
        type="border"
      >
        <span class="font-semibold">Clase Grabada </span></vs-button
      >
      <vs-button
        color="primary"
        type="border"
        icon-pack="feather"
        icon="icon-folder"
      ></vs-button>
      <feather-icon
        icon="MoreVerticalIcon"
        svgClasses="h-5 w-5 cursor-pointer"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbars'
}
</script>
