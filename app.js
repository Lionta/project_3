// Create the URL 
const stocksurl = "Stocks_clean.csv";
const gdpurl = "GDP_clean.csv";
// Get the data, populate the initial chart with the first dataset, and create the dropdown menu. 
d3.csv(stocksurl).then(function(data){
    //console.log(data);
    //createChart("Microsoft",1);
    var dropdown = d3.select("#selDataset");
    var names = ["Microsoft", "Apple", "Amazon", "IBM", "Nike"];
    //names.forEach(function(name) {
     //   dropdown.append("option").text(name).property("value", name);
   // });
});

// Create a function to contain all the code that will need to happen each time the dropdown changes. 
function createChart(id, type){
    console.log(type);
    if(type == 1){
        d3.csv(stocksurl).then(function(data){
            // Filter the data for only the selected ID
            const filteredData = data.map(function(d) {
                return {
                "Date": d['date'],
                "Value": d[id]
                };
            });

            // Create the trace for the line chart
            var trace = {
                x: filteredData.map(function(d) { return d.Date; }),
                y: filteredData.map(function(d) { return d.Value; }),
                type: 'line'
            };

            // Create the data array for the plot
            var data1 = [trace];

            // Configuring the layout of the line chart
            var layout = {
                title: id+ " Stock Price",
                xaxis: { title: "Date" },
                yaxis: { title: "Price" },
                width: 900,
                height: 600
            };

            // Plotting the line chart
            Plotly.newPlot("line", data1, layout);


            // Select the panel-body div using D3
            //var panelBody = d3.select(".panel-body");

            // Delete anything in the description 
            //panelBody.selectAll("*").remove();

            // Create a list element and append it to the panel-body div
            //var list = panelBody.append("ul");

            // Create a row for id and append it to the list
            //list.append("li").text("ID: " + metadata.id);

    });} else if(type == 3) {
        d3.csv(gdpurl).then(function(data){
          // get the x-axis limits using d3.extent
        var xLimits = d3.extent(data, function(d) { return d.date; });

        // create a Plotly trace for the GDP data
        var trace1 = {
            x: data.map(function(d) { return d.date; }),
            y: data.map(function(d) { return d.GDP; }),
            mode: 'lines',
            name: 'GDP'
        };

        // create a Plotly layout with x-axis range set to the date extent
        var layout = {
            xaxis: {
            range: xLimits
            },
            yaxis: {
            title: 'GDP'
            },
            width: 900,
            height: 600
        };

        // create the Plotly chart
        Plotly.newPlot('gdp', [trace1], layout);

    })}else if(type == 2){
        d3.csv(stocksurl).then(function(stocks) {
            const companies = ["Microsoft", "Apple", "Amazon", "IBM", "Nike"];
            const traces = [];
          
            companies.forEach(function(company) {
              const trace = {
                x: stocks.map(function(d) { return d.date; }),
                y: stocks.map(function(d) { return d[company]; }),
                type: "scatter",
                mode: "lines",
                name: company
              };
              traces.push(trace);
            });
          
            Plotly.d3.csv(gdpurl, function(gdp) {
                var validGdpDates = new Set(stocks.map(function(d) { return d.date; }));
                gdp = gdp.filter(function(d) { return validGdpDates.has(d.date); });
              const gdpTrace = {
                x: gdp.map(function(d) { return d.date; }),
                y: gdp.map(function(d) { return d.GDP; }),
                type: "scatter",
                mode: "lines",
                name: "GDP",
                yaxis: 'y2'
              };
              const layout = {
                title: "Stocks and GDP",
                xaxis: {
                  title: "Date"
                },
                yaxis: {
                  title: "Stock Price",
                  side: "left"
                },
                yaxis2: {
                  title: "GDP",
                  side: "right",
                  overlaying: "y"
                },
                width: 900,
                height: 600
              };
              Plotly.newPlot("chart", traces.concat(gdpTrace), layout);
            });
          });
    };
};


// Function called when changing dropdown menu
function optionChanged(id, value){

    // Call the createChart function to create the new charts with the new ID
    createChart(id, value);
}