var vis = d3.select("body").append("svg")
var segmentClass;
var segmentID;
var faceImages = ["face-never.svg", "face-rarely.svg", "face-sometimes.svg", "face-always.svg"];
var outerTextArray = ["SELF-AWARENESS & SELF-ESTEEM", "MANAGING FEELINGS", "NON-VERBAL COMMUNICATION", "VERBAL COMMUNICATION", "PLANNING & PROBLEM SOLVING", "RELATIONSHIPS, LEADERSHIP & ASSERTIVENESS"];
var centre = 250;

var oneSliceWidth = (360 * (Math.PI/180) / 32); // converted from degrees to radians

// Draw the outer text in a circle
for (var i = 0; i < 6; i++) {
	var textArc = d3.svg.arc()
  	.innerRadius(200)
    .outerRadius(200)
  	.startAngle(((i * 5) + 1) * oneSliceWidth) // radians
    .endAngle(((i * 5) + 6) * oneSliceWidth); // radians

  vis.attr("width", "500").attr("height", "500")
    .append("path")
    .attr("id", outerTextArray[i])
    .attr("d", textArc)
    .attr("fill", "none")
    .style("stroke", "none")
    .attr("transform", "translate(" + centre + "," + centre + ")");

  vis.append("text")
    .append("textPath") //append a textPath to the text element
    	.style("font-size", "8px")
      .style("text-anchor","middle") //place the text halfway on the arc
      .style("font-family", "Varela Round")
      .attr("fill", "#6D6D6B")
			.attr("startOffset", "25%")
      .attr("xlink:href", "#" + outerTextArray[i]) //place the ID of the path here
      .text(outerTextArray[i]);
}

// Generate the outline of the chart
for (var j = 0; j < 5; j++) {
  for (var i = 0; i < 31; i++) {

  	if (i === 0) {
  		segmentClass = "face";

    	var arc = d3.svg.arc()
        .innerRadius(40 + j * 30)
        .outerRadius(70 + j * 30)
        .startAngle(0 - oneSliceWidth) // radians
        .endAngle(oneSliceWidth); // radians

    } else {
    	segmentClass = "segment";
      segmentID = "segment-" + j + "" +i;

      var arc = d3.svg.arc()
        .innerRadius(40 + j * 30)
        .outerRadius(70 + j * 30)
        .startAngle(i * oneSliceWidth) // radians
        .endAngle((i+1) * oneSliceWidth); // radians

      if (j === 3) {
        var numArc = d3.svg.arc()
          .innerRadius(41 + j * 32)
          .outerRadius(71 + j * 32)
          .startAngle(i * oneSliceWidth) // radians
          .endAngle((i+1) * oneSliceWidth); // radians

        vis.attr("width", "500").attr("height", "500")
          .append("path")
          .attr("d", numArc)
          .attr("id", segmentID)
          .attr("fill", "none")
          .style("stroke", "none")
          .attr("transform", "translate(" + centre + "," + centre + ")");

        vis.append("text")
          .append("textPath") //append a textPath to the text element to follow
          .style("font-size", "18px")
          .style("font-family", "Varela Round")
          .attr("fill", "#EA5C37")
          .attr("startOffset", "8%")
          .attr("xlink:href", "#segment-" + j + "" + i) //place the ID of the path here
          .text(((i - 1) % 5) + 1 + ".");
      }
    }

   	vis.attr("width", "500").attr("height", "500")
      .append("path")
      .attr("d", arc)
      .attr("class", segmentClass)
      .attr("fill", "transparent")
      .style("stroke", "#6D6D6B")
      .attr("transform", "translate(" + centre + "," + centre + ")");

    if (i === 0 && j < 4) {
      vis.append("svg:image")
        .attr("xlink:href", "../assets/" + faceImages[j])
        .attr("width", 40)
        .attr("height", 40)
        .attr("x", centre - 20)
        .attr("y",(centre - 75) - (j * 30));
    }
  }
}

// Draw the orange line seperators on the chart
for (var i = -7; i < 24; i += 5) {
   vis.append("line")
   	.attr("x2", centre + (190 * Math.cos(i * oneSliceWidth)))
    .attr("y2", centre + (190 * Math.sin(i * oneSliceWidth)))
    .attr("x1", centre + (40 * Math.cos(i * oneSliceWidth)))
    .attr("y1", centre + (40 * Math.sin(i * oneSliceWidth)))
    .attr("stroke", "#EA5C37");
}
