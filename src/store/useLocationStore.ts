import type { RefSymbol } from "@vue/reactivity";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLocationStore = defineStore("locationsSaved", () => {

    const locationsList = ref<string[]>( JSON.parse(localStorage.getItem("locations") ?? "[]"));

    function addLocation(locationName: string) {
      locationsList.value = [...locationsList.value, locationName]
    }
  
    function deleteLocation(locationName: string) {
      locationsList.value = locationsList.value.filter(
        (location) => location !== locationName,
      );
    }

    watch(locationsList, (newVal) => {
        console.log({newVal})
        localStorage.setItem("locations", JSON.stringify(newVal));
      });
  
    return {locationsList, addLocation, deleteLocation}
  });