const THREE = require("three")

const GCYAN_LIGHT = 0xC1E3D3,
      GCYAN_GRAY  = 0x91A49B,
      GCYAN_DARK  = 0x4B4D4D,
      PALE_RED    = 0xF19386,
      WHITE       = 0xFFFFFF

const canvas = document.getElementById("enigma-animation")

/**
 * canvas has width: 100%, height: 100% as CSS
 * we need to set canvas' width and height attributes
 * so that it is drawable
 */
const ww = canvas.width = canvas.offsetWidth,
      wh = canvas.height = canvas.offsetHeight

const speed = 1/18;
const increment = 32;

const CUBE_SIZE = 80,
      HALF = CUBE_SIZE / 2,
      SEVENTH = CUBE_SIZE / 7,
      EIGHTH = CUBE_SIZE / 8,
      TENTH = CUBE_SIZE / 10

const CAMERA_DIST = CUBE_SIZE * 0.75
const COVER_DEPTH = 0.1

let scene = new THREE.Scene()
let camera = new THREE.OrthographicCamera(-ww / 4, ww / 4, wh / 4, -wh / 4, 0.1, 1000)
camera.position.set(CAMERA_DIST, CAMERA_DIST, CAMERA_DIST)
camera.lookAt(0, 0, 0)

let renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
renderer.setSize(ww, wh)

let makeMesh = (shape, color, x, y, z, rx, ry, rz, s, depth, withEdges = false) => {
    let geometry = new THREE.ExtrudeBufferGeometry(shape, { depth, bevelEnabled: false })
    let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color }))
    mesh.position.set(x, y, z)
    mesh.rotation.set(rx, ry, rz)
    mesh.scale.set(s, s, s)

    if(withEdges) {
        let edges = new THREE.EdgesGeometry(geometry)
        let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: WHITE }))
        line.position.set(x, y, z)
        line.rotation.set(rx, ry, rz)
        line.scale.set(s, s, s)

        let group = new THREE.Group()
        group.add(mesh)
        group.add(line)
        return group
    }

    return mesh
}

/**
 * Splits an array into chunks of size `sz` and returns an array of the chunks
 * @param {Array} arr The array
 * @param {number} sz The size of each chunk
 */
let chunk = (arr, sz) => {
    let R = []
    for(let i = 0; i < arr.length; i += sz) {
        R.push(arr.slice(i, i + sz))
    }
    return R
}

/**
 * Creates a THREE.Shape from an array of xy pairs ([ x1, y1, x2, y2, x3, y3, ... ])
 * @param {Array} array XY pair array
 * @param {Number} sx Scalar for x coordinates (default 1)
 * @param {Number} sy Scalar for y coordinates (default 1)
 */
let shapeFrom2dPairs = (array, sx = 1, sy = 1) => {
    let chunked = chunk(array, 2)
    let pts = chunked.map(xy => new THREE.Vector2(sx * xy[0], sy * xy[1]))
    return new THREE.Shape(pts)
}

let v3 = (...args) => new THREE.Vector3(...args)

let eGroup = new THREE.Group(),
    nGroup = new THREE.Group(),
    gGroup = new THREE.Group(),
    aGroup = new THREE.Group()

let ePivot = new THREE.Object3D(),
    nPivot = new THREE.Object3D(),
    gPivot = new THREE.Object3D(),
    aPivot = new THREE.Object3D()

