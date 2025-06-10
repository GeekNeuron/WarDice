// =============================================================================
// War Dice - A game by GeekNeuron (Final Refined Version)
// =============================================================================

// --- 1. Imports and Setup ---
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/RoundedBoxGeometry.js';

// --- Global Variables ---
let world, scene, camera, renderer, dice = [];
const throwButton = document.getElementById('throw-button');
const themeSwitcher = document.getElementById('theme-switcher');
const canvasContainer = document.getElementById('game-canvas-container');

// --- Materials ---
const diceMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.15,
    metalness: 0.2,
});
const pipMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.4,
    metalness: 0,
});

// --- 2. Initialize the World ---
function init() {
    // Physics World
    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    // 3D Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(40, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 6, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(5, 10, 7);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    scene.add(topLight);
    
    // Physics and Visual Floor
    const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);
    
    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.1, roughness: 0.6 })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

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
function createPip(position) {
    const pipGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.025, 16);
    const pip = new THREE.Mesh(pipGeometry, pipMaterial);
    pip.position.copy(position);
    pip.castShadow = true;
    return pip;
}

function createPips(number) {
    const group = new THREE.Group();
    const spacing = 0.25;
    const depth = 0.505; // Slightly more than half the dice size for indentation

    const positions = {
        1: [new THREE.Vector3(0, 0, depth)],
        2: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, -spacing, depth)],
        3: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(0, 0, depth), new THREE.Vector3(spacing, -spacing, depth)],
        4: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)],
        5: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(0, 0, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)],
        6: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(-spacing, 0, depth), new THREE.Vector3(spacing, 0, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)]
    };

    if (positions[number]) {
        positions[number].forEach(pos => {
            group.add(createPip(pos));
        });
    }
    
    return group;
}

function createDice() {
    const diceSize = 1;
    const roundedBox = new RoundedBoxGeometry(diceSize, diceSize, diceSize, 6, 0.1);
    const diceBodyMesh = new THREE.Mesh(roundedBox, diceMaterial);
    diceBodyMesh.castShadow = true;

    const fullDice = new THREE.Group();
    fullDice.add(diceBodyMesh);
    
    const pips = [
        createPips(1), createPips(6), createPips(2),
        createPips(5), createPips(3), createPips(4)
    ];
    
    pips[0].rotation.y = -Math.PI / 2; // Right face (+X)
    pips[1].rotation.y = Math.PI / 2;  // Left face (-X)
    pips[2].rotation.x = Math.PI / 2;  // Top face (+Y)
    pips[3].rotation.x = -Math.PI / 2; // Bottom face (-Y)
    pips[4].rotation.y = 0;             // Front face (+Z)
    pips[5].rotation.y = Math.PI;       // Back face (-Z)

    pips.forEach(pipGroup => fullDice.add(pipGroup));

    scene.add(fullDice);

    const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(diceSize / 2, diceSize / 2, diceSize / 2)),
        sleepTimeLimit: 0.5
    });
    world.addBody(body);

    dice.push({ mesh: fullDice, body: body });
}

// --- 5. Game Logic ---
function throwDice() {
    dice.forEach(d => {
        scene.remove(d.mesh);
        world.remove(d.body);
    });
    dice = [];

    createDice();
    createDice();

    dice.forEach((d, index) => {
        d.body.position.set(Math.random() * 2 - 1, 3 + index, Math.random() * 2 - 1);
        d.body.quaternion.setFromAxisAngle(new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit(), Math.random() * Math.PI * 2);
        d.body.angularVelocity.set(Math.random() * 20, Math.random() * 20, Math.random() * 20);
        d.body.wakeUp();
    });

    setTimeout(() => {
        if (dice.length < 2) return;
        const value1 = getDiceValue(dice[0]);
        const value2 = getDiceValue(dice[1]);
        console.log(`Dice 1: ${value1}, Dice 2: ${value2}`);
    }, 5000); 
}

// --- 6. Animation Loop ---
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    for (const d of dice) {
        d.mesh.position.copy(d.body.position);
        d.mesh.quaternion.copy(d.body.quaternion);
    }
    
    renderer.render(scene, camera);
}

// --- 7. Utility to get dice value ---
function getDiceValue(diceObject) {
    const body = diceObject.body;
    let maxDot = -Infinity;
    let topFaceIndex = -1;

    const faceNormals = [
        new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(-1, 0, 0),
        new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, -1, 0),
        new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(0, 0, -1)
    ];
    
    const values = [1, 6, 2, 5, 3, 4];

    for (let i = 0; i < faceNormals.length; i++) {
        const worldNormal = body.quaternion.vmult(faceNormals[i]);
        if (worldNormal.y > maxDot) {
            maxDot = worldNormal.y;
            topFaceIndex = i;
        }
    }
    return values[topFaceIndex];
}

// --- 8. Start the Application ---
init();
