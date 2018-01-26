import * as d3 from "d3";

var format = d3.format(",");

var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([-1,0,1,2,3,5])
    .range(["black", "silver", "yellow", "brown", "blue", "green"]);

var path = d3.geoPath();

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('class', 'map');

var projection = d3.geoMercator()
    .scale(130)
    .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);


d3.queue()
    .defer(d3.json, "/data/world_countries.json")
    .defer(d3.csv, "/data/clusters_PCA/Clusters1990_1992.csv")
    //.defer(d3.tsv, "/data/world_population.tsv")
    .await(ready);

function ready(error, data, population) {
    var populationById = {};

    population.forEach(function(d) { populationById[d.COUNTRY] = +d.cluster; });
    data.features.forEach(function(d) { populationById[d.id] ? d.cluster = populationById[d.id] : d.cluster = -1 });
    console.log(data.features)
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(d.cluster); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
            d3.select(this)
                .style("opacity", 1)
                .style("stroke","white")
                .style("stroke-width",3);
        })
        .on('mouseout', function(d){
            //tip.hide(d);

            d3.select(this)
                .style("opacity", 0.8)
                .style("stroke","white")
                .style("stroke-width",0.3);
        });
    // svg.append("path")
    //     .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
    //     // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    //     .attr("class", "names")
    //     .attr("d", path);

}
