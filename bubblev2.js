var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var format = d3.format(",d");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("result.csv", function(d) {
    d.Count = +d.Count;
    if (d.Count > 3) return d;
}, function(error, classes) {
    appendNodes(error,classes);
});

function updateSlider(slideAmount) {
    var display = document.getElementById("chosen");
    //show the amount
    display.innerHTML=slideAmount;   
    d3.select("svg").selectAll("*").remove();
    d3.csv("result.csv", function(d) {
        d.Count = +d.Count;
        if (d.Count > slideAmount) 
            return d;
    }, function(error, classes) {    
        appendNodes(error,classes);     
    }); 
}

function appendNodes(error,classes){
    if (error) throw error;
    var root = d3.hierarchy({children: classes})
    .sum(function(d) { return d.Count; })
    .each(function(d) {
        d.id = d.data.ID;
        d.count = d.data.Count;
        d.class = d.data.Name
    });    
var node = svg.selectAll("*")
    .data(pack(root).leaves())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

node.append("circle")
    .attr("id", function(d) { return d.id; })
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d) { return color(d.class); });

node.append("clipPath")
    .attr("id", function(d) { return "clip-" + d.id; })
    .append("use")
    .attr("xlink:href", function(d) { return "#" + d.id; });

node.append("text")
    .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
    .selectAll("tspan")
    .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
    .attr("x", 0)
    .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
    .text(function(d) { return d; });

node.append("title")
    .text(function(d) { return d.id + "\n" + format(d.value); });
}