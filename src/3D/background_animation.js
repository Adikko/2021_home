//this portion of the code fetches the div width and height. It's necessary to get this data in order to render correct scene dimensions for the site (and the 3D scene) to be responsive
//variables need to be defined globally, so the code can access the values assigned to them later on. They get the original div size assigned to them, because not everyone resizes their window (especially on mobile)
let animationDivHeight = Math.floor(document.getElementsByClassName("background")[0].clientHeight);
let animationDivWidth = Math.floor(document.getElementsByClassName("background")[0].clientWidth) - 1;

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
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 5).normalize();
scene.add(directionalLight);

//background color
scene.background = new THREE.Color(0x00adad);

//text
let textContent = "kulik";

const loader = new THREE.FontLoader();
loader.load( 'src/Poppins/Poppins Black_Regular.json', function ( font ) {
    let geometry = new THREE.TextGeometry( textContent, {
        font: font,
        size: 100,
        height: 0.5,
        curveSegments: 100,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
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

//renderer
let canvas = document.getElementsByClassName("background__canvas")[0];
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);

//clock
const clock = new THREE.Clock(); //importing the clock in order to make the animations take as much time on any refresh rate screen 

const tick = () => {

    //measuring time
    const elapsedTime = clock.getElapsedTime();

    if (mesh !== null) {
        scene.add(mesh);
        mesh.rotation.z = elapsedTime * 0.1;
    }

    //render
    requestAnimationFrame( tick );
    renderer.render( scene, camera );

}

tick(); 