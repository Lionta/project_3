mergedFile = "Dataset.csv"

var msft = []
var appl = []
var dates = []

// inital function to display all 5 stocks and the GDP

function init() {
    d3.csv("Stock.csv").then(function(data) {
        // `data` is now an array of JavaScript objects
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Do something with the JSON data, such as output it to the console
        //console.log(jsonData);
    
        for (var i = 0; i < data.length; i++) {
            // Access the value of the "Microsoft Open" property using dot notation
                msft.push(data[i]["Microsoft Open"]);
                dates.push(data[i]["Date"])
                appl.push(data[i]["Apple Open"])
            
            // Do something with the value, such as output it to the console
            
          }
          
        console.log(msft)
        console.log(appl)
        console.log(dates)
    
        let trace1 = {
            x: dates,
            y: msft,
            type: "line",
            color:"blue",
            name: "Microsoft"
        };
    
        let trace2 = {
            x: dates,
            y: appl,
            type: "line",
            color:"red",
            name:"Apple"
        };
    
        traceLine = [trace1,trace2]
    
    
    
        // plot the bar chart
        Plotly.newPlot("bar", traceLine)
    
          
      });
    
    /*
    
    // get the date as x and close price of stock as y
    d3.csv("Stock.csv").then(function(data) {
        // `data` is now an array of JavaScript objects
        // Convert the data to a JSON string
        var jsonData = JSON.stringify(data);
        
        // Do something with the JSON data, such as output it to the console
        console.log(jsonData);

        for (var i = 0; i < data.length; i++) {
            // Access the value of the "Microsoft Open" property using dot notation
                msft.push(data[i]["Microsoft Open"]);
                dates.push(data[i]["Date"])
            
            // Do something with the value, such as output it to the console
            
          }
          
          
      });
      */

};

    console.log(msft);
    console.log(dates);

d3.selectAll("#selDataset").on("change", createChart);

//update when user select diff stock from drop down menu 


function createChart(){
    //let dropdownMenu = d3.select("#selDataset");
    //let dataset = dropdownMenu.property("value");
    
   
        let trace = {
            x: msft,
            y: dates,
            type: "line",
        };
        traceBar = [trace]


        // plot the bar chart
        Plotly.newPlot("bar", traceBar)



    

}

//viusalization 1 for stock 1

//viusalization 2 for stock 2

//viusalization 3 for stock 3

init();



