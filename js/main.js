$(document).ready(function () {
  //get gifs from GIPHY and load on page
  function gSearch(initURL) {
    $.ajax({ url: initURL, method: "GET" }).done(function (response) {
      var gifList = response.data;
      var container = document.querySelector(".gifs");
      container.innerHTML = ""; //clear to start with empty container on each new search
      var src;
      //iterate through JSON and append gifs to container
      for (let i = 0; i < gifList.length; i++) {
        src = gifList[i].images.fixed_height_small.url;
        container.innerHTML += "<img src='" + src + "' />";
      }
    });
  }

  //load initial gifs
  var trendingURL =
    "http://api.giphy.com/v1/gifs/trending?api_key=8bOT9SFOdzb5sATlyta8Qm4c1XvXI1LS";
  gSearch(trendingURL);

  //GIPHY API key
  var giphyAPI = "http://api.giphy.com/v1/gifs/search?q=";
  var myKey = "&api_key=8bOT9SFOdzb5sATlyta8Qm4c1XvXI1LS";

  //keywords to quick search (happy, sad, angry, hungry)
  $(".quicksearch").on("click", function () {
    var quickInput = this.id;
    var quickURL = giphyAPI + quickInput + myKey;
    gSearch(quickURL);
    return false; //prevent default page refresh
  });

  //search button functionality
  $("#sbutton").on("click", function () {
    var searchInput = $("#search").val();
    var searchURL = giphyAPI + searchInput + myKey;
    gSearch(searchURL);
    return false;
  });

  //view trending gifs on clicking title
  $("#title").on("click", function () {
    gSearch(trendingURL);
    return false;
  });

  //copy url on clicking a gif
  $("img").on("click", function copyMe() {
    ///insert element, copy to clipboard, remove element
    var textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    var gifUrl = $(this).attr("src");

    textArea.value = gifUrl;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      alert("Copied GIF url");
    } catch (err) {
      console.log(err);
    }

    document.body.removeChild(textArea);
  });

  //sticky search bar
  document.addEventListener("scroll", function () {
    const sbar = document.querySelector(".sbar");
    const scrollLogo = document.querySelector(".scrollLogo");
    const sbarHeight = 100;

    const dFromTop = Math.abs(document.body.getBoundingClientRect().top);
    if (dFromTop >= sbarHeight) {
      sbar.classList.add("fixed");
      scrollLogo.classList.remove("hidden");
    } else {
      sbar.classList.remove("fixed");
      scrollLogo.classList.add("hidden");
    }
  });
});
