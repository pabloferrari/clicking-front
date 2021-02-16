<template>
  <!-- <div class="vx-row"> -->
  <!-- <vx-card> -->
  <div class="w-full backgroud-internal mt-3 rounded-lg">
    <div class="img-news">
        <img v-if="data.url != '#'" :src="data.url">
    </div>
    <div class="">
      <p class="ml-1 p-3">
        <feather-icon icon="ClockIcon" svgClasses="h-4 w-4 m-0" />
        {{  data.date }}
      </p>
      <p class="p-3 ml-2 font-bold text-title">{{ data.title }}</p>
      <p class="p-3 ml-2">
        {{ data.description }}
      </p>
    </div>
    <div class="flex p-3 ml-3 mt-1 pb-0">
      <ul class="user-comments-list ">
        <li class="commented-user flex items-center mb-4">
          <div class="mr-3">
            <vs-avatar class="m-0" size="30px" :src="data.image" />
          </div>
          <div class="leading-tight">
            <p class="font-bold text-title">{{ data.user }}</p>

          </div>
        </li>
      </ul>
    </div>
    <div v-if="componentDynamic" class="border-bottom-comment mb-3"></div>
    <component v-if="componentDynamic"
    :is="this.componentDynamic"
    v-bind="{
      childData:componentDynamicProps,
      modelId:modelProps.modelId,
      childrenId:modelProps.childrenId,
      modelName:modelProps.modelName,
      activeComment:true
      }"></component>
  </div>
  <!-- </vx-card> -->
  <!-- </div> -->
</template>

<script>

export default {
  name: 'ListInformation',
  props: {
    data: Object,
    componentDynamic: Object,
    componentDynamicProps: Array,
    modelProps: Object
  },

  mounted () {
    console.log(this.componentDynamicProps)
  },

  data () {
    return {
      commentResponse: null
    }
  }
}
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
.border-bottom-comment {
  border-bottom: 1px solid #ccc;
  width: 95%;
  margin: 0 auto;
}

/* .img-news {
  width: 100%;
  height: 234px;
  left: 398px;
  top: 381px;
  background:#C4C4C4;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 150%;
  border-radius: 15px;
} */
.img-news {
  border-radius: 15px;
  background:#C4C4C4;
}

.img-news img{
  border-radius: 15px;
  width: 100%;
  height: 234px;
}

</style>
