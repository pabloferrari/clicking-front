<template>
  <div id="Library" class="grid-layout-container alignment-block">
    <div class="vx-row my-4">
      <div class="vx-col w-full">
        <p class="primary">Biblioteca</p>
      </div>
    </div>
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
      title="Crear Artículo"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <!-- <NewsCreate
      @close-modal="closeModal()"
      :description="this.description"
      ref="NewsCreate"></NewsCreate> -->
    </vs-prompt>
  </div>
</template>

<script>
// import NewsCreate from './NewsCreate'
import ListInformation from '../components/Posts/List'
import { mapGetters } from 'vuex'

export default {
  name: 'Library',
  components: {
    // NewsCreate,
    ListInformation
  },
  data () {
    return {
      activePrompt: false,
      dataList: [],
      article: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      storeLibraries: 'library/getLibraries'
    })
  },
  watch: {
    storeLibraries (data) {
      const rows = []
      data.map((element) => {
        rows.push({
          article: element.article,
          description: element.description
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
    getLibraries () {
      this.$store.dispatch('library/getLibraries')
    }
  },

  mounted () {
    this.getLibraries()
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
