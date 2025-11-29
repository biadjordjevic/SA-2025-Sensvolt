 let valores = [30,40,35,50,49,60,70,91,125]

var options = {
  chart: {
    type: 'line'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  },
  {
    name: 'bento',
    data: [50,40,95,50,49,80,70,51,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();