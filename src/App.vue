<template>
  <div
    id="header"
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import Widget from "./components/weather_widget.vue";
import Search from "./components/search_function.vue";

const locations = ref<string[]>([]);

getCurrentLocation();

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
  locations.value.push(nameOfCity);
}

function removeLocation(nameOfCity: string) {
  locations.value.splice(locations.value.indexOf(nameOfCity), 1);
}
</script>

<style></style>
