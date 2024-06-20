<template>
  <div
    class="font-bold uppercase text-xl text-left bg-cyan-800 hover:bg-cyan-700 text-slate-200 grid grid-cols-2 my-4"
  >
    <div
      class="ml-4"
      @click="locationStore.setActiveWidget(props.location.toString())"
    >
      {{ location }}
    </div>
    <div
      class="text-red-500 text-right text-4xl min-w-min max-w-min justify-self-end px-2"
      @click="locationStore.deleteLocation(props.location.toString())"
    >
      -
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocationStore } from "@/store/useLocationStore";
import { onMounted, watch, ref } from "vue";

const locationStore = useLocationStore();
const props = defineProps<{ location: String }>();
</script>
