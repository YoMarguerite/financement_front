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
        How to join a game ?
      </v-card-title>
      <v-card-text>
        <p>You need the GameCode to join a game.</p>
        <p>
          Ask to the creator of the game the GameCode, and write it in the text
          field.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="cyan" dark @click="dialog = false">
          Let's go join a game !
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
