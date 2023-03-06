<template>
  <div>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card color="amber accent-4" dark>
          <v-card-title>
            <div class="mx-auto">
              {{
                winners.length > 1 ? "The Winners are ..." : "The Winner is ..."
              }}
            </div>
          </v-card-title>
          <v-card-text>
            <h2 v-for="(winner, i) in winners" :key="i" class="text-center">
              {{ winner.pseudo }}
            </h2>
          </v-card-text>
          <v-card-actions>
            <div class="mx-auto">
              One point for you !
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-btn block dark color="cyan" @click="backToGame()">
          Back to Game
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Winner",
  props: {
    winners: Array
  },
  data() {
    return {
      code: this.$route.params.code,
      pseudo: this.$route.params.pseudo
    };
  },
  methods: {
    backToGame: function() {
      this.$router.push({
        name: "Game",
        params: { code: this.code, pseudo: this.pseudo }
      });
    }
  }
};
</script>
