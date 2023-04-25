(function () {
  var width = 800,
    height = 600;

  d3.json("./Data/topo.json").then((data) => {
    //Load data here
    const topo = topojson.feature(data, data.objects.states);
    console.log(topo);

    var projection = d3.geoAlbersUsa().scale(700).translate([487.5, 305]);
    var path = d3.geoPath(projection);
    //read in our json file
      // ...
      //give our data sensible names
      const topology = data[0];
      const cities = data[1];
      const states = data[2];

      const stateDictionary = new Map();
      // states.forEach((state) => {
      //   // this is basically a for loop
      //   stateDictionary.set(state.State, +state.Population);
      // });

      // var blues = d3
      //   .scaleSequential()
      //   .domain(d3.extent(stateDictionary.values()))
      //   .range(["white", "steelblue"]);

      const svg = d3
        .select("#geomap")
        .append("g")
        .attr("transform", "translate(50,50)");

      svg
        .append("g")
        .selectAll("path")
        .data(topo.features)
        .join("path")
        .attr("d", path)
        .attr("fill", 'whitesmoke')
        .attr("stroke", "black")
        .attr("stroke-width", "1px");

    //   svg
    //     .append('g')
    //     .selectAll("circle")
    //     .data(cities)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", (d) => {
    //       return projection([d.longitude, d.latitude])[0];
    //     })
    //     .attr("cy", (d) => {
    //       return projection([d.longitude, d.latitude])[1];
    //     })
    //     .attr("r", 4)
    //     .style("fill", "#E85A70")
    //     .style("stroke", "black");
    });
})();
