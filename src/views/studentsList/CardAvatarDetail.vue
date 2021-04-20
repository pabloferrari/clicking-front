<template>
  <div class="student-list-card-detail">
    <vs-avatar class="student-list-card-detail-avatar" :src="avatar"/>

    <div class="student-list-card-detail-name">
      {{name}}
    </div>

    <div class="student-list-card-detail-name-rol">
      {{rol}}
    </div>

    <div class="student-list-card-detail-name-rol">
      {{ email }}
    </div>

    <div v-if="sn.linkedin" class="student-list-card-detail-name-rol">
      {{ sn.linkedin }}
    </div>

    <div class="student-list-card-detail-in">
      <LinIcon />
    </div>
    <div class="student-list-card-detail-msg">
      <EmailIcon />
    </div>
  </div>
</template>

<script>

import LinIcon from '../components/icons/LinIcon.vue'
import EmailIcon from '../components/icons/EmailIcon.vue'

export default {
  name: 'CardAvatarDetail',
  components: {
    LinIcon,
    EmailIcon
  },
  props: {
    name: String,
    rol: String,
    description: String,
    email: String,
    avatar: String,
    linkedin: String,
    sn: Object
  }
}
</script>

<style>
  .student-list-card-detail{
    width: 473px;
    height: 373px;
    left: 869px;
    top: 274px;
    background: #FFFFFF;
    border-radius: 30px;
    padding: 50px;
  }
  .student-list-card-detail-avatar{
    width: 100.79px;
    height: 100.79px;
    background-blend-mode: normal;
  }
  .student-list-card-detail .student-list-card-detail-name{
    position: relative;
    display: initial;
    top: -50px;
    left: 20px;
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 37px;
    color: #22215B;
  }
  .student-list-card-detail-name-rol {
    position: relative;
    /* display: initial; */
    top: -50px;
    left: 140px;
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    color: #22215B;
  }
  .student-list-card-detail-description{
    font-family: Gilroy;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 140.1%;
    display: flex;
    align-items: center;
    color: rgba(34, 33, 91, 0.6);
  }
  .student-list-card-detail-in{
    position: relative;
    display: initial;
    top: 20px;
    left: 120px;
    padding: 5px;
    /* border: 3px solid #22215B; */
  }
  .student-list-card-detail-msg{
    position: relative;
    display: initial;
    top: 15px;
    left: 160px;
    padding: 5px;
    /* border: 3px solid #22215B; */
  }
</style>
