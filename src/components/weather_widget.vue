<template>
  <div
    class="grid grid-cols-3 grid-rows-6 bg-teal-500 text-gray-100 font-bold m-4 p-4 max-w-xl gap-4"
  >
    <div class="col-span-2 text-left text-2xl border border-white">
      <p>{{ weatherData?.location.name }}</p>
      <p class="text-base">{{ weatherData?.location.region }}</p>
      <p class="text-sm">{{ weatherData?.location.country }}</p>
    </div>
    <div class="text-right text-sm border border-white h-8 pr-2">
      {{ days[d.getDay()] }}, {{ d.getDate() }}. {{ months[d.getMonth()] }}
    </div>
    <div class="col-span-1 text-center border border-white pt-0">
      <p>
        <img class="block mx-auto" :src="weatherData?.current.condition.icon" />
      </p>
      <p>{{ weatherData?.current.condition.text }}</p>
    </div>
    <div class="text-center text-6xl border border-white py-4">48&deg;</div>
    <div class="text-right border border-white py-2 pr-2">
      <p>Min: {{ weatherData?.forecast.forecastday[0].day.mintemp_c }}&deg;</p>
      <p>Max: {{ weatherData?.forecast.forecastday[0].day.maxtemp_c }}&deg;</p>
      <p>
        Rain:
        {{
          weatherData?.forecast.forecastday[0].day.daily_chance_of_rain
        }}&percnt;
      </p>
    </div>
    <div class="col-span-3 border border-white" v-if="alarm">
      <!--       <p></p> alamrm einfügen -->
    </div>
    <div
      class="grid col-span-3 text-center overflow-x-scroll overflow-y-hidden grid-flow-col gap-2 text-sm no-scrollbar"
    >
      <div
        class="border border-white w-16 h-22 rounded-md bg-gray-600"
        v-for="element in weatherData?.forecast.forecastday[0].hour"
        @click="getHoursForForecast(element.time)"
      >
        <p>{{ getHoursForForecast(element.time) }}</p>
        <p><img :src="element.condition.icon" /></p>
        <p>{{ element.temp_c }}&deg;</p>
        <p>{{ element.chance_of_rain }}&percnt;</p>
      </div>
    </div>
    <div class="col-span-1 border border-white text-center pt-8">
      <p>UV-Index:</p>
      <p>{{ weatherData?.current.uv }}</p>
    </div>
    <div class="col-span-1 border border-white text-center pt-8">
      <p>Wind:</p>
      <p>{{ weatherData?.current.wind_kph }} km/h</p>
    </div>
    <div class="col-span-1 border border-white text-center pt-8">
      <p>Luftfeuchtigkeit</p>
      <p>{{ weatherData?.current.humidity }}&percnt;</p>
    </div>
    <div class="col-span-3 text-center pt-8 border border-white">FORECAST</div>
  </div>

  <br />
  <div
    class="grid grid-cols-3 mx-auto my-4 p-2 max-w-2xl max-h-max bg-teal-500 text-gray-100 font-bold hover:bg-slate-400"
  >
    <div class="h-auto p-4 col-span-2 text-2xl">
      {{ weatherData?.location.name }}
    </div>
    <div class="p-4 align-top font-bold text-right">
      {{ days[d.getDay()] }}, {{ d.getDate() }}. {{ months[d.getMonth()] }}
    </div>
    <div>
      <img
        class="object-cover mx-auto my-4"
        :src="weatherData?.current.condition.icon"
      />
      <div class="m-auto pb-7 w-20 text-center text-xl">
        {{ weatherData?.current.condition.text }}
      </div>
    </div>
    <div class="m-auto p-auto text-6xl">
      {{ weatherData?.current.temp_c }}&deg;
    </div>
    <div class="m-auto text-xl text-right align-middle">
      <span
        >Max: {{ weatherData?.forecast.forecastday[0].day.maxtemp_c }}&deg;
      </span>
      <br />
      <span
        >Min:
        {{ weatherData?.forecast.forecastday[0].day.mintemp_c }}&deg;</span
      >
      <br />
      <span>Humidity: {{ weatherData?.current.humidity }}&percnt;</span>
    </div>

    <div
      v-for="(element, index) in weatherData?.forecast.forecastday.slice(1)"
      class="mx-auto my-4"
    >
      <img class="mx-auto my-4" :src="element?.day.condition.icon" />
      {{ element?.day.maxtemp_c }}&deg;
      {{ days[getDayOfWeek(index + 1)] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useWeatherDataStore } from "../store/useWeatherDataStore";

const WeatherDataStore = useWeatherDataStore();

///implementieren V
const alarm = ref(false);

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
