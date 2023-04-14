// Assign the urls to constant variables
const gdpUrl = "./gdp.json";
const stocksUrl = "./stocks.json";

// Fetch the GDP JSON data
fetch(gdpUrl)
  .then(response => response.json())
  .then(gdp => {
    // Date Values
    const date = gdp.map(row => row.DATE);

    // Trace for the gdp data
    let trace1 = {
      x: date,
      y: gdp.map(row => row.GDP),
      name: "GDP",
      type: "bar",
      xaxis: 'x1',
      yaxis: 'y1'
    };

    // Data trace array
    //let traceData = [trace1];

    // Fetch the stocks JSON data
    fetch(stocksUrl)
      .then(response => response.json())
      .then(stocks => {
        // Create dropdown for stock selection
        const years = [...new Set(stocks.map(row => row.Year))].sort();
        const stocksList = Object.keys(stocks[0]).slice(1);
        const dropdownStock = document.getElementById('dropdown-Stock');
        stocksList.forEach(stock => {
          const optionEl = document.createElement('option');
          optionEl.value = stock;
          optionEl.text = stock;
          dropdownStock.add(optionEl);
        });

        // Create dropdown for year selection
        const dropdownGDP = document.getElementById('dropdown-GDP');
        years.forEach(year => {
          const optionEl = document.createElement('option');
          optionEl.value = year;
          optionEl.text = year;
          dropdownGDP.add(optionEl);
        });

        const getStockTrace = (stock, open, close, name) => {
          return {
            x: stocks.filter(row => row[stock] !== null).map(row => row.Date),
            y: stocks.filter(row => row[stock] !== null).map(row => row[close] - row[open]),
            name: name,
            type: "bar",
            xaxis: 'x2',
            yaxis: 'y2'
          };
        };

        const getSelectedValues = () => {
          const gdpOption = dropdownGDP.value;
          const stockOption = dropdownStock.value;
          return { gdpOption, stockOption };
        };

        const updateChart = () => {
          const { gdpOption, stockOption } = getSelectedValues();
          const filteredStocks = [getStockTrace(stockOption, `${stockOption} Open`, `${stockOption} Close`, stockOption)];
          const layout = {
            title: `${stockOption} Stocks vs GDP in ${gdpOption}`,
            barmode: 'group',
            xaxis: {
              domain: [0, 0.6],
              title: gdpOption
            },
            yaxis: {
              title: 'GDP rate',
              rangemode: 'tozero'
            },
            xaxis2: {
              domain: [0.7, 1],
              anchor: 'y2',
              title: stockOption
            },
            yaxis2: {
              title: 'Stocks change',
              rangemode: 'tozero',
              anchor: 'x2'
            }
          };
          const data = [trace1, ...filteredStocks];
          Plotly.newPlot('plot', data, layout);
        };

        //dropdownGDP.addEventListener('change', updateChart);
        dropdownStock.addEventListener('change', updateChart);
        updateChart();
      })
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));