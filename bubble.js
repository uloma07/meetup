var bleed = 100,
    width = 960,
    height = 760;

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

d3.csv("result.csv", function(error, data) {
    if (error) throw error
    var node = svg.selectAll(".node")
        .data(data)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + Math.floor((Math.random() * 670) + 30) + "," + Math.floor((Math.random() * 870) + 30) + ")"; })

node.append("circle")
    .attr("r", function(d) { return d.Count * 30 })
    .style("background-color", "red");

node.append("text")
    .text(function(d) { return d.Name; })
    .style("font-size", function(d) { "24px"; })
    .style("color", function(d) { "#fff"; })
    .attr("dy", ".35em");
});
