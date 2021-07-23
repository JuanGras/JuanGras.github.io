//import './style.css'
import  * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { STLLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/STLLoader.js';
const scene = new THREE.Scene();
var impellerstl;
var shaftstl;
var motorstl;
var textostl;




const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(-20);
camera.position.setX(100);
camera.position.setY(0); 






const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(20,40,40)

const pointlight2 = new THREE.PointLight(0xffffff)
pointlight2.position.set(20,40,-180)
const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight, ambientlight)


const spacetexture = new THREE.TextureLoader().load('lateral.jpg');
scene.background = spacetexture


/* Sets the gears into the scene */
const loader = new STLLoader();
const material2 = new THREE.MeshPhongMaterial( { color: 0x617EBA, specular: 0x111111, shininess: 0 } );
const material4 = new THREE.MeshPhongMaterial( { color: 0x101a4f, specular: 0x111111, shininess: 0 } );
const material5 = new THREE.MeshPhongMaterial( { color: 0x3e3e45, specular: 0x111111, shininess: 0 } );
const material6 = new THREE.MeshPhongMaterial( { color: 0x485e75, specular: 0x111111, shininess: 0 } );
const material7 = new THREE.MeshPhongMaterial( { color: 0x0d0a30, specular: 0x111111, shininess: 0 } );

let pumpstl
let ypos = -20
loader.load( 'pump2.STL', function ( geometry ) {
  pumpstl = new THREE.Mesh( geometry, material4 );
  pumpstl.position.set( -0, ypos, -140);
  scene.add( pumpstl);
} );


loader.load( 'texto.STL', function ( geometry ) {
  textostl = new THREE.Mesh( geometry, material7 );
  textostl.position.set( -0, ypos, -140);
  scene.add( textostl);
  
} );


loader.load( 'impeller2.stl', function ( geometry ) {
  impellerstl = new THREE.Mesh( geometry, material2 );
  impellerstl.position.set( -0, ypos, -160);
  scene.add( impellerstl);
} );


loader.load( 'shaft.stl', function ( geometry ) {
  shaftstl = new THREE.Mesh( geometry, material5 );
  shaftstl.position.set( -0, ypos, -197);
  shaftstl.rotation.y = Math.PI/2 ;
  shaftstl.rotation.x = Math.PI/2 ;
  //pumpstl.rotation.x = Math.PI / 6;
  scene.add( shaftstl);
} );


loader.load( '../motorcontapa.stl', function ( geometry ) {
  motorstl = new THREE.Mesh( geometry, material6 );
  motorstl.position.set( -0, ypos, -179);
  
  scene.add( motorstl);

  render();
} );


//Función para que el canvas se actualice cuando la ventana cambia de tamaño
window.onresize = onWindowResize;
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//Función para rotar la cámara on scroll
var matrix = new THREE.Matrix4(); // Pre-allocate empty matrix for performance. Don't want to make one of these every frame.
var speed = 0.03;
document.body.onscroll = function(e) {
  // print "false" if direction is down and "true" if up
  if(this.oldScroll > this.scrollY){
    if(camera.position.z>-15){
      
      matrix.makeRotationY(speed);
      // Apply matrix like this to rotate the camera.
      camera.position.applyMatrix4(matrix);
    }
    else{
      camera.translateX(.4);
    }
    
  
    // Make camera look at the box.
    let y = pumpstl.position.y + 25
    console.log(y)
    let vector = new THREE.Vector3( pumpstl.position.x,y, pumpstl.position.z);
    // Make camera look at the box.
    camera.lookAt(vector);   
  }
  else{
    //scroll hacia abajo

    if(camera.position.z>-15){
      
      matrix.makeRotationY(-speed);
      // Apply matrix like this to rotate the camera.
      camera.position.applyMatrix4(matrix);
    }
    else{
      camera.translateX(-.4);
    }
    let y = pumpstl.position.y + 25
    console.log(y)
    let vector = new THREE.Vector3( pumpstl.position.x,y, pumpstl.position.z);
    // Make camera look at the box.
    camera.lookAt(vector); 

  }
  this.oldScroll = this.scrollY;
}

function render() {
  requestAnimationFrame(render);
 
  //En realidad esta función debería estar dentro de animate o viceversa
  impellerstl.rotation.z -= 0.02;
  shaftstl.rotation.y -= 0.02;
  let y = pumpstl.position.y + 25;
  console.log(y);
  let vector = new THREE.Vector3( pumpstl.position.x,y, pumpstl.position.z);
  // Make camera look at the box.
  camera.lookAt(vector);
  renderer.render(scene, camera);
}


