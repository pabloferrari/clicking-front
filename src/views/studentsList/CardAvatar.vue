<template>
  <div class="student-list-card" @click="activeDetail()">
    <div class="flex justify-between">
      <div class="justify-start">
        <vs-avatar class="student-list-avatar" size="large" :src="avatar" />
        <div class="student-list-name">
          {{ name }}
        </div>
      </div>
      <div class="justify-end my-2">
        <feather-icon
          v-permission="['institution', 'teacher']"
          v-if="type === 'student'"
          icon="TrashIcon"
          svgClasses="h-5 w-5 m-4 hover:text-danger cursor-pointer"
          @click="deleteStudent(id)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardAvatar",
  props: {
    cardsStudent: [],
    name: String,
    avatar: String,
    type: String,
    id: Number,
  },
  methods: {
    deleteStudent(id) {
      this.$store.dispatch("course/deleteStudentCourse", id);
    },
    activeDetail() {
      this.$emit("student-list-card");
    },
  },
};
</script>

<style>
.student-list-card {
  position: relative;
  width: 473px;
  height: 72px;
  background: #ffffff;
  border-radius: 30px;
  border: solid 2px #fff;
}
.student-list-card:hover {
  border: solid 2px #567df4;
  outline: none;
  cursor: pointer;
}
.student-list-card .student-list-avatar {
  margin-top: 10px;
  margin-left: 20px;
}
.student-list-card .student-list-name {
  position: absolute;
  left: 90px;
  top: 28.98%;
  bottom: 68.59%;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
}
</style>
