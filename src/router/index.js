import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import Record from "../views/Record.vue";
import Vote from "../views/Vote.vue";
import Winner from "../views/Winner.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/game/:code/:pseudo",
    name: "Game",
    component: Game
  },
  {
    path: "/record/:code/:pseudo",
    name: "Record",
    component: Record
  },
  {
    path: "/vote/:code/:pseudo",
    name: "Vote",
    component: Vote
  },
  {
    path: "/winner/:code/:pseudo",
    name: "Winner",
    component: Winner,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
