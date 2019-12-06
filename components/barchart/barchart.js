import * as d3 from "d3";
export default {
	name: "barchart",
	props: {
		groupKey: { type: String, required: true },
		keys: { type: Array, required: true },
		data: { type: Array, required: true },
		label: { type: String, required: true },
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
			var height = 500;
			var width = 1100;
			var margin = { top: 10, right: 10, bottom: 20, left: 40 };
			const svg = d3.select("#imagen");
			svg.selectAll("*").remove();

			var x0 = d3
				.scaleBand()
				.domain(this.data.map(d => d[this.groupKey]))
				.rangeRound([margin.left, width - margin.right])
				.paddingInner(0.1);

			var x1 = d3
				.scaleBand()
				.domain(this.keys)
				.rangeRound([0, x0.bandwidth()])
				.padding(0.05);

			var y = d3
				.scaleLinear()
				.domain([0, d3.max(this.data, d => d3.max(this.keys, key => d[key]))])
				.nice()
				.rangeRound([height - margin.bottom, margin.top]);
			var color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6"]);

			var xAxis = g =>
				g
					.attr("transform", `translate(0,${height - margin.bottom})`)
					.call(d3.axisBottom(x0).tickSizeOuter(0))
					.call(g => g.select(".domain").remove());

			var yAxis = g =>
				g
					.attr("transform", `translate(${margin.left},0)`)
					.call(d3.axisLeft(y).ticks(null, "s"))
					.call(g => g.select(".domain").remove())
					.call(g =>
						g
							.select(".tick:last-of-type text")
							.clone()
							.attr("x", 3)
							.attr("text-anchor", "start")
							.attr("font-weight", "bold")
							.text(this.label)
					);
			var legend = svg => {
				const g = svg
					.attr("transform", `translate(${width},0)`)
					.attr("text-anchor", "end")
					.attr("font-family", "sans-serif")
					.attr("font-size", 10)
					.selectAll("g")
					.data(
						color
							.domain()
							.slice()
							.reverse()
					)
					.join("g")
					.attr("transform", (d, i) => `translate(0,${i * 20})`);

				g.append("rect")
					.attr("x", -19)
					.attr("width", 19)
					.attr("height", 19)
					.attr("fill", color);

				g.append("text")
					.attr("x", -24)
					.attr("y", 9.5)
					.attr("dy", "0.35em")
					.text(d => d);
			};
			svg
				.append("g")
				.selectAll("g")
				.data(this.data)
				.join("g")
				.attr("transform", d => `translate(${x0(d[this.groupKey])},0)`)
				.selectAll("rect")
				.data(d =>
					this.keys.map(key => ({
						key,
						value: d[key],
						groupKey: d[this.groupKey]
					}))
				)
				.join("rect")
				.attr("x", d => x1(d.key))
				.attr("y", d => y(d.value))
				.attr("width", x1.bandwidth())
				.attr("height", d => y(0) - y(d.value))
				.attr("fill", d => color(d.key))
				.on("click", this.onElementClick);

			svg.append("g").call(xAxis);

			svg.append("g").call(yAxis);

			svg.append("g").call(legend);
		},
		onElementClick(d) {
			console.log("hola", d);
		}
	}
};
