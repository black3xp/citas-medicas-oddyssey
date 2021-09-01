<template>
  <router-view/>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
@import './assets/less/generales.less';
body{
  background-color: @color-fondo-app;
  font-family: @tipo-letra-global;
}
.form-control{
  border-radius: @borde-redondo;
  height: 45px;
}
.form-control:focus{
    box-shadow: none;
}
.card{
  border-radius: @borde-redondo;
  -webkit-box-shadow: 0px 13px 37px -23px rgba(109,100,255,1);
-moz-box-shadow: 0px 13px 37px -23px rgba(109,100,255,1);
box-shadow: 0px 13px 37px -23px rgba(109,100,255,1);
  .card-text{
    font-weight: 200;
  }
}
.card.bg-primary{
    background: @card-primary-color !important;
    background: @card-primary-gradient !important;
  }
.carga{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 100;
  text-align: center;
  padding-top: 200px;
}
</style>
