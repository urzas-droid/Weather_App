<template>
  <div
    class="font-bold text-5xl shadow-lg bg-gradient-to-r from-slate-500 to-green-500"
  >
    <h1 class="uppercase text-white text-center text-opacity-90">
      Weather Forecast
    </h1>
  </div>

  <div>
    <Widget
      v-for="element in locations"
      :location="element"
      id="baseWidget"
      @deleteWidget="removeLocation"
    ></Widget>
  </div>
  <div>
    <Search @passCityName="addLocation" />
  </div>
  <button @click="getCurrentLocation" class="bg-slate-50 mx-auto flex">
    Get Weather for your Location
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Widget from "./components/weather_widget.vue";
import Search from "./components/search_function.vue";
import { defineStore } from "pinia";

const locations = ref<string[]>([]);

onMounted(() => {
  locations.value = JSON.parse(localStorage.getItem("locations") ?? "[]");
});

watch(locations, (newVal) => {
  localStorage.setItem("locations", JSON.stringify(newVal));
});

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Error fetching geolocation");
  }
}

function showPosition(position: any) {
  const currentLocation =
    position.coords.latitude + ", " + position.coords.longitude;
  locations.value.push(currentLocation);
}

function addLocation(nameOfCity: string) {
  locations.value = [...locations.value, nameOfCity];
}

function removeLocation(nameOfCity: string) {
  locations.value = locations.value.filter(
    (location) => location !== nameOfCity,
  );
}
</script>
