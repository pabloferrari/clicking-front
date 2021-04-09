<template>
  <div id="Library" class="grid-layout-container alignment-block">
    <div class="vx-row my-4">
      <div class="vx-col w-full">
        <p class="primary">Biblioteca</p>
      </div>
    </div>
    <div class="grid justify-items-end my-6">
      <vs-button
        color="primary"
        size="small"
        v-permission="['teacher', 'institution']"
        class="font-semibold btn-right"
        icon="icon-plus"
        icon-pack="feather"
        type="border"
        @click="activePrompt = true"
        >Crear Articulo</vs-button
      >
    </div>
    <vx-card>
      <div class="">
        <div class="w-full mt-3 rounded-lg">
          <div class="w-full" v-if="dataLibraries.length > 0">
            <CardLibrary
              v-for="(libraries, index) in dataLibraries"
              :key="index"
              :data="libraries"
            ></CardLibrary>
          </div>
          <div v-else class="w-full text-center">
            <h4>No se encontraron resultados</h4>
          </div>
        </div>
      </div>
    </vx-card>

    <!-- Popup Publish Create -->
    <vs-prompt
      @accept="accept"
      title="Crear Artículo"
      accept-text="Guardar"
      cancel-text="Cancelar"
      :active.sync="activePrompt"
    >
      <CreateLibrary
        ref="CreateLibrary"
        @close-modal="closeModal()"
      ></CreateLibrary>
    </vs-prompt>
  </div>
</template>

<script>
// import NewsCreate from './NewsCreate'
// import ListInformation from '../components/Posts/List'
import { mapGetters } from 'vuex'
import moment from 'moment'
import CardLibrary from './CardLibrary'
import CreateLibrary from './CreateLibrary'

export default {
  name: 'Library',
  components: {
    CardLibrary,
    CreateLibrary
  },
  data () {
    return {
      activePrompt: false,
      dataLibraries: [],
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
          title: element.article,
          description: element.description,
          date:this.formatDateTime(element.created_at),
          url: element.url
        })
      })

      this.dataLibraries = rows
    }
  },
  methods: {
    accept () {
      this.activePrompt = true
      this.$refs.CreateLibrary.save()
      // console.log()
      // this.description = ''
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM/YYYY hh:mm A')
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

.border-bottom-comment {
  border-bottom: 1px solid #ccc;
  width: 95%;
  margin: 0 auto;
}
</style>
