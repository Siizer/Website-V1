
var dist = function(va) {
    var x = va[0] - p0x;
    var y = va[1] - p0y;
    
    return Math.sqrt(x * x + y * y);
    };

var angle = function(va) {

    return Math.atan2(va[1],va[0]) *180/Math.PI;
    };

var polyline = function(d) {

    return d.map(function(x) { return x.join(",");}).join(" ");
    };


function pointLineSegmentParameter(p2, p0, p1) {
    var	x10 = p1[0] - p0[0], 
        y10 = p1[1] - p0[1], 
        x20 = p2[0] - p0[0], 
        y20 = p2[1] - p0[1];

    return (x20 * x10 + y20 * y10) / (x10 * x10 + y10 * y10);
    }
    
function generateDataset(numSample, iMul, phaseShift, I_V) {
    var dataset = [];
    for (var i = 0; i < numSample+1; i++) {
        var x = i;
        var y;
        if (i < 95) {
			if (I_V) {y = iMul * 17.67 * Math.sin((i/5) + 174*Math.PI/180 + phaseShift) / (17.67+100);}
			else 	 {y = iMul * 17.67 * Math.sin((i/5) + 174*Math.PI/180 + phaseShift);}
					} else
					{
			if (I_V) {y = iMul * 17.67 * Math.sin((i/5)+174*Math.PI/180 + phaseShift)/(17.67) 
						+ iMul * Math.sin(((i-94)/5)+Math.PI/2 + phaseShift)- iMul* Math.sin(Math.PI/2 + phaseShift) * Math.exp(-(i-94)/50)}
			else 	 {y = iMul * 17.67 * Math.sin((i/5) + 174*Math.PI/180 + phaseShift);}
					;}
		if (Math.abs(y) > temp) { temp = Math.abs(y)}			
        dataset.push([x, y]);
    }
    return dataset;
}

function generateLine(dataset, lineClass, strokeColor, yOffset, yScaleFunc = yScale) {
  var lineFunc = d3.svg.line()
    .x(function (d) { return xScale(d[0]); })
    .y(function (d) { return yScaleFunc(d[1]) + yOffset; })
    .interpolate('linear');

  var pathElement = svgB.append('path')
    .attr("class", lineClass)
    .attr('d', lineFunc(dataset))
    .attr('stroke', strokeColor)
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  return { lineFunc: lineFunc, pathElement: pathElement };
}

// Function to append an axis
function appendAxis(rank, axisType, x, y, axis) {
    svgB.append("g")
        .attr("class", axisType)
        .attr("id", rank)
        .attr("transform", `translate(${x}, ${y})`)
        .call(axis);
}
// Function to add an axis
function addAxis(rankx, ranky, x1, y1, x2, y2) {
    appendAxis(rankx, "x axis", x1, y1, xAxis);
    appendAxis(ranky, "y axis", x2, y2, yAxis);
    appendAxis(ranky, "y axis", x2, y2, yAxisRight);
}