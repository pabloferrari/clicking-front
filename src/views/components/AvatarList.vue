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

      <span class="mb-4">
        <p class="ml-3 font-bold text-color-title-avatar">Alumnos</p>
        <small class="ml-3 text-color-legend font-medium"
          >{{ this.countAvatar() }} {{ description }}</small
        >
      </span>
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
      studentData: [],
      // dataAvatarList: [],
    };
  },
  mounted() {
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
      if (this.dataAvatarList) {
        this.dataAvatarList.map((element) => {
          avatarParse.push({
            id: element.student.id,
            name: element.student.name,
            image: "",
          });
        });
        this.studentData = avatarParse;
      }
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

<style style="sccs">
.text-color-title-avatar {
  color: #22215b;
}
</style>
