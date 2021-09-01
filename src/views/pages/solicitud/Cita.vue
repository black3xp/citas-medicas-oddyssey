<template>
    <div>
        <div class="carga" v-if="cargando">
            <Loader></Loader>
        </div>
        <div class="fondo-gradient">
            <div class="container text-white">
                <h2 class="mt-4">Creando cita</h2>
                <h3><strong>{{consultorio}}</strong></h3>
                <small>Completa todos los datos que solicita el formulario</small>
            </div>
        <div class="contenedor-medio">
            <div class="container">
                <h3 class="mt-2">Datos del paciente</h3>
                <form class="mt-4" autocomplete="off" v-on:submit.prevent="crearCita">
                    <div class="mb-3">
                        <label for="sltIdentidad" class="form-label">Cedula / Pasaporte</label>
                        <select class="form-select" v-model="tipoIentidad" required id="sltIdentidad" aria-label="Default select example">
                            <option selected disabled value="">- seleccione tipo de documento -</option>
                            <option value="C">Cedula</option>
                            <option value="P">Pasaporte</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="inpCedula" class="form-label">No. Documento de identidad</label>
                        <input type="number" class="form-control" v-model="cedula" required id="inpCedula" placeholder="Ej: 05600338848">
                    </div>
                    <div class="mb-3">
                        <label for="inpNombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" v-model="nombre" required id="inpNombre" placeholder="Ej: Juan">
                    </div>
                    <div class="mb-3">
                        <label for="inpApellido" class="form-label">Apellidos</label>
                        <input type="text" class="form-control" v-model="apellidos" required id="inpApellido" placeholder="Ej: Perez">
                    </div>
                    <div class="mb-3">
                        <label for="inpEmail" class="form-label" >Correo Electronico</label>
                        <input type="email" class="form-control" v-model="email" id="inpEmail" placeholder="Ej: juanperez@gmail.com">
                    </div>
                    <div class="mb-3">
                        <label for="inpTelefono" class="form-label" >Telefono</label>
                        <input type="number" class="form-control" v-model="telefono" id="inpTelefono">
                    </div>
                    <div class="mb-3">
                        <label for="inpCelular" class="form-label" >Celular</label>
                        <input type="number" class="form-control" v-model="celular" required id="inpCelular">
                    </div>
                    <div class="mb-3">
                        <label for="inpFechaCita" class="form-label">Fecha de cita</label>
                        <input type="date" class="form-control" v-on:input="cargarHorario" v-model="fechaCita" v-bind:min="fechaMinima" required id="inpFechaCita">
                    </div>
                    <div class="text-center" v-show="cargandoHorarios">
                        <Loader></Loader>
                        <p>Buscando horarios</p>
                    </div>
                    <div class="alert alert-danger" role="alert" v-show="!sinHorarios">
                        No hay horas disponible para esta fecha
                    </div>
                    
                    <div class="mb-3">
                        <label for="sltHoracita" class="form-label">Hora de cita</label>
                        <select class="form-select" id="sltHoracita" v-model="horaCita" v-bind:disabled="disabled" required aria-label="Default select example">
                            <option selected disabled value="">- seleccione la hora -</option>
                            <option v-for="(hora, index) in horas" v-bind:key="index" v-bind:value="hora">{{convertirHora(hora)}}</option>
                        </select>
                    </div>
                    <h3 class="mt-5 mb-3">Motivo de consulta</h3>
                    <div class="mb-3">
                        <select class="form-select" v-model="observaciones" required>
                            <option value="" disabled selected> - seleccione un motivo - </option>
                            <option value="Resultados">Resultados</option>
                            <option value="Consulta ginecologica">Consulta ginecol&oacute;gica</option>
                            <option value="Chequeo post quirurgico">Chequeo post quir&uacute;rgico</option>
                            <option value="Chequeos prenatales">Chequeos prenatales</option>
                        </select>
                    </div>
                    <div class="d-grid gap-2 mt-5 mb-5">
                        <button class="btn btn-vnc-primary" type="submit">AGENDAR CITA</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Loader from '../../../components/Loader.vue'
