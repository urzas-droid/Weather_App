<template>
  <div>
    <div class="mx-auto px-2">
      <input
        type="text"
        id="search"
        list="gesuchteStaedte"
        placeholder="Hier Stadt eingeben..."
        v-model="userInput"
        class="m-3 font-bold mx-auto flex"
      />
    </div>
    <ul v-if="userInput !== ''">
      <li
        v-for="element in citiesList"
        @click="emit('passCityName', element.name)"
        class="font-bold text-xs min-w-min max-w-max my-2 mx-auto bg-slate-400 hover:bg-slate-300"
      >
        {{ element.name }}, {{ element.region }}, {{ element.country }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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

import { onMounted, ref, watch } from "vue";

type SearchApiResponse = {
  name: string;
  region: string;
  country: string;
}[];

const emit = defineEmits<{
  passCityName: [cityName: string];
}>();

const citiesList = ref<SearchApiResponse>();
const userInput = ref("");

onMounted(async () => {
  citiesList.value = await searchSuggestion("");
});

watch(userInput, (newInput: string) => {
  searchSuggestion(newInput);
});

async function searchSuggestion(searchPhrase: string) {
  const apiKey = "&key=30189c89030a42629e195610240306%20";
  const apiAddress = `https://api.weatherapi.com/v1/search.json?q=${searchPhrase}`;
  const call = apiAddress + apiKey;

  const response = await fetch(call);
  const suggestions: SearchApiResponse = await response.json();
  citiesList.value = suggestions;
  return suggestions;
}
</script>
