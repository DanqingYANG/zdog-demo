// zdog-demo.js

// create illo
let illo = new Zdog.Illustration({
  // set canvas with selector
  element: '.zdog-canvas',
  dragRotate: true,
});

let TAU = Math.PI * 2;

var white = '#FFF';
var blue = '#000066';
var darkblue = '#000033';
var gold = '#FFFFCC';

let dome = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 820,
  // fill enabled by default
  // disable stroke for crisp edge
  stroke: false,
  color: blue,
  backface: darkblue,
  rotate: { x: -TAU/4 },
  translate: { y: 1 },
  
});


let box2 = new Zdog.Box({
  addTo: illo,
  width: 380,
  height: 80,
  depth: 10,
  stroke:10,
  translate: { y: -50, z: -80  },
  stroke: false,
  color: 'url("#gradientA")', // default face color
});


let box = new Zdog.Box({
  addTo: illo,
  width: 30,
  height: 50,
  depth: 30,
  translate: { y: -25},
  stroke: false,
  color: '#C25', // default face color
  leftFace: '#EA0',
  rightFace: '#E62',
  topFace: '#ED0',
  bottomFace: '#636',
});





// add circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80,
  // position closer
  stroke: 2,
  color: 'url("#gradientA")',
  fill:true,
  translate: { y: -80, z: -70  },
});


new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 120,
  translate: { y: -60 },
  stroke: 1,
  color: white,
  fill: false,
});

new Zdog.Rect({
  addTo: illo,
  width: 160,
  height: 200,
  translate: { y: -100, z: 100  }, 
  stroke: 1,
  color: white,
  fill: false,
});

new Zdog.Rect({
  addTo: illo,
  width: 320,
  height: 300,
  translate: { y: -150, z: 200  },
  stroke: 1,
  color: white,
  fill: false,
});

// // ----- stars ----- //
// var layerSpace = 56;
// var starA = new Zdog.Shape({
//   path: [
//     { x: 0, y: -4 },
//     { arc: [
//       { x: 0, y: 0 },
//       { x: 4, y: 0 },
//     ]},
//     { arc: [
//       { x: 0, y: 0 },
//       { x: 0, y: 4 },
//     ]},
//     { arc: [
//       { x: 0, y: 0 },
//       { x: -4, y: 0 },
//     ]},
//     { arc: [
//       { x: 0, y: 0 },
//       { x: 0, y: -4 },
//     ]},
//   ],
//   addTo: illo,
//   translate: { x: -150, y: -150, z: layerSpace*-1.5 },
//   color: gold,
//   stroke: 2,
//   fill: true,
// });
// starA.copy({
//   rotate: { y: TAU/4 },
// });

// var starB = starA.copy({
//   translate: { x: 142, y: -150, z: -layerSpace*0.5 },
// });
// starB.copy({
//   rotate: { y: TAU/4 },
// });



// ----- animate ----- //

function animate() {
  // rotate illo each frame
  illo.rotate.y += 0.01;
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}
// start animation
animate();

// update & render
illo.updateRenderGraph();


// ----- drag ----- //

let dragStartRX, dragStartRY;
let minSize = Math.min( canvasWidth, canvasHeight );

// add drag-rotatation with Dragger
new Zdog.Dragger({
  startElement: canvas,
  onDragStart: function() {
    isSpinning = false;
    dragStartRX = scene.rotate.x;
    dragStartRY = scene.rotate.y;
  },
  onDragMove: function( pointer, moveX, moveY ) {
    scene.rotate.x = dragStartRX - ( moveY / minSize * TAU );
    scene.rotate.y = dragStartRY - ( moveX / minSize * TAU );
  },
});

