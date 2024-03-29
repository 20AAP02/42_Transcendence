import {defineStore} from "pinia";
import {Ref, ref} from "vue";
import {io, Socket} from "socket.io-client";
import { useRouter } from "vue-router";
import { apiURI } from "@/utils";


export const useGameStore = defineStore("game", () => {
  const isSpectator = ref(false);
  const score: Ref<Map<string, number>> = ref(new Map());
  score.value.set('paddle1', 0);
  score.value.set('paddle2', 0);
  const canvasHeight = ref(700);
  const canvasWidth = ref(1000);
  const socket: Ref<Socket> = ref(null as any);
  const router = useRouter();
  const roomsList: Ref<string[]> = ref([]);
  const playersList: Ref<string[]> = ref([]);
  const roomNumber = ref(0);
  function connectSocket(token: string) {
    if (!socket.value && token.length > 0) {
      socket.value = io(`${apiURI}/play`);
      // const query = querystring.stringify({userId: userId, userName: username});
      socket.value.on("connect", () => {
        socket.value.emit("addPlayer", token);
      });
      socket.value.on("playerList", (players: string[]) => {
        playersList.value = players;
      });
      socket.value.on("spectator", (isSpectator) => {
        isSpectator.value = isSpectator;
      });
      socket.value.on("roomNumber", (number: number) => {
        roomNumber.value = number;
      });
    }
    return socket.value;
  }

  function disconnectSocket() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null as any;
    }
  }

  function getSocket(): Socket {
    return socket.value;
  }

  function goToGame(alertId: string | undefined = undefined) {
    const room = alertId
      ? alertId
      : "room " + roomNumber.value.toString();
      getSocket().
      emit("createRoom", { room: room, width: 850, height: 850*.7 });
    router.push("/game");
  }

  function joinRoom(room: string) {
    getSocket().emit("joinRoom", room);
    router.push("/game");
  }

  return {
    isSpectator,
    score,
    canvasHeight,
    canvasWidth,
	roomsList,
    connectSocket,
    disconnectSocket,
    getSocket,
	goToGame,
	joinRoom,
    playersList,
  }
});
