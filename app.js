// Create the URL 
const url = "Stocks_clean.csv";

// Get the data, populate the initial chart with the first dataset, and create the dropdown menu. 
d3.csv(url).then(function(data){
    //console.log(data);
    createChart("Microsoft");
    var dropdown = d3.select("#selDataset");
    var names = ["Microsoft", "Apple", "Amazon", "IBM", "Nike"];
    names.forEach(function(name) {
        dropdown.append("option").text(name).property("value", name);
    });
});

// Create a function to contain all the code that will need to happen each time the dropdown changes. 
function createChart(id){
    d3.csv(url).then(function(data){
        // Filter the data for only the selected ID
        const filteredData = data.map(function(d) {
            return {
              "Date": d['date'],
              "Value": +d[id]
            };
        });

        // Create the trace for the bar chart
        var trace = {
            x: filteredData.map(function(d) { return d.Date; }),
            y: filteredData.map(function(d) { return d.Value; }),
            type: 'scatter'
        };

        // Create the data array for the plot
        var data1 = [trace];

        // Configuring the layout of the bar chart
        var layout = {
            title: id+ "Stock Price",
            xaxis: { title: "Date" },
            yaxis: { title: "Price" }
        };

        // Plotting the bar chart
        Plotly.newPlot("line", data1, layout);


        // Select the panel-body div using D3
        var panelBody = d3.select(".panel-body");

        // Delete anything in the description 
        panelBody.selectAll("*").remove();

        // Create a list element and append it to the panel-body div
        var list = panelBody.append("ul");

        // Create a row for id and append it to the list
        //list.append("li").text("ID: " + metadata.id);

    });
};


// Function called when changing dropdown menu
function optionChanged(id){

    // Call the createChart function to create the new charts with the new ID
    createChart(id);
}