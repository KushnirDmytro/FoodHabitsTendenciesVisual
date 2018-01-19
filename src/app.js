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



// import * as d3 from "d3";
//
// const line_height = 30;
//
// const SVG_height = 800;
// const SVG_width = 1200;
//
// d3.csv("/data/pca coords/1990-1992.csv", (err, data) => {
//     console.log(data);
//
//     //data structure tip
//     const columnKeys = data.columns;
//     console.log(columnKeys); //["country", "x", "y"]
//
//     // only firsy col data
//     let countyNames = data.map( d => d.country); // or d[columnKeys[0]]
//
//     console.log(countyNames);
//
//     render(data);
//
//     // console.log(data[0]);
//
//
//     // render(data);
//
//     // const drivers = data.reduce ( (accum, el) => {
//     //     const index = accum.findIndex ( (row) => row[0].drivername  === el.drivername);
//     //
//     //     if (index >= 0) {accum [index].push(el);}
//     //     else {accum.push([el]);}
//     //
//     //     return accum;
//     // }, []) ;
//     //
//     // console.log(drivers);
//     //
//     // render (drivers);
// });
//
//
//
//
// const render = (data) => {
//
//
//     // HELPER FUNCTIONS =================================
//
//     const scaleX = d3.scaleLinear()
//         .domain([-150, 250])
//         .range([  0, SVG_width]);
//
//     const scaleY = d3.scaleLinear()
//         .domain([-120, 150])
//         .range([SVG_height, 0]);
//
//     // HELPER FUNCTIONS =================================
//
//
//     const svg = d3
//         .select(document.body)
//         .select('svg');
//
//
//     const countries = svg
//         .selectAll(".country")
//         .data(data)
//         .enter()
//         .append('g')
//         .attr("class", "country")
//         .attr("transform", d => "translate(" +  scaleX(d.x)  + ',' +  scaleY(d.y)+ ")");
//
//     countries
//         .append("circle")
//         .attr("r", 5);
//
//
//     countries
//         .append("rect")
//         .attr("width", 42)
//         .attr("height", 30)
//         .attr("fill", 'yellow')
//         .attr("opacity", 0.6)
//         .attr("transform", d => "translate(" + 0 + ',' +  -20 + ")") //placing as the text background
//         .attr('rx', 12)
//         .attr('ry', 12);
//
//     countries
//         .append("text")
//         .data(data)
//         .text(d => d.country)
//         .attr("font-size", "20px");
//
//
//
//     console.log(countries);
//
//
//
//
//
//     const maxTrialDuration = d3.max(data
//         .map(singleDriverData => d3.max(singleDriverData
//             .filter (d=> d.event === "drive")
//             .map(d=>parseInt(d.distance)))
//         )
//     );
//
//     const routeDistances = data[0]
//         .filter( tr => tr.event === "drive" )
//         .map(tr => parseInt(tr.distance));
//
//
//     const getSpeedBreak = (d) => {
//         let speedBreak = parseInt(d.distance) / parseInt(d.duration) * 3600 / 1000 - 60;
//         return ( ((speedBreak > 0) && (speedBreak < 50)) ? speedBreak : 0);
//     };
//
//     const avgSpeedsBreaks = data
//         .map(singleDriverData => singleDriverData
//             .filter (d=> d.event === "drive")
//             .map( d => getSpeedBreak(d))
//         );
//     console.log(avgSpeedsBreaks);
//
//
//     const speedBreaksOpacityMap = d3.scaleLinear()
//         .domain([0, 20])
//         .range([0, 1]);
//
//     const avgSpeedsBreaksScaled = data
//         .map(singleDriverData => singleDriverData
//             .filter (d=> d.event === "drive")
//             .map( d => getSpeedBreak(d)).map(el => speedBreaksOpacityMap(el))
//         );
//
//     let routeDistFromStart = [];
//     for (let i = 0; i < routeDistances.length; i ++){
//         let acc = 0;
//         for (let ii = 0; ii < i; ii ++){
//             acc += routeDistances[ii];
//         }
//         routeDistFromStart.push(acc);
//     }
//
//     const routeTotalLength = routeDistFromStart[routeDistFromStart.length-1];
//
//     const scaleRows = d3.scaleLinear()
//         .domain([0, routeTotalLength])
//         .range([0, 900]);
//
//
//
//
//     // row
//     //     .selectAll(".drive")
//     //     .data(d => d)
//     //     .enter()
//     //     .filter (d=> d.event === "drive")
//     //     .append("rect")
//     //     .attr("x", (d,i) => scaleRows(routeDistFromStart[i]))
//     //     .attr("y", -5)
//     //     .attr("width", d => scaleRows( parseInt(d.distance) ) )
//     //     .attr("height", 10)
//     //     .attr("fill", "url(#grad)")
//     //     .attr("opacity", d => speedBreaksOpacityMap(getSpeedBreak(d)));
//     //
//     //
//     // row
//     //     .selectAll(".stops")
//     //     .data(d => d)
//     //     .enter()
//     //     .filter (d=> d.event === "stop")
//     //     .append("circle")
//     //     .attr("class", "stops")
//     //     .attr("cx", (d,i) => scaleRows(routeDistFromStart[i]))
//     //     .attr("cy", 0)
//     //     .attr("r", (d) => d.duration / 10)
//     //     .attr("fill", "red");
//
//
//
//
//     countries
//         .selectAll(".country")
//         .data(d => d)
//         .enter()
//         .append("circle")
//         .attr("class", "country")
//         .attr("cx", (d,i) => scaleX(parseFloat(d.X)))
//         .attr("cy", (d,i) => scaleY(parseFloat(d.Y)))
//         .attr("fill", "red");
//
// };