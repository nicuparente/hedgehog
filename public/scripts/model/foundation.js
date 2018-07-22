'user strict';

var app = app || {};

(function (module) {
  function Foundation (rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }
  Foundation.prototype.toHtml = function () {
    let template = Handlebars.compile($('#FoundationTemplate').html());
    return template(this)
  };

  Foundation.loadAll = (rawFoundations) => {
    Foundation.all = rawFoundations.map(ele => new Foundation(ele));
  };

  module.Foundation = Foundation;
})(app);
