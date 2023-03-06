<template>
  <div v-if="actifPlayer">
    <v-row class="mb-6">
      <v-col sm="4" class="mx-auto">
        <v-btn rounded dark block color="amber accent-4">
          {{ sentence }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4">
          <v-list dark color="cyan">
            <v-list-item>
              <v-list-item-icon>
                <v-icon v-show="actifPlayer.pseudo === creator.pseudo"
                  >mdi-crown</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title
                  v-text="actifPlayer.pseudo"
                ></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  color="amber accent-4"
                  x-small
                  fab
                  dark
                  @click="play(actifPlayer)"
                  v-show="actifPlayer.record"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn
                  color="amber accent-4"
                  x-small
                  fab
                  dark
                  :loading="true"
                  v-show="!actifPlayer.record"
                >
                </v-btn>
              </v-list-item-action>

              <v-list-item-action>
                <div>
                  {{ actifPlayer.vote.length }}
                  <v-btn color="amber accent-4" x-small dark fab>
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6" v-show="players.length > 0">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4">
          <v-list>
            <v-list-item v-for="(player, i) in players" :key="i">
              <v-list-item-icon>
                <v-icon v-show="player.pseudo === creator.pseudo"
                  >mdi-crown</v-icon
                >
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="player.pseudo"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  color="cyan"
                  x-small
                  fab
                  dark
                  @click="play(player)"
                  v-show="player.record"
                >
                  <v-icon>mdi-play</v-icon>
                </v-btn>

                <v-btn
                  color="cyan"
                  x-small
                  fab
                  dark
                  :loading="true"
                  v-show="!player.record"
                >
                </v-btn>
              </v-list-item-action>

              <v-list-item-action>
                <v-checkbox
                  color="amber accent-4"
                  v-model="vote[i]"
                  v-show="!actifPlayer.haveVote && player.record"
                  @click="select(player, i)"
                ></v-checkbox>

                <div v-show="actifPlayer.haveVote || winners.length > 0">
                  {{ player.vote.length }}
                  <v-btn color="amber accent-4" x-small dark fab>
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-btn
          block
          dark
          color="cyan"
          @click="sendVote()"
          v-show="players.length > 0 && !actifPlayer.haveVote"
        >
          Vote
        </v-btn>

        <v-btn
          block
          dark
          disabled
          v-show="players.length > 0 && actifPlayer.haveVote"
        >
          Wait other players
        </v-btn>

        <v-btn
          block
          dark
          color="cyan"
          @click="backToGame()"
          v-show="players.length === 0"
        >
          Back to Game
        </v-btn>
      </v-col>
    </v-row>
    <audio id="audio"></audio>
  </div>
</template>

<script>
import servicesAPI from "../services/api";

export default {
  name: "Game",
  data() {
    return {
      api: servicesAPI,
      code: this.$route.params.code,
      pseudo: this.$route.params.pseudo,

      creator: {},
      players: [],
      sentence: "",
      actifPlayer: null,
      selected: null,

      ajax: {},

      vote: [],
      haveVote: false,
      winners: []
    };
  },
  mounted: function() {
    this.setAjax();
    this.getGame();
  },
  methods: {
    setAjax: function() {
      this.ajax = setInterval(() => {
        this.getGame();
      }, 3000);
    },

    getGame: function() {
      servicesAPI
        .getGame(this.pseudo, this.code)
        .then(response => {
          this.creator = response.creator;
          this.players = response.players.filter(el => {
            return el.pseudo !== this.pseudo && el.ingame;
          });
          this.actifPlayer = response.players.find(el => {
            return el.pseudo === this.pseudo;
          });

          if (this.vote.length < this.players.length) {
            this.players.forEach(() => {
              this.vote.push(false);
            });
          }
          this.sentence = response.sentence;

          this.winners = response.winners;
          if (this.winners.length > 0) {
            this.goToWinner();
          }
        })
        .catch(error => {
          console.log(error.response.data.error);
          clearInterval(this.ajax);
          this.$emit("error", error.response.data.error);
        });
    },

    play: function(player) {
      let playAudio = document.getElementById("audio");

      let byteCharacters = atob(player.record.split("base64,")[1]);
      let byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      let blob = new Blob([byteArray], { type: "audio/mp3" });

      let audioSrc = window.URL.createObjectURL(blob);
      playAudio.src = audioSrc;
      playAudio.play();
    },

    select: function(player, i) {
      if (player.record) {
        this.selected = player;
        this.vote = this.vote.map((el, index) => {
          if (index !== i) {
            el = false;
          }
          return el;
        });
      }
    },

    sendVote: function() {
      if (this.selected) {
        this.haveVote = true;
        this.api
          .vote(this.pseudo, this.code, this.selected.pseudo)
          .then(response => {
            console.log(response);
            this.$emit("message", response.message);
          })
          .catch(error => {
            console.log(error);
            this.haveVote = false;
            this.vote = this.vote.map(el => {
              el = false;
              return el;
            });
          });
      } else {
        this.$emit("message", "Please select a player.");
      }
    },

    goToWinner: function() {
      this.api.reinit(this.pseudo, this.code).then(response => {
        this.$emit("message", response.message);
        console.log(response);
        clearInterval(this.ajax);
        this.$router.push({
          name: "Winner",
          params: {
            code: this.code,
            pseudo: this.pseudo,
            winners: this.winners
          }
        });
      });
    },

    backToGame: function() {
      this.api.reinit(this.pseudo, this.code).then(response => {
        this.$emit("message", response.message);
        console.log(response);
        clearInterval(this.ajax);
        this.$router.push({
          name: "Game",
          params: { code: this.code, pseudo: this.pseudo }
        });
      });
    }
  }
};
</script>
