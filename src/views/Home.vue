<template>
  <div>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4">
          <v-card-text>
            <v-text-field
              color="blue"
              label="Pseudo"
              prepend-inner-icon="mdi-pencil"
              outlined
              shaped
              v-model="pseudo"
              :error="pseudoError"
              :error-messages="
                pseudoError ? ['You need a pseudo to play.'] : []
              "
            ></v-text-field>

            <v-btn
              block
              dark
              color="cyan"
              v-show="!permission"
              @click="createGame"
              >Create Game
              <CreateInfo></CreateInfo>
            </v-btn>

            <PermissionBlocked :show="permission === true"></PermissionBlocked>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card elevation="4">
          <v-card-text>
            <v-text-field
              color="blue"
              label="GameCode"
              prepend-inner-icon="mdi-gamepad-variant"
              outlined
              shaped
              v-model="code"
              :error="codeError"
              :error-messages="
                codeError ? ['You need code to join a game.'] : []
              "
            ></v-text-field>

            <v-btn
              block
              dark
              color="cyan"
              v-show="!permission"
              @click="joinGame"
              >Join Game
              <JoinInfo></JoinInfo>
            </v-btn>

            <PermissionBlocked :show="permission"></PermissionBlocked>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <Rules></Rules>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CreateInfo from "../components/CreateInfo";
import JoinInfo from "../components/JoinInfo";
import PermissionBlocked from "../components/PermissionBlocked";
import Rules from "../components/Rules";
import servicesAPI from "../services/api";

export default {
  name: "Home",
  components: {
    CreateInfo,
    JoinInfo,
    PermissionBlocked,
    Rules
  },
  data() {
    return {
      api: servicesAPI,
      pseudo: "",
      pseudoError: false,
      code: "",
      codeError: false,
      permission: false,
      createLoad: false,
      joinLoad: false
    };
  },
  mounted: function() {
    if (localStorage.pseudo) {
      this.pseudo = localStorage.pseudo;
    }
  },
  methods: {
    askPermission: function() {
      let audioIN = { audio: true };
      return navigator.mediaDevices.getUserMedia(audioIN);
    },

    createGame: function() {
      this.pseudoError = !this.pseudo.length > 0;
      if (!this.pseudoError && !this.createLoad) {
        this.createLoad = true;
        this.askPermission()
          .then(() => {
            this.api
              .createGame(this.pseudo)
              .then(response => {
                console.log(response);
                this.$emit("message", response.message);
                this.localSave(this.pseudo, response.code);
                this.$router.push({
                  name: "Game",
                  params: { code: response.code, pseudo: this.pseudo }
                });
              })
              .catch(error => {
                console.log(error);
                this.createLoad = false;
              });
          })
          .catch(error => {
            console.log(error);
            this.permission = true;
          });
      }
    },

    joinGame: function() {
      this.pseudoError = !this.pseudo.length > 0;
      this.codeError = !this.code.length > 0;
      if (!this.pseudoError && !this.codeError && !this.joinLoad) {
        this.joinLoad = true;
        this.code = this.code.trim();
        this.askPermission().then(() => {
          this.api
            .joinGame(this.pseudo, this.code)
            .then(response => {
              this.$emit("message", response.message);
              this.localSave(this.pseudo, response.code);
              this.$router.push({
                name: "Game",
                params: { code: response.code, pseudo: this.pseudo }
              });
            })
            .catch(error => {
              console.log(error);
              this.joinLoad = false;
            });
        });
      }
    },

    localSave: function(pseudo, code) {
      localStorage.pseudo = pseudo;
      localStorage.code = code;
    }
  }
};
</script>
