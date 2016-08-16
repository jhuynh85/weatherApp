var name, tempC, tempF, condition, city, country, lat, long, windAngle, windMetric, windImp, pressureMb, pressureHg, humidity;
var system = "Metric";

// Uses ip-api to retrieve current location's latitude and longitude
function getLocation() {
	$.getJSON("http://ip-api.com/json", function(res){
		city = res.city;
		country = res.countryCode;
		lat = parseFloat(res.lat);
		long = parseFloat(res.lon);
		getWeather();
		$("#city").html(city+", ");
		$("#country").html(country);
	});
}

// Uses forismatic API to retrieve weather conditions of current location
function getWeather() {
	var url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=de173eabdfc949d78ec193b50b80e5dd";			
	$.getJSON(url, function(res){
		name = res.name;
		condition = res.weather[0].main;
		tempC = Math.round(res.main.temp);
		tempF = Math.round(parseFloat(tempC)*(9/5)+32);
		windMetric = Math.round(res.wind.speed*18/5);	// Convert m/s to km/h
		windImp = Math.round(parseFloat(res.wind.speed)/0.44704);
		windAngle = res.wind.deg;
		humidity = res.main.humidity;
		pressureMb = res.main.pressure;
		pressureHg = Math.round(0.02952998751*pressureMb);
		printWeather();
	});
}

// Prints retrieved values
function printWeather(){
	var html;

	$("#image").empty();

	// Print icon
	switch(condition) {
		case "Clear":
			$("#image").append("<br>").append("<br>").append("<br>").append("<br>").append("<br>");
			html = $("<div class='icon sun'>").before("<br>").append("<div class='rays'>");
			break;
		case "Clouds":
			html = $("<div class='icon cloudy'>").append("<div class='cloud'>").append("<div class='cloud'>");
			break;
		case "Snow":
			$("#image").append("<br>").append("<br>").append("<br>");
			html = $("<div class'icon flurries'>").append("<div class='cloud'>").append($("<div class='snow'>").append("<div class='flake'>").append("<div class='flake'>"));
			break;
		case "Rain":
			html = $("<div class='icon rainy'>").append("<div class='cloud'>").append("<div class='rain'>");
			break;
		case "Drizzle":
			html = $("<div class='icon rainy'>").append("<div class='cloud'>").append("<div class='rain'>");
			break;
		case "Thunderstorm":
			html = $("<div class='icon thunder-storm'>").append("<div class='cloud'>").append($("<div class='lightning'>").append("<div class='bolt'>").append("<div class='bolt'>"));
			break;
		default:
			$("#image").append("<br>").append("<br>").append("<br>").append("<br>").append("<br>");
			html = $("<div class='icon sun'>").append("<div class='rays'>");
	}

	// Print weather values
	if (system==="Metric"){
		$("#temp").html(tempC+"°C");
		$("#speed").html(windMetric);
		$("#unit").html(" km/h");
		$("#pressure").html(pressureMb+" mb");
	} else {
		$("#temp").html(tempF+"°F");
		$("#speed").html(windImp);
		$("#unit").html(" mph")
		$("#pressure").html(pressureHg+" in. Hg");
	}
	$("#name").html(name);
	$("#condition").html(condition.toUpperCase());
	$("#cardinal").html(getCardinalDirection(windAngle));
	$("#humidity").html(humidity+"%");
	$("#image").append(html);
}

// Converts wind angle to a cardinal direction
function getCardinalDirection(degrees){
	var directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
	return(directions[Math.round(degrees/22.5)+1]);
}