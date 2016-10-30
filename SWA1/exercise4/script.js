window.onload =  function init() {
    "use strict";
    var canvas = document.getElementById("canvas"),
        ctx = document.getElementById("canvas").getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(225, 225);
    ctx.lineTo(275, 225);
    ctx.moveTo(225, 225);
    ctx.lineTo(200, 275);
    ctx.lineTo(300, 275);
    ctx.lineTo(275, 225);
    ctx.stroke();
    
    ctx.rotate(45 * Math.PI / 180);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(200, 50, 80, 80);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(50, -40);
    ctx.lineTo(0, 20);
    ctx.moveTo(0, 20);
    ctx.lineTo(60, -20);
    
    ctx.stroke();
};