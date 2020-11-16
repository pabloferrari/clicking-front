<template>
  <div class="subjects">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ subject }}</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>
    <div class="mt-0">
      <vs-tabs v-model="tab.value">
        <vs-tab label="Muro">
          <div class="tab-content-wall">
            <div></div>
          </div>
        </vs-tab>
        <vs-tab label="Clases">
          <div class="tab-content-classes">
            <div>
              <Collapse :items="this.items"></Collapse>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>

<script>
import Collapse from "../components/Collapse";
import CardWelcome from "../components/CardWelcome";
export default {
  name: "Subject",
  components: {
    CardWelcome,
    Collapse,
  },
  props: {
    subject: String,
  },

  data() {
    return {
      tab: {
        value: 1,
      },
      cardsWelcome: [
        {
          icon: "",
          title: "Asistencia",
          count: 3,
        },
        {
          icon: "",
          title: "Tareas",
          count: 1,
        },
      ],
      items: [
        {
          id: 1,
          title: "1. Numeros Reales",
        },
        {
          id: 2,
          title: "2. Numeros Primos",
        },
      ],
    };
  },
};
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
