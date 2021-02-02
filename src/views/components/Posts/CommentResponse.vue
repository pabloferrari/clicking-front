<template>
  <div>
    <div class="flex mb-3">
      <div class="w-full ml-2">
        <!-- <div class="flex"> -->
        <CommentChild
          v-for="(comment, index) in this.childs"
          :key="index"
          :comment="comment.comment"
          :img="comment.user.image"
          :user="comment.user.name"
        ></CommentChild>
        <!-- </div> -->
        <div class="chat__input flex p-4">
          <div class="">
            <div class="mr-3 ml-2">
              <vs-avatar class="m-0" size="30px" :src="avatarImg" />
            </div>
          </div>

          <vs-input
            class="flex-1"
            icon-pack="feather"
            icon="icon-send"
            icon-no-border
            icon-after
            :disabled="!activeComment"
            placeholder="Añadir comentario..."
            v-on:keyup.enter="handlerSubmit"
            v-model="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CommentChild from './CommentChild'

export default {
  name: 'CommentResponse',

  props: {
    avatarImg: String,
    activeComment: Boolean,
    childData: Array,
    userStudentId: String,
    modelId: {
      type: String,
      required: false
    },
    childrenId: {
      type: String,
      required: false
    },
    modelName: String
  },
  components: {
    CommentChild
  },
  data () {
    return {
      comment: '',
      childs: this.childData,
      modelNameType:
        this.modelName === 'courses' ? 'createComment' : 'createCommentFromAssignment'
    }
  },
  methods: {
    handlerSubmit (e) {
      e.preventDefault()
      const payload = {
        comment: this.comment,
        model_id: this.modelId,
        children_id: this.childrenId,
        model_name: this.modelName,
        to_user_id: this.userStudentId
      }
      console.log(payload)

      this.$store
        .dispatch(`comment/${this.modelNameType}`, payload)
        .then(response => {
          if (response) {
            this.comment = ''
          }
        })
        .catch(err => console.log(err))
      // console.log(this.comment)
    }
  },
  mounted () {
    // console.log(this.childData.comments)
  }
}
</script>
