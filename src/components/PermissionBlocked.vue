<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" dark block v-show="show" v-bind="attrs" v-on="on">
        Permission Micro is blocked
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Voicer need microphone
      </v-card-title>
      <v-card-text>
        <p>Please check your permission.</p>
        <p>You can't play without microphone.</p>
        <p>Try to restart Voicer.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="error" dark @click="dialog = false">
          OK, I will restart ...
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>
