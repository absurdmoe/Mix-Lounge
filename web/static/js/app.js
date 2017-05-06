// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import {Socket,Presence} from "phoenix"

let user = document.getElementById('user').innerText;
let socket = new Socket("/socket", {params: {user: user}})
socket.connect()

let presence = {}
let formatedTimestamp = (Ts) => {
  let date = new Date(Ts)
  return date.toLocaleString()
}

let listBy = (user, {metas: metas}) => {
  return {
    user: user,
    onlineAt: formatedTimestamp(metas[0].online_at)
  }
}

let userlist = document.getElementById('userlist');
let render = (presences) => {
  userlist.innerHTML = Presence.list(presences, listBy)
  .map(presence => `
    <li>
     <strong>${presence.user}</strong>
     <br>
     online at: ${presence.onlineAt}
     </li>
    `)
    .join("")
}




let room = socket.channel("room:lobby")
room.on("presence_state", state => {
  presence = Presence.syncState(presence,state)
  render(presence)
})
room.on("presence_diff", diff => {
  presence = Presence.syncDiff(presence, diff)
  render(presence)
})

room.join()
// after you join the room

let messageInput = document.getElementById("newMessage");
let messagelist = document.getElementById("messagelist");
let chat = document.getElementById('chatx');
chat.addEventListener("submit",function(e){
  e.preventDefault();
  room.push("message:new",messageInput.value);
  console.log(messageInput.value)

})
room.on("message:new",function(message){
  // renderMessage(message);
  console.log(message.body)
  let listitem = document.createElement('li');
  listitem.innerText = message.body
  messagelist.appendChild(listitem)

})

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
