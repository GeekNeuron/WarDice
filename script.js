// =============================================================================
// War Dice - A game by GeekNeuron
// =============================================================================

// --- 1. Imports and Setup ---
import * as THREE from 'three';

// --- Global Variables ---
let world, scene, camera, renderer, dice = [];
const overlays = {
    container: document.getElementById('fight-overlays'),
    cloud: document.getElementById('fight-cloud'),
    eyes1: document.getElementById('dice1-eyes'),
    eyes2: document.getElementById('dice2-eyes'),
};

const throwButton = document.getElementById('throw-button');
const themeSwitcher = document.getElementById('theme-switcher');
const canvasContainer = document.getElementById('game-canvas-container');

let isFighting = false;
const textureLoader = new THREE.TextureLoader();


// --- 2. Initialize the World ---
function init() {
    // Physics World (CANNON.js is loaded globally)
    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82 * 2, 0) });
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    // 3D Scene (THREE.js)
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(35, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 0.9);
    topLight.position.set(0, 10, 5);
    topLight.castShadow = true;
    scene.add(topLight);

    // Physics Floor
    const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);

    // Event Listeners
    themeSwitcher.addEventListener('click', toggleTheme);
    throwButton.addEventListener('click', throwDice);

    // Start the animation loop
    animate();
}


// --- 3. Theme Controller ---
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
}


// --- 4. Dice Creation ---
function createDice() {
    // UPDATED: Load a texture for the dice
    // You need to create this image file yourself. It should map numbers to faces.
    const texture = textureLoader.load('assets/textures/dice_texture.png');
    const materials = [
        new THREE.MeshStandardMaterial({ map: texture }), // right (1)
        new THREE.MeshStandardMaterial({ map: texture }), // left (6)
        new THREE.MeshStandardMaterial({ map: texture }), // top (2)
        new THREE.MeshStandardMaterial({ map: texture }), // bottom (5)
        new THREE.MeshStandardMaterial({ map: texture }), // front (3)
        new THREE.MeshStandardMaterial({ map: texture }), // back (4)
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    
    // To map faces correctly, you may need to adjust UVs or have a specific texture map.
    // This is a basic setup.

    scene.add(mesh);

    const body = new CANNON.Body({
        mass: 1.2,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        sleepTimeLimit: 0.5
    });
    world.addBody(body);

    dice.push({ mesh, body });
}


// --- 5. Game Logic ---
function throwDice() {
    dice.forEach(d => {
        scene.remove(d.mesh);
        world.remove(d.body);
    });
    dice = [];
    stopFight();

    createDice();
    createDice();

    dice.forEach((d, index) => {
        d.body.position.set(Math.random() * 2 - 1, 5 + index, Math.random() * 2 - 1);
        d.body.quaternion.setFromAxisAngle(new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit(), Math.random() * Math.PI * 2);
        d.body.angularVelocity.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
        d.body.wakeUp();
    });

    setTimeout(startFight, 2500);
}

function startFight() {
    if (dice.length < 2) return;
    isFighting = true;
    overlays.container.style.display = 'block';
    // Load your GIF and SVG for the fight overlays in index.html
    overlays.eyes1.src = "assets/overlays/eyes_angry.svg";
    overlays.eyes2.src = "assets/overlays/eyes_angry.svg";
    overlays.cloud.src = "assets/overlays/fight_cloud.gif";

    setTimeout(stopFight, 10000);
}

function stopFight() {
    isFighting = false;
    overlays.container.style.display = 'none';

    // After fight, check results if dice have stopped
    setTimeout(() => {
        if(dice.length < 2) return;
        const value1 = getDiceValue(dice[0]);
        const value2 = getDiceValue(dice[1]);
        console.log(`Dice 1 shows: ${value1}, Dice 2 shows: ${value2}`);
    }, 1000); // Wait 1 sec for dice to settle after fight
}


// --- 6. Animation and Rendering Loop ---
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    for (const d of dice) {
        d.mesh.position.copy(d.body.position);
        d.mesh.quaternion.copy(d.body.quaternion);
    }
    
    if (isFighting) {
        updateFightOverlays();
    }

    renderer.render(scene, camera);
}

function updateFightOverlays() {
    const d1Pos = toScreenPosition(dice[0].mesh, camera);
    const d2Pos = toScreenPosition(dice[1].mesh, camera);
    const midX = (d1Pos.x + d2Pos.x) / 2;
    const midY = (d1Pos.y + d2Pos.y) / 2;
    overlays.cloud.style.transform = `translate(-50%, -50%) translate(${midX}px, ${midY}px)`;
    overlays.eyes1.style.transform = `translate(-50%, -50%) translate(${d1Pos.x}px, ${d1Pos.y}px)`;
    overlays.eyes2.style.transform = `translate(-50%, -50%) translate(${d2Pos.x}px, ${d2Pos.y}px)`;
}

function toScreenPosition(obj, camera) {
    const vector = new THREE.Vector3();
    obj.getWorldPosition(vector);
    vector.project(camera);
    return {
        x: (vector.x * 0.5 + 0.5) * canvasContainer.clientWidth,
        y: (vector.y * -0.5 + 0.5) * canvasContainer.clientHeight
    };
}

// --- 7. Utility ---
function getDiceValue(diceObject) {
    const body = diceObject.body;
    let maxDot = -Infinity;
    let topFaceIndex = -1;

    const faceNormals = [
        new CANNON.Vec3(1, 0, 0),  // right
        new CANNON.Vec3(-1, 0, 0), // left
        new CANNON.Vec3(0, 1, 0),  // top
        new CANNON.Vec3(0, -1, 0), // bottom
        new CANNON.Vec3(0, 0, 1),  // front
        new CANNON.Vec3(0, 0, -1)  // back
    ];

    for (let i = 0; i < faceNormals.length; i++) {
        const worldNormal = body.quaternion.vmult(faceNormals[i]);
        if (worldNormal.y > maxDot) {
            maxDot = worldNormal.y;
            topFaceIndex = i;
        }
    }
    
    // Map face index to dice value (standard dice layout)
    const values = [1, 6, 2, 5, 3, 4];
    return values[topFaceIndex];
}


// --- 8. Start the Application ---
init();
