<template>
  <div
    class="grid grid-cols-3 grid-rows-5 bg-cyan-900 text-gray-100 font-bold mx-auto my-4 p-4 max-w-xl gap-4 rounded-md h-fit"
  >
    <div class="col-span-2 text-left text-2xl">
      <p>{{ weatherData?.location.name }}</p>
      <p class="text-base">{{ weatherData?.location.region }}</p>
      <p class="text-sm">{{ weatherData?.location.country }}</p>
    </div>
    <div class="text-right text-sm h-8 pr-2">
      {{ days[d.getDay()] }}, {{ d.getDate() }}. {{ months[d.getMonth()] }}
    </div>
    <div class="col-span-1 text-center pt-0">
      <p>
        <img class="block mx-auto" :src="weatherData?.current.condition.icon" />
      </p>
      <p>{{ weatherData?.current.condition.text }}</p>
    </div>
    <div class="text-center text-6xl py-4">
      {{ weatherData?.current.temp_c }}&deg;
    </div>
    <div class="text-right py-2 pr-2">
      <p>Min: {{ weatherData?.forecast.forecastday[0].day.mintemp_c }}&deg;</p>
      <p>Max: {{ weatherData?.forecast.forecastday[0].day.maxtemp_c }}&deg;</p>
      <p>
        Rain:
        {{
          weatherData?.forecast.forecastday[0].day.daily_chance_of_rain
        }}&percnt;
      </p>
    </div>

    <div
      class="grid col-span-3 text-center overflow-x-scroll overflow-y-hidden grid-flow-col gap-2 text-sm no-scrollbar"
    >
      <div
        class="w-16 h-22 rounded-md bg-gray-600"
        v-for="element in weatherData?.forecast.forecastday[0].hour"
        @click="getHoursForForecast(element.time)"
      >
        <p>{{ getHoursForForecast(element.time) }}</p>
        <p><img :src="element.condition.icon" /></p>
        <p>{{ element.temp_c }}&deg;</p>
        <p>{{ element.chance_of_rain }}&percnt;</p>
      </div>
    </div>
    <div class="col-span-1 text-center">
      <p>UV-Index:</p>
      <p>{{ weatherData?.current.uv }}</p>
    </div>
    <div class="col-span-1 text-center">
      <p>Wind:</p>
      <p>{{ weatherData?.current.wind_kph }} km/h</p>
    </div>
    <div class="col-span-1 text-center">
      <p>Luftfeuchtigkeit</p>
      <p>{{ weatherData?.current.humidity }}&percnt;</p>
    </div>
    <div class="col-span-3">
      <p class="text-center">Wetterwarnungen:</p>
      <p v-for="element in weatherData?.alerts.alert">{{ element.desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWeatherDataStore } from "../store/useWeatherDataStore";

const WeatherDataStore = useWeatherDataStore();

///implementieren V
const alarm = ref(false);
/////////////////////

const props = defineProps<{ location: string }>();
const weatherData = ref<WeatherApiResponse>();
/* const emit = defineEmits<{
  deleteWidget: [locationName: string];
}>(); */
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

export type WeatherApiResponse = {
  location: {
    name: string;
    country: string;
    region: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: { icon: string; text: string };
    feelslike_c: number;
    wind_kph: number;
    humidity: number;
    uv: number;
  };
  forecast: {
    forecastday: {
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: { icon: string; text: string };
        daily_chance_of_rain: number;
      };
      hour: {
        time: string;
        chance_of_rain: number;
        temp_c: number;
        condition: { icon: string };
      }[];
    }[];
  };
  alerts: {
    alert: {
      category: string;
      desc: string;
      event: string;
    }[];
  };
};

function getDayOfWeek(x: number) {
  return (d.getDay() + x) % 7;
}

async function getWeatherJSON() {
  const apiKey = "key=30189c89030a42629e195610240306%20";
  const apiCall = `https://api.weatherapi.com/v1/forecast.json?q=${props.location}&days=3&aqi=no&alerts=yes&`;
  let call = apiCall + apiKey;

  const response = await fetch(call);
  const forecast: WeatherApiResponse = await response.json();
  console.log(forecast);
  WeatherDataStore.addWeatherData(forecast);
  return forecast;
}

function getHoursForForecast(date: string) {
  const splitString = date.split(" ");
  return splitString[1];
}
</script>
