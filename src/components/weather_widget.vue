<template>
  <div
    class="grid grid-cols-3 grid-rows-5 grid-flow-row bg-cyan-900 text-gray-100 font-bold mx-auto my-4 p-4 max-w-xl gap-4 rounded-md"
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
        {{ $t("message.rain") }}:
        {{
          weatherData?.forecast.forecastday[0].day.daily_chance_of_rain
        }}&percnt;
      </p>
    </div>

    <div
      class="grid col-span-3 text-center overflow-x-scroll overflow-y-hidden grid-flow-col gap-2 text-sm no-scrollbar"
    >
      <div
        class="w-16 h-22 rounded-md bg-gray-600 shadow-2xl"
        v-for="element in weatherData?.forecast.forecastday[0].hour"
        @click="getHoursForForecast(element.time)"
      >
        <p>{{ getHoursForForecast(element.time) }}</p>
        <p><img :src="element.condition.icon" /></p>
        <p>{{ element.temp_c }}&deg;</p>
        <p>{{ element.chance_of_rain }}&percnt;</p>
      </div>
    </div>
    <div class="col-span-3 grid grid-cols-2 text-center">
      <div class="col-span-1">
        <img
          :src="weatherData?.forecast.forecastday[1].day.condition.icon"
          class="block mx-auto"
        />
        <div>{{ weatherData?.forecast.forecastday[1].day.condition.text }}</div>
        <div>
          {{
            weatherData?.forecast.forecastday[1].day.daily_chance_of_rain
          }}&percnt;
        </div>
      </div>
      <div class="col-span-1">
        <img
          :src="weatherData?.forecast.forecastday[2].day.condition.icon"
          class="block mx-auto"
        />
        <div>{{ weatherData?.forecast.forecastday[2].day.condition.text }}</div>
        <div>
          {{
            weatherData?.forecast.forecastday[2].day.daily_chance_of_rain
          }}&percnt;
        </div>
      </div>
    </div>
    <div class="col-span-1 text-center">
      <p>UV-Index:</p>
      <p class="text-4xl">{{ weatherData?.current.uv }}</p>
    </div>
    <div class="col-span-1 text-center">
      <p>Wind:</p>
      <p class="text-4xl">{{ weatherData?.current.wind_kph }} km/h</p>
    </div>
    <div class="col-span-1 text-center">
      <p>{{ $t("message.humidity") }}:</p>
      <p class="text-4xl">{{ weatherData?.current.humidity }}&percnt;</p>
    </div>
    <div class="col-span-3" v-show="weatherData?.alerts.alert.length != 0">
      <p class="text-center text-2xl text-yellow-500">
        {{ $t("message.alert") }}:
      </p>
      <p
        v-for="element in weatherData?.alerts.alert"
        class="text-sm font-normal mt-4"
      >
      <p v-for="item in element.desc.split('*')" class="mt-2">{{ item }}</p>
        
        <p class="font-bold text-yellow-500">----</p>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { useWeatherDataStore } from "../store/useWeatherDataStore";
import { useLocationStore } from "@/store/useLocationStore";

const WeatherDataStore = useWeatherDataStore();

const locationStore = useLocationStore();

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

watchEffect(async () => {
  weatherData.value = await getWeatherJSON(locationStore.activeWidget);
});

async function getWeatherJSON(location: string) {
  const apiKey = "&key=30189c89030a42629e195610240306%20";
  const apiCall = `https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&aqi=no&alerts=yes`;
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
