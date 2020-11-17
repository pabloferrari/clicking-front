<template>
  <div class="vx-row">
    <vx-card>
      <div class="w-full backgroud-internal mt-3">
        <div class="">
          <p class="ml-2 p-3">11.30 PM</p>
          <p class="p-3 ml-2 font-bold text-title">Comentario</p>
          <p class="p-3 ml-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            consectetur voluptatum corrupti hic praesentium numquam tempore
            nihil vel ab consequuntur, odit ullam error tempora cumque! Corporis
            quasi officia deserunt accusamus.
          </p>
        </div>
        <div class="flex p-3 ml-2">
          <ul class="user-comments-list">
            <li class="commented-user flex items-center mb-4">
              <div class="mr-3"><vs-avatar class="m-0" size="30px" /></div>
              <div class="leading-tight">
                <p class="font-bold text-title">Auther Red</p>
                <span class="text-xs"
                  >Lorem ipsum dolor sit, amet consectetur adipisicing
                  eli.</span
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="flex flex-wrap mb-3">
          <div class="w-full px-3">
            <div class="w-1/4">
              <!-- <div class="mr-3 ml-2"><vs-avatar class="m-0" size="30px" /></div> -->
            </div>
            <div class="">
              <vs-input
                icon-pack="feather"
                icon="icon-send"
                icon-after
                vs-icon-after="true"
                placeholder="Añadir Comentario"
                v-model="commentResponse"
                icon-no-border
                class="px- py-2"
              />
            </div>
          </div>
        </div>

        <!-- <div class="vx-col mb-2 ml-2 w-full">
          <
        </div> -->
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  name: "WallComment",

  data() {
    return {
      commentResponse: null,
    };
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
