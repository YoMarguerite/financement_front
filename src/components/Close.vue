<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="error"
        fab
        dark
        x-small
        absolute
        top
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Do you want to leave the game ?
      </v-card-title>
      <v-card-actions>
        <v-btn color="success" dark @click="close()">
          Yes
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" dark @click="dialog = false">
          No
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
  },
  methods: {
    close: function() {
      this.$emit("leave");
      this.dialog = false;
    }
  }
};
</script>
