<template>
  <div id="form-model" class="grid-layout-container alignment-block">
    <!-- Input text for send comment on Wall -->
    <div class="vx-row" v-permission="['institution', 'teacher']">
      <InputTypping
        ref="InputTypping"
        @handler-publish="sendCommment()"
      ></InputTypping>
    </div>
    <!-- List of Posts Publish Institutions -->
    <div class="vx-row my-4">
      <vx-card>
        <ListInformation
          v-for="(posts, index) in this.dataList"
          :key="index"
          :data="posts"
          :componentDynamic="mountComponentComment"
          :componentDynamicProps="posts.child"
          :modelProps="{
            modelId: subjectId,
            childrenId: posts.id.toString(),
            modelName: 'courses',
          }"
        ></ListInformation>
      </vx-card>
    </div>
  </div>
</template>

<script>
import InputTypping from '../components/Posts/InputTypping'
import ListInformation from '../components/Posts/List'
import CommentResponse from '../components/Posts/CommentResponse'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Wall',
  components: {
    InputTypping,
    ListInformation
  },
  props: {
    subjectId: String
  },
  data () {
    return {
      activePrompt: false,
      dataList: [],
      description: '',
      mountComponentComment: CommentResponse
    }
  },
  computed: {
    ...mapGetters({
      storeComments: 'comment/getComments'
    })
  },
  watch: {
    storeComments (data) {
      const rowsCourses = []

      console.log(data)
      data.map((Elementcourse) => {
      // if (element.courses) {
        rowsCourses.push({
          id: Elementcourse.id,
          title: 'Comentario',
          description: Elementcourse.comment,
          image: Elementcourse.user.image ? Elementcourse.user.image : '',
          user: Elementcourse.user.name,
          dateOrder:Elementcourse.created_at,
          date: this.formatDateTime(Elementcourse.created_at),
          child: Elementcourse.child

        })
      })
      const parseCourse = rowsCourses.sort((a, b) => new Date(b.dateOrder )> new Date(a.dateOrder) ? 1: -1);
      this.dataList = parseCourse
    }
  },
  methods: {
    arraySort(data) {
      data.sort((a,b) => {
        const date1 = new Date(a.date)
        const date2 = new Date(b.date)
        return date1 - date2
      })
    },
    accept () {
      this.activePrompt = true
      this.$refs.NewsCreate.save()
      // console.log()
      // this.description = ''
    },
    sendCommment () {
      const payload = {
        comment: this.$refs.InputTypping.textarea,
        model_id: this.subjectId,
        model_name: 'courses'
      }
      this.$store
        .dispatch('comment/createComment', payload)
        .then(response => {
          // console.log(response)
          if (response) {
            this.description = ''
            // this.$refs.InputTypping.textarea = ''
            // this.$refs.InputTypping.textarea.reset()
          }
        })
        .catch(errr => console.log(errr))
      // console.log(payload)
      // this.description = this.$refs.InputTypping.textarea
      // console.log(this.$refs.InputTypping.textarea)
    },
    closeModal () {
      this.activePrompt = false
    },
    getCommentByCourse () {
      this.$store.dispatch('comment/getCommentByCourseData', this.subjectId)
    },
    formatDateTime (datetime) {
      if (!datetime) {
        return null
      }
      return moment(String(datetime)).format('DD/MM hh:mm A')
    }
  },

  mounted () {
    this.getCommentByCourse()
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
