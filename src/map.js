import * as d3 from "d3";
import {geoEquirectangular, geoMercator, geoPath, geoGraticule} from "d3-geo";
import * as topojson from "topojson";
import {createPiechart} from "./piechart";


const format = function(d) {
    d = d / 1000000;
    return d3.format(',.02f')(d) + 'M';
};

const mapExtra = d3.geomap.choropleth()
    .geofile('/data/countries2.json')
    .colors(colorbrewer.YlGnBu[9])
    .column('cluster')
    .format(format)
    .legend(true)
    .unitId('COUNTRY');

d3.csv('/data/Clusters1990_1992.csv', function(data) {
    d3.select('#mapExtra')
        .datum(data)
        .call(mapExtra.draw, mapExtra);
    console.log(data[0])
});


const width = 900,
      height = 300;
const color = d3.scaleOrdinal(d3.schemeCategory10);


const projection = geoMercator()
    .scale(100)                                 // size of a map
    .translate([width /2 , height/2 ])
    .precision(.2);
const path = geoPath()
    .projection(projection);
const graticule = geoGraticule();
const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("margin", "0 0 0 15%");

// svg.style("border", "1px black");

svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);
svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");
svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");
svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

// // READ DATA
// d3.csv("./data/Clusters1990_1992.csv", function(data){
//     console.log(data[0]['COUNTRY']);
// });


d3.json("/data/world-110m.geojson", function (world) {

    const countries = topojson.feature(world, world.objects.countries).features,
        neighbors = topojson.neighbors(world.objects.countries.geometries);

    console.log(countries);

    svg.selectAll(".country")
        .data(countries)
        .enter()
        .insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", function (d, i) {
            return color(d.color = d3.max(neighbors[i], function (n) {
                return countries[n].color;
            }) + 1 | 0);
        })
        // .on("dblclick", mapZoom)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", piechart);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function (a, b) {
            return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);

});
d3.select(self.frameElement).style("height", height + "px");

// Create Event Handlers for mouse
function piechart(data) {  // Add interactivity
    console.log("aaaaa",data);
    d3.select(this);
    //     .style("background-color", "orange");

    console.log(d3.event);
    console.log(d3.mouse(this)); // x&y coordinates

    // var svg = document.getElementsByTagName('svg')[0]; //Get svg element
    // var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');

    createPiechart();

}


function handleMouseOver() {
}

function handleMouseOut() {
}
