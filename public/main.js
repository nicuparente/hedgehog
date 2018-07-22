$(function () {
  console.log("Loaded")
  let foundationSource = $("#foundation-template").html();
  let foundationData;
  let template = Handlebars.compile(foundationSource);
  let campaignData = { campaigns: [] }
  let campaignLookupArr = [];
  let companyId = getUrlParams('companyId')


  // chart colors
  var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

  /* large line chart */

  
  console.log(companyId);
  $.get(`http://localhost:3000/api/company/${companyId}`)
    .then((data) => {
      console.log(data);
      let cleanedData = data.foundations.map(foundation => {
        return { name: foundation.foundationName, totalRaised: foundation.foundationContribution }
      })

      var chLine = $('#chart');
      var chartData = {
        labels: [ "M", "T", "W", "T", "F", "S", "S"],
        datasets: [{
          data: [212, 262, 352, 402, 515, 815, data.totalContributions],
          backgroundColor: colors[3],
          borderColor: colors[1],
          borderWidth: 4,
          pointBackgroundColor: colors[1]
        }]
      };
      
      var lineChart = new Chart(chLine, {
        type: 'line',
        data: chartData,
      });

      // Set total Contributions
      $('#TotalContributions').text(`Total Contributions: $${data.totalContributions}`)
      campaignLookupArr = data.campaigns;

      foundationData = { foundations: cleanedData }
      $("#foundationTable").append(template(foundationData));

      $.get('http://localhost:3000/api/campaign')
        .then(campaigns => {
          campaigns.forEach(c => {
            if (campaignLookupArr.indexOf(c._id)) {
              campaignData.campaigns.push({ name: c.name, status: "Running", totalRaised: c.contributions, targetContribution: c.targetContribution })
            }
          });
          console.log(campaignData)
          let campaignSource = $("#campaign-template").html();
          template = Handlebars.compile(campaignSource);
          $("#campaignTable").append(template(campaignData));
        });
    })

});



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

function EpochToHourConverter(epochTime) {
  let d = new Date(0);
  d.setUTCSeconds(epochTime)
  return `${d.getHours()}:${d.getMinutes()}`
}