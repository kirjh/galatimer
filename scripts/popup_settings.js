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

export { changeTheme, toggleAuto };

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
    colour.style.setProperty("--fontText", "#302f2e");
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
const toggleAuto = (value) => {
  const toggle = document.getElementById("toggleauto");
  toggle.checked = value;
  return;
}