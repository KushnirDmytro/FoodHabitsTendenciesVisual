import * as d3 from "d3";

const SVG_height = 800;
const SVG_width = 1200;


let current_data_period = 0;

const DATA_PERIODS = [
    "1990_1992",
    "1993_1995",
    "1996_1998",
    "1999_2001",
    "2002_2004",
    "2005_2007",
    "2008_2010",
    "2011_2013",
    "2014_2016"
];

const stupid_cluster_to_color = (cluster) => {

    switch (cluster){
        case 0 : return 'brown';
        case 1 : return 'red';
        case 2 : return 'blue';
        case 3 : return 'green';
        case 4 : return 'magenta';
        case 5 : return 'silver';
        default: return 'yellow'
    }
};

function  update_data (per) {
    console.log ("current data period " + DATA_PERIODS[per]);

    d3.csv("/data/pca coords/"+ DATA_PERIODS[per] + ".csv", (err, data) => {
        console.log("period" + per)
        console.log(data);

        d3.csv("/data/clusters_PCA/Clusters"+ DATA_PERIODS[per]  + ".csv",  (err, cluster_data) => {
            console.log(cluster_data)
            // as return from d3.csv works not good, using "nested" call instead

            data = data.map(d => {

                d['cluster'] = cluster_data
                    .filter(d_cl => d_cl.COUNTRY === d.country)
                    [0]
                    .cluster; // appending with cluster notion

                return {  // not obligatory, but to have easier control on types and names
                    x: +d.x,
                    y: +d.y,
                    country: d.country,
                    cluster: +d.cluster
                }

            });

            // console.log(data[0].cluster/2);

            if (per === 0) {
                render(data, per);
            }else {
                setTimeout(render(data, per), 2000);
            }

        });
        // console.log(data[0].cluster); // TODO FIGURE OUT HOW TO LIVE WITH THIS?
        });


}


d3 // hanging update function here (other beahaviour You can change later instead of "CLICK" on  body element
    .select(document.body)
    .on("click", function () {
    current_data_period++;
    update_data(current_data_period);
});

update_data(current_data_period);


const render = (data, currentDataPeriod) => {

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



    if (currentDataPeriod === 0) { // first iteration

        const title = svg
            .append("g")
            .attr("class", "title")
            .attr("transform", "translate(" + SVG_width/2 + "," + 20 +  ")" );

        title
            .append("text")
            .attr("class", "title_text")
            .text(DATA_PERIODS[currentDataPeriod])
            .attr("font-size", "25px")
            .attr("font-weight", "bold");



        const countries = svg
            .selectAll(".country")
            .data(data)
            .enter()
            .append('g')
            .attr("class", "country")
            .attr("transform", d => "translate(" +  scaleX(d.x)  + ',' +  scaleY(d.y)+ ")");


        countries
            .append("circle")
                .data(data) //TODO this part should be rendered in other way when not first execution but transition instead
                .attr("r", 10)
                .attr("fill", d => stupid_cluster_to_color(d.cluster) );
        // });


        // background for text
        countries
            .append("rect")
            .attr("width", 42)
            .attr("height", 30)
            .attr("fill", 'yellow')
            .attr("opacity", 0.6)
            .attr("transform", "translate(" + 0 + ',' +  -20 + ")") //placing as the text background
            .attr('rx', 10)  // rounding edges

        countries
            .append("text")
            .data(data)
            .text(d => d.country)
            .attr("font-size", "20px");
    }
    else { // altering inner content of svg

        let title = svg.select('.title');
        title
            .select(".title_text")
            .text(DATA_PERIODS[currentDataPeriod])
            .attr("font-size", "25px")
            .attr("font-weight", "bold");

        let countries = svg
            .selectAll(".country")
            .data(data)
            // .enter()
            // .append('g')
            // .attr("class", "country")
            .transition()
            .duration(3000)
            .attr("transform", d => "translate(" +  scaleX(d.x)  + ',' +  scaleY(d.y)+ ")");


        console.log(countries)
    }




};
