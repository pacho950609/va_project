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
			const height = 290;
			const width = 1600;
			const margin = { left: 50, right: 10, top: 10, bottom: 50 };
			const iwidth = width / 2 - margin.left - margin.right;
			const iheight = height - margin.top - margin.bottom;
			const svg = d3.select("#boxplot");
			svg.selectAll("*").remove();
			const maxX = Math.max(...this.data.map(x => x.x));
			const minX = Math.min(...this.data.map(x => x.x));
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
				.attr("x", x(this.fenton - 2))
				.attr("y", 30)
				.attr("width", 3)
				.attr("height", 150)
				.attr("fill", "#98abc5");

			g.append("rect")
				.attr("x", x(this.intergrowth - 2))
				.attr("y", 30)
				.attr("width", 3)
				.attr("height", 150)
				.attr("fill", "#8a89a6");

			g.selectAll("circle")
				.data(this.data)
				.join("circle")
				.attr("cx", d => x(d.x))
				.attr("cy", d => d.y)
				.attr("r", 3.5)
				.on("click", this.onElementClick)
				.attr("fill", function(x) {
					console.log(x);
					if (
						(x.x <= x.intergrowth && x.x >= x.fenton) ||
						(x.x <= x.fenton && x.x >= x.intergrowth)
					) {
						return "#ffa500";
					} else if (
						(x.intergrowth < x.fenton && x.x < x.intergrowth) ||
						(x.fenton <= x.intergrowth && x.x < x.fenton)
					) {
						return "#ff0000";
					} else {
						return "#00ff00";
					}
				});

			g.append("rect")
				.attr("x", 800)
				.attr("y", 20)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#8a89a6");
			g.append("text")
				.attr("x", 830)
				.attr("y", 35)
				.text("Percentil 10 Intergrowth");

			g.append("rect")
				.attr("x", 800)
				.attr("y", 55)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#98abc5");
			g.append("text")
				.attr("x", 830)
				.attr("y", 70)
				.text("Percentil 10 Fenton");

			g.append("circle")
				.attr("cx", 810)
				.attr("cy", 130)
				.attr("r", 7)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#ff0000");
			g.append("text")
				.attr("x", 830)
				.attr("y", 135)
				.text("Con problemas de crecimiento");

			g.append("circle")
				.attr("cx", 810)
				.attr("cy", 155)
				.attr("r", 7)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#ffa500");
			g.append("text")
				.attr("x", 830)
				.attr("y", 160)
				.text("Con problemas de crecimiento segun solo una curva");

			g.append("circle")
				.attr("cx", 810)
				.attr("cy", 180)
				.attr("r", 7)
				.attr("width", 20)
				.attr("height", 20)
				.attr("fill", "#00ff00");
			g.append("text")
				.attr("x", 830)
				.attr("y", 185)
				.text("Sin problemas de crecimiento");
		},
		onElementClick(d) {
			this.$emit("boxplotEvent", d.obj);
		}
	}
};
