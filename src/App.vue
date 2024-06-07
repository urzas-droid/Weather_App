<template>
  <div id="header">  
        <h1>Weather Widget App</h1>
  </div>

  <div id="widgetContainer">
    <Widget id="baseWidget" @click="toggleForecast"></Widget>
    <Widget1 id="baseWidget1" @click="toggleForecast"></Widget1>
  </div>

  <div style="text-align: center;">
    <button id="addLocation" @click="addLocation">+</button>
  </div>
</template>



<script setup lang="ts">
  import Widget from './components/weather_widget.vue';
  import Widget1 from './components/custom_weather_widget.vue';


  function addLocation(){
    const node = document.createElement("Widget");
    const textnode = document.createTextNode("WATER");
    node.appendChild(textnode);
    document.getElementById("widgetContainer")?.appendChild(node);

   }
  
  function toggleForecast(){
    if (document.getElementById("unterbehaelter3")?.style.display === "none"){
      document.getElementById("unterbehaelter3").style.display = "block";
    } else {document.getElementById("unterbehaelter3").style.display = "none";}
  }
  
</script>

<style >
  #addLocation{
    font-size: 25px;
    font-weight: bolder;
    color: rgb(139, 136, 136, 0.5);
    border-radius: 40px;
    border-color: rgba(134, 134, 134, 0.5);
    background: rgb(47,79,79,0.5);
    align-items: center;
    height: 50px;
    width: 50px;
  }

  #addLocation:hover{
    font-size: 25px;
    font-weight: bolder;
    color: rgb(136, 136, 136, 1);
    border-radius: 40px;
    border-color: white;
    background: rgb(47,79,79,1);
    align-items: center;
    height: 50px;
    width: 50px;
  }
</style>








