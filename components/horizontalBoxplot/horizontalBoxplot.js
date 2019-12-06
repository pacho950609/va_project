import * as d3 from "d3";
export default {
	name: "horizontalBoxplot",
	async mounted() {
		await this.dibujar();
	},
	methods: {
		async dibujar() {
			const height = 240;
            const width = 1600;
            const numPoints = 4000
			const margin = { left: 50, right: 10, top: 10, bottom: 50 };
			const iwidth = width / 2 - margin.left - margin.right;
			const iheight = height - margin.top - margin.bottom;
			const studentsData = d3.range(numPoints).map(() => ({
				age: Math.random() * 100,
				tuition: Math.random() * 2500,
				gpa: Math.random() * 160,
				program: ["Engineering", "Arts", "Math"][Math.floor(Math.random() * 3)]
			}));
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
				.data(studentsData)
				.join("circle")
				.attr("cx", d => x(d.age))
				.attr("cy", d => d.gpa)
				.attr("r", 5);
		}
	}
};
