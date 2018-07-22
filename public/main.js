$(function () {
  console.log("Loaded")
  let foundationSource = $("#foundation-template").html();
  let foundationData;
  let template = Handlebars.compile(foundationSource);
  let campaignData = { campaigns: [] }
  let campaignLookupArr = [];

  $.get('http://localhost:3000/api/company/5b53e12ae54e71bcc84c499e')
    .then((data) => {
      console.log(data);
      let cleanedData = data.foundations.map(foundation => {
        return { name: foundation.foundationName, totalRaised: foundation.foundationContribution }
      })

      campaignArr = data.campaigns;

      foundationData = { foundations: cleanedData }
      $("#foundationTable").append(template(foundationData));

      $.get('http://localhost:3000/api/campaign')
        .then(campaigns => {
          campaigns.forEach(c => {
            if (campaignLookupArr.indexOf(c._id)) {
              console.log(c)
              campaignData.campaigns.push({ name: c.name, status: "Running", totalRaised: c.contributions, targetContribution: c.targetContribution })
            }
          });
          console.log(campaignData)
          let campaignSource = $("#campaign-template").html();
          template = Handlebars.compile(campaignSource);
          $("#campaignTable").append(template(campaignData));
        })
    })





});