let init = () => {
    /*** E GROUP ***/
    let eShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -3, -1,
        -3, -3,
        0, -3,
        0, -4,
        -3, -4,
        -3, -6,
        0, -6,
        0, -7,
        -4, -7,
        -4, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    eGroup.add(makeMesh(eShape, GCYAN_GRAY, 0, CUBE_SIZE, HALF - EIGHTH, 0, 0, 0, 1, EIGHTH))
    eGroup.add(makeMesh(eShape, GCYAN_DARK, 0, CUBE_SIZE, HALF + COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))

    let zeroShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -2, -1,
        -2, -3,
        -1, -3,
        -1, -1,
        0, -1,
        0, -4,
        -3, -4,
        -3, 0,
        0, 0,
    ], EIGHTH, EIGHTH)
    eGroup.add(makeMesh(zeroShape, GCYAN_GRAY, -HALF, CUBE_SIZE - SEVENTH, EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, SEVENTH))
    eGroup.add(makeMesh(zeroShape, WHITE, -HALF, CUBE_SIZE + COVER_DEPTH, EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, COVER_DEPTH))
    eGroup.add(makeMesh(zeroShape, WHITE, -HALF, CUBE_SIZE - SEVENTH - COVER_DEPTH, EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, COVER_DEPTH))

    let zeroShadeShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -2, -1,
        -2, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    eGroup.add(makeMesh(zeroShadeShape, GCYAN_DARK, -EIGHTH, CUBE_SIZE, 2 * EIGHTH, 0, 0, 0, 1, COVER_DEPTH))


    /*** N GROUP ***/
    let nShape = shapeFrom2dPairs([
        0, 0,
        0, -7,
        -1, -7,
        -3, -3,
        -3, -7,
        -4, -7,
        -4, 0,
        -3, 0,
        -1, -4,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    nGroup.add(makeMesh(nShape, GCYAN_GRAY, 0, CUBE_SIZE, -(EIGHTH + EIGHTH), 0, 0, 0, 1, EIGHTH))
    nGroup.add(makeMesh(nShape, GCYAN_DARK, 0, CUBE_SIZE, -(EIGHTH - COVER_DEPTH), 0, 0, 0, 1, COVER_DEPTH))

    let iShape = shapeFrom2dPairs([
        0, 0,
        0, -7,
        -1, -7,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    nGroup.add(makeMesh(iShape, PALE_RED, COVER_DEPTH, CUBE_SIZE, -EIGHTH, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))

    let sixShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -2, -1,
        -2, -4,
        -1, -4,
        -1, -3,
        -2, -3,
        -2, -2,
        0, -2,
        0, -5,
        -3, -5,
        -3, 0,
        0, 0,
    ], EIGHTH, TENTH)
    nGroup.add(makeMesh(sixShape, GCYAN_GRAY, -HALF, CUBE_SIZE - EIGHTH, -HALF, -Math.PI / 2, 0, Math.PI / 2, 1, EIGHTH))
    nGroup.add(makeMesh(sixShape, WHITE, -HALF, CUBE_SIZE + COVER_DEPTH, -HALF, -Math.PI / 2, 0, Math.PI / 2, 1, COVER_DEPTH))

    let sixShadeShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -1, -1,
        -1, 0,
        0, 0,
    ], TENTH, EIGHTH)
    nGroup.add(makeMesh(sixShadeShape, GCYAN_DARK, -TENTH, CUBE_SIZE, -3 * EIGHTH, 0, 0, 0, 1, COVER_DEPTH))


    /*** G GROUP ***/

    /**
     * M's width (3 eighths) is split to fifths and fourths.
     * The height is split to sevenths as usual.
     */
    let M_FOURTH = 3 * EIGHTH / 4,
        M_FIFTH = 3 * EIGHTH / 5

    let gShape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -3, -1,
        -3, -6,
        -1, -6,
        -1, -4,
        -2, -4,
        -2, -3,
        0, -3,
        0, -7,
        -4, -7,
        -4, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    gGroup.add(makeMesh(gShape, GCYAN_GRAY, HALF, 0, EIGHTH + 4 * M_FIFTH, 0, 0, 0, 1, M_FIFTH))
    gGroup.add(makeMesh(gShape, GCYAN_DARK, HALF, 0, HALF + COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))
    gGroup.add(makeMesh(gShape, GCYAN_DARK, HALF, 0, EIGHTH + 4 * M_FIFTH - COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))

    /**
     * M's top and bottom should be hidden,
     * so we need it to be 2 cover slices shorter than CUBE_SIZE
     * M_SLICE is given in SEVENTH units
     */
    let M_SLICE = COVER_DEPTH / SEVENTH
    let mShape = shapeFrom2dPairs([
        0, 0,
        0, -7 + 2 * M_SLICE,
        -M_FIFTH, -7 + 2 * M_SLICE,
        -M_FIFTH, -4,
        -M_FOURTH, -4,
        -2 * M_FOURTH, -6,
        -3 * M_FOURTH, -4,
        -4 * M_FIFTH, -4,
        -4 * M_FIFTH, -7 + 2 * M_SLICE,
        -5 * M_FIFTH, -7 + 2 * M_SLICE,
        -5 * M_FIFTH, 0,
        -3 * M_FIFTH, 0,
        -2 * M_FOURTH, -3,
        -2 * M_FIFTH, 0,
        0, 0,
    ], 1, SEVENTH)
    gGroup.add(makeMesh(mShape, GCYAN_DARK, HALF, -COVER_DEPTH, HALF, 0, -Math.PI / 2, 0, 1, EIGHTH - 2 * COVER_DEPTH))
    gGroup.add(makeMesh(mShape, PALE_RED, HALF + COVER_DEPTH, -COVER_DEPTH, HALF, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))

    let mShade1Shape = shapeFrom2dPairs([
        0, 0,
        0, -2,
        -1, -2,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    gGroup.add(makeMesh(mShade1Shape, GCYAN_GRAY, HALF, -SEVENTH, HALF + COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))

    let mShade2Shape = shapeFrom2dPairs([
        0, 0,
        0, -7,
        -1, -7,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    gGroup.add(makeMesh(mShade2Shape, GCYAN_GRAY, HALF, 0, EIGHTH - COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))

    let mShade3Shape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -1, -1,
        -1, 0,
        0, 0,
    ], EIGHTH, M_FIFTH)
    gGroup.add(makeMesh(mShade3Shape, GCYAN_GRAY, HALF, -CUBE_SIZE, EIGHTH + M_FIFTH, Math.PI / 2, 0, 0, 1, COVER_DEPTH))

    gGroup.add(makeMesh(zeroShape, GCYAN_GRAY, 0, -SEVENTH, EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, SEVENTH))
    gGroup.add(makeMesh(zeroShape, WHITE, 0, COVER_DEPTH, EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, COVER_DEPTH))
    gGroup.add(makeMesh(zeroShape, WHITE, 0, -(SEVENTH + COVER_DEPTH), EIGHTH, -Math.PI/2, 0, Math.PI/2, 1, COVER_DEPTH))
    gGroup.add(makeMesh(zeroShadeShape, GCYAN_DARK, 3 * EIGHTH, 0, 2 * EIGHTH + COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))
    gGroup.add(makeMesh(zeroShadeShape, GCYAN_DARK, 3 * EIGHTH, 0, 3 * EIGHTH - COVER_DEPTH, 0, 0, 0, 1, COVER_DEPTH))


    /*** A GROUP ***/
    let aShape = shapeFrom2dPairs([
        0, 0,
        0, -7,
        -1, -7,
        -1, -1,
        -2, -1,
        -2, -3,
        -1, -3,
        -1, -4,
        -2, -4,
        -2, -7,
        -3, -7,
        -3, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    aGroup.add(makeMesh(aShape, GCYAN_GRAY, HALF, 0, -EIGHTH, 0, -Math.PI / 2, 0, 1, EIGHTH))
    aGroup.add(makeMesh(aShape, PALE_RED, HALF + COVER_DEPTH, 0, -EIGHTH, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))
    aGroup.add(makeMesh(aShape, GCYAN_DARK, 3 * EIGHTH - COVER_DEPTH, 0, -EIGHTH, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))

    let aShadeShape = shapeFrom2dPairs([
        0, 0,
        0, -7,
        -1, -7,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    aGroup.add(makeMesh(aShadeShape, GCYAN_DARK, HALF, 0, -(EIGHTH - COVER_DEPTH), 0, 0, 0, 1, COVER_DEPTH))
    aGroup.add(makeMesh(aShadeShape, GCYAN_DARK, HALF, -COVER_DEPTH, -(3 * EIGHTH - COVER_DEPTH), 0, 0, 0, 1, COVER_DEPTH))

    let fourShape = shapeFrom2dPairs([
        0, 0,
        0, -4,
        -1, -4,
        -1, -2.5,
        -3, -2.5,
        -3, 0,
        -2, 0,
        -2, -1.5,
        -1, -1.5,
        -1, 0,
        0, 0,
    ], EIGHTH, EIGHTH)
    aGroup.add(makeMesh(fourShape, GCYAN_GRAY, 0, -SEVENTH, -HALF, -Math.PI/2, 0, Math.PI/2, 1, SEVENTH))
    aGroup.add(makeMesh(fourShape, WHITE, 0, COVER_DEPTH, -HALF, -Math.PI/2, 0, Math.PI/2, 1, COVER_DEPTH))

    let fourShade1Shape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -2.5, -1,
        -2.5, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    aGroup.add(makeMesh(fourShade1Shape, GCYAN_DARK, 2.5 * EIGHTH, 0, -(EIGHTH - COVER_DEPTH), 0, 0, 0, 1, COVER_DEPTH))

    let fourShade2Shape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -3, -1,
        -3, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    aGroup.add(makeMesh(fourShade2Shape, GCYAN_DARK, 3 * EIGHTH, 0, -(3 * EIGHTH - COVER_DEPTH), 0, 0, 0, 1, COVER_DEPTH))

    let fourShade3Shape = shapeFrom2dPairs([
        0, 0,
        0, -1,
        -1, -1,
        -1, 0,
        0, 0,
    ], EIGHTH, SEVENTH)
    aGroup.add(makeMesh(fourShade3Shape, GCYAN_DARK, -COVER_DEPTH, 0, -EIGHTH, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))
    aGroup.add(makeMesh(fourShade3Shape, GCYAN_DARK, 1.5 * EIGHTH - COVER_DEPTH, 0, -2 * EIGHTH, 0, -Math.PI / 2, 0, 1, COVER_DEPTH))

    /** CREATE PIVOTS **/
    // Lower E and N
    eGroup.position.add(v3(0, -CUBE_SIZE, 0))
    nGroup.position.add(v3(0, -CUBE_SIZE, 0))

    // Set common pivot
    ePivot.position.set(0, -HALF, 0)
    nPivot.position.set(0, -HALF, 0)
    gPivot.position.set(0, -HALF, 0)
    aPivot.position.set(0, -HALF, 0)

    // Move groups to opposite points
    eGroup.position.add(v3(0, HALF, 0))
    nGroup.position.add(v3(0, HALF, 0))
    gGroup.position.add(v3(0, HALF, 0))
    aGroup.position.add(v3(0, HALF, 0))

    // Add groups to corresponding pivot
    ePivot.add(eGroup)
    nPivot.add(nGroup)
    gPivot.add(gGroup)
    aPivot.add(aGroup)

    scene.add(ePivot)
    scene.add(nPivot)
    scene.add(gPivot)
    scene.add(aPivot)
}

let makeAnimation = (fn, repeats, startTime) => ({
    start: startTime,
    remaining: repeats,
    run: function() {
        if(this.remaining <= 0) return
        fn()
        --this.remaining
    }
})

let randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
let speeds = [],
    starts = [],
    curr = 0
for(let i = 0; i < 6; ++i) {
    speeds.push(speed)
    curr += increment
    starts.push(curr)
}

let animations = [
    makeAnimation(() => {
        /** INITIAL ROTATIONS **/
        ePivot.rotation.set(-Math.PI / 2, Math.PI / 2, Math.PI / 2)
        nPivot.rotation.set(-Math.PI / 2, 0, -Math.PI / 2)
        gPivot.rotation.set(Math.PI / 2, -Math.PI / 2, Math.PI / 2)
        aPivot.rotation.set(Math.PI / 2, 0, -Math.PI / 2)
    }, 1, 0),
    makeAnimation(() => {
        //ePivot.rotation.set(-Math.PI / 2, 0, Math.PI / 2)
        //gPivot.rotation.set(Math.PI / 2, 0, Math.PI / 2)
        ePivot.rotation.y += speeds[0] * (-Math.PI / 2)
        gPivot.rotation.y += speeds[0] * (Math.PI / 2)
    }, 1 / speeds[0], starts[0]),
    makeAnimation(() => {
        //nPivot.rotation.set(-Math.PI / 2, 0, 0)
        //gPivot.rotation.set(Math.PI / 2, 0, 0)
        nPivot.rotation.z += speeds[1] * (Math.PI / 2)
        gPivot.rotation.z += speeds[1] * (-Math.PI / 2)
    }, 1 / speeds[1], starts[1]),
    makeAnimation(() => {
        //ePivot.rotation.set(-Math.PI / 2, 0, 0)
        //aPivot.rotation.set(Math.PI / 2, 0, 0)
        ePivot.rotation.z += speeds[2] * (-Math.PI / 2)
        aPivot.rotation.z += speeds[2] * (Math.PI / 2)
    }, 1 / speeds[2], starts[2]),
    makeAnimation(() => {
        //ePivot.rotation.set(0, 0, 0)
        //nPivot.rotation.set(0, 0, 0)
        ePivot.rotation.x += speeds[3] * (Math.PI / 2)
        nPivot.rotation.x += speeds[3] * (Math.PI / 2)
    }, 1 / speeds[3], starts[3]),
    makeAnimation(() => {
        //gPivot.rotation.set(0, 0, 0)
        //aPivot.rotation.set(0, 0, 0)
        gPivot.rotation.x += speeds[4] * (-Math.PI / 2)
        aPivot.rotation.x += speeds[4] * (-Math.PI / 2)
    }, 1 / speeds[4], starts[4]),
    makeAnimation(() => {
        ePivot.position.add(v3(0, speeds[5] * CUBE_SIZE, 0))
        nPivot.position.add(v3(0, speeds[5] * CUBE_SIZE, 0))
    }, 1 / speeds[5], starts[5]),
]

let forward_animations = animations
let backward_animations = [
    makeAnimation(() => {
        ePivot.position.add(v3(0, -speeds[5] * CUBE_SIZE, 0))
        nPivot.position.add(v3(0, -speeds[5] * CUBE_SIZE, 0))
    }, 1 / speeds[5], starts[0]),
    makeAnimation(() => {
        //gPivot.rotation.set(0, 0, 0)
        //aPivot.rotation.set(0, 0, 0)
        gPivot.rotation.x += speeds[4] * (+Math.PI / 2)
        aPivot.rotation.x += speeds[4] * (+Math.PI / 2)
    }, 1 / speeds[4], starts[1]),
    makeAnimation(() => {
        //ePivot.rotation.set(0, 0, 0)
        //nPivot.rotation.set(0, 0, 0)
        ePivot.rotation.x += speeds[3] * (-Math.PI / 2)
        nPivot.rotation.x += speeds[3] * (-Math.PI / 2)
    }, 1 / speeds[3], starts[2]),
    makeAnimation(() => {
        //ePivot.rotation.set(-Math.PI / 2, 0, 0)
        //aPivot.rotation.set(Math.PI / 2, 0, 0)
        ePivot.rotation.z += speeds[2] * (+Math.PI / 2)
        aPivot.rotation.z += speeds[2] * (-Math.PI / 2)
    }, 1 / speeds[2], starts[3]),
    makeAnimation(() => {
        //nPivot.rotation.set(-Math.PI / 2, 0, 0)
        //gPivot.rotation.set(Math.PI / 2, 0, 0)
        nPivot.rotation.z += speeds[1] * (-Math.PI / 2)
        gPivot.rotation.z += speeds[1] * (+Math.PI / 2)
    }, 1 / speeds[1], starts[4]),
    makeAnimation(() => {
        //ePivot.rotation.set(-Math.PI / 2, 0, Math.PI / 2)
        //gPivot.rotation.set(Math.PI / 2, 0, Math.PI / 2)
        ePivot.rotation.y += speeds[0] * (+Math.PI / 2)
        gPivot.rotation.y += speeds[0] * (-Math.PI / 2)
    }, 1 / speeds[0], starts[5]),
]


let times = 0
let animate = () => {
    for(let anim of animations) {
        if(times > anim.start) {
            anim.run()
        }
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    ++times
}

init()
animate()
let opacity = 0

function fadeFunction() {
   if (opacity < 1) {
      opacity += .1;
      setTimeout(function(){fadeFunction()}, 100);
   }
   document.getElementById("enigma-circle").style.opacity = opacity;
}

let id = setInterval(function(){
  if (animations[5].remaining == 0){
    setTimeout(function(){
      fadeFunction()
    }, speed);
    clearInterval(id)
  }
}, 1000);



let flag = 0

let clean_values = () => {
  speeds = []
  times = 0
  for (let i=0; i<6; i++){
    speeds.push(1/20);
  }
}
