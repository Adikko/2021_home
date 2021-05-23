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
camera.position.y = 2800;
camera.rotation.x = -0.75;

//light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0,4000,200);
scene.add(light);

//background color
scene.background = new THREE.Color(0x461661);

//model
const mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./src/3D/logo_3d.mtl', function(materials) {
    materials.preload();

    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./src/3D/logo_3d.obj', function(object) {
        mesh = object; //accessing the global variable
        mesh.position.z = -1000;
        mesh.rotation.y = Math.PI / 2;
        mesh.scale.set(100,1180,100);
    });
});

//renderer
let canvas = document.getElementsByClassName("background__canvas")[0];
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);

window.addEventListener( 'resize', onWindowResize );
function onWindowResize() {
    animationDivHeight = Math.floor(document.getElementsByClassName("background")[0].clientHeight);
    animationDivWidth = Math.floor(document.getElementsByClassName("background")[0].clientWidth) - 1;
    sizes.width = animationDivWidth;
    sizes.height = animationDivHeight;
    renderer.setSize(sizes.width, sizes.height);
    camera = new THREE.OrthographicCamera( animationDivWidth / - 5, animationDivWidth / 5, animationDivHeight / 5, animationDivHeight / - 5, 0, 5000 );
    camera.position.y = 2800;
    camera.rotation.x = -0.75;
}

//clock
const clock = new THREE.Clock(); //importing the clock in order to make the animations take as much time on any refresh rate screen 

const tick = () => {

    //measuring time
    const elapsedTime = clock.getElapsedTime();

    if (mesh !== null) {
        scene.add(mesh);
        mesh.rotation.y = elapsedTime * 0.05;
    }

    //render
    requestAnimationFrame( tick );
    renderer.render( scene, camera );

}

tick(); 