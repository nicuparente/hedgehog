'use strict';

let userData = {};
let foundationSource = $("#foundation-template").html();
let template = Handlebars.compile(foundationSource);
let userId = getUrlParams('userId')
$.get(`http://localhost:3000/api/user/${userId}`, (data) => {
  console.log('data', data)
}).then((data) => {
  $('#total').text(`$${data.contributionsTotal}`)
  $('.nav-name-container').text(`Welcome Back ${data.name}!`)

  var stats = {
  datasets: [{
    
    data: data.foundations.map(obj => obj.foundationContribution),
    backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
  }],
  labels: data.foundations.map(obj => obj.foundationName)
}

var myDoughnutChart = new Chart(foundations, {
    type: 'doughnut',
    data: stats,
});
var appStats = {
  datasets: [{
    
    data: data.companies.map(obj => obj.companyContribution),
    backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
  }],
  labels: data.companies.map(obj => obj.companyName)
}
var appChart = new Chart(apps, {
    type: 'doughnut',
    data: appStats,
});

})

$.get('http://localhost:3000/api/foundation/', (data) => {
  console.log('foundations', data)
  let cleanedData = data.map(foundation => {
        return { name: foundation.name, totalRaised: foundation.totalRaised }
      })

      let foundationData = { foundations: cleanedData }
      $("#foundationTable").append(template(foundationData));
})

var foundations = $("#foundations");
var apps = $("#apps");


function getUrlParams(prop) {
  var params = {};
  var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  var definitions = search.split('&');

  definitions.forEach(function (val, key) {
    var parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });

  return (prop && prop in params) ? params[prop] : params;
}

