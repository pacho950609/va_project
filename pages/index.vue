<template>
	<div class="container">
		<div>
			<barchart :keys="keys" :data="data" :label="label" :groupKey="groupKey"/>
		</div>
	</div>
</template>

<script>
import Barchart from "~/components/barchart/barchart.vue";

export default {
	components: {
		Barchart
	},
	data() {
		return {
			data: [
				{
					Semana: 'Sem 24',
					Fenton: 230,
					Intergrowth: 520
				},
				{
					Semana: 'Sem 25',
					Fenton: 230,
					Intergrowth: 520
				},
				{
					Semana: 'Sem 26',
					Fenton: 230,
					Intergrowth: 520
				},
				{
					Semana: 'Sem 27',
					Fenton: 230,
					Intergrowth: 520
				},
				{
					Semana: 'Sem 28',
					Fenton: 230,
					Intergrowth: 220
				},
				{
					Semana: 'Sem 29',
					Fenton: 230,
					Intergrowth: 620
				},
				{
					Semana: 'Sem 30',
					Fenton: 230,
					Intergrowth: 120
				},
				{
					Semana: 'Sem 31',
					Fenton: 230,
					Intergrowth: 20
				},
				{
					Semana: 'Sem 32',
					Fenton: 230,
					Intergrowth: 60
				},
				{
					Semana: 'Sem 33',
					Fenton: 230,
					Intergrowth: 80
				},
				{
					Semana: 'Sem 34',
					Fenton: 230,
					Intergrowth: 150
				},
				{
					Semana: 'Sem 35',
					Fenton: 230,
					Intergrowth: 340
				},
				{
					Semana: 'Sem 36',
					Fenton: 230,
					Intergrowth: 420
				},
				{
					Semana: 'Sem 37',
					Fenton: 230,
					Intergrowth: 620
				},
				{
					Semana: 'Sem 38',
					Fenton: 230,
					Intergrowth: 330
				},
				{
					Semana: 'Sem 39',
					Fenton: 230,
					Intergrowth: 420
				},
				{
					Semana: 'Sem 40',
					Fenton: 230,
					Intergrowth: 330
				}
      ],
      keys: ['Fenton','Intergrowth'],
      groupKey: 'Semana',
      label: 'Bebes con problemas de crecimiento'
		};
	}
};
</script>

<style></style>
