<template>
  <div
    class="grid grid-cols-4 font-bold shadow-inner bg-teal-500 text-slate-200 min-w-max"
  >
    <div class="my-2 mx-2 w-max-min">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <i class="fa fa-bars" @click="isHidden = !isHidden"></i>
    </div>
    <div class="uppercase text-center text-4xl col-span-2 min-w-max">
      Weather Forecast
    </div>
  </div>

  <div class="grid grid-cols-4 grid-rows-4 grid-flow-col gap-4 min-w-max">
    <div
      :class="[
        'max-w-80',
        'row-span-full',
        'bg-slate-800',
        { invisible: isHidden },
      ]"
    >
      <Search @passCityName="locationStore.addLocation" />

      <NavbarWidget
        v-for="element in locationStore.locationsList"
        :location="element"
      ></NavbarWidget>
    </div>
    <div class="col-span-2 min-w-max">
      <Widget
        v-for="element in locationStore.locationsList"
        :location="element"
        id="baseWidget"
        @deleteWidget="locationStore.deleteLocation(element)"
      ></Widget>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Widget from "./components/weather_widget.vue";
import Search from "./components/search_function.vue";
import NavbarWidget from "./components/navbar_weather_widget.vue";
import { useLocationStore } from "./store/useLocationStore";

const locationStore = useLocationStore();
const isHidden = ref(true);

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
  locationStore.addLocation(currentLocation);
}
</script>
