var tempC, tempF, condition, city, country, lat, long, windAngle, windMetric, windImp, pressure, humidity;
var system = "metric";

function getCardinalDirection(degrees){
	var directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];
	return(directions[Math.round(degrees/22.5)+1]);
}

function printWeather(){
	if (condition==="Clear"){

	} else if (condition==="Clouds") {

	} else if (condition==="Snow") {

	} else if (condition==="Rain" || condition==="Drizzle") {

	}

	if (system==="metric"){
		$("#temp").html(tempC+"°C");
		$("#speed").html(windMetric);
		$("#unit").html(" km/h");
	} else {
		$("#temp").html(tempF+"°F");
		$("#speed").html(windImp);
		$("#unit").html(" mph")
	}
	$("#cardinal").html(getCardinalDirection(windAngle));
	$("#humidity").html(humidity+"%");
	$("#pressure").html(pressure+" mb");
}

function getLocation() {
	$.getJSON("http://ip-api.com/json", function(res){
		city = res.city;
		country = res.countryCode;
		lat = parseFloat(res.lat);
		long = parseFloat(res.lon);
		getWeather();
		$("#city").html(city);
		$("#country").html(country);
	});
}

function getWeather() {
	var url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=de173eabdfc949d78ec193b50b80e5dd";			
	$.getJSON(url, function(res){
		condition = res.weather.main;
		tempC = Math.round(res.main.temp);
		tempF = Math.round(parseFloat(tempC)*(9/5)+32);
				windMetric = Math.round(res.wind.speed*18/5);	// Convert m/s to km/h
				windImp = parseFloat(res.wind.speed)/0.44704;
				windAngle = res.wind.deg;
				humidity = res.main.humidity;
				pressure = res.main.pressure;
				printWeather();
			});
}