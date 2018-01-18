import * as d3 from "d3";
import {geoEquirectangular, geoMercator, geoPath, geoGraticule} from "d3-geo";
import * as topojson from "topojson";

//
// <script src="http://d3js.org/d3.v3.min.js"></script>
//     <script src="http://d3js.org/topojson.v1.min.js"></script>
//     <!-- I recommend you host this file on your own, since this will change without warning -->
//     <script src="http://datamaps.github.io/scripts/datamaps.world.min.js?v=1"></script>
//
//     <!-- Add as many pattern definitions (defs) as you'd like, make sure to include an ID -->
//     <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
// xmlns:xlink="http://www.w3.org/1999/xlink">
//     <!-- Gradient pattern. Wouldn't really recommend this one. -->
// <linearGradient id="gradient">
//     <stop offset="5%" stop-color="#F60"/>
//     <stop offset="95%" stop-color="#FF6"/>
//     </linearGradient>
//
//     </svg>

const width = 700;
const height = 450;

const div = d3.select("body").append("div")
    .id("container1")
    .attr("width", width)
    .attr("height", height)
    .style("margin", "0 0 0 15%");

// <script src="http://datamaps.github.io/scripts/datamaps.world.min.js?v=1"></script>

const election = new Datamap({
    scope: 'world',
    element: document.getElementById('container1'),
    projection: 'mercator',

    fills: {
        defaultFill: '#f0af0a',
        gradient: 'url(#gradient)',
        triangle: 'url(#triangle)'
    },

    data: {
        USA: {fillKey: 'gradient'},
        RUS: {fillKey: 'gradient'},
        CAN: {fillKey: 'gradient'},
        BRA: {fillKey: 'gradient'},
        GRL: {fillKey: 'gradient'},
        CHN: {fillKey: 'gradient'}

    }
});