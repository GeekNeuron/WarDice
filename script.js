// =============================================================================
// Dice - A game by GeekNeuron (v3 - Physics & UI Update)
// =============================================================================

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// --- Global Variables & UI Elements ---
let world, scene, camera, renderer, dice = [];
let numberOfDice = 1; // Default to 1 die

const throwButton = document.getElementById('throw-button');
const themeSwitcher = document.getElementById('theme-switcher');
const canvasContainer = document.getElementById('game-canvas-container');
const selectorButtons = document.querySelectorAll('.selector-btn');

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

// --- Physics Materials ---
const dicePhysicsMaterial = new CANNON.Material('diceMaterial');
const floorPhysicsMaterial = new CANNON.Material('floorMaterial');
const contactMaterial = new CANNON.ContactMaterial(
    floorPhysicsMaterial,
    dicePhysicsMaterial,
    { friction: 0.1, restitution: 0.4 } // Bounciness
);

// --- 2. Initialize the World ---
function init() {
    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;
    world.addContactMaterial(contactMaterial);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 7, 9);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasContainer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(5, 10, 7);
    topLight.castShadow = true;
    topLight.shadow.mapSize.set(2048, 2048);
    topLight.shadow.radius = 4; // UPDATED: Softer, more blurry shadows
    scene.add(topLight);
    
    const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), material: floorPhysicsMaterial });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);
    
    // Event Listeners
    themeSwitcher.addEventListener('click', toggleTheme);
    throwButton.addEventListener('click', throwDice);
    
    // NEW: Dice count selector logic
    selectorButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            numberOfDice = parseInt(button.dataset.count, 10);
            // Auto-select the 2-dice button at start
            if(numberOfDice === 2) {
                selectorButtons[0].classList.remove('active');
                selectorButtons[1].classList.add('active');
            } else {
                selectorButtons[1].classList.remove('active');
                selectorButtons[0].classList.add('active');
            }
        });
    });
    // Set initial active button
    document.querySelector(`.selector-btn[data-count="${numberOfDice}"]`).click();


    animate();
}

function throwDice() {
    dice.forEach(d => {
        scene.remove(d.mesh);
        world.remove(d.body);
    });
    dice = [];

    for (let i = 0; i < numberOfDice; i++) {
        createDice(i);
    }

    dice.forEach((d, index) => {
        d.body.position.set(Math.random() * 2 - 1, 3 + index, Math.random() * 2 - 1);
        d.body.quaternion.setFromAxisAngle(new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit(), Math.random() * Math.PI * 2);
        // UPDATED: Slower initial spin
        d.body.angularVelocity.set(
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8
        );
        d.body.wakeUp();
    });

    // NEW: Check for when dice have settled instead of a fixed timer
    checkDiceSettled();
}

// --- NEW: Smart settling logic ---
let settleCheckInterval;
function checkDiceSettled() {
    clearInterval(settleCheckInterval); // Clear any previous checks

    settleCheckInterval = setInterval(() => {
        const allDiceSettled = dice.every(d => {
            const vel = d.body.velocity.length();
            const angularVel = d.body.angularVelocity.length();
            return vel < 0.1 && angularVel < 0.1;
        });

        if (allDiceSettled && dice.length > 0) {
            clearInterval(settleCheckInterval);
            logFinalResults();
        }
    }, 200); // Check every 200ms
}

function logFinalResults() {
    let results = "Final Results: ";
    dice.forEach((d, index) => {
        const value = getDiceValue(d);
        results += `Dice ${index + 1}: ${value}  `;
    });
    console.log(results);
}


// --- All other functions (unchanged from last version) ---
function toggleTheme() { document.body.classList.toggle('dark-theme'); document.body.classList.toggle('light-theme'); }
function createPip(position) { const pipGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.025, 16); const pip = new THREE.Mesh(pipGeometry, pipMaterial); pip.position.copy(position); pip.castShadow = true; return pip; }
function createPips(number) { const group = new THREE.Group(); const spacing = 0.25; const depth = 0.505; const positions = { 1: [new THREE.Vector3(0, 0, depth)], 2: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, -spacing, depth)], 3: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(0, 0, depth), new THREE.Vector3(spacing, -spacing, depth)], 4: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)], 5: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(0, 0, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)], 6: [new THREE.Vector3(-spacing, spacing, depth), new THREE.Vector3(spacing, spacing, depth), new THREE.Vector3(-spacing, 0, depth), new THREE.Vector3(spacing, 0, depth), new THREE.Vector3(-spacing, -spacing, depth), new THREE.Vector3(spacing, -spacing, depth)] }; if (positions[number]) { positions[number].forEach(pos => { group.add(createPip(pos)); }); } return group; }
function createDice() { const diceSize = 1; const roundedBox = new RoundedBoxGeometry(diceSize, diceSize, diceSize, 6, 0.1); const diceBodyMesh = new THREE.Mesh(roundedBox, diceMaterial); diceBodyMesh.castShadow = true; const fullDice = new THREE.Group(); fullDice.add(diceBodyMesh); const pips = [createPips(1), createPips(6), createPips(2), createPips(5), createPips(3), createPips(4)]; pips[0].rotation.y = -Math.PI / 2; pips[1].rotation.y = Math.PI / 2; pips[2].rotation.x = Math.PI / 2; pips[3].rotation.x = -Math.PI / 2; pips[4].rotation.y = 0; pips[5].rotation.y = Math.PI; pips.forEach(pipGroup => fullDice.add(pipGroup)); scene.add(fullDice); const body = new CANNON.Body({ mass: 1, shape: new CANNON.Box(new CANNON.Vec3(diceSize / 2, diceSize / 2, diceSize / 2)), material: dicePhysicsMaterial, sleepTimeLimit: 0.2 }); world.addBody(body); dice.push({ mesh: fullDice, body: body }); }
function animate() { requestAnimationFrame(animate); world.step(1 / 60); for (const d of dice) { d.mesh.position.copy(d.body.position); d.mesh.quaternion.copy(d.body.quaternion); } renderer.render(scene, camera); }
function getDiceValue(diceObject) { const body = diceObject.body; let maxDot = -Infinity; let topFaceIndex = -1; const faceNormals = [ new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(-1, 0, 0), new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, -1, 0), new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(0, 0, -1) ]; const values = [1, 6, 2, 5, 3, 4]; for (let i = 0; i < faceNormals.length; i++) { const worldNormal = body.quaternion.vmult(faceNormals[i]); if (worldNormal.y > maxDot) { maxDot = worldNormal.y; topFaceIndex = i; } } return values[topFaceIndex]; }

// --- Start the Application ---
init();
