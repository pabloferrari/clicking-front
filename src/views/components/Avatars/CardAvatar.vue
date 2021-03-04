<template>
  <div class="student-list-card" @click="onActiveCard">
    <vs-avatar
      class="student-list-avatar"
      size="large"
      :src="this.imageEmpty(avatar)"
    />
    <div class="student-list-name">
      {{ name }}
      <!-- <div class="text-right"> -->
      <!-- </div> -->
      <div class="flex justify-end text-status">
        <small
          :class="
            'text-right text-status ' + this.colorStatus(idAssignmentStatus)
          "
          >{{ nameStatus }}</small
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAvatar',
  props: {
    cardsStudent: [],
    name: String,
    avatar: String,
    nameStatus: String,
    idAssignmentStatus:Number
  },
  methods: {
    imageEmpty (image) {
      return image !== null ? image : ''
    },
    colorStatus (id) {
      switch (id)  {
      case 1:
        return 'text-danger'
      case 2:
        return 'text-primary'
      case 3:
        return 'text-success'
      case 4:
        return 'text-purple'
      }
    },
    onActiveCard () {
      this.$emit('active-card')
    }
  }
}
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
  width: 70%;
  line-height: 25px;
}
.text-status {
  margin-top: -0.9rem;
}
</style>
