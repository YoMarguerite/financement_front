<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="cyan"
        fab
        dark
        x-small
        absolute
        top
        left
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-podium</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div class="mx-auto">Score</div>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(player, i) in players" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="player.pseudo"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>{{ player.score }}</v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mx-auto" color="cyan" dark @click="close()">
          Exit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Score",
  props: {
    players: Array
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    sort: function() {
      return this.players.sort((a, b) => {
        return a.score - b.score;
      });
    },
    close: function() {
      this.dialog = false;
    }
  }
};
</script>
