<template>
  <div>
    <div class="mx-auto px-2">
      <input
        type="text"
        id="search"
        list="gesuchteStaedte"
        placeholder="Hier tippen..."
        v-model="userInput"
        class="m-3 font-bold mx-auto flex"
      />
    </div>
    <ul id="gesuchteStaedte">
      <li
        v-for="element in citiesList"
        @click="emit('passCityName', element.name)"
        class="font-bold bg bg-slate-600 text-center"
      >
        {{ element.name }}, {{ element.region }}, {{ element.country }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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

<style></style>
