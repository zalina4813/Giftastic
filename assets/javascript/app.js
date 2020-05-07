var topics = ["Games", "Politics", "Cars", "Tech", "Cooking", "Dance", "Food", "Travel","Fashion"];

function renderbutton () {
    $("#button-location").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        $(newButton).attr("data-name", topics[i]);
        newButton.addClass("name");
        $("#button-location").append(newButton);
    
    };
}

renderbutton();

function displayGifs() {
 $("button").on("click", function() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=4IYS2pI1p3U7nEQFRpS7uqA71pesZMPE";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(results);
        $("#gif-location").empty(); 

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gifImage = $("<img>");
          gifImage.attr({
              "src": results[i].images.fixed_height_still.url,
              "data-still": results[i].images.fixed_height_still.url,
              "data-animate": results[i].images.fixed_height.url,
              "data-state": "still" 
          });
          gifImage.addClass("imgClass");

          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);

          $("#gif-location").prepend(gifDiv);

        }
      });
  });
};
displayGifs(); 

$("#user-enter").on("click", function(event) {
    event.preventDefault(); 
    var newTopic = $("#topic-input").val();
    topics.push(newTopic);
    renderbutton();
});

$(document).on("click", ".name", displayGifs);
$(document).on("click", ".imgClass", function(){

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });