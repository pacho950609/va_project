import * as d3 from "d3";
export default {
	name: "horizontalBoxplot",
	props: {
		data: { type: Array, required: true },
	},	
	async mounted() {
		await this.dibujar();
	},
	methods: {
		async dibujar() {
			const height = 240;
            const width = 1600;
            const numPoints = 100
			const margin = { left: 50, right: 10, top: 10, bottom: 50 };
			const iwidth = width / 2 - margin.left - margin.right;
			const iheight = height - margin.top - margin.bottom;
			const svg = d3.select("#boxplot");

			const x = d3
				.scaleLinear()
				.domain([0, 100])
				.range([0, iwidth]);

			const g = svg
				.append("g")
				.attr("transform", `translate(${margin.left},${margin.top})`);

			g.append("g")
				.call(d3.axisBottom(x))
				.attr("transform", `translate(0,${iheight})`);

			g.selectAll("circle")
				.data(this.data)
				.join("circle")
				.attr("cx", d => x(d.x))
				.attr("cy", d => d.y)
				.attr("r", 5);
		}
	}
};
