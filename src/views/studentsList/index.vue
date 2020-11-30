<template>
  <div class="vx-row">

    <div class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8">

      <div id="form-model" class="principal-title mb-10">
        <div class="vx-row">
          <div class="vx-col w-full">
            <p class="primary">Docente</p>
          </div>
        </div>
      </div>

      <!-- CardAvatar -->
      <CardAvatar
      v-for="(card, index) in cardsTeacher"
      :key="'A'+index"
      :name="card.name"
      :avatar="card.avatar"
      />

      <div id="form-model" class="principal-title mb-10 mt-10">
        <div class="vx-row">
          <div class="vx-col w-full">
            <p class="primary">Alumnos</p>
          </div>
        </div>
      </div>

      <!-- CardAvatar -->
      <CardAvatar
      v-for="(card, index) in cardsStudent"
      :key="index"
      :name="card.name"
      :avatar="card.avatar"
      class="mt-5"
      />

    </div>

    <div class="vx-col lg:block sm:w-full md:w-full lg:w-1/2 mb-auto mx-auto self-center mt-8">

      <!-- CardAvatarDetail -->
      <CardAvatarDetail
       v-for="(card, index) in cardsDetail"
       :key="'C'+index"
       :name="card.name"
       :description="card.description"
       :rol="card.rol"
      />

    </div>

  </div>
</template>

<script>

//import { mapGetters } from 'vuex'
import CardAvatar from './CardAvatar'
import CardAvatarDetail from './CardAvatarDetail'

export default {
  name: 'studentsList',
  components: {
    CardAvatar,
    CardAvatarDetail
  },
  data () {
    return {
      cardsTeacher:[
        {
          name: 'Teacher name',
          avatar: 'https://i.imgur.com/ezM6SJ5.png'
        }
      ],
      cardsStudent: [
        {
          name: 'Usuario 1',
          avatar: 'https://i.imgur.com/ezM6SJ5.png'
        },
        {
          name: 'Usuario 2',
          avatar: 'https://i.imgur.com/ezM6SJ5.png'
        },
        {
          name: 'Usuario 3',
          avatar: 'https://i.imgur.com/ezM6SJ5.png'
        }
      ],
      cardsDetail: [
        {
          name: 'Pedro Pablo',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ea dolore, voluptate modi optio repudiandae animi error? Praesentium quod harum, consequatur sequi expedita eveniet sunt libero doloremque debitis placeat ipsa.',
          rol: 'Docente'
        }
      ]
    }
  }
}
</script>

<style lang="css" >
  .principal-title {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #22215B;
  }
</style>
