export {buttonToggle, menuToggle, inputChange};

import { createTimer, clearTimers } from "./alarms.js";
import { updateTime } from "./time.js";

const updateTimeInputs = (inputList, boolean) => {
  for (const input of inputList) {
    const element = document.getElementById(input.id);
    
    if (element.title) element.removeAttribute("title");
    if (boolean) element.title="Cannot change time during an active session";

    element.disabled = boolean;
  }
  return;
}

const updateButton = (button, id, icon, title) => {
  button.innerHTML = `<i class=\"material-icons\">${icon}</i>`;
  button.id = id;
  button.title= title;
  return;
}

// Toggle play/pause button
const buttonToggle = async (button) => {
  let inputList = document.getElementsByClassName("timeinput");

  if (button.id == "init" || button.id == "stop") {
    clearTimers();
    updateButton(button, "start", "play_arrow", "Start session");
    updateTimeInputs(inputList, false);
    updateTime();
    return;
  }
  if (button.id == "start") await createTimer();

  updateButton(button, "stop", "stop", "Stop session");
  updateTimeInputs(inputList, true);
  updateTime();
  return;
}

// Toggle between menus
const menuToggle = (button) => {
  button.id = (button.id == "down") ? "up" : "down";
  button.innerHTML = (button.id == "up") ? "Less &#9206;&#xFE0E;" : "More &#9207;&#xFE0E;";

  let div = document.getElementsByClassName("innermenu")[0];

  div.classList.toggle("innermenushow");
  return;
}

// Updates input
// First converts input.value to a valid number
// Then reflects value change to alarms
const inputChange = (inputListItem) => {
  let input = document.getElementById(inputListItem.id);
  input.value = (isNaN(parseFloat(input.value))) ? input.value = input.min : Math.round(parseFloat(input.value));
  if (input.value < parseInt(input.min)) input.value = parseInt(input.min);
  if (input.value > parseInt(input.max)) input.value = parseInt(input.max);

  chrome.storage.local.set({[input.id] : input.value})
  return;
}