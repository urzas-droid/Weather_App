<template>
  <div id="header">
    <h1>Weather Forecast</h1>
  </div>

  <div id="widgetContainer">
    <Widget
      v-for="element in locations"
      :location="element"
      id="baseWidget"
      @deleteWidget="removeLocation"
    ></Widget>
  </div>
  <div id="searchBarContainer">
    <Search @passCityName="addLocation" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Widget from "./components/weather_widget.vue";
import Search from "./components/search_function.vue";
import type { RefSymbol } from "@vue/reactivity";

//emit for delete
const locations = ref<string[]>([]);
const testName = "";

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

<style>
#addLocation {
  font-size: 25px;
  font-weight: bolder;
  color: rgb(139, 136, 136, 0.5);
  border-radius: 40px;
  border-color: rgba(134, 134, 134, 0.5);
  background: rgb(47, 79, 79, 0.5);
  align-items: center;
  height: 50px;
  width: 50px;
}

#addLocation:hover {
  font-size: 25px;
  font-weight: bolder;
  color: rgb(136, 136, 136, 1);
  border-radius: 40px;
  border-color: white;
  background: rgb(47, 79, 79, 1);
  align-items: center;
  height: 50px;
  width: 50px;
}
</style>
