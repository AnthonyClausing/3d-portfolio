import './style.css'

import *  as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { TextureLoader } from 'three'

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
const material = new THREE.MeshStandardMaterial({color: 0x306ac3})
const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper,gridHelper)

function addStar(){ 
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const controls = new OrbitControls(camera,renderer.domElement)


//Can pass a callback function to .load 
//to be notified when image is done loading
//useful if you want a loading bar because your scene relies on a lot of static assets
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg')
scene.background = spaceTexture

//Avatar
const meTexture = new THREE.TextureLoader().load('images/me.jpg')

const me = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1), 
  new THREE.MeshBasicMaterial({map: meTexture})
)
scene.add(me)


const fireBallTexture = new THREE.TextureLoader().load('images/fire.jpg')
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg')
const fireBall = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: fireBallTexture, normalMap: normalTexture})
)

scene.add(fireBall)
fireBall.position.z = 30
fireBall.position.setX(-10)


function moveCamera(){
  const t = document.body.getBoundingClientRect().top
  fireBall.rotation.x += 0.05
  fireBall.rotation.y += 0.075
  fireBall.rotation.z += 0.05
  
  me.rotation.y += 0.01
  me.rotation.z += 0.01

  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
  camera.position.z = t * -0.01

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  
  controls.update()


  renderer.render(scene, camera)
}

animate()