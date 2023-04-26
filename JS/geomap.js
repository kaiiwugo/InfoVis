(function () {
  d3.json("./JSON/topo.json").then((data) => {
    //Load data here

    const topo = topojson.feature(data, data.objects.states);

    // var projection = d3.geoAlbersUsa().scale(700).translate([487.5, 305]);
    var projection = d3.geoAlbersUsa().scale(1000).translate([487.5, 305]);
    var path = d3.geoPath(projection);
    //read in our json file

    Promise.all([
      d3.json("./JSON/topo.json"), //load the TopoJSON data
      d3.csv("./Data/DrugOffenses.csv"), //load the GPS coords for cities
    ]).then((data) => {
      console.log(data);
      // ...
      //give our data sensible names
      const topology = data[0];
      const colleges = data[1];
      console.log(colleges);

      const collegeDictionary = new Map();
      colleges.forEach((college) => {
        // this is basically a for loop
        collegeDictionary.set(college.Rank);
      });

      var scale = d3
        .scaleLinear()
        .domain([0, 51]) // Input domain
        .range([15, 1]); // Output range
      function scaleSize(input) {
        var output = scale(input);
        return output;
      }

      var colorScale = d3
        .scaleSequential()
        .domain([50, 1]) // Input data value range (object.rank)
        .interpolator(d3.interpolate("#FFEEEE", "#FF0000")); // Color range from lig

      const svg = d3
        .select("#geomap")
        .append("g")
        .attr("transform", "translate(300,100)");

      svg
        .append("g")
        .selectAll("path")
        .data(topo.features)
        .join("path")
        .attr("d", path)
        // .attr("fill", (d) => blues(collegeDictionary.get(d.properties.name)))
        .style("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", "1.5px");

      svg
        .append("g")
        .selectAll("circle")
        .data(colleges)
        .enter()
        .append("circle")
        .attr("id", (d) => {
          return d.Rank;
        })
        .attr("cx", (d) => {
          return projection([d.Longitude, d.Latitude])[0];
        })
        .attr("cy", (d) => {
          return projection([d.Longitude, d.Latitude])[1];
        })
        .attr("r", function (d) {
          return scaleSize(d.Rank);
        })
        .style("fill", function (d) {
          return colorScale(d.Rank);
        })
        .on("mouseover", function (event, d) {
          d3.select(this).attr("stroke", "black").attr("stroke-width", 2);
          d3.select("#tooltip")
            .style("opacity", 1)
            .html("Rank: " + d.Rank + "<br>College: " + d.College + "<br>Offenses Per Year: " + d.DrugOffenseCount)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (event, d) {
          d3.select(this).attr("stroke", null).attr("stroke-width", null);
          d3.select("#tooltip").style("opacity", 0);
        });
    });
  });
})();
