$(document).ready(function() {

    var animalArray = ["dog", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
    // Function for displaying buttons 
    function renderButtons() {
        // Deleting the animal buttons prior to adding new animal buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#makeButtons").empty();
        // Looping through the array of movies
        for (var i = 0; i < animalArray.length; i++) {
            // Then dynamicaly generating buttons for each animal in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("animal btn btn-success button");
            // Adding a data-attribute with a value of the animal at index i
            a.attr("data-name", animalArray[i]);
            // Providing the button's text with a value of the animal at index i
            a.text(animalArray[i]);
            // Adding the button to the HTML
            $("#makeButtons").append(a);
        }
    }
    renderButtons();
    // Event listener for all button elements
    $(document).on("click", "button", function(event) {
        // This was the first way we used the on click:   $("button").on("click", function() {
        // In this case, the "this" keyword refers to the button that was clicked
        var animal = $(this).attr("data-name");
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After the data comes back from the API
            .done(function(response) {
                // Removing after the first 10 items so it doesn't repeat
                $("img").remove();
                $(".rating").remove();
                // Storing an array of results in the results variable
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        var gifDiv = $("<div class='item '>");
                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        p.addClass("rating");
                        // Creating an image tag
                        var animalImage = $("<img>");
                        animalImage.addClass("animalImageClass");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-state", "still");
                        animalImage.attr("animate", results[i].images.fixed_height_still.url);
                        animalImage.attr("still", results[i].images.fixed_height.url);

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(animalImage);
                        gifDiv.append(p);

                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);

                        $(".animalImageClass").on("click", function() {
                            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                            var state = $(this).attr("data-state");
                            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                            // Then, set the image's data-state to animate
                            // Else set src to the data-still value
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("still"));
                                $(this).attr("data-state", "still");
                            }
                        });
                    }
                }
            });
    });
    // // This function handles events where one button is clicked
    $("#add-animal").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var newAnimal = $("#animal-input").val().trim();
        // The animal from the textbox is then added to our array
        animalArray.push(newAnimal);
        renderButtons();
        $('#animal-input').val('');
    });

});