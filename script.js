$(document).ready(function () {
  var responsearray = []

    $(document).on("click", "#searchbutton", function() {
        event.preventDefault();
        var searchitem = $("#searchinput").val().trim()
        var searchurl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchitem


        $.ajax({
            url: searchurl,
            method: "GET",
          }).then(function(response) {
              console.log(response);
              responsearray = response.meals[0];
              // console.log(responsearray);
              responsearray = Object.keys(responsearray).map(k => responsearray[k] = typeof responsearray[k] == 'string' ? responsearray[k].trim() : responsearray[k]);
              // console.log(trimresponsearray);
              // console.log(responsearray)
              var values = Object.values(responsearray);
              // console.log(values);
              for (i = 9; i <= 28; i++){
                console.log(values[i]);
                
                var ingr = $("<div>");
                ingr.append(values[i+20]);
                ingr.append(" " + values[i]);
                 $(".searchsection").append(ingr);
              };

            //   After we get response, we need to get the strSource value
            var source = response.meals[0].strSource
            var linkpreviewurl = "http://api.linkpreview.net/?key=8a0afb71ec5cc1099caf9ba77f806aa8&q=" + source

            if (source !== null) { 
              $.ajax({
                url: linkpreviewurl,
                method: "GET",
              }).then(function(response) {
                  console.log(response);
                







        
              });
            } else {
                console.log("No Source found for linkpreview API")
;
            }
;
          });




    });





});
 
//for loop to iterate through JSON response of Ingredients
for ( i = 9; i < 20; i++){
    //do something
}

