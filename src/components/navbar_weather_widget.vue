<template>
  <div
    class="font-bold uppercase text-xl bg-cyan-900 hover:bg-cyan-700 text-slate-200 rounded-md shadow-lg m-2"
  >
    <p
      class="inline-block w-5/6 my-4 ml-2"
      @click="() => locationStore.setActiveWidget(props.location.toString())"
    >
      {{ location }}
    </p>
    <p
      class="text-red-500 text-4xl inline-block my-auto"
      @click="locationStore.deleteLocation(props.location.toString())"
    >
      -
    </p>
  </div>
</template>

<script setup lang="ts">
import { useLocationStore } from "@/store/useLocationStore";

const locationStore = useLocationStore();
const props = defineProps<{ location: String }>();
</script>
