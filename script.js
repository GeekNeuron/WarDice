// A comprehensive script for the War Dice game

// --- 1. SETUP AND INITIALIZATION ---
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;
const throwButton = document.getElementById('throw-button');
const canvasContainer = document.getElementById('game-canvas-container');
const overlaysContainer = document.getElementById('fight-overlays');
const fightCloud = document.getElementById('fight-cloud');
const dice1Eyes = document.getElementById('dice1-eyes');
const dice2Eyes = document.getElementById('dice2-eyes');

let world, scene, camera, renderer, dice = [], grounds = [];

// --- 2. THEME CONTROLLER ---
themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    // You can also update dice/scene textures here if you want
});


// --- 3. CORE GAME LOGIC ---
function init() {
    // Physics world
    world = new CANNON.World();
    world.gravity.set(0, -9.82 * 2, 0); // Stronger gravity
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    // 3D scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(30, canvasContainer.clientWidth / canvasContainer.clientHeight, 1, 100);
    camera.position.set(0, 7, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 0.7);
    topLight.position.set(0, 10, 5);
    topLight.castShadow = true;
    scene.add(topLight);

    // Create floor
    createFloor();
    
    // Start animation loop
    animate();
}

function createFloor() {
    const floorMaterial = new CANNON.Material();
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body({ mass: 0, material: floorMaterial });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(floorBody);
}


// --- 4. DICE CREATION AND THROWING ---
function createDiceMesh() {
    // For Arcane style, you'd create a single texture map for all 6 faces
    // Example: https://i.stack.imgur.com/n1aG8.png
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('assets/textures/dice_arcane_light.png'); // Placeholder

    const materials = [];
    for (let i = 0; i < 6; i++) {
        materials.push(new THREE.MeshLambertMaterial({ map: texture }));
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    return new THREE.Mesh(geometry, materials);
}

function createDice() {
    const mesh = createDiceMesh();
    mesh.castShadow = true;
    
    const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        sleepTimeLimit: 0.1
    });

    scene.add(mesh);
    world.addBody(body);
    dice.push({ mesh, body });
}

throwButton.addEventListener('click', () => {
    // Clear old dice
    dice.forEach(d => {
        scene.remove(d.mesh);
        world.remove(d.body);
    });
    dice = [];

    // Create two new dice
    createDice();
    createDice();

    // Throw them
    dice.forEach((d, index) => {
        d.body.position.set(Math.random() * 2 - 1, 5 + index * 1.5, Math.random() * 2 - 1);
        d.body.quaternion.setFromAxisAngle(
            new CANNON.Vec3(Math.random(), Math.random(), Math.random()).unit(), 
            Math.random() * Math.PI * 2
        );
        d.body.angularVelocity.set(Math.random()*10, Math.random()*10, Math.random()*10);
        d.body.velocity.set(0, -1, 0);
        d.body.wakeUp();
    });

    // Schedule the fight
    setTimeout(startFight, 2500); // Start fight after 2.5 seconds
});


// --- 5. FIGHT ANIMATION ---
let isFighting = false;

function startFight() {
    isFighting = true;
    overlaysContainer.style.display = 'block';
    
    // Stop the fight after 10 seconds
    setTimeout(stopFight, 10000);
}

function stopFight() {
    isFighting = false;
    overlaysContainer.style.display = 'none';
    
    // Put dice to sleep to show final result
    dice.forEach(d => d.body.sleep());
    
    // You would add logic here to read the top face of each die
}

function updateOverlays() {
    if (!isFighting || dice.length < 2) return;

    // Get screen position of dice
    const d1Pos = toScreenPosition(dice[0].mesh, camera);
    const d2Pos = toScreenPosition(dice[1].mesh, camera);

    // Find the midpoint for the fight cloud
    const midX = (d1Pos.x + d2Pos.x) / 2;
    const midY = (d1Pos.y + d2Pos.y) / 2;

    // Update overlay positions
    fightCloud.style.left = `${midX}px`;
    fightCloud.style.top = `${midY}px`;
    dice1Eyes.style.left = `${d1Pos.x}px`;
    dice1Eyes.style.top = `${d1Pos.y}px`;
    dice2Eyes.style.left = `${d2Pos.x}px`;
    dice2Eyes.style.top = `${d2Pos.y}px`;
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


// --- 6. ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);

    world.step(1 / 60);

    // Update dice meshes from physics bodies
    for (const d of dice) {
        d.mesh.position.copy(d.body.position);
        d.mesh.quaternion.copy(d.body.quaternion);
    }
    
    // Update fight animation overlays
    updateOverlays();

    renderer.render(scene, camera);
}

// Start the application
init();
