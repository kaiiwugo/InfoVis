(function () {
  const Orange = "#FE6B00";
  const Green = "#80BC02";

  d3.csv("./Data/CollegeNon-College.csv").then((data) => {
    // Create an array of drug options for the dropdown menu
    var drugOptions = data.map(function (d) {
      return d.Drug;
    });

    // Create a function to update the graph based on the selected drug
    function updateChart(drug) {
      // Filter the data based on the selected drug
      var filteredData = data.filter(function (d) {
        return d.Drug === drug;
      });

      // Get the College and Non-College values for the selected drug
      var collegeValue = +filteredData[0].College;
      var nonCollegeValue = +filteredData[0]["Non-College"];

      // Clear existing chart
      d3.select("#chart").selectAll("*").remove();

      // Create the bar chart
      var margin = { top: 20, right: 20, bottom: 30, left: 80 };
      var width = 600 - margin.left - margin.right;
      var height = 600 - margin.top - margin.bottom;

      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Create x scale
      var x = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .domain(["College", "Non-College"]);

      // Create y scale
      var y = d3.scaleLinear().rangeRound([height, 0]).domain([0, 100]);

      // Create x-axis
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text") // Select all text elements within the x-axis
        .style("font-family", "Arial") // Change the font family here
        .style("font-size", "14px"); // Change the font si

      // Create y-axis
      svg
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y))
        .selectAll("text") // Select all text elements within the x-axis
        .style("font-family", "Arial") // Change the font family here
        .style("font-size", "14px"); // Change the font si

      // Create bars
      svg
        .selectAll(".bar")
        .data([
          { label: "College", value: collegeValue },
          { label: "Non-College", value: nonCollegeValue },
        ])
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.label);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", function (d) {
          return d.label === "College" ? Green : Orange;
        });

      // Create bar labels
      svg
        .selectAll(".bar-label")
        .data([
          { label: "College", value: collegeValue },
          { label: "Non-College", value: nonCollegeValue },
        ])
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", function (d) {
          return x(d.label) + x.bandwidth() / 2 - 10;
        })
        .attr("y", function (d) {
          return y(d.value) - 5;
        })
        .text(function (d) {
          return d.value + '%';
        });

      // Create x-axis label
      svg
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2 - 15)
        .attr("y", height + margin.bottom - 10)
        .text("Drug");

      // Create y-axis label
      svg
        .append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2 - 15)
        .attr("y", -margin.left + 10)
        .text("Percentage (%)");
    }

    // Create the dropdown menu
    var dropdown = d3
      .select("#dropdown")
      .append("select")
      .classed("custom-select", true) // Add Bootstrap class for custom select
      .on("change", function () {
        var selectedDrug = d3.select(this).property("value");
        updateChart(selectedDrug);
      });

    // Add options to the dropdown menu
    dropdown
      .selectAll("option")
      .data(drugOptions)
      .enter()
      .append("option")
      .attr("value", function (d) {
        return d;
      })
      .text(function (d) {
        return d;
      });

    // Initialize the chart with the first drug option
    updateChart(drugOptions[0]);
  });
})();
