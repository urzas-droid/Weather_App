<template>
  <div id="header">
    <h1>Weather Forecast</h1>
  </div>

  <div id="widgetContainer">
    <Widget
      v-for="element in locations"
      :location="element"
      id="baseWidget"
    ></Widget>
  </div>
  <div style="text-align: center">
    <button id="addLocation" @click="addLocation">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Widget from "./components/weather_widget.vue";

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
  const woBinICh = position.coords.latitude + ", " + position.coords.longitude;
  locations.value.push(woBinICh);
}

function addLocation() {
  let userInputLocation = prompt("Welche Stadt möchten Sie hinzufügen?");
  if (userInputLocation !== null) {
    locations.value.push(userInputLocation);
  } else {
    console.log("Abgebrochen!");
  }
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
