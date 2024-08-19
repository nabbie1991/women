window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
  canvasApp();
}

function canvasSupport() {
  return Modernizr.canvas;
}

function canvasApp() {
  if (!canvasSupport()) {
    return;
  }

  var message = "Feminist Femme Noir";

  var theCanvas = document.getElementById("canvas");
  var context = theCanvas.getContext("2d");

  function drawScreen() {
    //Background

    context.fillStyle = "white";
    context.fillRect(0, 0, theCanvas.width, theCanvas.height);
    context.strokeStyle = "black";
    context.strokeRect(2, 2, theCanvas.width - 5, theCanvas.height - 5);

    //Text

    context.font = "32px impact";
    context.textAlign = "center";
    context.textBaseline = "center";

    var metrics = context.measureText(message);
    var textWidth = metrics.width;
    var xPosition = theCanvas.width / 2;
    var yPosition = theCanvas.height / 1.7;

    var gradient = context.createLinearGradient(
      theCanvas.width / 2,
      0,
      theCanvas.width / 2,
      theCanvas.height
    );
    for (var i = 0; i < colorStops.length; i++) {
      var tempColorStop = colorStops[i];
      var tempColor = tempColorStop.color;
      var tempStopPercent = tempColorStop.stopPercent;
      gradient.addColorStop(tempStopPercent, tempColor);
      tempStopPercent += 0.01;
      if (tempStopPercent > 1) {
        tempStopPercent = 0;
      }
      tempColorStop.stopPercent = tempStopPercent;
      colorStops[i] = tempColorStop;
    }

    context.fillStyle = gradient;
    context.fillText(message, xPosition, yPosition);
  }

  function myFirstRender() {
    requestAnimationFrame(myFirstRender);
    drawScreen();
  }

  var colorStops = new Array(
    {
      color: "#FF0000",
      stopPercent: 0,
    },
    {
      color: "#FFFF00",
      stopPercent: 0.125,
    },
    {
      color: "#00FF00",
      stopPercent: 0.375,
    },
    {
      color: "#0000FF",
      stopPercent: 0.625,
    },
    {
      color: "#FF00FF",
      stopPercent: 0.875,
    },
    {
      color: "#FF0000",
      stopPercent: 1,
    }
  );

  myFirstRender();
}
