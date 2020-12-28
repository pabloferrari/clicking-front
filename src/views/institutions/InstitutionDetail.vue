<template>
  <div class="institution__detail">
    <div id="form-model" class="grid-layout-container alignment-block">
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="primary">{{ storeInstitution.name }}</p>
        </div>
      </div>
    </div>

    <div class="vx-row">
      <vs-tabs class="">
        <vs-tab label="Docentes">
          <div class="tab-content-courses">
            <div>
              <Teachers :titleHide="true" :institutionID="this.id"></Teachers>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Alumnos">
          <div class="tab-content-workshop">
            <Students :titleHide="true" :institutionID="this.id"></Students>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import Teachers from '../teachers/Teachers.vue'
import Students from '../students/Students.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'InstitutionDetail',
  props: {
    id: String
  },
  components: {
    Teachers,
    Students
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    ...mapGetters({ storeInstitution: 'institution/getInstitution' })
  },
  methods: {
    getInstution() {
      this.$store.dispatch('institution/getInstitutionById', this.id)
    }
  },
  mounted() {
    this.getInstution()
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
