import * as d3 from "d3";

function createPiechart () {
    var width = 960/2,
        height = 500/2,
        radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var pie = d3.pie()
        .value(function(d) { return d.apples; })
        .sort(null);

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // svg.append("text")
    //     .attr("text-anchor", "right")
    //         .attr('font-size', '100%')
    //         .attr('y', 20)
    //     .text("COUNTRY");

    d3.tsv("/data/data.tsv", type, function(error, data) {
        var path = svg.datum(data).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc);

        d3.selectAll("input")
            .on("change", change);

        var timeout = setTimeout(function() {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        }, 2000);

        function change() {
            var value = this.value;
            clearTimeout(timeout);
            pie.value(function(d) { return d[value]; }); // change the value function
            path = path.data(pie); // compute the new angles
            path.attr("d", arc); // redraw the arcs
        }
    });

    function type(d) {
        d.apples = +d.apples;
        d.oranges = +d.oranges;
        return d;
    }
}

export {createPiechart};
