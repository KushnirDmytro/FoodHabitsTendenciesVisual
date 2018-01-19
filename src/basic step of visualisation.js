import * as d3 from "d3";

// reading a data
d3.csv("/data/pca coords/1990-1992.csv", (err, data) => {

    //data structure tip
    const columnKeys = data.columns;
    console.log(columnKeys); //["country", "x", "y"]

    // only firsy col data
    let countyNames = data.map( d => d.country); // or d[columnKeys[0]]

    console.log(countyNames);

    render(data);

});




const render = (data) => {
    const svg = d3
        .select(document.body)
        .select('svg');


    const countries = svg
        .selectAll(".country")
        .data(data)
        .enter()
        .append('g') // creating "groups" as d3js usual "acting containers" has properties as "transform", etc...
        .attr("class", "country")
        .attr("transform", d => "translate(" + d.x + ',' + d.y + ")"); // translate - linear transformation of movement

    countries
        .append("circle") // appending "inside" a groups in DOM tree
        .attr("r", 5);



    console.log(countries);


};