import { testModule } from "./common.js";
import "../scss/app.scss";
import imgFile from '@/assets/img/example2.jpg';;

document.addEventListener("DOMContentLoaded", function(event) {
    testModule();

    // Test path resolving
    const img = document.createElement('img');
    img.src = imgFile;
    document.querySelector("body").append(img);
});
