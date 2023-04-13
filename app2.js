// Assign the url to a constant variable
const url = "./gdp.json";

// Use D3 library to read the JSON file from the URL
d3.json(url).then(function(project_3) {
  console.log(project_3);
});

// Initialize the dashboard  
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((project_3) => {
    
   // Set a variable for the Date
   let date = project_3.DATE;
   let gdp = project_3.GDP;

    //console.log(date);
   // Add  samples to dropdown menu
   date.forEach(function(d) {

       // print the value of the variables during the entire loop
       console.log(d);

       dropdownMenu.append("option")
       .text(d)
       .property("value",d);
   });


   // Set the first sample from the list
   let sample_one = date[0];

   // Print the value of sample_one
   console.log(sample_one);

   // Build the initial plots
   buildBarChart(sample_one);
  }); // <-- added missing closing brace here

  // Function to populate the bar chart
  function buildBarChart(sample_one) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

      // Retrieve all sample data
      let sampleInfo = data.samples;

      //Find the selected sample
      //let selectedSample = sampleInfo.find(result => r //

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample_one);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();

      // Set up the trace for the bar chart
      let trace = {
        x: xticks,
        y: yticks,
        text: labels,
        type: 'bar',
        orientation: 'h',
        //marker:{
        //color:'blue'
        //}   
      };

      // Setup the layout
      let layout = {
        title: "Top 10 OTUs Present"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout)
    });
  };


  // Function that updates dashboard when sample is changed
  function optionChanged(value) { 

    // Log the new value
    console.log(value); 
    // Call all functions 
    buildBarChart(value);
    //buildPieChart(value);
  };
};

// Initialize function
init();
