<template>
  <div class="widgetBehaelter" @click="isShow = !isShow">
    <div id="ort">{{ weatherData?.location.name }}</div>
    <div class="unterbehaelter" id="aktuellesWetterBehaelter">
      <img id="icon" :src="weatherData?.current.condition.icon" />
      <div id="temperatur">{{ weatherData?.current.temp_c }}&deg;</div>
      <div id="minmax">
        <span
          >Max: {{ weatherData?.forecast.forecastday[0].day.maxtemp_c }}&deg;
        </span>
        <span
          >Min:
          {{ weatherData?.forecast.forecastday[0].day.mintemp_c }}&deg;</span
        >
      </div>
    </div>

    <div class="unterbehaelter" id="datumBehaelter">
      <div id="beschreibung">{{ weatherData?.current.condition.text }}</div>
      <div id="datum">
        {{ days[d.getDay()] }}, {{ d.getDate() }}. {{ months[d.getMonth()] }}
      </div>
    </div>

    <div class="unterbehaelter" id="forecastBehaelter" v-if="isShow">
      <div class="forecast" id="forecast1">
        <img
          id="forecastIcon1"
          :src="weatherData?.forecast.forecastday[1].day.condition.icon"
        />
        <br />
        {{ weatherData?.forecast.forecastday[1].day.maxtemp_c }}&deg;
        <br />
        {{ days[getDayOfWeek(1)] }}
      </div>

      <div class="forecast" id="forecast2">
        <img
          id="forecastIcon2"
          :src="weatherData?.forecast.forecastday[2].day.condition.icon"
        />
        <br />
        {{ weatherData?.forecast.forecastday[2].day.maxtemp_c }}&deg;
        <br />
        {{ days[getDayOfWeek(2)] }}
      </div>
    </div>
    <button
      name="deleteButton"
      @click.stop="emit('deleteWidget', props.location)"
    >
      Remove
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const isShow = ref(false);
const props = defineProps<{ location: string }>();
const weatherData = ref<WeatherApiResponse>();
const emit = defineEmits<{
  deleteWidget: [locationName: string];
}>();
const d = new Date();
const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const days = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

onMounted(async () => {
  weatherData.value = await getWeatherJSON();
});

type WeatherApiResponse = {
  location: { name: string };
  current: { temp_c: number; condition: { icon: string; text: string } };
  forecast: {
    forecastday: {
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: { icon: string };
      };
    }[];
  };
};

function getDayOfWeek(x: number) {
  return (d.getDay() + x) % 7;
}

async function getWeatherJSON() {
  const apiKey = "key=30189c89030a42629e195610240306%20";
  const apiCall = `https://api.weatherapi.com/v1/forecast.json?q=${props.location}&days=3&aqi=no&alerts=no&`;
  let call = apiCall + apiKey;

  const response = await fetch(call);
  const forecast: WeatherApiResponse = await response.json();
  console.log(forecast);
  return forecast;
}
</script>

<style scoped>
.widgetBehaelter {
  width: 500px;
  padding: 20px;
  margin: 20px auto;
  background: rgba(37, 36, 37, 0.5);
  border: 2px;
  border-radius: 10px;
}

.unterbehaelter {
  display: flex;
}

.forecast {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: rgba(233, 233, 233, 0.8);
  width: 40%;
  margin: auto;
  padding: 1rem 1rem;
  vertical-align: middle;
  display: inline-block;
}

#ort {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  color: rgba(233, 233, 233, 0.8);
  width: 80%;
}

#temperatur {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: center;
  vertical-align: text-bottom;
  font-weight: bold;
  font-size: 3rem;
  color: rgba(233, 233, 233, 0.8);
  padding: 10px;
  width: 30%;
  margin: auto;
}

#minmax {
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

#datum {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  color: rgba(233, 233, 233, 0.8);
  padding: 10px;
  margin-left: auto;
}

#icon {
  padding: 10px;
  text-align: center;
  margin: auto;
}

#beschreibung {
  font-family: Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  text-align: left;
  font-weight: bold;
  color: rgba(233, 233, 233, 0.8);
  padding: 10px;
}

#datumBehaelter {
  border-bottom-style: solid;
  border-color: rgba(0, 0, 0, 0.5);
}
</style>
