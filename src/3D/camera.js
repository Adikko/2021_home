//importing ASCII effect
import { AsciiEffect } from '../AsciiEffect.js'

//this portion of the code fetches the div width and height. It's necessary to get this data in order to render correct scene dimensions for the site (and the 3D scene) to be responsive
//variables need to be defined globally, so the code can access the values assigned to them later on. They get the original div size assigned to them, because not everyone resizes their window (especially on mobile)
let animationDivHeight = (document.getElementsByClassName("projects")[0].clientHeight) * 0.5;
let animationDivWidth = (document.getElementsByClassName("projects")[0].clientWidth) * 0.7;

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

//text
let textContent = "<projects />";

const loader = new THREE.FontLoader();
loader.load( 'src/Poppins/Poppins Black_Regular.json', function ( font ) {
    let geometry = new THREE.TextGeometry( textContent, {
        font: font,
        size: 30,
        height: 0.5,
        curveSegments: 12
    } );
    geometry.center();
    let material = new THREE.MeshStandardMaterial( {
        color: 0xffffff,
    } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,-150,-1000);
    mesh.scale.z = 1000;
    mesh.rotation.x = Math.PI * -0.25;
    scene.add(mesh);
} );


renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setSize(sizes.width, sizes.height);

//using the ASCII effect
let animationDiv = document.getElementsByClassName("projects")[0];
effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize(sizes.width, sizes.height);
effect.domElement.style.color = '#00adad';
effect.domElement.style.position = 'absolute';
effect.domElement.style.bottom = '30vh';
effect.domElement.style.pointerEvents = 'none';
effect.domElement.style.height = '50vh';
effect.domElement.style.width = '70vw';
// Special case: append effect.domElement, instead of renderer.domElement.
// AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
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