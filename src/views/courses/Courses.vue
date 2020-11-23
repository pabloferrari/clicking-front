<template>
  <div id="courses">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">Mis Cursos</p>
      </div>
    </div>
    <CardWelcome :cardsWelcome="this.cardsWelcome"></CardWelcome>

    <div class="mt-0">
      <vs-tabs>
        <vs-tab label="Cursos">
          <div class="tab-content-courses">
            <div>
              <Card :cards="this.course"> </Card>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Talleres">
          <div class="tab-content-workshop">
            <div>
              <Card :cards="this.workshop"></Card>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script>
import CardWelcome from '../components/CardWelcome'
import CourseLogo from '../../assets/icons/CourseLogo'
import PencilLogo from '../../assets/icons/PencilLogo'
import CheckLogo from '../../assets/icons/CheckLogo'
import DocumentLogo from '../../assets/icons/DocumentLogo'
import Card from '../components/Card'
import Tabs from '../components/Tabs'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default {
  name: 'courses',
  components: {
    StatisticsCardLine,
    CardWelcome,
    CourseLogo,
    Card,
    Tabs
  },

  data () {
    return {
      cardsWelcome: [
        {
          icon: CourseLogo,
          title: 'Cursos',
          count: 3,
          component: Card
        },
        {
          icon: DocumentLogo,
          title: 'Estudiantes',
          count: 12
        },
        {
          icon: PencilLogo,
          title: 'Tareas',
          count: 1
        },
        {
          icon: CheckLogo,
          title: 'Examenes',
          count: 1
        }
      ],
      course: [
        {
          title: 'Matematica',
          subtitle: 'Comision A - Turno Mañana',
          buttonTitle: 'Ir a curso',
          href: '/courses/Matematica'
        },
        {
          title: 'Lenguaje',
          subtitle: 'Comision A - Turno Tarde',
          buttonTitle: 'Ir a curso',
          href: '/courses/Lenguaje'
        }
      ],
      workshop: [
        {
          title: 'Programacion',
          subtitle: 'Comision A - Turno Mañana',
          buttonTitle: 'Ir a taller'
        },
        {
          title: 'Lenguaje',
          subtitle: 'Comision A - Turno Tarde',
          buttonTitle: 'Ir a taller'
        }
      ],
      tabs: [
        {
          title: 'Cursos'
        },
        {
          title: 'Talleres'
        }
      ]
    }
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
