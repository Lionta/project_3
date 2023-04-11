import * as d3 from 'd3';
import Chart from 'chart.js/auto';

///const csvUrl = 'file:///Users/farrukh/Documents/Myfolder123/stockinfo.csv';

//d3.csv(csvUrl).then(function(loadedData){
    //console.log(loadedData);
//});

let filename = 'Stock.csv';
let fileNameGDP= 'GDP.csv';
d3.csv(filename).then(function(loadedData) {
    let data = [];
    let labels= [];
    console.log(loadedData);
    for (let i=0; i<loadedData.length; i++) {

        //console.log(loadedData[i]);

        let year = loadedData[i].year;
        labels.push(year);
        let meanTemp = loadedData [i].tmax;
        data.push(meanTemp);
    }
   //console.log(data);
    
    let options = {
            type: 'bar',
            data:{
                labels:labels,
                datasets: [{
                    data: data,
                    backgroundColor: 'rgb(100,100,100)', 
                    borderColor: 'rgb(100,100,100)',
                    borderWidth: 1 
                
                }],
        options: {
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true // added beginAtZero property to ensure x-axis starts at zero
                    }
                }
            }
        }
    },
    let chart = new Chart(document.getElementById('canvas'),options);
}});







