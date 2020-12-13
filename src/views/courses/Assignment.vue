<template>
  <div class="">
    <div class="vx-row">
      <div class="vx-col w-full">
        <p class="primary">{{ titleAssignment }}</p>
      </div>
    </div>

    <div class="flex">Contenido Izquierda</div>

    <div class="flex justify-end">
      <vx-card class="w-1/3">
        <h2 class="font-bold">Trabajo</h2>

        <div class="flex p-2 backgroud-internal rounded space-y-4">
          <h6>Asignacion</h6>

          <p class="">Hola</p>
        </div>

        <div class="vx-col w-full my-2">
          <vs-button class="w-full" type="border">Devolver</vs-button>
        </div>

        <div class="vx-col w-full">
          <vs-button class="w-full">Corregir</vs-button>
        </div>
      </vx-card>
    </div>
    <div class="flex">Contenido Inferior</div>
  </div>
</template>

<script>
export default {
  name: 'Assignment',

  data () {
    return {
      titleAssignment: 'Titulo Asignacion'
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
.backgroud-internal {
  background: #eef7fe;
}
</style>

