// ==UserScript==
// @name         Weather Channel
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block the adblock blocker
// @author       Karsten Rabe <https://github.com/krab7191>
// @match        https://weather.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  let timer;

  function deleteVeilNodes() {
    const msgNodes = document.querySelectorAll('div[style="display: block;"]');
    const veilNodes = document.querySelectorAll('div[style="display: block"]');
    const nodeArr = [...Array.from(msgNodes), Array.from(veilNodes)];
    nodeArr.forEach(node => {
      const clx = node.className;
      if (clx && (clx.includes('sp_message') || clx.includes('sp_veil'))) {
        node.parentElement.removeChild(node);
      }
      if (!clx) {
        const veil = document.querySelector('div[style="display: block"]');
        veil.parentElement.removeChild(veil);
      }
    });
  }
  function makeBodyScrollable() {
    const bod = document.querySelector('body');
    bod.style.overflowY = 'auto';
  }

  timer = window.setInterval(() => {
    console.log('Adblock blocker blocker is running...');
    const spVeil = document.querySelectorAll('div[style="display: block"]');
    if (spVeil.length > 0 && spVeil[0].className.includes('sp_veil')) {
      deleteVeilNodes();
      makeBodyScrollable();
    } else {
      window.clearTimeout(timer);
      console.log('Adblock block blocking finished!');
    }
  }, 3000);
})();
