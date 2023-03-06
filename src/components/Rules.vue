<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="amber accent-4" dark block v-bind="attrs" v-on="on">
        Rules
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        How to play ?
      </v-card-title>
      <v-card-text>
        <p>Take part in a game, you can also create a game or join once.</p>
        <p>
          When all players are ready the game start, you have to record your
          voice and say the sentence write on the screen.
        </p>
        <p>
          Now you can listen the records of other players and vote for the
          record you prefer.
        </p>
        <p>Try to be funny to have more vote and to become the winner.</p>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="cyan" dark @click="dialog = false">
          OK, I understand !
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
