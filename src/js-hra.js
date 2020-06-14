var jednou = true;
var rx = 0;
var save = [];
save[0] = { x: 0, y: 0 };
var uloz = 0;
var takco = true;
var poradi;
var penize = 100;
var cena = 10;
var msg = "";
var ex = 19.5;
var ey = 19.5;

function render() {
  if (penize >= cena) {
    msg = "";
  } else {
    msg = "Nemáš dost peněz!";
  }
  document.getElementById("msg").innerHTML = msg;
  /*
  ctx.clearRect(Over(rx)-15,Over(rx)-16, 31, 31);
  Vykresli();
  ctx.strokeStyle = '#f9c618';
  rx++;
  ctx.fillRect(Over(rx)-15,Over(rx)-15,30,30);
  ctx.stroke();
  */
  // Enemy();
}
function Otestuj() {}
function Enemy() {
  ctx.clearRect(Over(rx) - 15, Over(rx) - 16, 31, 31);
  Vykresli();
  ctx.strokeStyle = "#f9c618";
  rx++;
  ctx.fillRect(Over(rx) - 15, Over(rx) - 15, 30, 30);
  ctx.stroke();
}
function Over(number) {
  var celecislo = 0;
  if (number > 39) {
    celecislo = Math.floor(number / 39);
    celecislo = celecislo * 39;
  } else celecislo = 0;

  return celecislo + 39 / 2;
}

function Pozice(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  Tower(Over(x), Over(y));
}
function Tower(tx, ty) {
  save[uloz] = { x: tx, y: ty };

  if (jednou) {
    jednou = false;
    takco = false;
  } else {
    var c;
    for (c = 0; c < uloz; c++) {
      if (save[c].x != tx || save[c].y != ty) {
        takco = false;
      } else {
        takco = true;
        poradi = c;
        break;
      }
    }
  }
  if (takco) {
    console.log("Toto pole je obsazené");
    save.pop();
    if (poradi == 0) {
      ctx.clearRect(Over(tx) - 15, Over(ty) - 16, 31, 31);
      //save.splice(poradi, 1);
      save[0] = { x: 0, y: 0 };
      penize = penize + 0.7 * cena;
      document.getElementById("penize").innerHTML = penize;
    } else {
      ctx.clearRect(Over(tx) - 15, Over(ty) - 16, 31, 31);
      Vykresli();
      save.splice(poradi, 1);
      uloz--;
      penize = penize + 0.7 * cena;
      document.getElementById("penize").innerHTML = penize;
    }
  } else {
    console.log("Toto pole je volné");
    if (cena <= penize) {
      uloz++;
      ctx.strokeStyle = "#f9c618";
      ctx.fillRect(tx - 15, ty - 15, 30, 30);
      ctx.stroke();
      penize = penize - cena;
      document.getElementById("penize").innerHTML = penize;
      msg = "";
    } else {
      msg = "Nemáš dost peněz!";
      save.splice(poradi, 1);
      uloz--;
    }
  }
}
function Vykresli() {
  var vel = 39;
  var i;
  for (i = vel; i < 390; i = i + vel) {
    ctx.beginPath();
    ctx.moveTo(3, i);
    ctx.lineTo(390, i);
    ctx.lineWidth = 1;

    ctx.strokeStyle = "#f9c618";
    ctx.stroke();
  }
  for (i = vel; i < 390; i = i + vel) {
    ctx.beginPath();
    ctx.moveTo(i, 3);
    ctx.lineTo(i, 390);
    ctx.lineWidth = 1;

    ctx.strokeStyle = "#f9c618";
    ctx.stroke();
  }
}

var canvas = document.getElementById("mujcanvas");
var ctx = canvas.getContext("2d");
Vykresli();

canvas.addEventListener("click", Pozice);

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

(function animloop() {
  requestAnimFrame(animloop);
  render();
})();
