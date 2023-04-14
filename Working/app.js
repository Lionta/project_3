mergedFile = "Dataset.csv"

var msft = []
var appl = []
var ibm = []
var amzn = []
var nke = []
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
                msft.push(data[i]["Microsoft Open"])
                dates.push(data[i]["Date"])
                appl.push(data[i]["Apple Open"])
                ibm.push(data[i]["IBM Open"])
                amzn.push(data[i]["Amazon Open"])
                nke.push(data[i]["Nike Open"])
            
            // Do something with the value, such as output it to the console
            
          }
    
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

        let trace3 = {
            x: dates,
            y: ibm,
            type: "line",
            color:"red",
            name:"IBM"
        };

        let trace4 = {
            x: dates,
            y: amzn,
            type: "line",
            color:"red",
            name:"Amazon"
        };

        let trace5 = {
            x: dates,
            y: nke,
            type: "line",
            color:"red",
            name:"Nike"
        };

    
        traceLine = [trace1,trace2,trace3,trace4,trace5]
    
    
        // plot the bar chart
        Plotly.newPlot("bar", traceLine)  
      });
    getData();

};



//update when user select diff stock from drop down menu 

function newLine(newdata) {
    Plotly.restyle("line", "values", [newdata]);
  }

init();



