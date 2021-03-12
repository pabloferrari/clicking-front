<template>
    <div class="con-exemple-prompt">
        <div class="w-full p-2">
            <vs-input
                class="w-full"
                label-placeholder="Enlace Google Meet o Zoom"
                v-model="form.link"
                name="Enlace Google Meet o Zoom"
                v-validate="'required'"
                :danger="errors.has('link')"
            />
            <span
                class="text-danger text-sm"
                v-show="errors.has('link')"
                >{{ errors.first("Enlace") }}</span
            >
        </div>
    </div>
</template>

<script>
export default {
  name: 'LinkForm',
  props: {
    classId: Number
  },
  data () {
    return {
      form: {
        link: null,
        model_id: null,
        model: 'class'
      }
    }
  },
  methods: {
    saveLink () {
      this.create()
    },
    closeModalClass () {
      this.$emit('close-modal-class')
    },
    create () {
      this.form.model_id = this.$props.classId;
      const payload = this.form;
      this.$store.dispatch('meeting/create', payload);
    }
  }
}
</script>
