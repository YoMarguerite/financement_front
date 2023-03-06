<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="amber accent-4"
        fab
        dark
        x-small
        absolute
        top
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        How to create a game ?
      </v-card-title>
      <v-card-text>
        <p>When you create a game, you will get a GameCode.</p>
        <p>Share it to other players and they will join our game.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="cyan" dark @click="dialog = false">
          Let's go create a game !
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
