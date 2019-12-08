<template>
	<div class="container">
		<br>
		<br>
		<button @click="filtrar(1)" type="button" class="btn btn-primary">Niños</button>
		<button @click="filtrar(2)" type="button" class="btn btn-primary">Niñas</button>
		<button @click="filtrar(3)" type="button" class="btn btn-primary">Prematuros</button>
		<button @click="filtrar(4)" type="button" class="btn btn-primary">Limpiar</button>
		<br>
		<div>
			<barchart
				:keys="keys"
				:data="data"
				:label="label"
				:groupKey="groupKey"
				:reload="reload"
				@barEvent="barEvent"
			/>	
			<div v-if="horizontalData.length > 0">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="basic-addon3">Numero maximo de bebes graficados</span>
					</div>
					<input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="maxHorizontal">
				</div>			
				<button @click="filtrarB(1)" type="button" class="btn btn-primary">Niños</button>
				<button @click="filtrarB(2)" type="button" class="btn btn-primary">Niñas</button>			
				<horizontalBoxplot 
					:data="horizontalData"
					:reload="reload"
					:intergrowth="intergrowth"
					:fenton="fenton"								
					@boxplotEvent="boxplotEvent"
				/>
			</div>	

		</div>
		<pre v-if="personInfo"><code>{{personInfo}}</code></pre>
	</div>
</template>

<script>
import Barchart from "~/components/barchart/barchart.vue";
import HorizontalBoxplot from "~/components/horizontalBoxplot/horizontalBoxplot.vue";
import fullData from "~/static/csvjson.json";
import growData from "~/static/growData.json";

export default {
	components: {
		Barchart,
		HorizontalBoxplot
	},
	mounted() {
		this.reiniciar();
		this.setBarchartData();
	},
	methods: {
		boxplotEvent(boxplotData) {
			this.personInfo = boxplotData
		},
		barEvent(barData){
			const week = barData.groupKey.split(' ')[1]
			this.week = week
			const data = this.getOptionItems(week)
			const growItem = growData.find(x=> x.week == week)
			this.fenton = growItem.fentonBoy
			this.intergrowth = growItem.intergrowthBoy

			const res = data.filter(x=> {
				if(x.SexoBebe == 1) {
					return true
				}
				return false
			}).map(x => {
				return {
					x: x.PesoAlNacer,
					y: Math.random() * 220,
					obj: x,
					fenton: this.fenton,
					intergrowth: this.intergrowth
				}
			})

			if(res.length > this.maxHorizontal) {
				this.horizontalData = res.slice(0,this.maxHorizontal)
			} else {
				this.horizontalData = res
			}
			this.reload++
		},
		getOptionItems(week) {
			return fullData.filter( item => {
				if (
					!isNaN(item.PesoAlNacer) &&
					!isNaN(item.EdadGestacional1) &&
					Math.floor(item.EdadGestacional1) == week
				) {
					return true
				}
				return false
			})
		},
		reiniciar() {
			const data = []
			for (let index = 0; index < 19; index++) {
				const obj = {
					Semana: `Sem ${index + 24}`,
					Fenton: 0,
					Intergrowth: 0
				}
				if(this.options == 3){
					if(index < 13) {
						data.push(obj)
					}
				} else {
					data.push(obj)
				}
			}
			this.data = data
		},
		filtrarB(option) {
			this.boxplotOption = option
			const growItem = growData.find(x=> x.week == this.week)

			if(option == 1) {
				this.fenton = growItem.fentonBoy
				this.intergrowth = growItem.intergrowthBoy
			}
			if(option == 2) {
				this.fenton = growItem.fentonGirl
				this.intergrowth = growItem.intergrowthGirl
			}	

			const data = this.getOptionItems(this.week)
			const res = data.filter(x=> {
				if(x.SexoBebe == 1 && option == 1) {
					return true
				} else if (x.SexoBebe == 2 && option == 2) {
					return true
				}

				return false
			}).map(x => {
				return {
					x: x.PesoAlNacer,
					y: Math.random() * 220,
					obj: x,
					fenton: this.fenton,
					intergrowth: this.intergrowth
				}
			})

			if(res.length > this.maxHorizontal) {
				this.horizontalData = res.slice(0,this.maxHorizontal)
			} else {
				this.horizontalData = res
			}					
			this.reload++
		},
		filtrar(options){
			this.options = options
			this.reiniciar()
			const intergrowList = fullData.filter(x => {
				if (
					!isNaN(x.PesoAlNacer) &&
					!isNaN(x.EdadGestacional1) &&
					(x.EdadGestacional1 >= 24 &&
					x.EdadGestacional1 <= 42 &&
					this.options != 3) || 
					(x.EdadGestacional1 <= 36 && 
					x.EdadGestacional1 >= 24 && 
					this.options ==3)	
				) {
					const edadAjustada = Math.floor(x.EdadGestacional1);
					const item = this.data.find(
						item => item.Semana === `Sem ${edadAjustada}`
					);
					const growItem = growData.find(item => item.week == edadAjustada)
					if(this.options ==1 || this.options == 3 || this.options == 4) {
						if (x.SexoBebe == 1 && x.PesoAlNacer < growItem.fentonBoy) {
							item.Fenton++;
						}
						if (x.SexoBebe == 1 && x.PesoAlNacer < growItem.intergrowthBoy) {
							item.Intergrowth++
						}						
					}
					if(this.options == 2 || this.options == 3 || this.options == 4) {
						if (x.SexoBebe == 2 && x.PesoAlNacer < growItem.fentonGirl) {
							item.Fenton++;
						}
						if (x.SexoBebe == 2 && x.PesoAlNacer < growItem.intergrowthGirl) {
							item.Intergrowth++
						}
					}
				}
			});
			this.reload++;
		},
		setBarchartData() {
			const intergrowList = fullData.filter(x => {
				if (
					!isNaN(x.PesoAlNacer) &&
					!isNaN(x.EdadGestacional1) &&
					x.EdadGestacional1 >= 24 &&
					x.EdadGestacional1 <= 42 
				) {
					const edadAjustada = Math.floor(x.EdadGestacional1);
					const item = this.data.find( item => item.Semana === `Sem ${edadAjustada}`);
					const growItem = growData.find(item => item.week == edadAjustada)

					if (x.SexoBebe == 1 && x.PesoAlNacer < growItem.fentonBoy) {
						item.Fenton++;
					}
					if (x.SexoBebe == 1 && x.PesoAlNacer < growItem.intergrowthBoy) {
						item.Intergrowth++
					}
					if (x.SexoBebe == 2 && x.PesoAlNacer < growItem.fentonGirl) {
						item.Fenton++;
					}
					if (x.SexoBebe == 2 && x.PesoAlNacer < growItem.intergrowthGirl) {
						item.Intergrowth++
					}
				}
			});
			this.reload++;
		}
	},
	data() {
		return {
			data: [],
			horizontalData: [],
			options: 4,
			reload: 0,
			keys: ["Fenton", "Intergrowth"],
			groupKey: "Semana",
			label: "Bebes con problemas de crecimiento",
			maxHorizontal: 100,
			intergrowth:0,
			fenton:0,
			boxplotOption:1,
			week:24,
			personInfo:null
		};
	}
};
</script>

<style></style>
