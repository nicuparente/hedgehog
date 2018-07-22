$(function () {
  console.log("Loaded")
  let foundationSource = $("#foundation-template").html();
  let foundationData;
  let template = Handlebars.compile(foundationSource);
  let campaignData = { campaigns: [] }
  let campaignLookupArr = [];
  let companyId=getUrlParams('companyId')

  $.get(`http://localhost:3000/api/company/${companyId}`)
    .then((data) => {
      console.log(data);
      let cleanedData = data.foundations.map(foundation => {
        return { name: foundation.foundationName, totalRaised: foundation.foundationContribution }
      })
      
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
        })
    })

  
  var chartData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        data: [639, 465, 493, 478, 589, 632, 674,900,1000],
        backgroundColor: ['#4286f4'],
        label: "Cocaine"
      },]
  };

  var chLine = document.getElementById("chLine");
  if (chLine) {
    new Chart(chLine, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: true
        }
      }
    });
  }


});


function getUrlParams( prop ) {
  var params = {};
  var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
  var definitions = search.split( '&' );

  definitions.forEach( function( val, key ) {
      var parts = val.split( '=', 2 );
      params[ parts[ 0 ] ] = parts[ 1 ];
  } );

  return ( prop && prop in params ) ? params[ prop ] : params;
}

function EpochToHourConverter(epochTime){
  let d = new Date(0);
  d.setUTCSeconds(epochTime)
  return `${d.getHours()}:${d.getMinutes()}`
}