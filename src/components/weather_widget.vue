<template>
  <div
    class="relative grid grid-cols-3 g mx-4 my-4 p-2 h-auto bg-slate-500 text-gray-100 font-bold delay-300"
    @click="isShow = !isShow"
  >
    <div class="h-auto p-4 col-span-2 text-2xl">
      {{ weatherData?.location.name }}
    </div>
    <div class="p-4 align-top font-bold text-right">
      {{ days[d.getDay()] }}, {{ d.getDate() }}. {{ months[d.getMonth()] }}
    </div>
    <div class="">
      <img
        class="object-cover mx-auto my-4"
        :src="weatherData?.current.condition.icon"
      />
      <div class="m-auto pb-7 w-20 text-center">
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
    </div>
    <div class="mx-auto my-4" v-if="isShow">
      <img
        class="mx-auto my-4"
        :src="weatherData?.forecast.forecastday[1].day.condition.icon"
      />
      {{ weatherData?.forecast.forecastday[1].day.maxtemp_c }}&deg;
      {{ days[getDayOfWeek(1)] }}
    </div>
    <div v-if="isShow" class="mx-auto my-4">
      <img
        class="mx-auto my-4"
        :src="weatherData?.forecast.forecastday[2].day.condition.icon"
      />
      {{ weatherData?.forecast.forecastday[2].day.maxtemp_c }}&deg;
      {{ days[getDayOfWeek(2)] }}
    </div>
    <div v-if="isShow" class="absolute bottom-0 right-0">
      <button
        @click.stop="emit('deleteWidget', props.location)"
        class="font-bold mx-4 my-2 text-red-500"
      >
        Remove
      </button>
    </div>
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

<style scoped></style>
