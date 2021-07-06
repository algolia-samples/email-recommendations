var selectTemplateEl = document.getElementById("templateName");

selectTemplateEl.addEventListener("change", function(ev) {
  var emailIndex = ev.target.value;
  render(emailIndex);
});

var render = function(emailIndex) {
  var loadingEl = document.getElementById("main");
  var explanationEl = document.getElementById("explanation");
  var templateUrl = "/render/" + emailIndex;
  fetch(templateUrl)
    .then(function(res) {
      return res.json();
    }).then(function(data) {
      explanationEl.innerHTML = data.explanation;
      loadingEl.innerHTML = data.html;
    });
};

var loadTemplates = function() {
  fetch("/emails")
    .then(function(res) { return res.json() })
    .then(function(data) {
      data.map(function(template, index) {
        selectTemplateEl[index] = new Option(template.name, index, index === 0);
      });
      render(0);
    });
};

loadTemplates();

