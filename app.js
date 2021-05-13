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
let camera, scene, renderer;
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
function darkMode_backgroundChanger(checker) {
    if (checker.matches) { // If media query matches
        scene.background = new THREE.Color( 0x461661 );
    } else {
        scene.background = new THREE.Color( 0x93FAA5 );
    }
}
let darkMode_checker = window.matchMedia("(prefers-color-scheme: dark)")
darkMode_backgroundChanger(darkMode_checker) // Call listener function at run time

//text
let textContent = "kulik";

const loader = new THREE.FontLoader();
loader.load( 'src/Poppins/Poppins Black_Regular.json', function ( font ) {
    let geometry = new THREE.TextGeometry( textContent, {
        font: font,
        size: 100,
        height: 0.5,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.05,
        bevelSegments: 3
    } );
    geometry.center();
    let material = new THREE.MeshStandardMaterial( {
        color: 0x008080,
    } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,-150,-1000);
    mesh.scale.z = 1000;
    mesh.rotation.x = Math.PI * -0.25;
} );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//renderer
let canvas = document.getElementsByClassName("background__canvas")[0];
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

}

tick();