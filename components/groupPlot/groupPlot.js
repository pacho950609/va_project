import * as d3 from "d3";
export default {
  name: "groupPlot",
  props: {
    param: { type: String, required: true },
    data: { type: Array, required: true },
    featuresHierarchy: { type: Array, required: true },
    reload: { type: Number, required: true }
  },
  watch: {
    async reload() {
      await this.dibujar();
    }
  },
  methods: {
    async dibujar() {
      d3.select("#chart").selectAll("*").remove();
      const color = d3.scaleOrdinal(d3.schemeCategory10.map(col => d3.interpolateRgb(col, "#fff")(0.2)));
      const svg = d3.select("#chart")
      .append("h2")
      .text(this.setTitle(this.param));

      const profilesObj = d3.set(this.data.map(d => d[this.param]))
      .values()
      .map(p => ({
        key: p,
        name: this.getProfileName(this.param, p),
        color: color(p)
      }));
      const ref = this;
      svg.append("div")
      .style("font-size", "10pt")
      .style("font", "sans-serif")
      .datum(profilesObj)
      .call(ref.addProfilesLegend);

      const table = svg.append("table")
      .style("table-layout", "fixed")
      .style("width", "100%");

      const facet = table.selectAll(".facet")
      .data(this.featuresHierarchy)
      .join("tr")
      .attr("class", "facet")
      .style("font-size", "0.5em");

      facet.append("td")
      .style("width", "30%")
      .text(d => d.name);

      facet.append("td")
      .each(function (key) {
        d3.select(this)
        .node()
        .appendChild(ref.swarm(ref.data, key.key, d => color(d[ref.param])))
      });
    },
    setTitle (value) {
      if (value==='EmbarazoMultiple') return 'Embarazo Múltiple';
      if (value==='SituacionPareja') return 'Situación de Pareja';
      if (value==='TipoVivienda') return 'Tipo de Vivienda';
      if (value==='EscolaridadMadre') return 'Escolaridad Madre';
      if (value==='SituacionLaboralMadre') return 'Situacion Laboral Madre';
      if (value==='EscolaridadPadre') return 'Escolaridad Padre';
      if (value==='SituacionLaboralPadre') return 'Situacion Laboral Padre';
      if (value==='IngresoMensualHogar') return 'Ingreso Mensual Hogar';
      if (value==='DistanciaVivienda') return 'Distancia Vivienda';
      if (value==='NumeroPersonasHogar') return 'Numero Personas Hogar';
      if (value==='MenoresDe5AniosEnElHogar') return 'Menores De 5 Años En El Hogar';
      if (value==='NutricionFamiliar') return 'Nutrición Familiar';
      if (value==='EmbarazoDeseado') return '¿Embarazo Deseado?';
      if (value==='MesesTrabajoEnEmbarazo') return '¿Hasta Qué Mes Trabajó La Madre n el Embarazo?';
      if (value==='AyudaEnCasa1Mes') return 'Ayuda En Casa en el Primer Mes';
      if (value==='EdadMaterna') return 'Edad De La Madre';
      if (value==='PesoMadre') return 'Peso Madre';
      if (value==='TallaMadre') return 'Talla Madre';
      if (value==='PesoPadre') return 'Peso Padre';
      if (value==='TallaPadre') return 'Talla Padre';
      if (value==='NumeroEmbarazos') return 'Numero Embarazos';
      if (value==='NumeroPartos') return 'Numero Partos';
      if (value==='NumeroCesareas') return 'Numero Cesareas';
      if (value==='NumEmbarazosEctopicos') return 'Num Embarazos Ectopicos';
      if (value==='NumeroPrematuros') return 'Numero Prematuros';
      if (value==='NumeroMortinatos') return 'Numero Mortinatos';
      if (value==='NumeroControlesPreNatales') return 'Numero Controles Prenatales';
      if (value==='MesInicioControlPrenatal') return 'Mes Inicio Control Prenatal';
      if (value==='HospitalizacionEnEmbarazo') return 'Hospitalizacion En Embarazo';
      if (value==='rhMadre') return 'rh de la Madre';
      if (value==='MadreConsumioAlcohol') return 'Consumo de Alcohol';
      if (value==='MadreConsumioDrogas') return 'Consumo de Drogas';
      if (value==='MadreFumo') return 'Consumo de Cigarrillo';
      if (value==='InfeccionUrinaria') return 'Infección Urinaria';
      if (value==='Rubeola') return 'Rubeola';
      if (value==='Toxoplasmosis') return 'Toxoplasmosis';
      if (value==='Sifilis') return 'Sifilis';
      if (value==='HIV') return 'HIV';
      if (value==='Malaria') return 'Malaria';
      if (value==='HepatitisB') return 'Hepatitis B';
      if (value==='Medicamentos') return 'Medicamentos';
      if (value==='LugarNacimiento') return 'Lugar Nacimiento';
      if (value==='SexoBebe') return 'Sexo Bebé';
      if (value==='Convulsiones') return 'Convulsiones';
      if (value==='MadreAmamanta') return '¿Madre Desea Amamantar?';
      if (value==='Percapita') return 'Percapita';
    },
    getProfileName (key, profile) {
      if(profile === "null"){
        profile = null;
      }
      else
      {
        profile= Number(profile);
      }
      if (key === 'EmbarazoMultiple') {
        if (profile === 0) {
          return 'Sin Embarazo Múltiple';
        } else if (profile === 1) {
          return 'Con Embarazo Múltiple';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'SituacionPareja') {
        if (profile === 1) {
          return 'Madre Sola Con Apoyo';
        } else if (profile === 2) {
          return 'Madre Sola Sin Apoyo';
        } else if (profile === 3) {
          return 'Pareja estable';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'TipoVivienda') {
        if (profile === 1) {
          return 'Rural';
        } else if (profile === 2) {
          return 'Urbana';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'EscolaridadMadre') {
        if (profile === 1) {
          return 'Primaria';
        } else if (profile === 2) {
          return 'Primaria Incompleta';
        } else if (profile === 3) {
          return 'Secundaria';
        } else if (profile === 4) {
          return 'Secundaria Incompleta';
        } else if (profile === 5) {
          return 'Técnica';
        } else if (profile === 6) {
          return 'Técnica Incompleta';
        } else if (profile === 7) {
          return 'Universitaria';
        } else if (profile === 8) {
          return 'Universitaria Incompleta';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'SituacionLaboralMadre') {
        if (profile === 1) {
          return 'Con Empleo';
        } else if (profile === 2) {
          return 'Sin Empleo';
        } else if (profile === 3) {
          return 'Ama de Casa';
        } else if (profile === 4) {
          return 'Estudiante';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'EscolaridadPadre') {
        if (profile === 1) {
          return 'Primaria';
        } else if (profile === 2) {
          return 'Primaria Incompleta';
        } else if (profile === 3) {
          return 'Secundaria';
        } else if (profile === 4) {
          return 'Secundaria Incompleta';
        } else if (profile === 5) {
          return 'Técnica';
        } else if (profile === 6) {
          return 'Técnica Incompleta';
        } else if (profile === 7) {
          return 'Universitaria';
        } else if (profile === 8) {
          return 'Universitaria Incompleta';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'SituacionLaboralPadre') {
        if (profile === 1) {
          return 'Con Empleo';
        } else if (profile === 2) {
          return 'Sin Empleo';
        } else if (profile === 3) {
          return 'Estudiante';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'IngresoMensualHogar') {

        if (profile === 1) {
          return 'Menos de 1 millón mensual';
        } else if (profile === 2) {
          return 'Entre 1 y 5 millones mensuales';
        } else if (profile === 3) {
          return 'Entre 5 y 10 millones mensuales';
        } else if (profile === 4) {
          return '10 millones o más mensuales';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'DistanciaVivienda') {
        if (profile === 1) {
          return 'Hasta una hora de transporte';
        } else if (profile === 2) {
          return 'De 1 a 2 horas de transporte';
        } else if (profile === 3) {
          return 'Más de 2 horas de transporte en la ciudad';
        } else if (profile === 4) {
          return 'Fuera de la ciudad';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroPersonasHogar') {
        if (profile === 1) {
          return '1 o 2 personas';
        } else if (profile === 2) {
          return 'Entre 3 y 5 personas';
        } else if (profile === 3) {
          return 'Entre 6 y 9 personas';
        } else if (profile === 4) {
          return '10 o más personas';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MenoresDe5AniosEnElHogar') {
        if (profile === 1) {
          return '1 o 2 personas';
        } else if (profile === 2) {
          return 'Entre 3 y 5 personas';
        } else if (profile === 3) {
          return 'Entre 6 y 9 personas';
        } else if (profile === 4) {
          return '10 o más personas';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NutricionFamiliar') {
        if (profile === 1) {
          return 'Buena (3 comidas y 2 refrigerios)';
        } else if (profile === 2) {
          return 'Apenas suficiente (3 comidas)';
        } else if (profile === 3) {
          return 'Insuficiente (2 comidas diarias)';
        } else if (profile === 4) {
          return 'Severmente insuficiente (una comida diaria)';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'EmbarazoDeseado') {
        if (profile === 0) {
          return 'Embarazo no Deseado';
        } else if (profile === 1) {
          return 'Embarazo Deseado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MesesTrabajoEnEmbarazo') {
        if (profile === 0) {
          return 'No Trabajó';
        } else if (profile === 1 || profile === 2 || profile === 3) {
          return 'Primer Trimestre';
        } else if (profile === 4 || profile === 5 || profile === 6) {
          return 'Segundo Trimestre';
        } else if (profile === 7 || profile === 8 || profile === 9) {
          return 'Tercer Trimestre';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'AyudaEnCasa1Mes') {
        if (profile === 0) {
          return 'No Tuvo Ayuda';
        } else if (profile === 1) {
          return 'Tuvo Ayuda';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'EdadMaterna') {
        if (profile === 1) {
          return 'Menor de 15 años';
        } else if (profile === 2) {
          return 'Entre 15 y 19 años';
        } else if (profile === 3) {
          return 'Entre 20 y 24 años';
        } else if (profile === 4) {
          return 'Entre 25 y 29 años';
        } else if (profile === 5) {
          return 'Entre 30 y 39 años';
        } else if (profile === 6) {
          return 'Entre 40 y 49 años';
        } else if (profile === 7) {
          return '50 años o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'PesoMadre') {

        if (profile === 1) {
          return 'Menos de 40 Kilos';
        } else if (profile === 2) {
          return 'Entre 40 y 49 kilos';
        } else if (profile === 3) {
          return 'Entre 50 y 59 kilos';
        } else if (profile === 4) {
          return 'Entre 60 y 69 kilos';
        } else if (profile === 5) {
          return 'Entre 70 y 79 kilos';
        } else if (profile === 6) {
          return 'Entre 80 y 89 kilos';
        } else if (profile === 7) {
          return 'Entre 90 y 89 kilos';
        } else if (profile === 8) {
          return '100 kilos o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'TallaMadre') {
        if (profile === 1) {
          return 'Menos de 140 cm';
        } else if (profile === 2) {
          return 'Entre 140 y 149 cm';
        } else if (profile === 3) {
          return 'Entre 150 y 159 cm';
        } else if (profile === 4) {
          return 'Entre 160 y 169 cm';
        } else if (profile === 5) {
          return 'Entre 170 y 179 cm';
        } else if (profile === 6) {
          return 'Entre 180 y 189 cm';
        } else if (profile === 7) {
          return 'Entre 190 y 189 cm';
        } else if (profile === 8) {
          return '200 cm o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'PesoPadre') {
        if (profile === 1) {
          return 'Menos de 40 Kilos';
        } else if (profile === 2) {
          return 'Entre 40 y 49 kilos';
        } else if (profile === 3) {
          return 'Entre 50 y 59 kilos';
        } else if (profile === 4) {
          return 'Entre 60 y 69 kilos';
        } else if (profile === 5) {
          return 'Entre 70 y 79 kilos';
        } else if (profile === 6) {
          return 'Entre 80 y 89 kilos';
        } else if (profile === 7) {
          return 'Entre 90 y 99 kilos';
        } else if (profile === 8) {
          return '100 kilos o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'TallaPadre') {
        if (profile === 1) {
          return 'Menos de 140 cm';
        } else if (profile === 2) {
          return 'Entre 140 y 149 cm';
        } else if (profile === 3) {
          return 'Entre 150 y 159 cm';
        } else if (profile === 4) {
          return 'Entre 160 y 169 cm';
        } else if (profile === 5) {
          return 'Entre 170 y 179 cm';
        } else if (profile === 6) {
          return 'Entre 180 y 189 cm';
        } else if (profile === 7) {
          return 'Entre 190 y 199 cm';
        } else if (profile === 8) {
          return '200 cm o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroEmbarazos') {
        if (profile === 1) {
          return '1 o 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroPartos') {
        if (profile === 1) {
          return '1 o 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroCesareas') {
        if (profile === 1) {
          return 'Entre 0 y 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumEmbarazosEctopicos') {

        if (profile === 1) {
          return '1 o 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroPrematuros') {
        if (profile === 1) {
          return '1 o 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroMortinatos') {
        if (profile === 1) {
          return '1 o 2';
        } else if (profile === 2) {
          return 'Entre 3 y 5';
        } else if (profile === 3) {
          return 'Entre 6 y 9';
        } else if (profile === 4) {
          return '10 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'NumeroControlesPreNatales') {
        if (profile === 1) {
          return 'Menos de 10';
        } else if (profile === 2) {
          return 'Entre 10 y 19';
        } else if (profile === 3) {
          return 'Entre 20 y 29';
        } else if (profile === 4) {
          return 'Entre 30 y 39';
        } else if (profile === 5) {
          return 'Entre 40 y 49';
        } else if (profile === 6) {
          return '50 o más';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MesInicioControlPrenatal') {
        if (typeof profile === 'number') {
          return profile;
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'HospitalizacionEnEmbarazo') {
        if (profile === 0) {
          return 'No fue hospitalizada en pre parto';
        } else if (profile === 1) {
          return 'Fue hospitalizada en pre parto';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'rhMadre') {
        if (profile === 1) {
          return 'AB-';
        } else if (profile === 2) {
          return 'A-';
        } else if (profile === 3) {
          return 'B-';
        } else if (profile === 4) {
          return 'O-';
        } else if (profile === 5) {
          return 'AB+';
        } else if (profile === 6) {
          return 'A+';
        } else if (profile === 7) {
          return 'B+';
        } else if (profile === 8) {
          return 'O+';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MadreConsumioAlcohol') {
        if (profile === 0) {
          return 'No Consumió Alcohol';
        } else if (profile === 1) {
          return 'Consumió Alcohol';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MadreConsumioDrogas') {
        if (profile === 0) {
          return 'No Consumió Drogas';
        } else if (profile === 1) {
          return 'Consumió Drogas';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MadreFumo') {
        if (profile === 0) {
          return 'No Fumó';
        } else if (profile === 1) {
          return 'Fumó';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'InfeccionUrinaria') {
        if (profile === 1) {
          return 'Sin Infección Urinaria';
        } else if (profile === 2) {
          return 'Infección Tratada';
        } else if (profile === 3) {
          return 'Infección No Tratada';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Rubeola') {
        if (profile === 1) {
          return 'Negativo Para Rubeola';
        } else if (profile === 2) {
          return 'Positivo Para Rubeola';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Toxoplasmosis') {
        if (profile === 1) {
          return 'Negativo';
        } else if (profile === 2) {
          return 'Positivo Tratado';
        } else if (profile === 3) {
          return 'Positivo No Tratado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Sifilis') {
        if (profile === 1) {
          return 'Negativo';
        } else if (profile === 2) {
          return 'Positivo Tratado';
        } else if (profile === 3) {
          return 'Positivo No Tratado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'HIV') {
        if (profile === 1) {
          return 'Negativo';
        } else if (profile === 2) {
          return 'Positivo Tratado';
        } else if (profile === 3) {
          return 'Positivo No Tratado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Malaria') {
        if (profile === 1) {
          return 'Negativo';
        } else if (profile === 2) {
          return 'Positivo Tratado';
        } else if (profile === 3) {
          return 'Positivo No Tratado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'HepatitisB') {
        if (profile === 1) {
          return 'Negativo';
        } else if (profile === 2) {
          return 'Positivo Tratado';
        } else if (profile === 3) {
          return 'Positivo No Tratado';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Medicamentos') {
        if (profile === 1) {
          return 'Anti-HTA';
        } else if (profile === 2) {
          return 'Antibióticos';
        } else if (profile === 3) {
          return 'Uteroinhibitor';
        } else if (profile === 4) {
          return 'Hierro';
        } else if (profile === 3) {
          return 'Anticoagulante';
        } else if (profile === 3) {
          return 'Antiretroviral';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'LugarNacimiento') {
        if (profile === 1) {
          return 'Sala de Parto';
        } else if (profile === 2) {
          return 'Centro de Atención Primaria';
        } else if (profile === 3) {
          return 'Casa';
        } else if (profile === 4) {
          return 'Vehículo';
        } else if (profile === 5) {
          return 'Otro';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'SexoBebe') {
        if (profile === 1) {
          return 'Masculino';
        } else if (profile === 2) {
          return 'Femenino';
        } else if (profile === 3) {
          return 'Ambigüo';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Convulsiones') {
        if (profile === 0) {
          return 'No tuvo Convulsiones';
        } else if (profile === 1) {
          return 'Tuvo Convulsiones';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'MadreAmamanta') {
        if (profile === 0) {
          return 'Madre No Desea Amamantar';
        } else if (profile === 1) {
          return 'Madre Desea Amamantar';
        } else if (profile === null) { return 'Dato No Registrado';}
      }
      if (key === 'Percapita') return 'Percapita';
    },
    addProfilesLegend(sel){
      sel.each( data => {

        const option = sel.selectAll("div")
        .data(data)
        .join("div")
        .style("margin-left", "20px")
        .style("float", "left");

        option.append("span")
        .attr("type", "checkbox")
        .style("min-width", "20px")
        .style("min-height", "20px")
        .style("display", "inline-block")
        .style("position", "relative")
        .style("top", "5px")
        .style("margin-right", "2px")
        .style("background-color", d=> d.color);

        option.append("span")
        .style("display", "inline-block")
        .text(d => d.name);
      })
    },
    swarm (_data, attr, color) {
      const data = _data.slice().map(d => Object.assign({}, d));
      const width = 700,
      height = 200,
      r = 2,
      margin = { bottom: 30, top: 0, left:0, right: 0},
      iwidth = width - margin.left - margin.right,
      iheight = height - margin.top - margin.bottom;
      const xScale = d3.scaleSqrt();
      xScale
      .domain(d3.extent(data.map(d => +d[attr])))
      .range([0, width]).nice();

      const svg = d3.create("svg")
      .attr("overflow", "visible")
      .attr("width", width)
      .attr("height", height);

      const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const gCircles = g.append("g");

      const tooltip = g.append("text")
      .attr("class", "tooltip")
      .style("font-size", "0.7em")
      .style("color", "black")
      .style("opacity","1");

      const ref = this;
      const circles = gCircles.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", r)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .style("fill", color)
      .on("mouseover", function(d) {
        circles.style("opacity", e =>
          e.LubchencoFenton === d.LubchencoFenton ? 0.1: 0.5
          );
        d3.select(this).style("opacity", 1);
        tooltip.text(ref.setTooltip(d,attr))
        .attr("x", 250)
        .attr("y", 150)
      })
      .on("mouseout", () => {
        circles.style("opacity", 1);
        tooltip.text("")
        .attr("x", 0)
        .attr("y", 0)
      });

      g.append("g")
      .call(d3.axisBottom(xScale).ticks(5))
      .attr("transform", `translate(0, ${iheight})`);

      const simulation = d3.forceSimulation(data)
      .force("y", d3.forceY(iheight/2).strength(0.1))
      .force("x", d3.forceX(d => xScale(+d[attr])).strength(1))
      .force("collide", d3.forceCollide(r).iterations(3))
      .on("tick", () => {
        circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
      });
      for (let i = 0; i< 10; i++) simulation.tick();
        return svg.node();
    },
    setTooltip(d, profile) {
      let descripcion = 'LubchencoFenton : ' + d.LubchencoFenton +" ";
      if(profile ==='CoeficienteIntelectual6m'){
        descripcion += 'Retraso Psicomotor : '+ d.rsm6m;
      }
      else if(profile ==='CoeficienteIntelectual12m'){
        descripcion += 'Retraso Psicomotor : '+ d.rsm12m;
      }
      else if(profile ==='PuntajeExamenPsicomotor6m'){
        descripcion += 'Retraso Psicomotor : '+ d.ExamenPsicomotor6m;
      }
      else if(profile ==='PuntajeExamenPsicomotor12m'){
        descripcion += 'Retraso Psicomotor : '+ d.ExamenPsicomotor12m;
      }
      else if(profile ==='Infanib3m' ||profile ==='Infanib6m' || profile ==='Infanib9m' || profile ==='Infanib12m'){
        if(d[profile] ===1){
          descripcion += 'Resultado: Normal';
        }
        else if(d[profile] ===2){
          descripcion += 'Resultado: Transitorio';
        }
        if(d[profile] ===3){
          descripcion += 'Resultado: Anormal';
        }
      }
      descripcion += ' Valor : ' +d[profile];
      return descripcion;
    },
    onElementClick(d) {
      this.$emit('groupEvent', d)
    }
  }
};