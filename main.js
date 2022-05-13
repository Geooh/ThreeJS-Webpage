import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// setting up scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// render object in browser
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

// calls scene and camera
renderer.render(scene, camera);

// light on object
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// controls to move mouse around object
const controls = new OrbitControls(camera, renderer.domElement);

// function to add rain onto the scene
function addRain() {
    const geometry = new THREE.CapsuleGeometry(1, 3, 4, 2);
    const material = new THREE.MeshBasicMaterial( {color: 0x00bfff} );
    const rain = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(200) );
    rain.position.set(x, y, z);
    scene.add(rain)
}

Array(150).fill().forEach(addRain)

// background for scene
const forestTexture = new THREE.TextureLoader().load('rainforest.jpg');
scene.background = forestTexture;

// avatars
const tucanTexture = new THREE.TextureLoader().load('tucan.jpg');

const tucan = new THREE.Mesh(
    new THREE.CapsuleGeometry(1, 1, 2, 4),
    new THREE.MeshBasicMaterial( {map: tucanTexture} )
);
scene.add(tucan);

// photo camera object
const photoCameraTexture = new THREE.TextureLoader().load('webdesign.jpg');

const photoCamera = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({
        map: photoCameraTexture,
    })
);

scene.add(photoCamera);

photoCamera.position.z = 30;
photoCamera.position.setX(-10);

tucan.position.z = -5;
tucan.position.x = 5;

// scroll animation
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    photoCamera.rotation.x += 0.01;
    photoCamera.rotation.y += 0.035;
    photoCamera.rotation.z += 0.01;

    tucan.rotation.y += 0.075;
    // tucan.rotation.z += 0.005;

    camera.position.z = t * -0.014;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// function to animate object
function animate() {
    requestAnimationFrame(animate);

    // torus.rotation.x += 0.001;
    // torus.rotation.y += 0.005;
    // torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate()

