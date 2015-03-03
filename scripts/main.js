this.de2ra = function(degree)   { return degree*(Math.PI/180); }

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
var cubeCamera = new THREE.CubeCamera(1,300,512);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;
document.body.appendChild( renderer.domElement );

var geometry = new THREE.CircleGeometry(200,32);
var material = new THREE.MeshPhongMaterial();
var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.rotation.set(de2ra(-90),0,0);

var lightR = new THREE.SpotLight(0xffaaaa,1,200);
var lightG = new THREE.SpotLight(0xaaffaa,1,200);
var lightB = new THREE.SpotLight(0xaaaaff,1,200);
var lightW = new THREE.SpotLight(0xffffff,1,200);
lightR.castShadow = true;
lightG.castShadow = true;
lightB.castShadow = true;
lightR.shadowDarkness = 0.1;
lightG.shadowDarkness = 0.1;
lightB.shadowDarkness = 0.1;
lightR.position.set(40,50,-20);
lightG.position.set(-40,50,-20);
lightB.position.set(0,50,60);
lightW.position.set(0,-90,0);

var ringGeometry        = new THREE.TorusGeometry(12,1,16,64);
var ringMaterial        = new THREE.MeshPhongMaterial();
ringMaterial.emissive   = new THREE.Color( 0x222111 );
ringMaterial.color      = new THREE.Color( 0xffff00 );
ringMaterial.specular   = new THREE.Color( 0xaaaaaa );
ringMaterial.shininess  = 30;
//ringMaterial.envMap     = cubeCamera.renderTarget;
var ring = new THREE.Mesh( ringGeometry, ringMaterial );
ring.castShadow = true;
ring.scale.set(1,1,3);
ring.position.y = 10;
ring.rotation.x = de2ra(90);
cubeCamera.position.copy( ring.position );

scene.add( plane );
scene.add( ring );
scene.add( cubeCamera );
scene.add( lightR );//scene.add( LightRHelper );
scene.add( lightG );
scene.add( lightB );
scene.add( lightW );

camera.position.set(0,20,-40);


var controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', render );

render();
animate();

function animate() {
    controls.update();
    requestAnimationFrame( animate );
}

function render() {
    cubeCamera.updateCubeMap(renderer, scene);
    renderer.render( scene, camera );
}