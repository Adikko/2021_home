//importing ASCII effect
import { AsciiEffect } from './src/AsciiEffect.js'

//this portion of the code fetches the div width and height. It's necessary to get this data in order to render correct scene dimensions for the site (and the 3D scene) to be responsive
//variables need to be defined globally, so the code can access the values assigned to them later on. They get the original div size assigned to them, because not everyone resizes their window (especially on mobile)
let animationDivHeight = document.getElementsByClassName("background")[0].clientHeight;
let animationDivWidth = document.getElementsByClassName("background")[0].clientWidth;

const sizes = {
    width: animationDivWidth,
    height: animationDivHeight
}

//THREE.JS
//THREE.JS
//THREE.JS

//defining variables globally
let camera, scene, renderer, effect;
let mesh = null;

//scene
scene = new THREE.Scene();

//camera
camera = new THREE.OrthographicCamera( animationDivWidth / - 5, animationDivWidth / 5, animationDivHeight / 5, animationDivHeight / - 5, 0, 5000 );
camera.position.z = 8;

//light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 5).normalize();
scene.add(directionalLight);

//background color
scene.background = new THREE.Color( 0x000000 );

//text
let textContent = "kulik";

const loader = new THREE.FontLoader();
loader.load( 'src/Poppins/Poppins Black_Regular.json', function ( font ) {
    let geometry = new THREE.TextGeometry( textContent, {
        font: font,
        size: 150,
        height: 0.5,
        curveSegments: 4
    } );
    geometry.center();
    let material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
    } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,-150,-1000);
    mesh.scale.z = 1000;
    mesh.rotation.x = Math.PI * -0.25;
} );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

//TODO: delete the weird padding that's being rendered underneath the ascii canvas
//using the ASCII effect
effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = '#008080';
effect.domElement.style.backgroundColor = '#461661';
effect.domElement.style.position = 'absolute';
// effect.domElement.style.height = '100%';
// effect.domElement.style.width = '100vw';
// effect.domElement.style.padding = '0px';
// effect.domElement.style.margin = '0px';
// Special case: append effect.domElement, instead of renderer.domElement.
// AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
document.body.appendChild( effect.domElement );

//renderer
let canvas = document.getElementsByClassName("background__canvas")[0]; //render the source scene in order to apply the ascii effect later
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setClearColor(0x000000);
renderer.setSize(sizes.width, sizes.height);

//clock
const clock = new THREE.Clock(); //importing the clock in order to make the animations take as much time on any refresh rate screen 

//render
renderer.render(scene, camera);

const tick = () => {

    //measuring time
    const elapsedTime = clock.getElapsedTime();

    if (mesh !== null) {
        scene.add(mesh);
        mesh.rotation.z = Math.sin(elapsedTime * 0.3);
    }

    //render
    requestAnimationFrame( tick );
    renderer.render( scene, camera );
    effect.render( scene, camera );

}

tick();