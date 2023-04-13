//const { greatest } = require("d3");

//console.log(d3);
let url = "./gdp.json";
let req = new XMLHttpRequest();

let data;
let values;

let heightScale;
let xScale;
let xAxisScale;
let yAxisScale;

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select('svg');

let drawCanvas = () => {
    svg.attr('width', width);
    svg.attr('height', height);

};

let generateScales = () => {
    heightScales = d3.scaleLinear()
                    .domain([0,d3.max(values,(item) => {
                        return item[1]
                    })])
                    .range([0, height - (2*padding)])

    xScale = d3.scaleLinear()
                    .domain([0, value.length -1])
                    .range([padding, width - padding])

let datesArray = values.map((item) => {
    return new Date(item[0])
})
console.log(datesArray)
xAxisScale = d3.scaleTime()
                .domain([])


};

let drawBars = () => {

};

let generateAxes = () => {

};
req.open('Get', url, true);
req.onload = () => {
    //console.log(req.responseText);
    //data = JSON.parse(req.responseText);
    //values = data.data
    //console.log(data);
    //console.log(values);
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes()

}
req.send();