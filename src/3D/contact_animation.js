//importing ASCII effect
import { AsciiEffect } from '../AsciiEffect.js'

//this portion of the code fetches the div width and height. It's necessary to get this data in order to render correct scene dimensions for the site (and the 3D scene) to be responsive
let mobileView = window.matchMedia("(orientation: portrait)"); //making the animation responsive

let animationDivHeight = (document.getElementsByClassName("contact")[0].clientHeight) * 0.9;
let animationDivWidth;
if (mobileView.matches) {
    animationDivWidth = document.getElementsByClassName("contact")[0].clientWidth * 1;
} else {
    animationDivWidth = document.getElementsByClassName("contact")[0].clientWidth * 0.5;
}

const sizes = {
    width: animationDivWidth,
    height: animationDivHeight
}

//THREE.JS
//THREE.JS
//THREE.JS

//defining variables globally
//variables need to be defined globally, so the code can access the values assigned to them later on. They get the original div size assigned to them, because not everyone resizes their window (especially on mobile)
let camera, scene, renderer, effect;
let mesh = null;

//scene
scene = new THREE.Scene();

//camera
camera = new THREE.OrthographicCamera( animationDivWidth / - 5, animationDivWidth / 5, animationDivHeight / 5, animationDivHeight / - 5, 0, 5000 );

//light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 5).normalize();
scene.add(directionalLight);

//text
let textContent = "<contact />";

const loader = new THREE.FontLoader();
loader.load( 'src/Poppins/Poppins Black_Regular.json', function ( font ) {
    let geometry = new THREE.TextGeometry( textContent, {
        font: font,
        size: 20,
        height: 0.5,
        curveSegments: 3
    } );
    geometry.center();
    let material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
    } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,40,-1000);
    mesh.scale.z = 100;
    mesh.rotation.set(Math.PI * -0.1, 0, 0);
    scene.add(mesh);
} );


renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setSize(sizes.width, sizes.height);

//using the ASCII effect
let animationDiv = document.getElementsByClassName("contact")[0];
effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize(sizes.width, sizes.height);
effect.domElement.style.color = '#ffffff';
effect.domElement.style.position = 'absolute';
effect.domElement.style.pointerEvents = 'none';
effect.domElement.style.height = '90%';
if (mobileView.matches) {
    effect.domElement.style.width = '100%';
} else {
    effect.domElement.style.width = '50%';
}
effect.domElement.style.opacity = '0.3';
//special case: append effect.domElement, instead of renderer.domElement.
//AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
animationDiv.appendChild( effect.domElement );

//renderer
renderer = new THREE.WebGLRenderer({
    antialias: true
});

//clock
const clock = new THREE.Clock(); //importing the clock in order to make the animations take as much time on any refresh rate screen 

//render
renderer.render(scene, camera);

const tick = () => {

    //measuring time
    const elapsedTime = clock.getElapsedTime();

    if (mesh !== null) {
        mesh.rotation.z = Math.sin(elapsedTime * 0.6) * 0.3;
    }

    //render
    requestAnimationFrame( tick );
    renderer.render( scene, camera );
    effect.render( scene, camera );

}

tick();