import type { RefSymbol } from "@vue/reactivity";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { WeatherApiResponse } from "../components/weather_widget.vue";


export const useWeatherDataStore = defineStore("WeatherDataSaved", () => {

    const listOfWeatherData = ref<WeatherApiResponse[]>()


    function addWeatherData(WeatherData: WeatherApiResponse){
      listOfWeatherData.value?.push(WeatherData)
    }

    function deleteWeatherData(locationName: string){
        listOfWeatherData.value = listOfWeatherData.value?.filter(
            (location) => location.location.name !== locationName,
        );
    }

    watch(listOfWeatherData, (newVal) => {
        console.log({newVal})
        localStorage.setItem("locations", JSON.stringify(newVal));
      }); 
  
    return {listOfWeatherData, addWeatherData, deleteWeatherData}
  });