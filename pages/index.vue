<template>
	<div class="container">
		<div>
			<barchart
				:keys="keys"
				:data="data"
				:label="label"
				:groupKey="groupKey"
				:reload="reload"
			/>
			<horizontalBoxplot />
		</div>
	</div>
</template>

<script>
import Barchart from "~/components/barchart/barchart.vue";
import HorizontalBoxplot from "~/components/horizontalBoxplot/horizontalBoxplot.vue";
import fullData from "~/static/csvjson.json";

export default {
	components: {
		Barchart,
		HorizontalBoxplot
	},
	mounted() {
		this.setBarchartData();
	},
	methods: {
		setBarchartData() {
			const intergrowList = fullData.filter(x => {
				if (
					!isNaN(x.PesoAlNacer) &&
					!isNaN(x.EdadGestacional1) &&
					x.EdadGestacional1 >= 24 &&
					x.EdadGestacional1 <= 43
				) {
					const edadAjustada = Math.floor(x.EdadGestacional1);
					const item = this.data.find(
						item => item.Semana === `Sem ${edadAjustada}`
					);
					if (x.PesoAlNacer > 1200) {
						item.Fenton++;
					}
					if (x.PesoAlNacer > 1500) {
						item.Intergrowth++
					}
				}
			});
			this.reload++;
		}
	},
	data() {
		return {
			data: [
				{
					Semana: "Sem 24",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 25",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 26",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 27",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 28",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 29",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 30",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 31",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 32",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 33",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 34",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 35",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 36",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 37",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 38",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 39",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 40",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 41",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 42",
					Fenton: 0,
					Intergrowth: 0
				},
				{
					Semana: "Sem 43",
					Fenton: 0,
					Intergrowth: 0
				}
			],
			reload: 0,
			keys: ["Fenton", "Intergrowth"],
			groupKey: "Semana",
			label: "Bebes con problemas de crecimiento"
		};
	}
};
</script>

<style></style>
