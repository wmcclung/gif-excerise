$(document).ready(function() {
  //Array for added buttons
  var topics = [];

  //Function to call to Giphy

  function displayNbaShow() {
    var x = $(this).data("search");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      x +
      "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var showDiv = $("<div class='col-md-4'>");

        var rating = results[i].rating;
        var defaultAnimatedSrc = results[i].images.fixed_height.url;
        var staticSrc = results[i].images.fixed_height_still.url;
        var showImage = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        showImage.attr("src", staticSrc);
        showImage.addClass("nbaGiphy");
        showImage.attr("data-state", "still");
        showImage.attr("data-still", staticSrc);
        showImage.attr("data-animate", defaultAnimatedSrc);
        showDiv.append(p);
        showDiv.append(showImage);
        $("#gifArea").prepend(showDiv);
      }
    });
  }

  //submit search adds button
  $("#addPlayer").on("click", function(event) {
    event.preventDefault();
    var newPlayer = $("#nbaInput")
      .val()
      .trim();
    topics.push(newPlayer);
    console.log(topics);
    $("#nbaInput").val("");
    displayButtons();
  });

  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-danger">');
      a.attr("id", "show");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }

  displayButtons();

  //show giphs on click
  $(document).on("click", "#show", displayNbaShow);

  //play the gif
  $(document).on("click", ".nbaGiphy", pausePlayGifs);

  //switch to play and pause
  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
});
