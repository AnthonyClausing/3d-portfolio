import './style.css'

import *  as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1,1000) //fieldOfView, aspectRatio, last two are view frustum controls which objects are visible relative to the camera 

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('bg'),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})

const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.translateY(0.1);
  renderer.render(scene, camera)
}

animate()