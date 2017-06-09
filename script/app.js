// This array will generate the "search" categories on the Giphy Site
var choices = [{movie: "1. Blazing Saddles", data: "Blazing+Saddles" }, {movie: "2. Airplane" , data: "Airplane"}, {movie: "3. Monty Python & the Holy Grail", data: "Monty+Python+and+the+Holy+Grail"}, {movie: "4. Animal House", data: "Animal+House"},{movie: "5. Young Frankenstein", data: "Young+Frankenstein"}, {movie: "6. Caddyshack", data: "Caddyshack"}, {movie: "7. This is Spinal Tap", data: "This+is+Spinal+Tap"}, {movie: "8. The Life of Brian", data: "The+Life+of+Brian"}, {movie: "9. Dumb & Dumber", data: "Dumb+Dumber"}, {movie: "10. The Naked Gun", data: "The+Naked+Gun"}, {movie: "11. The Jerk", data: "The+Jerk"}, {movie: "12. The Big Lebowski", data: "The+Big+Lebowski"}, {movie: "13. There's Something About Mary", data: "Something+About+Mary"}, {movie: "14. Borat", data: "Borat"}, {movie: "15. A Fish Called Wanda", data: "Fish+Called+Wanda"}, {movie: "16. The 40-Year-Old Virgin", data: "40+year+old+virgin"}, {movie: "17. Step Brothers", data: "Step+Brothers"}, {movie: "18. Anchorman", data: "Anchorman"}, {movie: "19. Office Space", data: "Office+Space"}, {movie: "20. Planes Trains and Automobiles", data: "Planes+Trains+and+automobiles+movie"}, {movie: "21. Raising Arizona", data: "Raising+Arizona"}, {movie: "22. Dr. Strangelove", data: "Dr+Strangelove"}, {movie: "23. Blues Brothers", data: "Blues+Brothers"}, {movie: "24. Tommy Boy", data: "Tommy+Boy"}, {movie: "25. Superbad", data: "Superbad"} ];
var userInput;
var userClick;
var url;
var switchVal;
var switchBack;
var clicked = false;

function whatImage (x) {
				if (clicked) {
				$(x).attr("src", $(x).attr("data-switch"));
				
			}
				else {
					$(x).attr("src", $(x).attr("data-switch-back"));
				}
};



$(document).ready(function(){
	$(".buttonArea").append("<h2>Top 25 Comedy Movies according to Rolling Stone</h2>");
	for (var i = 0; i < choices.length; i++){
		$(".buttonArea").append("<button class='btn btn-danger btn-md clickSearch' data-search=" + choices[i].data + ">" + choices[i].movie + "</button>");
	}
	$(".imageArea").append("<div class='row'><h1 class='center-block'>Top Trending Photos</h1><p class='center-block'>Click a comedy from above to see more GIFS!</p></div>");
	$.ajax({
		url: "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < 9; i++){
			console.log(response.data[i].images.fixed_width.url);

			$(".imageArea").append("<div class='col-lg-4 center-block'><span>Rating: " + response.data[i].rating.toUpperCase() + "</span><br/><img src='" + response.data[i].images.fixed_width.url + "'>");
		};
	});
	$(".clickSearch").on("click", function () {
		$(".imageArea").empty();
		$(".imageArea").append("<h1 class='center-block'>" + $(this).html() + "</h1>");
		userClick = $(this).attr("data-search");
		url = "http://api.giphy.com/v1/gifs/search?q=" + userClick + "&api_key=dc6zaTOxFJmzC";
		console.log(url);
		$.ajax({
			url: url,
			method: "GET"
		}).done(function(response) {
			for (var i = 0; i < 9; i++){
				$(".imageArea").append("<div class='col-lg-4 img-responsive clickOn'><span>Rating: " + response.data[i].rating.toUpperCase() + "</span><br/><img class='grabMe' data-switch='" + response.data[i].images.fixed_width.url + "' data-switch-back='" + response.data[i].images.fixed_width_still.url + "' src='" + response.data[i].images.fixed_width_still.url + "'>");

				
			}
			$(".grabMe").click(function () {
				if (clicked) {
				clicked = false;	
				whatImage(this);
			}
			else {
				clicked = true;
				whatImage(this);
			}
	
			});
		
	});
});
		$(".buttonToAdd").on("click", function () {
		var tempVar = $("#addToArray").val()
		console.log(tempVar);
		choices.push({movie: tempVar, data: tempVar});
		console.log(choices);
	});
});