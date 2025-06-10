// =============================================================================
// Dice - A game by GeekNeuron (v4 - Final Physics & Visuals)
// =============================================================================

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'lib/addons/geometries/RoundedBoxGeometry.js';

// --- Global Variables & UI Elements ---
let world, scene, camera, renderer, dice = [];
let numberOfDice = 1;

const throwButton = document.getElementById('throw-button');
const themeSwitcher = document.getElementById('theme-switcher');
const canvasContainer = document.getElementById('game-canvas-container');
const selectorButtons = document.querySelectorAll('.selector-btn');

// --- Materials ---
// A single material for the dice body, textures will be applied per face
const diceMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.2,
    metalness: 0.1,
});

// --- Physics Materials ---
const dicePhysicsMaterial = new CANNON.Material('diceMaterial');
const floorPhysicsMaterial = new CANNON.Material('floorMaterial');
const wallPhysicsMaterial = new CANNON.Material('wallMaterial');

// --- Initialize the World ---
function init() {
    // World Setup
    world = new CANNON.World({ gravity: new CANNON.Vec3(0, -30, 0) }); // Stronger gravity
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    // Contact Materials (Crucial for bounce/friction)
    world.addContactMaterial(new CANNON.ContactMaterial(floorPhysicsMaterial, dicePhysicsMaterial, { friction: 0.01, restitution: 0.5 }));
    world.addContactMaterial(new CANNON.ContactMaterial(wallPhysicsMaterial, dicePhysicsMaterial, { friction: 0, restitution: 0.8 }));

    // Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 8, 10);
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
    topLight.shadow.mapSize.set(2048, 2048);
    topLight.shadow.radius = 4;
    scene.add(topLight);
    
    // Floor and Walls
    createBoundaries();

    // Event Listeners
    setupEventListeners();

    // Start Animation
    animate();
}

function createBoundaries() {
    // Visual floor
    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.1, roughness: 0.6 })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Physics floor
    const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), material: floorPhysicsMaterial });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);
    
    // NEW: Invisible Walls
    const wallShape = new CANNON.Box(new CANNON.Vec3(5, 2, 0.1));
    const wallPositions = [
        { x: 0, y: 1, z: 5 },  // Back wall
        { x: 0, y: 1, z: -5 }, // Front wall
        { x: -5, y: 1, z: 0 }, // Left wall
        { x: 5, y: 1, z: 0 }   // Right wall
    ];
    const wallOrientations = [
        new CANNON.Quaternion(0, 0, 0, 1),
        new CANNON.Quaternion(0, 0, 0, 1),
        new CANNON.Quaternion(0, 1, 0, 1).normalize(),
        new CANNON.Quaternion(0, 1, 0, 1).normalize()
    ];

    wallPositions.forEach((pos, i) => {
        const wallBody = new CANNON.Body({ mass: 0, shape: wallShape, material: wallPhysicsMaterial });
        wallBody.position.set(pos.x, pos.y, pos.z);
        if(i > 1) wallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), Math.PI/2);
        world.addBody(wallBody);
    });
}

function setupEventListeners() {
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });

    throwButton.addEventListener('click', throwDice);
    
    selectorButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            numberOfDice = parseInt(button.dataset.count, 10);
        });
    });
    document.querySelector(`.selector-btn[data-count="${numberOfDice}"]`).click();
}

// --- NEW: Create Dice Pips using CanvasTexture ---
function createDiceTexture(number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;

    context.fillStyle = '#f0f0f0'; // Dice face color
    context.fillRect(0, 0, 128, 128);
    context.fillStyle = '#111111'; // Pip color

    const pipRadius = 12;
    const positions = {
        center: { x: 64, y: 64 },
        topLeft: { x: 32, y: 32 },
        topRight: { x: 96, y: 32 },
        bottomLeft: { x: 32, y: 96 },
        bottomRight: { x: 96, y: 96 },
        middleLeft: { x: 32, y: 64 },
        middleRight: { x: 96, y: 64 },
    };

    function drawPip(pos) {
        context.beginPath();
        context.arc(pos.x, pos.y, pipRadius, 0, Math.PI * 2);
        context.fill();
    }

    const pipLayouts = {
        1: ['center'],
        2: ['topLeft', 'bottomRight'],
        3: ['topLeft', 'center', 'bottomRight'],
        4: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
        5: ['topLeft', 'topRight', 'center', 'bottomLeft', 'bottomRight'],
        6: ['topLeft', 'topRight', 'middleLeft', 'middleRight', 'bottomLeft', 'bottomRight']
    };

    pipLayouts[number].forEach(key => drawPip(positions[key]));

    return new THREE.CanvasTexture(canvas);
}

// --- UPDATED: Simplified Dice Creation ---
function createDice() {
    const diceSize = 1;
    // Create an array of 6 materials, one for each face
    const materials = [
        new THREE.MeshStandardMaterial({ map: createDiceTexture(1) }), // right
        new THREE.MeshStandardMaterial({ map: createDiceTexture(6) }), // left
        new THREE.MeshStandardMaterial({ map: createDiceTexture(2) }), // top
        new THREE.MeshStandardMaterial({ map: createDiceTexture(5) }), // bottom
        new THREE.MeshStandardMaterial({ map: createDiceTexture(3) }), // front
        new THREE.MeshStandardMaterial({ map: createDiceTexture(4) }), // back
    ];

    const geometry = new RoundedBoxGeometry(diceSize, diceSize, diceSize, 6, 0.1);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    scene.add(mesh);

    const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(diceSize / 2, diceSize / 2, diceSize / 2)),
        material: dicePhysicsMaterial,
        sleepTimeLimit: 0.2
    });
    world.addBody(body);

    dice.push({ mesh, body });
}

function throwDice() {
    dice.forEach(d => {
        scene.remove(d.mesh);
        world.remove(d.body);
    });
    dice = [];

    for (let i = 0; i < numberOfDice; i++) {
        createDice();
    }

    dice.forEach((d, index) => {
        d.body.position.set((Math.random() - 0.5) * 2, 3 + index * 1.5, (Math.random() - 0.5) * 2);
        d.body.quaternion.setFromAxisAngle(new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit(), Math.random() * Math.PI * 2);
        d.body.angularVelocity.set(
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8, 
            (Math.random() - 0.5) * 8
        );
        d.body.wakeUp();
    });

    checkDiceSettled();
}

let settleCheckInterval;
function checkDiceSettled() {
    clearInterval(settleCheckInterval);
    settleCheckInterval = setInterval(() => {
        const allDiceSettled = dice.every(d => d.body.sleepState === CANNON.Body.SLEEPING);
        if (allDiceSettled && dice.length > 0) {
            clearInterval(settleCheckInterval);
            logFinalResults();
        }
    }, 300);
}

function logFinalResults() {
    let results = "Final Results: ";
    dice.forEach((d, index) => {
        const value = getDiceValue(d);
        results += `Dice ${index + 1}: ${value}  `;
    });
    console.log(results);
}

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    dice.forEach(d => {
        d.mesh.position.copy(d.body.position);
        d.mesh.quaternion.copy(d.body.quaternion);
    });
    renderer.render(scene, camera);
}

function getDiceValue(diceObject) {
    const body = diceObject.body;
    let maxDot = -Infinity;
    let topFaceIndex = -1;
    const faceNormals = [ new CANNON.Vec3(1, 0, 0), new CANNON.Vec3(-1, 0, 0), new CANNON.Vec3(0, 1, 0), new CANNON.Vec3(0, -1, 0), new CANNON.Vec3(0, 0, 1), new CANNON.Vec3(0, 0, -1) ];
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

// --- Start the Application ---
init();
