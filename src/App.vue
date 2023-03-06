<template>
  <v-app style="background: lightblue">
    <v-container>
      <v-row class="mb-4">
        <v-col sm="6" class="mx-auto">
          <img src="./assets/title.png" style="max-width: 100%" />
        </v-col>
      </v-row>
      <div class="text-center">
        <v-snackbar v-model="alert" :timeout="3000">
          {{ alertMessage }}

          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="alert = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-dialog v-model="error" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">
            {{ errorMessage }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="mx-auto" color="cyan" dark @click="goHome()">
              Exit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <router-view
        @error="displayError"
        @message="displayMessage"
      ></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      alert: false,
      alertMessage: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    displayMessage: function(message) {
      this.alert = true;
      this.alertMessage = message;
    },
    displayError: function(message) {
      this.error = true;
      this.errorMessage = message;
    },
    goHome: function() {
      this.error = false;
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
