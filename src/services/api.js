import axios from "axios";

const url = "https://voicerback.netlify.app/.netlify/functions/server/";

var response = function(res) {
  return res.data;
};

const servicesAPI = {
  createGame: function(pseudo) {
    let params = {
      pseudo: pseudo
    };
    return axios.post(url + "create", params).then(response);
  },

  joinGame: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "join", params).then(response);
  },

  getGame: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "getgame", params).then(response);
  },

  leaveGame: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "leave", params).then(response);
  },

  changeSentence: function(pseudo, code, sentence) {
    let params = {
      pseudo: pseudo,
      code: code,
      sentence: sentence
    };
    return axios.post(url + "sentence", params).then(response);
  },

  ready: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "ready", params).then(response);
  },

  inGame: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "ingame", params).then(response);
  },

  record: function(pseudo, code, record) {
    let params = {
      pseudo: pseudo,
      code: code,
      record: record
    };
    return axios.post(url + "record", params).then(response);
  },

  vote: function(pseudo, code, vote) {
    let params = {
      pseudo: pseudo,
      code: code,
      vote: vote
    };
    return axios.post(url + "vote", params).then(response);
  },

  reinit: function(pseudo, code) {
    let params = {
      pseudo: pseudo,
      code: code
    };
    return axios.post(url + "reinit", params).then(response);
  }
};

export default servicesAPI;
