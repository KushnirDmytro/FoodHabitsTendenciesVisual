import * as d3 from "d3";

const line_height = 30;

d3.csv("/data/busdata-temp.csv", (err, data) => {
    const drivers = data.reduce ( (accum, el) => {
        const index = accum.findIndex ( (row) => row[0].drivername  === el.drivername);

        if (index >= 0) {accum [index].push(el);}
        else {accum.push([el]);}

        return accum;
    }, []) ;

    console.log(drivers);

    render (drivers);
});


const render = (data) => {
    const svg = d3
        .select(document.body)
        .select('svg');


    const trials = svg
        .selectAll(".trial")
        .data(data);

    const row = trials
        .enter()
        .append("g")
        .attr("class", "trial")
        .attr("transform", (d, i) => `translate(0, ${i*line_height})`);




    const maxTrialDuration = d3.max(data
        .map(singleDriverData => d3.max(singleDriverData
            .filter (d=> d.event === "drive")
            .map(d=>parseInt(d.distance)))
        )
    );

    const routeDistances = data[0]
        .filter( tr => tr.event === "drive" )
        .map(tr => parseInt(tr.distance));


    const getSpeedBreak = (d) => {
        let speedBreak = parseInt(d.distance) / parseInt(d.duration) * 3600 / 1000 - 60;
        return ( ((speedBreak > 0) && (speedBreak < 50)) ? speedBreak : 0);
    }

    const avgSpeedsBreaks = data
        .map(singleDriverData => singleDriverData
            .filter (d=> d.event === "drive")
            .map( d => getSpeedBreak(d))
        );
    console.log(avgSpeedsBreaks);


    const speedBreaksOpacityMap = d3.scaleLinear()
        .domain([0, 20])
        .range([0, 1]);

    const avgSpeedsBreaksScaled = data
        .map(singleDriverData => singleDriverData
            .filter (d=> d.event === "drive")
            .map( d => getSpeedBreak(d)).map(el => speedBreaksOpacityMap(el))
        );

    let routeDistFromStart = [];
    for (let i = 0; i < routeDistances.length; i ++){
        let acc = 0;
        for (let ii = 0; ii < i; ii ++){
            acc += routeDistances[ii];
        }
        routeDistFromStart.push(acc);
    }

    const routeTotalLength = routeDistFromStart[routeDistFromStart.length-1];

    const scaleRows = d3.scaleLinear()
        .domain([0, routeTotalLength])
        .range([0, 900]);


    row
        .selectAll(".drive")

        .data(d => d)
        .enter()
        .filter (d=> d.event === "drive")
        .append("rect")
        .attr("x", (d,i) => scaleRows(routeDistFromStart[i]))
        .attr("y", -5)
        .attr("width", d => scaleRows( parseInt(d.distance) ) )
        .attr("height", 10)
        .attr("fill", "url(#grad)")
        .attr("opacity", d => speedBreaksOpacityMap(getSpeedBreak(d)));


    row
        .selectAll(".stops")
        .data(d => d)
        .enter()
        .filter (d=> d.event === "stop")
        .append("circle")
        .attr("class", "stops")
        .attr("cx", (d,i) => scaleRows(routeDistFromStart[i]))
        .attr("cy", 0)
        .attr("r", (d) => d.duration / 10)
        .attr("fill", "red")

}