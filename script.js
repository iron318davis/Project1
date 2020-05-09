$(document).ready(function () {
  var responsearray = []

  $(document).on("click", "#searchbutton", function () {
    event.preventDefault();
    var searchitem = $("#searchinput").val().trim()
    var searchurl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchitem


    $.ajax({
      url: searchurl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      responsearray = response.meals[0];
      // console.log(responsearray);
      responsearray = Object.keys(responsearray).map(k => responsearray[k] = typeof responsearray[k] == 'string' ? responsearray[k].trim() : responsearray[k]);
      // console.log(trimresponsearray);
      // console.log(responsearray)
      var values = Object.values(responsearray);
      // console.log(values);

      var recipeHead = $("<div>")
      var recipeTitle = values[1];
      recipeHead.append(recipeTitle);
      $(".searchsection").append(recipeHead);
      //console.log(recipeTitle)

      for (i = 9; i <= 28; i++) {
        console.log(values[i]);

        var ingr = $("<div>");
        ingr.append(values[i + 20]);
        ingr.append(" " + values[i]);
        $(".searchsection").append(ingr);
      };
      
      var recipeHead2 = $("<div>")
      var instructions = values[5];
      recipeHead2.append(instructions);
      $(".searchsection").append(recipeHead2);
      //console.log(instructions)

      //   After we get response, we need to get the strSource value
      var source = response.meals[0].strSource
      var linkpreviewurl = "http://api.linkpreview.net/?key=b5fa775953864f47208ee525813905ac&q=" + source

      if (source !== null) {
        $.ajax({
          url: linkpreviewurl,
          method: "GET",
        }).then(function (response) {
          //console.log(response);

          $(".card-title").text(response.title);

          $(".card-text").text(response.description);


          //$(".card-img-top").setAttribute('data-src', response.image);
          // $("#card-link").attr("data-source") = response.image;
         
          //$(".card-img-top").attr( "data-src", response.image );
         
          var cardimg = response.image;
          $(".card-img-top").attr("src", cardimg);

          var sourceURL = response.url;
          $(".card-link").attr("href", sourceURL);

          //document.getElementsByClassName(".card-img-top").setAttribute("data-src", response.image)
          // https://stackoverflow.com/questions/25503055/change-data-src-value-of-li
          // $(".card-img-top").attr("data-src", response.image)

        });
      } else {
        console.log("No Source found for linkpreview API")
          ;
      }
      ;
    });




  });





});



// Davis API key for linkpreview API
// b5fa775953864f47208ee525813905ac