<template>
  <div class="flex justify-between">
      <div class="flex items-center">

          <ul class="users-liked user-list ml-3 sm:ml-6">
              <li v-for="(user, userIndex) in post.usersLiked" :key="userIndex">
                  <vx-tooltip :text="user.name" position="bottom">
                      <vs-avatar :src="user.img" size="30px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                  </vx-tooltip>
              </li>
          </ul>
          <small class="ml-2">+{{ post.likes - 5 }} {{ description }}</small>
      </div>
  </div>
</template>

<script>
  export default {
    name: "AvatarList",
    props: {
      post: null,
      description: String
    },
  };
</script>
