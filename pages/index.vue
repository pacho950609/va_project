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
			<horizontalBoxplot 
				:data="horizontalData"
			/>
		</div>
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
		barEvent(barData){
			console.log('corrio evento',barData)
			const week = barData.groupKey.split(' ')[1]
			console.log('week',week)
			const data = this.getOptionItems(week)
			console.log(data)
		},
		getOptionItems(week) {
			return fullData.filter( item => {
				if(Math.floor(item.EdadGestacional1) == week) {
					if(this.options == 1 && item.SexoBebe == 1) {
						return true
					} else if (this.options == 2 && item.SexoBebe == 2) {
						return true
					} else if (this.options == 3 || this.options == 4) {
						return true
					}
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
			label: "Bebes con problemas de crecimiento"
		};
	}
};
</script>

<style></style>
