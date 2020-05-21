$( document ).ready(function(){

    $('#submit').on('click', function(){

     

      var userInput = $('#search').val();

      var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + userInput + '&api_key=8bOT9SFOdzb5sATlyta8Qm4c1XvXI1LS&limit=9';


   
      $.ajax({url: queryURL, method: 'GET'}).done(function(response){


        for (let step=0; step < 9; step++){
            var gifstring = '#gif' + step.toString();
            var giphyURL = response.data[step].images.fixed_height.url;
            $(gifstring).attr('src', giphyURL);
        }

      });
      
      
      return false;
    })
    
  });

