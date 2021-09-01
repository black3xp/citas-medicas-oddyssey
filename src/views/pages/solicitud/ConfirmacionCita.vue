<template>
    <div class="container">
        <img class="check" src="../../../../src/assets/check.svg" alt="">
        <h3>Su cita se ha realizado correctamente</h3>
        <p>Al venir a la cita, tenga a mano sus documentos de identidad (Tales como Cedula y Seguro)</p>
        <div class="col-12 text-center mt-5">
            <router-link :to="'/'" class="btn btn-outline-primary">
            Tomar otra cita
        </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ConfirmacionCita'
}
</script>
<style lang="less" scoped>
    .check{
        width: 60px;
        margin: 50px auto;
        display: block;
    }
    h3{
        color: #32bea6;
        text-align: center;
    }
    p{
        text-align: center;
        color: #858786;
    }
</style>