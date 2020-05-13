$(document).ready(function () {
  var responsearray = []

  $(document).on("click", "#searchbutton", function () {
    event.preventDefault();
    var searchitem = $("#searchinput").val().trim()
    var searchurl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchitem


    $.ajax({
      url: searchurl,
      method: "GET",
    }).then(function(response) {
      console.log(response);
      responsearray = response.meals[0];

      responsearray = Object.keys(responsearray).map(k => responsearray[k] = typeof responsearray[k] == 'string' ? responsearray[k].trim() : responsearray[k]);


      var values = Object.values(responsearray);


      var recipeHead = $("<div>")
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
      
      var recipeHead2 = $("<div>")
      var instructions = values[5];
      recipeHead2.append(instructions);
      $(".recipeArea").append(recipeHead2);



      //   After we get response, we need to get the strSource value
      var source = response.meals[0].strSource
      var linkpreviewurl = "http://api.linkpreview.net/?key=b5fa775953864f47208ee525813905ac&q=" + source

      if (source !== null) {
        $.ajax({
          url: linkpreviewurl,
          method: "GET",
        }).then(function (response) {


          $(".card-divider").text(response.title);

          $(".card-text").text(response.description);

         
          var cardimg = response.image;
          $(".cardimg").attr("src", cardimg);

          var sourceURL = response.url;
          $(".card-link").attr("href", sourceURL);
  

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