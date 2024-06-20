import type { RefSymbol } from "@vue/reactivity";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLocationStore = defineStore("locationsSaved", () => {

    const locationsList = ref<string[]>( JSON.parse(localStorage.getItem("locations") ?? "[]"));
    const activeWidget = ref<string>(JSON.parse(localStorage.getItem("activeWidget") ?? ""))

    function addLocation(locationName: string) {
      locationsList.value = [...locationsList.value, locationName]
    }
  
    function deleteLocation(locationName: string) {
      locationsList.value = locationsList.value.filter(
        (location) => location !== locationName,
      );
    }

    function setActiveWidget(location: string){
      activeWidget.value = location;
    }

    watch(locationsList, (newVal) => {
        console.log({newVal})
        localStorage.setItem("locations", JSON.stringify(newVal));
      });
  
    return {locationsList, activeWidget, addLocation, deleteLocation, setActiveWidget}
  });