export default {
    name: 'CrearCita',
    components: {
        Loader
    },
    data(){
        return{
            nombre: '',
            apellidos: '',
            sexo: '',
            tipoIentidad: '',
            cedula: '',
            email: '',
            celular: '',
            telefono: '',
            fechaNacimiento: '',
            direccion: '',
            ciudad: '',
            nacionalidad: '',
            provinciaId: '',
            municipioId: '',
            fechaCita: '',
            observaciones: '',
            horaCita: "",
            observaciones: '',
            consultorio: '',
            cargando: false,
            cargandoHorarios: false,
            horas: [],
            disabled: true,
            fechaMinima: new Date().toISOString().split("T")[0]
        }
    },
    methods: {
        convertirHora: function (time) {
            time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (time.length > 1) { 
                time = time.slice (1); 
                time[5] = +time[0] < 12 ? ' a.m.' : ' p.m.'; 
                time[0] = +time[0] % 12 || 12; 
            }
            return time.join ('');
        },
        cargarHorario: function(){
            this.cargandoHorarios = true
            if(this.fechaCita === '2021-08-31' 
                || this.fechaCita === '2021-09-01' 
                || this.fechaCita === '2021-09-02'
                || this.fechaCita === '2021-09-03'
            ){
                this.cargandoHorarios = false
                this.disabled = true
            }else{
                axios.get(`https://medapp-api.cthrics.com/api/consultorios/${this.$route.params.id}/disponibilidad?fecha=${this.fechaCita}`)
                .then(res => {
                    this.horas = res.data
                    if(res.data){
                        this.cargandoHorarios = false
                        this.disabled = false
                    }
                    if(res.data.length <= 0){
                        this.disabled = true
                    }
                })
                .catch(err => {
                    console.log(err)
                    if(err){
                        this.cargandoHorarios = false
                    }
                    this.disabled = true
                })
            }
        },
        cargarMedico: function(){
            axios.get(`https://medapp-api.cthrics.com/api/consultorios/${this.$route.params.id}/ver`)
            .then(res => {
                this.consultorio = res.data.descripcion
            })
        },
        crearCita: function(){
            this.cargando = true
            let idConsultorio = this.$route.params.id
            let datosCita = {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    sexo: this.sexo,
                    tipoIentidad: this.tipoIentidad,
                    cedula: this.cedula,
                    email: this.email ,
                    celular: this.celular,
                    telefono: this.telefono,
                    fechaNacimiento: null,
                    apodo: "",
                    direccion: this.direccion,
                    ciudad: this.ciudad,
                    aseguradoraId: null,
                    noAfiliado: null,
                    nacionalidad: this.nacionalidad,
                    ocupacion: "",
                    categoriaAfiliado: null,
                    consultorioId: idConsultorio,
                    fechaCita: this.fechaCita+'T'+this.horaCita,
                    observaciones: this.observaciones
                }
            axios.post(`https://medapp-api.cthrics.com/api/citas/cliente/crear`, datosCita)
            .then(res => {
                if(res.data){
                    this.$router.push({ name: 'ConfirmacionCita' })
                    this.cargando = false
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted(){
        this.cargarMedico()
        console.log(this.horas.length)
    },
    computed: {
        sinHorarios(){
            if(this.fechaCita === '2021-08-31' 
                || this.fechaCita === '2021-09-01' 
                || this.fechaCita === '2021-09-02'
                || this.fechaCita === '2021-09-03'
            ){
                return false
            }
            if(this.horas.length <= 0 && this.fechaCita != ''){
                return false
            }else{
                return true
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/generales.less';
.fondo-gradient{
    background: @fondo-color;
    height: 100%;
    width: 100%;
    position: absolute;
    .form-control{
        height: 45px;
    }
    .form-control::placeholder{
        color: #c9c8dd;
    }
    label{
        color: #86868b;
    }
    h2{
        font-weight: 300;
    }
    h3{
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
    }
    small{
        width: 250px;
        font-size: 1.1rem;
        font-weight: 100;
        display: inline-block;
    }
    .contenedor-medio{
        position: relative;
        background-color: white;
        margin-top: 30px;
        min-height: 90vh;
        border-top-left-radius: @borde-redondo;
        border-top-right-radius: @borde-redondo;
        padding-top: 20px;
        padding-bottom: 20px;
        .btn-vnc-primary{
            background-color: @card-primary-color !important;
            color: white;
        }
    }
      .alert{
            border-radius: @borde-redondo;
            border: none;
            color: #cf193a;
        }
}
</style>