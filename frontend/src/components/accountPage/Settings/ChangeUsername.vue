<template>
  <v-expansion-panel class="edit-user__username">
    <v-expansion-panel-title
      expand-icon="mdi-plus"
      collapse-icon="mdi-minus"
      color="grey-darken-3"
    >
      Change username
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <form-change-username :cookies="cookies" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script lang="ts" setup>
import FormChangeUsername from "./FormChangeUsername.vue";

defineProps(["cookies"]);
</script>
