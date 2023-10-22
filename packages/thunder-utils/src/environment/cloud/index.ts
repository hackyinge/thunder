import type { Scene } from 'thunder-3d'
import { BufferGeometryUtils, Fog, LinearMipMapLinearFilter, Mesh, PlaneGeometry, ShaderMaterial, TextureLoader } from 'thunder-3d'
import { cloudBase64 } from './cloud'

const vertexShader = `
  varying vec2 vUv; 
        void main() { 
            vUv = uv; 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = `
        uniform sampler2D map; 
        uniform vec3 fogColor; 
        uniform float fogNear; 
        uniform float fogFar; 
        varying vec2 vUv; 
        void main() {
             float depth = gl_FragCoord.z / gl_FragCoord.w; 
             float fogFactor = smoothstep( fogNear, fogFar, depth ); gl_FragColor = texture2D(
            map, vUv ); 
            gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 ); 
            gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor ); 
        }
`

const createCloud = (scene: Scene) => {
  const geometries = []
  const texture = new TextureLoader().load(cloudBase64)

  // @ts-ignore
  texture.magFilter = LinearMipMapLinearFilter
  texture.minFilter = LinearMipMapLinearFilter

  const fog = new Fog(0x4584B4, -100, 3000)

  const material = new ShaderMaterial({
    uniforms: {
      map: {
        value: texture,
      },
      fogColor: {
        value: fog.color,
      },
      fogNear: {
        value: fog.near,
      },
      fogFar: {
        value: fog.far,
      },
    },
    vertexShader,
    fragmentShader,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  })

  // cloud density
  for (let i = 0; i < 8000; i++) {
    const plane = new PlaneGeometry(64, 64)

    plane.translate(Math.random() * 1000 - 500, -Math.random() * Math.random() * 200 - 15, i)
    // plane.rotateZ(Math.random() * Math.PI / 2)
    plane.scale(Math.random() * Math.random() * 1.1 + 0.5, Math.random() * Math.random() * 1.1 + 0.5, 1)
    geometries.push(plane)
  }

  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries, false)
  const mesh = new Mesh(mergedGeometry, material)
  scene.add(mesh)

  const mesh2 = new Mesh(mergedGeometry, material)
  mesh.position.z = -1000
  scene.add(mesh2)
}

export default createCloud