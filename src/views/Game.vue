<template>
  <div v-if="actifPlayer">
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4">
          <Score :players="players"></Score>
          <Close @leave="leave()"></Close>
          <v-card-text class="text-center"> CodeGame : {{ code }} </v-card-text>
        </v-card>
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
                <v-list-item-action-text
                  v-show="actifPlayer.ready && !actifPlayer.ingame"
                >
                  <v-chip color="success">Ready</v-chip>
                </v-list-item-action-text>
                <v-list-item-action-text
                  v-show="!actifPlayer.ready && !actifPlayer.ingame"
                >
                  <v-chip color="error">Not Ready</v-chip>
                </v-list-item-action-text>
                <v-list-item-action-text v-show="actifPlayer.ingame">
                  <v-chip>In Game</v-chip>
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4" v-show="playersDisplay.length > 0">
          <v-list>
            <v-list-item v-for="(player, i) in playersDisplay" :key="i">
              <v-list-item-icon>
                <v-icon v-show="player.pseudo == creator.pseudo"
                  >mdi-crown</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="player.pseudo"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text v-show="player.ready">
                  <v-chip color="success">Ready</v-chip>
                </v-list-item-action-text>
                <v-list-item-action-text
                  v-show="!player.ready && !player.ingame"
                >
                  <v-chip color="error">Not Ready</v-chip>
                </v-list-item-action-text>
                <v-list-item-action-text v-show="player.ingame">
                  <v-chip>In Game</v-chip>
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="4" class="mx-auto">
        <Sentence
          v-model="sentence"
          :text="sentence"
          :use="actifPlayer.pseudo == creator.pseudo"
          @changeSentence="changeSentence"
        ></Sentence>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-btn
          block
          dark
          color="cyan"
          @click="readyToggle()"
          v-show="!actifPlayer.ready"
        >
          Ready
        </v-btn>

        <v-btn
          block
          dark
          color="error"
          @click="readyToggle()"
          v-show="actifPlayer.ready"
        >
          Cancel
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import servicesAPI from "../services/api";
import Score from "../components/Score";
import Sentence from "../components/Sentence";
import Close from "../components/Close";

export default {
  name: "Game",
  components: {
    Score,
    Sentence,
    Close
  },
  data() {
    return {
      code: this.$route.params.code,
      pseudo: this.$route.params.pseudo,
      creator: {},
      players: [],
      playersDisplay: [],
      actifPlayer: null,
      sentence: "",
      ajax: {}
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
          this.players = response.players;
          this.playersDisplay = response.players.filter(el => {
            return el.pseudo !== this.pseudo;
          });
          this.actifPlayer = response.players.find(el => {
            return el.pseudo === this.pseudo;
          });
          this.sentence = response.sentence;
          localStorage.sentence = this.sentence;

          let tab = this.players.filter(el => {
            return !el.ready;
          });
          if (tab.length === 0) {
            servicesAPI.inGame(this.pseudo, this.code).then(response => {
              this.$emit("message", response.message);
              clearInterval(this.ajax);
              this.$router.push({
                name: "Record",
                params: { code: this.code, pseudo: this.pseudo }
              });
            });
          }
        })
        .catch(error => {
          console.log(error.response.data.error);
          clearInterval(this.ajax);
          this.$emit("error", error.response.data.error);
        });
    },

    leave: function() {
      servicesAPI
        .leaveGame(this.pseudo, this.code)
        .then(response => {
          console.log(response);
          this.backHome();
          this.$emit("message", response.message);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    },

    backHome: function() {
      clearInterval(this.ajax);
      this.$router.push({ name: "Home" });
    },

    readyToggle: function() {
      servicesAPI
        .ready(this.pseudo, this.code)
        .then(response => {
          console.log(response);
          this.$emit("message", response.message);
        })
        .catch(error => {
          console.log(error);
        });
    },

    changeSentence: function(str) {
      servicesAPI
        .changeSentence(this.pseudo, this.code, str)
        .then(response => {
          this.$emit("message", response.message);
          this.sentence = str;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
