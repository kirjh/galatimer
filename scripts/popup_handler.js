/******************************************************************************
  Podoro - Pomodoro timer, built into your browser
  Copyright (C) 2023-Present  Kirjh

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
******************************************************************************/

export { toggleHandler, toggleTools, sendMessage, updateInput, menuHandler, actionHandler, inputChange, increaseAlarmLength, updateProgress };

import { alarmExists, createAlarm } from "./alarms.js";

/*****************************************************************************/

//  @param:  (string) parameter of the request
const sendMessage = (param) => {
  chrome.runtime.sendMessage({backendRequest: param})
    .catch((e) => {console.log(`[${e}]\n Likely popup is not active`)});
}

/*****************************************************************************/

const toggleTools = () => {
  const header = document.getElementsByClassName("tabheadtools")[0];
  const menu = document.getElementsByClassName("tools")[0];

  menu.classList.toggle("show");
  header.classList.toggle("hideborder");
  
}

/*****************************************************************************/

//  @button:  (DOM object) menu button
const toggleHandler = (button) => {
  switch (button.id) {
    case "toggletheme":
      sendMessage("theme");
      break;
    case "toggleSize":
      sendMessage("togglesize");
      break;
    case "toggleAuto":
      sendMessage("toggleauto");
      break;
    default:
      break;
  }
}

/*****************************************************************************/

//  @button:  (DOM object) menu button
//  @args:    (array)      arguments
const actionHandler = (button, args) => {
  switch (button.id) {
    case "theme":
      sendMessage("theme");
      break;
    case "reset":
      sendMessage("setCounter")
      createAlert("Reseting number of pomodoros completed");
      break;
    case "increment":
      increaseAlarmLength();
      break;
    case "block": 
      toggleBlock();
    default:
      break;
  }
}

/*****************************************************************************/

//  @button:  (DOM object) menu button
const menuHandler = (button) => {
  const container = document.getElementsByClassName("togglecontainer")[0];
  const tab = document.getElementById(button.id + "tab");
  const togglebuttonList = document.getElementsByClassName("darktoolicon");
  
  if (button.id == "help") {
    chrome.tabs.create({"url": "https://github.com/kirjh/podoro/wiki"});
    return;
  }

  const tabOpened = toggleTab(tab, "flex");
  toggleTab(container, "flex", tabOpened);
  

  for (const togglebutton of togglebuttonList) {
    if (togglebutton.classList.contains("activeicon")) {
      const tab = document.getElementById(togglebutton.id + "tab");
      toggleTab(tab, "none", true);
    }
    togglebutton.classList.remove("activeicon");
  }
  
  if (tabOpened) button.classList.add("activeicon");
}

/*****************************************************************************/

//  @msg:             (string)  message to pass onto the user
//  @alarmMustExist:  (boolean) toggle whether an active alarm must exist     
const createAlert = async (msg, alarmMustExist=false) => {
  const existingAlert = document.getElementById("helppopup");
  const alarm = await alarmExists();
  if (alarmMustExist && !alarm) return;
  if (existingAlert) existingAlert.remove();

  const dropDownButton = document.getElementById("maincontainer");
  dropDownButton.insertAdjacentHTML("beforeend", 
    `
    <div id="helppopup">
      <span>${msg}</span>
      <button id="closealert" type="button">&#215;&#xFE0E;</button>
    </div>
    `
  );
  const alertButton = document.getElementById("closealert");
  alertButton.addEventListener("click", () => {
    document.getElementById("helppopup").remove();
  });
}

/*****************************************************************************/

//  @element:    (DOM object) element
//  @display:    (string)     display property
//  @forceDisplay:  (boolean)    force display property 
//
//  Returns: true if tab was opened, false otherwise
const toggleTab = (element, display, forceDisplay = false) => {
  if (forceDisplay || !element.style.display || element.style.display == "none") {
    element.style.display = display;
    return true;
  }
  element.style.display = "none";
  return false;
}

/*****************************************************************************/

//  @theme:  (boolean) theme is light
const changeTheme = (theme) => {
  const colour = document.querySelector(":root");
  const button = document.getElementById("theme");
  const toggle = document.getElementById("toggletheme");

  if (theme) {
    //button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svgicon" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`;
    toggle.checked = false;
    colour.style.setProperty("--background", "#e2dbd7");
    colour.style.setProperty("--tabBG", "#fff");
    colour.style.setProperty("--border", "#777574");
    colour.style.setProperty("--fontText", "#5b5a59");
    colour.style.setProperty("--fontSubtext", "#777574");

  } else {
    //button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="svgicon" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z"/></svg>`;
    toggle.checked = true;
    colour.style.setProperty("--background", "#2b2827");
    colour.style.setProperty("--tabBG", "#454545");
    colour.style.setProperty("--border", "#99928f");
    colour.style.setProperty("--fontText", "#fff");
    colour.style.setProperty("--fontSubtext", "#99928f");
  }
  
  return;
}

/*****************************************************************************/

//  @inputListItem:  (DOM object) input
const inputChange = (inputListItem) => {
  const input = document.getElementById(inputListItem.id);

  input.value = (isNaN(parseFloat(input.value))) ? input.min : Math.round(parseFloat(input.value));
  if (input.value < parseInt(input.min)) input.value = parseInt(input.min);
  if (input.value > parseInt(input.max)) input.value = parseInt(input.max);

  chrome.storage.local.set({[input.id] : input.value})
  if (input.id != "pomointerval") {
    createAlert("Changes will be applied to your next session", true);
  }
  input.blur();
}

/*****************************************************************************/

//  @key    (string) input 
//  @value  (string) new value of input
const updateInput = (key, value) => {
  const input = document.getElementById(key);
  input.value = value;
}

/*****************************************************************************/

// Chrome API does not allow changes to be made to alarms, so
// the original alarm must be deleted and replaced with a new alarm.
const increaseAlarmLength = async () => {
  const alarm = await alarmExists();
  const alarmLength = await chrome.storage.local.get("currentAlarm").then((r) => {return r.currentAlarm});

  if (!alarm || alarm.paused) {
    createAlert("Cannot adjust time when there are no active sessions");
    return;
  }

  let time = (alarm.scheduledTime-Date.now());
  await chrome.alarms.clear(alarm.name);
  
  if (time + 60000 < alarmLength * 60000) {
    time += 60000
  } else {
    createAlert("Cannot adjust time past the session's original length");
  }
  if (time < 60000) time = 60000;

  createAlarm(alarm.name, time/60000)
}

/*****************************************************************************/

const toggleBlock = () => {
  createAlert("Error: function not implemented");
}

/*****************************************************************************/

//  @intervalLength:  (number) long break interval
const updateProgress = async (intervalLength = null) => {
  if (!intervalLength) {
    const storage = await chrome.storage.local.get("pomointerval");
    intervalLength = storage.pomointerval;
  }
  const progressBar = document.getElementById("currentprogress");
  const sessionStorage = await chrome.storage.session.get("pomocount");
  const alarm = await alarmExists();
  if (!alarm) {
    progressBar.style.width = "0%";
    return;
  }
  if (alarm.name == "pomobreaklong") {
    progressBar.style.width = "100%";
    return;
  }
  const progress = ((sessionStorage.pomocount % intervalLength) / intervalLength) * 100;
  progressBar.style.width = `${progress}%`;
}

/*****************************************************************************/