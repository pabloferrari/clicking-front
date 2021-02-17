<template>
  <div id="form-model" class="grid-layout-container alignment-block">
    <div class="vx-row my-4">
      <div class="vx-col w-full">
        <p class="primary">Noticias</p>
      </div>
    </div>
    <!-- Input text for send post -->
    <div class="vx-row" v-permission="['institution']">
      <InputTypping ref="InputTypping" @handler-publish="showModalPublish()"></InputTypping>
    </div>
    <!-- List of Posts Publish Institutions -->
    <div class="vx-row my-4">
      <vx-card v-if="this.dataList.length > 0" >
          <ListInformation v-for="(posts, index) in this.dataList"  :key="index" :data="posts"  ></ListInformation>
      </vx-card>
      <vx-card v-else>
        <h4 class="text-center">No se encontraron resultados</h4>
      </vx-card>
    </div>
    <!-- Popup Publish Create -->
    <vs-prompt
      @accept="accept"
      title="Crear Noticia"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <NewsCreate
      @close-modal="closeModal()"
      :description="this.description"
      ref="NewsCreate"></NewsCreate>
    </vs-prompt>
  </div>
</template>

<script>
import InputTypping from '../components/Posts/InputTypping'
import NewsCreate from './NewsCreate'
import ListInformation from '../components/Posts/ListNews'
import { mapGetters } from 'vuex'
import  moment  from 'moment'

export default {
  name: 'News',
  components: {
    NewsCreate,
    InputTypping,
    ListInformation
  },
  data () {
    return {
      activePrompt: false,
      dataList: [],
      description: '',
      baseUrl: process.env.VUE_APP_BASE_URL_STORAGE
    }
  },
  computed: {
    ...mapGetters({
      storeNews: 'news/getNews'
    })
  },
  watch: {
    storeNews (data) {
      const rows = []
      data.map((element) => {
        rows.push({
          title: element.title,
          description: element.description,
          date:  this.formatDateTime(element.date),
          user: element.user.name,
          image: element.user.image ? element.user.image : '',
          url: element.file_news ? element.file_news.url : '#'
        })
      })

      this.dataList = rows
    }
  },
  methods: {
    accept () {
      this.activePrompt = true
      this.$refs.NewsCreate.save()
      // console.log()
      // this.description = ''
    },
    showModalPublish () {
      this.activePrompt = true
      this.description = this.$refs.InputTypping.textarea
      // console.log(this.$refs.InputTypping.textarea)
    },
    closeModal () {
      this.activePrompt = false
    },
    getNews () {
      this.$store.dispatch('news/getNewsData')
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM hh:mm A')
    }
  },

  mounted () {
    this.getNews()
  }
}
</script>


<style lang="scss" scoped>
.primary {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 44px;
  display: flex;
  align-items: center;
  color: #567df4;
}
</style>
