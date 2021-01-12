<template>
  <div>
    <div class="flex mb-3">
      <div class="w-full ml-2">
        <!-- <div class="flex"> -->
        <CommentChild
          v-for="(comment, index) in this.childData"
          :key="index"
          :comment="comment.comment"
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
    childData: Array
  },
  components: {
    CommentChild
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    handlerSubmit(e) {
      const payload = {
        comment: this.comment,
        model_id: 18,
        model_name: 'courses'
      }
      e.preventDefault()
      this.$store
        .dispatch('comment/createComment', payload)
        .then(response => {
          // console.log(response)
          this.comment = ''
        })
        .catch(err => console.log(err))
      // console.log(this.comment)
    }
  },
  mounted() {
    // console.log(this.childData.comments)
  }
}
</script>
