<template>
    <div class="behaelter">        
        <div id="ort"></div>
        <div class="unterbehaelter">
            <img id="icon"></img>
            <div id="temperatur"></div>
            <div id="minmax"></div>
            </div>
            <div class="unterbehaelter" id="unterbehaelter2">
                <div id="beschreibung"></div>
                <div id="datum"></div>
            </div>
            <div class="unterbehaelter collapse" id="unterbehaelter3" @click="">
                <div class="forecast" id="forecast1"></div>
                <div class="forecast" id="forecast2"></div>
            </div>
    </div>    
</template>

<script>
    const d = new Date();
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    getWeatherJSON();

    //////////// functions /////////



    function getPositionData(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getWeatherJSON);
        }
        else{
            console.log('Error: Geolocation not supported');
        }
    }

    function getDayOfWeek(x){
        if ((d.getDay() + x) > 6){
            x = (d.getDay() + x) - 7;
        } else {x = d.getDay() + x;}
        return x;
    }

    async function getWeatherJSON(position){
        let city = "Berlin";
        const apiKey = 'key=30189c89030a42629e195610240306%20';
        const apiCall = "https://api.weatherapi.com/v1/forecast.json?q=Berlin&days=3&aqi=no&alerts=no&"
        console.log(apiCall);
        let call = apiCall + apiKey;
        
        const response = await
        fetch(call);
        const forecast = await response.json();
        console.log(forecast)

        document.getElementById("ort").innerHTML = forecast.location.region;
        document.getElementById("temperatur").innerHTML = forecast.current.temp_c + "&deg;";
        document.getElementById("minmax").innerHTML = "Max: " + forecast.forecast.forecastday[0].day.maxtemp_c + "&deg;" + '<br>' + "Min: " + forecast.forecast.forecastday[0].day.mintemp_c + "&deg;";
        document.getElementById("datum").innerHTML = days[d.getDay()-1] + ", " + d.getDate() + ". " + months[d.getMonth()];
        document.getElementById("icon").src = forecast.current.condition.icon ;
        document.getElementById("beschreibung").innerHTML = forecast.current.condition.text;
        document.getElementById("forecast1").innerHTML = forecast.forecast.forecastday[1].day.maxtemp_c + "&deg" + '<br>' + days[getDayOfWeek(0)];
        document.getElementById("forecast2").innerHTML = forecast.forecast.forecastday[2].day.maxtemp_c + "&deg" + '<br>' + days[getDayOfWeek(1)]; 
    
    }
    </script>

<style>
   .behaelter{
        width: fit-content;
        padding: 20px;
        margin: 100px auto;
        background: rgba(37, 36, 37, 0.5);
        border: 2px;
        border-radius: 10px;
   }

   .unterbehaelter{
        display:flex;
   }

   .forecast{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        color: rgba(233, 233, 233, 0.8);
        padding: 10px;
        width: 40%;
        margin: auto        
   }

   #unterbehaelter3{
    display: none;
   }

   #ort{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        font-weight: bold;
        text-align: center;
        color: rgba(233, 233, 233, 0.8);
   }

   #temperatur{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        text-align: center;
        vertical-align: text-bottom;
        font-weight: bold;
        font-size: 3em;
        color: rgba(233, 233, 233, 0.8);
        padding: 10px;
        width: 30%;
        margin: auto;        
   }

   #minmax{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        text-align: left;
        vertical-align: text-bottom;
        font-weight: bold;
        color: rgba(233, 233, 233, 0.8);
        padding: 10px;
        width: 30%;
        margin: auto;        
   }

    #datum{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        text-align: left;
        font-weight: bold;
        color: rgba(233, 233, 233, 0.8);
        padding: 10px;
        margin-left: auto;        
    }

    #icon{
        padding: 10px;
        text-align: center;
        margin: auto;        
    }
    
    #beschreibung{
        font-family: Arial, Helvetica, sans-serif;
        text-transform: uppercase;
        text-align: left;
        font-weight: bold;
        color: rgba(233, 233, 233, 0.8);
        padding: 10px;
    }

    #unterbehaelter2{        
        border-bottom-style: solid;
        border-color: rgba(0,0,0,0.5);
    }

   
</style>