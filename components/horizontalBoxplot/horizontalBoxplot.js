import * as d3 from "d3";
export default {
	name: "horizontalBoxplot",
	props: {
		data: { type: Array, required: true },
		reload: { type: Number, required: true }
	},	
	watch: {
		async reload() {
			await this.dibujar();
		}
	},	
	async mounted() {
		await this.dibujar();
	},
	methods: {
		async dibujar() {
			const height = 290;
            const width = 1600;
			const margin = { left: 50, right: 10, top: 10, bottom: 50 };
			const iwidth = width / 2 - margin.left - margin.right;
			const iheight = height - margin.top - margin.bottom;
			const svg = d3.select("#boxplot");
			svg.selectAll("*").remove();
			const maxX = Math.max(...this.data.map(x=> x.x))
			const minX = Math.min(...this.data.map(x=> x.x))
			const x = d3
				.scaleLinear()
				.domain([minX, maxX])
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
				.attr("r", 3.5);
		}
	}
};
