import * as d3 from "d3";
export default {
	name: "horizontalBoxplot",
	props: {
		data: { type: Array, required: true },
		reload: { type: Number, required: true },
		intergrowth: { type: Number, required: true },
		fenton: { type: Number, required: true }
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
						console.log('longitud',this.data.length)
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

			g.append("rect")
				.attr("x", x(this.fenton-10))
      			.attr("y", 30)
				.attr("width", 3)
				.attr("height", 150)
				.attr("fill","#98abc5")

			g.append("rect")
				.attr("x", x(this.intergrowth-10))
      			.attr("y", 30)
				.attr("width", 3)
				.attr("height", 150)
				.attr("fill","#8a89a6")			

			g.selectAll("circle")
				.data(this.data)
				.join("circle")
				.attr("cx", d => x(d.x))
				.attr("cy", d => d.y)
				.attr("r", 3.5)
				.on("click", this.onElementClick); 				
		},
		onElementClick(d) {
			this.$emit('boxplotEvent', d.obj)
		}
	}
};
