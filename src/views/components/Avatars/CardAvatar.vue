<template>
  <div class="student-list-card" >
    <vs-avatar class="student-list-avatar" size="large" :src="image"/>
    <div class="student-list-name">
      {{name}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardAvatar',
  props: {
    cardsStudent: [],
    name: String,
    avatar: String
  },
  methods: {
    activeDetail () {
      this.$emit('student-list-card')
    }
  }
}
</script>

<style>
  .student-list-card{
    position: relative;
    width: 473px;
    height: 72px;
    background: #FFFFFF;
    border-radius: 30px;
    border: solid 2px #fff;
  }
   .student-list-card:hover{
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
