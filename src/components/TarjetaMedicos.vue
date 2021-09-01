<template>
    <div class="col-12 mb-3">
          <router-link :to="`/solicitud/cita/${idConsultorio}`" class="link-tarjeta">
            <div class="card text-white bg-primary mb-3">
              <div class="card-body">
                <h5 class="card-title">{{descripcion}}</h5>
                <small v-if="empresa">{{empresa}}</small>
                <p class="card-text" v-if="servicios">{{servicios}}</p>
                <p class="card-text mt-2" v-else>No hay servicios registrados</p>
              </div>
            </div>
          </router-link>
    </div>
</template>
<style lang="less" scoped>
@import '../assets/less/generales.less';
  .link-tarjeta{
    text-decoration: none;
  }
  .link-tarjeta:hover{
    text-decoration: none;
  }
    h5{
    font-weight: 300;
    margin-bottom: 0px;
  }
  small{
      margin-bottom: 5px;
      display: block;
      font-weight: 100;
      border-bottom: 0.1pt solid @color-fondo-app;
  }
</style>
<script>
export default {
  props: ['descripcion', 'empresa', 'servicios', 'idConsultorio']
}
</script>