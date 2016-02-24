function drawWheel(formAnswers) {

  var vis = d3.select("body").append("svg");
  var segmentClass;
  var textPathID;
	var segmentID;
  var faceImages = ["face-never.svg", "face-rarely.svg", "face-sometimes.svg", "face-always.svg"];
  var outerTextArray = ["SELF-AWARENESS & SELF-ESTEEM", "MANAGING FEELINGS", "NON-VERBAL COMMUNICATION", "VERBAL COMMUNICATION", "PLANNING & PROBLEM SOLVING", "RELATIONSHIPS, LEADERSHIP & ASSERTIVENESS"];
  var centre = 250;
  var arc;

  var oneSliceWidth = (360 * (Math.PI / 180) / 32); // converted from degrees to radians

  // Draw the outer text in a circle
  for (var m = 0; m < 6; m++) {
    var textArc = d3.svg.arc()
      .innerRadius(200)
      .outerRadius(200)
      .startAngle(((m * 5) + 1) * oneSliceWidth) // radians
      .endAngle(((m * 5) + 6) * oneSliceWidth); // radians

    vis.attr("width", "500").attr("height", "500")
      .append("path")
      .attr("id", outerTextArray[m])
      .attr("d", textArc)
      .attr("fill", "none")
      .style("stroke", "none")
      .attr("transform", "translate(" + centre + "," + centre + ")");

    vis.append("text")
      .append("textPath") //append a textPath to the text element
      .style("font-size", "8px")
      .style("text-anchor", "middle") //place the text halfway on the arc
      .style("font-family", "Varela Round")
      .attr("fill", "#6D6D6B")
      .attr("startOffset", "25%")
      .attr("xlink:href", "#" + outerTextArray[m]) //place the ID of the path here
      .text(outerTextArray[m]);
  }

  // Generate the outline of the chart
  for (var j = 0; j < 5; j++) {
    for (var i = 0; i < 31; i++) {

      if (i === 0) {
        segmentClass = "face";

        arc = d3.svg.arc()
          .innerRadius(40 + j * 30)
          .outerRadius(70 + j * 30)
          .startAngle(0 - oneSliceWidth) // radians
          .endAngle(oneSliceWidth); // radians

      } else {
        segmentClass = "segment";
        textPathID = "textpath-" + i + "-" + j;
				segmentID = "segment-" + i + "-" + j;

        arc = d3.svg.arc()
          .innerRadius(40 + j * 30)
          .outerRadius(70 + j * 30)
          .startAngle(i * oneSliceWidth) // radians
          .endAngle((i + 1) * oneSliceWidth); // radians

        if (j === 3) {
          var numArc = d3.svg.arc()
            .innerRadius(41 + j * 32)
            .outerRadius(71 + j * 32)
            .startAngle(i * oneSliceWidth) // radians
            .endAngle((i + 1) * oneSliceWidth); // radians

          vis.attr("width", "500").attr("height", "500")
            .append("path")
            .attr("d", numArc)
            .attr("id", textPathID)
            .attr("fill", "none")
            .style("stroke", "none")
            .attr("transform", "translate(" + centre + "," + centre + ")");

          vis.append("text")
            .append("textPath") //append a textPath to the text element to follow
            .style("font-size", "18px")
            .style("font-family", "Varela Round")
            .attr("fill", "#EA5C37")
            .attr("startOffset", "8%")
            .attr("xlink:href", "#textpath-" + i + "-" + j) //place the ID of the path here
            .text(((i - 1) % 5) + 1 + ".");
        }
      }

      vis.attr("width", "500").attr("height", "500")
        .append("path")
        .attr("d", arc)
        .attr("class", segmentClass)
				.attr("id", segmentID)
        .attr("fill", "transparent")
        .style("stroke", "#6D6D6B")
        .attr("transform", "translate(" + centre + "," + centre + ")");

      if (i === 0 && j < 4) {
        vis.append("svg:image")
          .attr("xlink:href", "../assets/" + faceImages[j])
          .attr("width", 40)
          .attr("height", 40)
          .attr("x", centre - 20)
          .attr("y", (centre - 75) - (j * 30));
      }
    }
  }

  // Draw the orange line seperators on the chart
  for (var k = -7; k < 24; k += 5) {
    vis.append("line")
      .attr("x2", centre + (190 * Math.cos(k * oneSliceWidth)))
      .attr("y2", centre + (190 * Math.sin(k * oneSliceWidth)))
      .attr("x1", centre + (40 * Math.cos(k * oneSliceWidth)))
      .attr("y1", centre + (40 * Math.sin(k * oneSliceWidth)))
      .attr("stroke", "#EA5C37");
  }
  fillWheel(formAnswers);
}

function fillWheel(formAnswers){
	formAnswers.forEach(function(elem, index){
    for (var i = 0; i<=elem.answer; i++){
      var target = (index - 5) + "-" + (i); // index has to be - 5 to account for the student details at the start of the form
      d3.select("#segment-"+target)
        .attr("fill", "#50B9A7");
    }
	});
}
