<template>
  <div class="bg-slate-600 font-bold block text-left py-2 my-2">
    <h1 class="uppercase font-bold text-white text-4xl my-2">
      Charakter Erstellung
    </h1>
    <FormKit type="form" name="Character">
      <FormKit
        type="text"
        name="Name"
        label="Name"
        help="Der volle Name deines Charakters"
        placeholder="Max Mustermann"
      ></FormKit>
      <FormKit
        type="select"
        name="class"
        label="Klasse"
        placeholder="Klasse auswählen"
        :options="['Magier', 'Dieb', 'Barde']"
      >
      </FormKit>

      <FormKit
        v-model="value"
        type="range"
        name="strength"
        label="Stärke"
        value="8"
        min="1"
        max="20"
        prefix="1"
        sufix="20"
      ></FormKit>
      <pre>{{ value }}</pre>

      <FormKit
        type="checkbox"
        label=" Mit 500 Gold starten"
        name="powerStart"
      ></FormKit>
      <FormKit
        type="color"
        name="favColor"
        label="Wähle die Farbe deines Hauses"
        value="#00FF00"
      />

      <FormKit
        type="date"
        label="Geburtstag"
        name="birthday"
        validation="required | date_before: 2024-06-06"
        validation-visibility="live"
      ></FormKit>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const value = ref();
</script>
