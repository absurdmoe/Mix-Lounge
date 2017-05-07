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
import $ from "jquery"

$(function() {
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

    //Soundcloud Api Widget
    (function(){
      let widgetIframe = document.getElementById('sc-widget'),
          widget       = SC.Widget(widgetIframe);

      widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.PLAY, function() {
          // get information about currently playing sound
          widget.getCurrentSound(function(currentSound) {
            console.log('sound ' + currentSound.get('') + 'began to play');
          });
        });
        // get current level of volume
        widget.getVolume(function(volume) {
          console.log('current volume value is ' + volume);
        });
        // set new volume level
        widget.setVolume(50);
        // get the value of the current position
      });

    }());


    let rockArrPlayllist = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/301080731","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/151673651","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/166373421"];
    let hiphopArrPlaylist = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/121610443","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/117265791","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/144919148"];
    let reggaeArrPlaylist = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/182509432","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/3390956","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/83035406"];
    let houseArrPlaylist = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/104226047","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/187820200","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/63243864"];

    let userSearchInput;
    $("#submitPlist").click(function(e){
        e.preventDefault();
        alert("Hey")
        userSearchInput = $('#search').val();
        console.log(userSearchInput);
        selectPlaylist();
    });

    let selectPlaylist = function() {
       if(userSearchInput==="rock") {
         let randRockPlaylist = rockArrPlayllist[Math.floor(Math.random() * rockArrPlayllist.length)];
         $("#sc-widget").attr("src", randRockPlaylist);
       } else if (userSearchInput==="hip-hop") {
         let randHiphopPlaylist = hiphopArrPlaylist[Math.floor(Math.random() * hiphopArrPlaylist.length)];
         $("#sc-widget").attr("src", randHiphopPlaylist);
       } else if (userSearchInput==="reggae") {
         let randReggaePlaylist = reggaeArrPlaylist[Math.floor(Math.random() * reggaeArrPlaylist.length)];
         $("#sc-widget").attr("src", randReggaePlaylist);
       } else if (userSearchInput==="house") {
         let randHousePlaylist = houseArrPlaylist[Math.floor(Math.random() * houseArrPlaylist.length)];
         $("#sc-widget").attr("src", randHousePlaylist);
       } else {
         alert("Please enter one of the listed above music genres and try again!")
       }
    }
// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
