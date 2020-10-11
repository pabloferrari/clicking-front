<template>
  <div id="form-form">
    <form action="form" method="post">
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-input
            class="w-full"
            label-placeholder="Nombre Plan"
            v-model="form.name"
            name="name"
            v-validate="'required'"
            :danger="errors.has('name')"
          />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>
        </div>
      </div>
      <div class="vx-row mb-2">
        <div class="vx-col w-full">
          <vs-checkbox v-model="form.active">Activo</vs-checkbox>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
// import { mapGetters } from 'vuex'
export default {
  name: "PlansCreate",
  props: {
    isCreate: Boolean,
    plan: {},
  },

  data() {
    return {
      form: {
        id: null,
        name: "",
        active: 1,
      },
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      if (this.plan) {
        this.form = Object.assign({}, this.plan);
      }
    },
    save() {
      if (!this.isCreate) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const payload = this.form;
          this.$store.dispatch("plan/createPlan", payload);
          //this.$emit("close-modal");
        }
      });
    },

    update() {
      const payload = this.form;
      this.$store.dispatch("plan/updatePlan", payload);
      //this.$emit("close-modal");
    },
  },
};
</script>
