$(document).ready(function () {

    $(document).on("click", "#searchbutton", function() {
        event.preventDefault();
        var searchitem = $("#searchinput").val().trim()
        var searchurl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchitem


        $.ajax({
            url: searchurl,
            method: "GET",
          }).then(function(response) {
              console.log(response);
              
            
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