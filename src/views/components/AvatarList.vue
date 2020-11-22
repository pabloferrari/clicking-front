<template>
  <div class="flex justify-between">
    <div class="flex items-center">
      <ul class="users-liked user-list ml-1 sm:ml-6">
        <li
          v-for="(avatar, index) in this.studentData.slice(0, 3)"
          :key="index"
        >
          <vx-tooltip :text="avatar.name" position="bottom">
            <vs-avatar
              :src="avatar.image"
              size="30px"
              class="border-2 border-white border-solid -m-1"
            ></vs-avatar>
          </vx-tooltip>
        </li>
      </ul>
      <small class="ml-2">{{ this.countAvatar() }} {{ description }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvatarList",
  props: {
    dataAvatarList: Array,
    description: String,
  },
  data() {
    return {
      studentData: Array,
    };
  },
  created() {
    this.getAvatar();
  },

  methods: {
    countAvatar() {
      const count =
        this.studentData.length - 3 < 0
          ? `${this.studentData.length}`
          : `+ ${this.studentData.length - 3}`;

      return count;
    },

    getAvatar() {
      const avatarParse = [];
      this.dataAvatarList.map((element) => {
        avatarParse.push({
          id: element.student.id,
          name: element.student.name,
          image: "",
        });
      });

      this.studentData = avatarParse;
    },
    getPhoto(user) {
      // console.log(image)
      const pathImageFolder = "@/assets/images/portrait/small/";
      if (user.image === null) {
        require(`@/assets/images/portrait/small/avatar-s-1.jpg`);
        // console.log("no hay imagen");
      } else {
        require(`${pathImageFolder}${user.image}`);
      }
    },
  },
};
</script>
