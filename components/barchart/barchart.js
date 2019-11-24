import * as d3 from "d3";
export default {
	name: "barchart",
	data() {
		return {
			data: "Texto de la grafica"
		};
	},
	async mounted() {
		await this.dibujar();
	},
	methods: {
		async dibujar() {
			const data = await d3.json(
				"https://www.datos.gov.co/resource/tkn6-e4ic.json?$limit=22000"
      );
      const height = 300,
      margin = {left:100, right:10, top: 10, bottom:50},
      iwidth = 600 - margin.left -margin.right,
      iheight = height - margin.top - margin.bottom;
			const svg = d3.select("#imagen");
			const puntaje = d3
				.scaleLinear()
				.domain([0, 400])
				.range([0, iwidth]);
			const g = svg
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);
			g.append("g")
				.call(d3.axisBottom(puntaje))
				.attr("transform", `translate(0,${iheight})`);
			console.log(data);
		}
	}
};
