<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        rounded
        dark
        block
        color="amber accent-4"
        v-if="use"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
        {{ str.length > 20 ? str.substring(0, 20) + "..." : str }}
      </v-btn>
      <v-btn rounded dark block color="amber accent-4" v-if="!use">
        {{ str.length > 20 ? str.substring(0, 20) + "..." : str }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        Personnalise the sentence
      </v-card-title>
      <v-card-text>
        <v-text-field label="Sentence" v-model="str"> </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" dark @click="changeSentence()">
          Good !
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" dark @click="dialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    text: String,
    use: Boolean
  },
  data() {
    return {
      dialog: false,
      str: this.text
    };
  },
  methods: {
    changeSentence() {
      this.$emit("changeSentence", this.str);
      this.dialog = false;
    }
  },
  watch: {
    text: function(newVal, oldVal) {
      console.log("Props text have changed " + oldVal + " to " + newVal);
      this.str = newVal;
    }
  }
};
</script>
