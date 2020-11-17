<template>
  <div class="vx-row">
    <vx-card>
      <div class="flex">
        <div class="">
          <div class="w-1/2">
            <vs-avatar class="m-6" size="30px" />
          </div>
        </div>
        <div class="w-full">
          <vs-textarea height="50px" label="Escribe aquí" v-model="textarea" />
        </div>
      </div>
      <div class="mt-2 flex flex-wrap items-center justify-end">
        <div class="">
          <vs-button size="small">Publicar</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  name: "Wall",

  data() {
    return {
      textarea: "",
    };
  },
};
</script>
