<template>
  <div>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-btn rounded dark block color="amber accent-4">
          {{ sentence }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col sm="6" class="mx-auto">
        <v-card v-show="waiting">
          <v-card-title>
            Record will start in ...
          </v-card-title>
          <v-card-text class="text-center text-h3">
            <v-progress-circular
              :size="100"
              :width="10"
              indeterminate
              color="amber accent-4"
            >
              {{ value }}
            </v-progress-circular>
          </v-card-text>
        </v-card>

        <v-card v-show="recording">
          <v-card-title>
            Talk NOW ! You have {{ value }} seconds.
          </v-card-title>
          <v-card-text class="text-center">
            <v-btn fab dark x-large color="amber accent-4">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import servicesAPI from "../services/api";

export default {
  name: "Record",
  data() {
    return {
      api: servicesAPI,
      code: this.$route.params.code,
      pseudo: this.$route.params.pseudo,
      sentence: localStorage.sentence,
      value: 0,
      interval: {},
      waiting: true,
      recording: false
    };
  },
  mounted: function() {
    this.countdown(this.record, 5);
  },
  methods: {
    countdown: function(call, value) {
      this.value = value;
      this.interval = setInterval(() => {
        if (this.value === 0) {
          clearInterval(this.interval);
          call();
        } else {
          this.value -= 1;
        }
      }, 1000);
    },

    record: function() {
      let audioIN = { audio: true };
      let self = this;

      navigator.mediaDevices
        .getUserMedia(audioIN)
        .then(function(mediaStreamObj) {
          let mediaRecorder = new MediaRecorder(mediaStreamObj);

          let record = null;

          mediaRecorder.ondataavailable = function(ev) {
            record = ev.data;
          };

          mediaRecorder.onstop = function() {
            self.recording = false;

            var reader = new FileReader();
            reader.readAsDataURL(record);
            reader.onloadend = function() {
              var base64data = reader.result;
              self.api
                .record(self.pseudo, self.code, base64data)
                .then(response => {
                  console.log(response);
                  self.$router.push({
                    name: "Vote",
                    params: { code: self.code, pseudo: self.pseudo }
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            };
          };

          self.waiting = false;
          self.recording = true;
          mediaRecorder.start();
          self.countdown(function() {
            mediaRecorder.stop();
          }, 3);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
