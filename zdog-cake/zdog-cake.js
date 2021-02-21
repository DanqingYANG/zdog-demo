var illoElem = document.querySelector('.illo');
var sceneSize = 96;
var TAU = Zdog.TAU;
var ROOT3 = Math.sqrt(3);
var ROOT5 = Math.sqrt(5);
var PHI = ( 1 + ROOT5 ) / 2;
var isSpinning = true;
var viewRotation = new Zdog.Vector();
var displaySize;

// colors
var eggplant = '#636';
var garnet = '#C25';
var orange = '#E62';
var gold = '#EA0';
var yellow = '#ED0';
var white = '#fff';
var cf = '#cccfff';

var illo = new Zdog.Illustration({
  element: illoElem,
  scale: 2,
  resize: 'fullscreen',
  dragRotate: true,
  onResize: function( width, height ) {
    displaySize = Math.min( width, height );
    this.zoom = Math.floor( displaySize / sceneSize );
  },
});

// ----- base ----- //

var cylinder = new Zdog.Cylinder({
  diameter: 20,
  length: 6,
  addTo: illo,
  rotate: { x: TAU/4 },
  color: gold,
  backface: garnet,
  stroke: false,
});

let adjust_scale = 0.75;

var cylinder1 = cylinder.copy({
  addTo: illo,
  translate: { y: -6*adjust_scale },
  scale: adjust_scale,
  stroke:false,
  color: gold,
});

let adjust_scale2 = 0.55;

var cylinder2 = cylinder1.copy({
  addTo: illo,
  translate: { y: -6*adjust_scale-6*adjust_scale2 },
  scale: adjust_scale2,
  stroke:false,
  color: gold,
});

// ----- candle ----- //

let n = 8;
let r = 3;
let a = Math.PI*2;

for(let i = 0; i < n; i++)
{
( function() {

  var candle = new Zdog.Anchor({
    addTo: illo,
    translate: { x: r*Math.cos(i*a/n), y:-15, z: r*Math.sin(i*a/n)},
    scale: 0.5,
  });

  var cylinder_anchor = new Zdog.Anchor({
    addTo: candle,
    translate:{y:5},
  });

  // candle stick 

  new Zdog.Cylinder({
    diameter: 1.2,
    length: 8,
    addTo: cylinder_anchor,
    rotate: { x: TAU/4 },
    color: gold,
    backface: garnet,
    stroke: false,
  });

  
  // ----- octahedron ----- //

  var colorWheel = [ cf, orange, gold, yellow, white ];

  // radius of triangle with side length = 1
  var radius = ROOT3/2 * 2/3;
  var height = radius * 3/2;
  var tilt = Math.asin( 0.5 / height );

  [ -1, 1 ].forEach( function( ySide ) {
    for ( var i=0; i < 4; i++ ) {
      var rotor = new Zdog.Anchor({
        addTo: candle,
        rotate: { y: TAU/4 * (i + 1.5) * -1 },
      });

      var anchor = new Zdog.Anchor({
        addTo: rotor,
        translate: { z: 0.5 },
        rotate: { x: tilt * ySide },
        // scale: { y: -ySide },
      });

      new Zdog.Polygon({
        sides: 3,
        radius: radius,
        addTo: anchor,
        translate: { y: -radius/2 * ySide },
        scale: { y: ySide },
        stroke: false,
        fill: true,
        color: colorWheel[ i + 0.5 + 0.5*ySide ],
        backface: false,
      });
    }
  });
})();
}


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