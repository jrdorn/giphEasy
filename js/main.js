$(document).ready(function () {
  function myFunc(funcUrl) {
    $.ajax({ url: funcUrl, method: "GET" }).done(function (response) {
      for (let step = 0; step < 9; step++) {
        var gifstring = "#gif" + step.toString();
        var giphyURL = response.data[step].images.fixed_height.url;
        $(gifstring).attr("src", giphyURL);
      }
    });
  }

  var trendingURL =
    "http://api.giphy.com/v1/gifs/trending?api_key=8bOT9SFOdzb5sATlyta8Qm4c1XvXI1LS&limit=9";
  myFunc(trendingURL);

  var giphyAPI = "http://api.giphy.com/v1/gifs/search?q=";
  var myKey = "&api_key=8bOT9SFOdzb5sATlyta8Qm4c1XvXI1LS&limit=9";

  $(".quicksearch").on("click", function () {
    var quickInput = this.id;
    var quickURL = giphyAPI + quickInput + myKey;
    myFunc(quickURL);
  });

  $("#sbutton").on("click", function () {
    var searchInput = $("#search").val();
    var searchURL = giphyAPI + searchInput + myKey;
    myFunc(searchURL);
    return false;
  });
});
