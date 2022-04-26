/* eslint-disable no-console */

/*
RegisterServiceWorker code was reused from the following tutorial by Trevor Wong
https://medium.com/@stephen.trevor.wong/3-steps-to-add-pwa-to-vue-js-in-2020-9f9daa56f9
*/

import { Workbox } from "workbox-window";
let wb;
if ("serviceWorker" in navigator) {
  wb = new Workbox(`${process.env.BASE_URL}service-worker.js`);
  wb.addEventListener("controlling", () => {
    window.location.reload();
  });
  wb.register();
} else {
  wb = null;
}
export default wb;