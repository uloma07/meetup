var bubbleChart = function () {
    var width = 960,
    height = 960;

    function chart(selection){
        // you gonna get here
    }

    chart.width = function(value) {
        if (!arguments.length) { return width }
        width = value;
        return chart
    };

    chart.height = function(value) {
        if (!arguments.length) { return height }
        height = value;
        return chart
    };

    return chart;
};

d3.json('https://raw.githubusercontent.com/uloma07/meetup/master/data.json', function(data) {
    console.log(data);
});