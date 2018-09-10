$(document).ready(function(){

  var canvas = document.getElementById('drawing');

  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;

  var FirstClickX ;
  var FirstClickY ;

  // console.log($(".rules"));

  $(".rules").mousedown(function(e){

    $(".circle").show();

  });

  $(".rules").mouseup(function(e){

    $(".circle").hide();

  });

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var radius = 5;
    drawGrid(radius);

    $(".grid").click(function(e){
      $(".circle").hide();
    });

    $("circle").click(function(e){

      // console.log(e.pageX, "X coordinate");
      // console.log(e.pageY, "Y coordinate");

      if (!FirstClickX){
        FirstClickX = e.pageX-e.offsetX+radius;
        FirstClickY = e.pageY-e.offsetY+radius;
        console.log(FirstClickX, "first click x")
      }

      else{
        drawLine(FirstClickX,FirstClickY,e.pageX-e.offsetX+radius,e.pageY-e.offsetY+radius)
        FirstClickX = null
        FirstClickY = null
      }

    });


  }

  function drawLine (x1, y1, x2, y2) {
    ctx.strokeStyle = "#606060";
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke(); //set color and stroke size here//

  }

  function drawCircle(radius) {
    var div = document.createElement('div');
    $('.grid').append(div);

    var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute("height", radius * 2);
    svg1.setAttribute("width", radius * 2);
    div.appendChild(svg1);

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", radius);
    circle.setAttribute("cy", radius);
    circle.setAttribute("r", radius);
    svg1.appendChild(circle);
  }

  function drawGrid(radius) {
    var circleAmount = window.outerWidth*window.outerHeight/400
    // console.log(circleAmount, "circle amount");
    for (var i = 0; i < circleAmount; i++) {
      drawCircle(radius);
    }
  }

  // function save(){
  $(".save").click(function(e){
    document.getElementById("gallery").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("gallery").src = dataURL;
    document.getElementById("gallery").style.display = "inline";
    console.log(dataURL, 'saved');
  });
  // }

});
