<template>
  <div class="tarea3">
    <br>
    <h1>Impacto Factores familiares</h1>
    <br>
    En esta visualización se relacionan diferentes factores familiares y el posible retardo a nivel psicométrico, neurológico y de coeficiente intelectual.
    Se presenta una lista de opciones las cuales se pueden seleccionar para observar esta relación.
    <br>
    <button @click="filtrar('EmbarazoMultiple')" type="button" class="btn btn-outline-info">Embarazo Múltiple </button>
    <button @click="filtrar('SituacionPareja')" type="button" class="btn btn-outline-info">Situación de Pareja </button>
    <button @click="filtrar('TipoVivienda')" type="button" class="btn btn-outline-info">Tipo de Vivienda </button>
    <button @click="filtrar('EscolaridadMadre')" type="button" class="btn btn-outline-info">Escolaridad Madre </button>
    <button @click="filtrar('SituacionLaboralMadre')" type="button" class="btn btn-outline-info">Situacion Laboral Madre </button>
    <button @click="filtrar('EscolaridadPadre')" type="button" class="btn btn-outline-info">Escolaridad Padre </button>
    <button @click="filtrar('SituacionLaboralPadre')" type="button" class="btn btn-outline-info">Situacion Laboral Padre </button>
    <button @click="filtrar('IngresoMensualHogar')" type="button" class="btn btn-outline-info">Ingreso Mensual Hogar </button>
    <button @click="filtrar('DistanciaVivienda')" type="button" class="btn btn-outline-info">Distancia Vivienda </button>
    <button @click="filtrar('NumeroPersonasHogar')" type="button" class="btn btn-outline-info">Numero Personas Hogar </button>
    <button @click="filtrar('MenoresDe5AniosEnElHogar')" type="button" class="btn btn-outline-info">Menores De 5 Años En El Hogar </button>
    <button @click="filtrar('NutricionFamiliar')" type="button" class="btn btn-outline-info">Nutrición Familiar </button>
    <button @click="filtrar('EmbarazoDeseado')" type="button" class="btn btn-outline-info">¿Embarazo Deseado? </button>
    <button @click="filtrar('MesesTrabajoEnEmbarazo')" type="button" class="btn btn-outline-info">¿Hasta Qué Mes Trabajó La Madre en el Embarazo? </button>
    <button @click="filtrar('AyudaEnCasa1Mes')" type="button" class="btn btn-outline-info">Ayuda En Casa en el Primer Mes </button>
    <button @click="filtrar('EdadMaterna')" type="button" class="btn btn-outline-info">Edad De La Madre </button>
    <button @click="filtrar('PesoMadre')" type="button" class="btn btn-outline-info">Peso Madre </button>
    <button @click="filtrar('TallaMadre')" type="button" class="btn btn-outline-info">Talla Madre </button>
    <button @click="filtrar('PesoPadre')" type="button" class="btn btn-outline-info">Peso Padre </button>
    <button @click="filtrar('TallaPadre')" type="button" class="btn btn-outline-info">Talla Padre </button>
    <button @click="filtrar('NumeroEmbarazos')" type="button" class="btn btn-outline-info">Numero Embarazos </button>
    <button @click="filtrar('NumeroPartos')" type="button" class="btn btn-outline-info">Numero Partos </button>
    <button @click="filtrar('NumeroCesareas')" type="button" class="btn btn-outline-info">Numero Cesareas </button>
    <button @click="filtrar('NumEmbarazosEctopicos')" type="button" class="btn btn-outline-info">Num Embarazos Ectopicos </button>
    <button @click="filtrar('NumeroPrematuros')" type="button" class="btn btn-outline-info">Numero Prematuros </button>
    <button @click="filtrar('NumeroMortinatos')" type="button" class="btn btn-outline-info">Numero Mortinatos </button>
    <button @click="filtrar('NumeroControlesPreNatales')" type="button" class="btn btn-outline-info">Numero Controles Prenatales </button>
    <button @click="filtrar('MesInicioControlPrenatal')" type="button" class="btn btn-outline-info">Mes Inicio Control Prenatal </button>
    <button @click="filtrar('HospitalizacionEnEmbarazo')" type="button" class="btn btn-outline-info">Hospitalizacion En Embarazo </button>
    <button @click="filtrar('rhMadre')" type="button" class="btn btn-outline-info">rh de la Madre </button>
    <button @click="filtrar('MadreConsumioAlcohol')" type="button" class="btn btn-outline-info">Consumo de Alcohol </button>
    <button @click="filtrar('MadreConsumioDrogas')" type="button" class="btn btn-outline-info">Consumo de Drogas </button>
    <button @click="filtrar('MadreFumo')" type="button" class="btn btn-outline-info">Consumo de Cigarrillo </button>
    <button @click="filtrar('InfeccionUrinaria')" type="button" class="btn btn-outline-info">Infección Urinaria </button>
    <button @click="filtrar('Rubeola')" type="button" class="btn btn-outline-info">Rubeola </button>
    <button @click="filtrar('Toxoplasmosis')" type="button" class="btn btn-outline-info">Toxoplasmosis </button>
    <button @click="filtrar('Sifilis')" type="button" class="btn btn-outline-info">Sifilis </button>
    <button @click="filtrar('HIV')" type="button" class="btn btn-outline-info">HIV </button>
    <button @click="filtrar('Malaria')" type="button" class="btn btn-outline-info">Malaria </button>
    <button @click="filtrar('HepatitisB')" type="button" class="btn btn-outline-info">Hepatitis B </button>
    <button @click="filtrar('Medicamentos')" type="button" class="btn btn-outline-info">Medicamentos </button>
    <button @click="filtrar('LugarNacimiento')" type="button" class="btn btn-outline-info">Lugar Nacimiento </button>
    <button @click="filtrar('SexoBebe')" type="button" class="btn btn-outline-info">Sexo Bebé </button>
    <button @click="filtrar('Convulsiones')" type="button" class="btn btn-outline-info">Convulsiones </button>
    <button @click="filtrar('MadreAmamanta')" type="button" class="btn btn-outline-info">¿Madre Desea Amamantar? </button>
    <button @click="filtrar('Percapita')" type="button" class="btn btn-outline-info">Percapita</button></button>
    <br>
    <div>
      <groupPlot
        :param="param"
        :data="data"
        :featuresHierarchy="featuresHierarchy"
        :reload="reload"
        @groupEvent="groupEvent"
      />
    </div>
  </div>
</template>
<script>
  import GroupPlot from "~/components/groupPlot/groupPlot.vue";
  import featuresHierarchy from "~/static/featuresHierarchy.json";
  import dataTarea3 from "~/static/dataTarea3.json";
  export default {
    components: {
      GroupPlot
    },
    methods: {
      filtrar(parametro){
        this.param=parametro;
        this.featuresHierarchy=featuresHierarchy["Parametros"];
        this.data = dataTarea3;
        this.reload++;
      },
      groupEvent(groupData){
        this.reload++
      }
    },
    data() {
      return {
        param: '',
        data: [],
        featuresHierarchy:[],
        reload: 0
      };
    }
  };
</script>