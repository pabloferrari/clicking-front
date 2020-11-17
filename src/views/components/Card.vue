<template>
  <div class="vx-row">
    <vx-card
      class="vx-col mx-2 w-full sm:w-1/8 md:w-1/4 lg:w-1/3 xl:w-1/5 title-card active-card my-1"
      v-for="card in cards"
      :key="card.title"
      :title="card.title"
      :subtitle="card.subtitle"
    >
      <div class="flex justify-between mt-2">
        <div class="flex items-start">
          <div v-for="(post, index) in userPosts" :key="index">
            <!-- Avatar More User -->
            <AvatarList :post="post" :description="description"></AvatarList>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex justify-end">
          <vs-button class="" :to="{ path: card.href }" size="small">{{
            card.buttonTitle
          }}</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import AvatarList from '../components/AvatarList'

export default {
  name: 'Card',
  components: {
    AvatarList
  },
  props: {
    cards: Array,
    description: String
  },
  data () {
    return {
      userPosts: [
        {
          likes: 100,
          usersLiked: [
            {
              name: 'Trina Lynes',
              img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
            },
            {
              name: 'Lilian Nenez',
              img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
            },
            {
              name: 'Alberto Glotzbach',
              img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
            }
          ]
        }
      ]
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
.title-card h4 {
  font-weight: 600;
  font-size: 20px;
  color: #22215b;
}
.active-card {
  border: solid 2px #fff;
  border-radius: 30px !important;
  box-sizing: border-box;
}
.active-card:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
</style>
