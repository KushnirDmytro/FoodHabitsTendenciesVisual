import * as d3 from "d3";

const SVG_height = 800;
const SVG_width = 1200;

d3.csv("/data/pca coords/1990-1992.csv", (err, data) => {
    console.log(data);

    //data structure tip
    const columnKeys = data.columns;
    console.log(columnKeys); //["country", "x", "y"]

    // only firsy col data
    let countyNames = data.map( d => d.country); // or d[columnKeys[0]]

    console.log(countyNames);

    render(data);

});




const render = (data) => {


    // HELPER FUNCTIONS =================================

    const scaleX = d3.scaleLinear()
        .domain([-150, 250])
        .range([  0, SVG_width]);

    const scaleY = d3.scaleLinear()
        .domain([-120, 150])
        .range([SVG_height, 0]);

    // HELPER FUNCTIONS =================================


    const svg = d3
        .select(document.body)
        .select('svg');


    const countries = svg
        .selectAll(".country")
        .data(data)
        .enter()
        .append('g')
        .attr("class", "country")
        .attr("transform", d => "translate(" +  scaleX(d.x)  + ',' +  scaleY(d.y)+ ")");

    countries
        .append("circle")
        .attr("r", 5);



    // background for text
    countries
        .append("rect")
        .attr("width", 42)
        .attr("height", 30)
        .attr("fill", 'yellow')
        .attr("opacity", 0.6)
        .attr("transform", d => "translate(" + 0 + ',' +  -20 + ")") //placing as the text background
        .attr('rx', 10)  // rounding edges

    countries
        .append("text")
        .data(data)
        .text(d => d.country)
        .attr("font-size", "20px");



    console.log(countries);



};