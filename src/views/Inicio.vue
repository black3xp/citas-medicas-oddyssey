<template>
  <div class="home">
    <div class="container">
      <h2 class="mt-4 mb-3">Seleccione su m&eacute;dico</h2>
      <div class="mb-4">
        <input type="search" v-on:input='cargarConsultorios' v-model="inpBusqueda" class="form-control" placeholder="Buscar por nombre">
      </div>
      <div class="row" >
        <div class="cargador text-center" v-show="cargador">
          <Loader></Loader>
        </div>
        <div class="col-lg-12" v-show="error">
          <div class="error-server">
            <img src="../../src/assets/error.svg" alt="">
            <p>Ocurrio un error conectando al servidor, intente de nuevo mas tarde</p>
        </div>
        </div>
        <!--componente tarjeta medico-->
        <TarjetaMedico v-for="(consultorio, index) in consultorios" 
          v-bind:key="index" :descripcion="consultorio.descripcion" 
          :empresa="consultorio.empresa" :servicios="consultorio.serviciosConsultorios" :idConsultorio="consultorio.id"></TarjetaMedico>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TarjetaMedico from '../components/TarjetaMedicos.vue'
import axios from 'axios'
import Loader from '../components/Loader.vue'
export default {
  name: 'Inicio',
  components: {
    TarjetaMedico,
    Loader
  },
  data(){
    return {
      consultorios: [],
      inpBusqueda: '',
      cargador: false,
      error: false
    }
  },
  mounted(){
    this.cargarConsultorios()
  },
  methods: {
    cargarConsultorios: function(){
      this.cargador = true;
      this.consultorios = []
      this.error = false
      let buscar = this.inpBusqueda || ''
      setTimeout(()=>{
        axios.get(`https://medapp-api.cthrics.com/api/consultorios/?busqueda=${buscar}`)
        .then(res => {
          this.consultorios = res.data
          this.cargador = false
        })
        .catch(err =>{
          if(err){
            this.cargador = false
            this.error = true
          }
        })
      },1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/generales.less';
  h2{
    font-weight: 300;
  }

  .alert{
    border-radius: @borde-redondo;
    border: none;
    color: #cf193a;
  }

  .error-server{
    color: #949494;
  }

  .error-server img{
    width: 70px;
    display: block;
    margin: 100px auto 0 auto;
  }

  .error-server p{
    text-align: center;
    width: 200px;
    margin: 20px auto;
  }

</style>
