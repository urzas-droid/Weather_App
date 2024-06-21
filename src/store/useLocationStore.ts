import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useLocationStore = defineStore("locationsSaved", () => {

    const locationsList = ref<string[]>( JSON.parse(localStorage.getItem("locations") ?? "[]"));
    const activeWidget = ref<string>(localStorage.getItem("activeWidget") ?? "")

    function addLocation(locationName: string) {
      locationsList.value = [...locationsList.value, locationName]
    }
  
    function deleteLocation(locationName: string) {
      locationsList.value = locationsList.value.filter(
        (location) => location !== locationName,
      );
    }

    function setActiveWidget(locationName: string){
      localStorage.setItem("activeWidget", locationName);
      activeWidget.value = locationName
    }

    watch(locationsList, (newVal) => {
        console.log({newVal})
        localStorage.setItem("locations", JSON.stringify(newVal));
      });
  
    return {locationsList, activeWidget , addLocation, deleteLocation, setActiveWidget}
  });