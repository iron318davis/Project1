$(document).ready(function () {
  var responsearray = []

  document.querySelector('#searchinput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      e.preventDefault();
      searchthestuff();
    }
  });

  $(document).on("click", "#searchbutton", function () {
    event.preventDefault();
    searchthestuff();
  });


  function searchthestuff() {

    var searchitem = $("#searchinput").val().trim();
    var keyurl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchitem;
    var randomurl = "https://www.themealdb.com/api/json/v1/1/random.php";

    if (searchitem !== "") {
      searchurl = keyurl;
    } else {
      searchurl = randomurl;
    }

    $.ajax({
      url: searchurl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      responsearray = response.meals[0];

      $(".recipeArea").empty();


      responsearray = Object.keys(responsearray).map(k => responsearray[k] = typeof responsearray[k] == 'string' ? responsearray[k].trim() : responsearray[k]);


      var values = Object.values(responsearray);


      var recipeHead = $("<div class = \"title\">")
      var recipeTitle = values[1];
      recipeHead.append(recipeTitle);
      $(".recipeArea").append(recipeHead);


      for (var i = 9; i <= 28; i++) {
        console.log(values[i], typeof values[i]);
        if (values[i] !== null) {
        var ingr = $("<div>");
        ingr.append(values[i + 20]);
        ingr.append(" " + values[i]);
        $(".recipeArea").append(ingr);

      };

      $(".recipeArea").append("<br/>")


        };
      

      var recipeHead2 = $("<div>")
      var instructions = values[5];
      recipeHead2.append(instructions);
      $(".recipeArea").append(recipeHead2);



      //After we get response, we need to get the strSource value
      var source = response.meals[0].strSource
      var linkpreviewurl = "http://api.linkpreview.net/?key=8a0afb71ec5cc1099caf9ba77f806aa8&q=" + source

      if (source !== null) {
        $.ajax({
          url: linkpreviewurl,
          method: "GET",
        }).then(function (response) {

          //$(".recipeCard").classList.remove("hide");
          $('.recipeCard').removeClass('hide');

          if (response.title !== null) {
            $(".card-divider").text(response.title);
          } else {
            $(".card-divider").text("");
          }

          if (response.description !== null) {
            $(".card-text").text(response.description);
          } else {
            $(".card-text").text("");
          }

          var cardimg = response.image;

          if (response.image !== null) {
            $(".cardimg").attr("src", cardimg);
          } else {
            $(".cardimg").attr("src", "");
          }

          var sourceURL = response.url;

          if (response.url !== null) {
            $(".card-link").attr("href", sourceURL);
          } else {
            $(".card-link").attr("href", "#")
          }


        });
      } else {
        console.log("No Source found for linkpreview API");
        $('.recipeCard').addClass('hide');
      };
    });
  };





});



// Davis API key for linkpreview API
// b5fa775953864f47208ee525813905ac

// Tom API key for linkpreview API
// 8a0afb71ec5cc1099caf9ba77f806aa8
