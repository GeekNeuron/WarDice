/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
import { WebGLRenderTarget } from './renderers/WebGLRenderTarget.js';
import { WebGLRenderer } from './renderers/WebGLRenderer.js';
import { ShaderLib } from './renderers/shaders/ShaderLib.js';
import { UniformsLib } from './renderers/shaders/UniformsLib.js';
import { UniformsUtils } from './renderers/shaders/UniformsUtils.js';
import { ShaderChunk } from './renderers/shaders/ShaderChunk.js';
import { Scene } from './scenes/Scene.js';
import { Fog } from './scenes/Fog.js';
import { FogExp2 } from './scenes/FogExp2.js';
import { Color } from './math/Color.js';
import { ColorManagement } from './math/ColorManagement.js';
import { Vector2 } from './math/Vector2.js';
import { Vector3 } from './math/Vector3.js';
import { Vector4 } from './math/Vector4.js';
import { Matrix3 } from './math/Matrix3.js';
import { Matrix4 } from './math/Matrix4.js';
import { Quat } from './math/Quaternion.js';
import { Euler } from './math/Euler.js';
import { MathUtils } from './math/MathUtils.js';
import { Spherical } from './math/Spherical.js';
import { Cylindrical } from './math/Cylindrical.js';
import { Ray } from './math/Ray.js';
import { Frustum } from './math/Frustum.js';
import { Sphere } from './math/Sphere.js';
import { Box3 } from './math/Box3.js';
import { Plane } from './math/Plane.js';
import { Line3 } from './math/Line3.js';
import { Triangle } from './math/Triangle.js';
import { Object3D } from './core/Object3D.js';
import { Raycaster } from './core/Raycaster.js';
import { Layers } from './core/Layers.js';
import { EventDispatcher } from './core/EventDispatcher.js';
import { BufferGeometry } from './core/BufferGeometry.js';
import { InstancedBufferGeometry } from './core/InstancedBufferGeometry.js';
import { InterleavedBufferAttribute } from './core/InterleavedBufferAttribute.js';
import { InstancedInterleavedBuffer } from './core/InstancedInterleavedBuffer.js';
import { BufferAttribute, Int8BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Int16BufferAttribute, Uint16BufferAttribute, Int32BufferAttribute, Uint32BufferAttribute, Float16BufferAttribute, Float32BufferAttribute, Float64BufferAttribute } from './core/BufferAttribute.js';
import { InstancedBufferAttribute } from './core/InstancedBufferAttribute.js';
import { GLBufferAttribute } from './core/GLBufferAttribute.js';
import { Face3 } from './core/Face3.js';
import { Clock } from './core/Clock.js';
import { Camera } from './cameras/Camera.js';
import { PerspectiveCamera } from './cameras/PerspectiveCamera.js';
import { OrthographicCamera } from './cameras/OrthographicCamera.js';
import { CubeCamera } from './cameras/CubeCamera.js';
import { ArrayCamera } from './cameras/ArrayCamera.js';
import { StereoCamera } from './cameras/StereoCamera.js';
import { NoToneMapping, ToneMapping, ACESFilmicToneMapping, CineonToneMapping, LinearToneMapping, ReinhardToneMapping, CustomToneMapping } from './constants.js';
import { Material } from './materials/Material.js';
import { MeshPhysicalMaterial } from './materials/MeshPhysicalMaterial.js';
import { MeshStandardMaterial } from './materials/MeshStandardMaterial.js';
import { MeshPhongMaterial } from './materials/MeshPhongMaterial.js';
import { MeshToonMaterial } from './materials/MeshToonMaterial.js';
import { MeshNormalMaterial } from './materials/MeshNormalMaterial.js';
import { MeshLambertMaterial } from './materials/MeshLambertMaterial.js';
import { MeshDepthMaterial } from './materials/MeshDepthMaterial.js';
import { MeshDistanceMaterial } from './materials/MeshDistanceMaterial._js';
import { MeshBasicMaterial } from './materials/MeshBasicMaterial.js';
import { MeshMatcapMaterial } from './materials/MeshMatcapMaterial.js';
import { ShadowMaterial } from './materials/ShadowMaterial.js';
import { SpriteMaterial } from './materials/SpriteMaterial.js';
import { RawShaderMaterial } from './materials/RawShaderMaterial.js';
import { ShaderMaterial } from './materials/ShaderMaterial.js';
import { PointsMaterial } from './materials/PointsMaterial.js';
import { LineBasicMaterial } from './materials/LineBasicMaterial.js';
import { LineDashedMaterial } from './materials/LineDashedMaterial.js';
import { Texture } from './textures/Texture.js';
import { VideoTexture } from './textures/VideoTexture.js';
import { FramebufferTexture } from './textures/FramebufferTexture.js';
import { Source } from './textures/Source.js';
import { DataTexture } from './textures/DataTexture.js';
import { DataArrayTexture } from './textures/DataArrayTexture.js';
import { Data3DTexture } from './textures/Data3DTexture.js';
import { CompressedTexture } from './textures/CompressedTexture.js';
import { CompressedArrayTexture } from './textures/CompressedArrayTexture.js';
import { Compressed3DTexture } from './textures/Compressed3DTexture.js';
import { CubeTexture } from './textures/CubeTexture.js';
import { CanvasTexture } from './textures/CanvasTexture.js';
import { DepthTexture } from './textures/DepthTexture.js';
import { InstancedMesh } from './objects/InstancedMesh.js';
import { SkinnedMesh } from './objects/SkinnedMesh.js';
import { Mesh } from './objects/Mesh.js';
import { LOD } from './objects/LOD.js';
import { Line } from './objects/Line.js';
import { LineLoop } from './objects/LineLoop.js';
import { LineSegments } from './objects/LineSegments.js';
import { Points } from './objects/Points.js';
import { Sprite } from './objects/Sprite.js';
import { Group } from './objects/Group.js';
import { Bone } from './objects/Bone.js';
import { Skeleton } from './objects/Skeleton.js';
import { SkeletonHelper } from './helpers/SkeletonHelper.js';
import { SpotLightHelper } from './helpers/SpotLightHelper.js';
import { PointLightHelper } from './helpers/PointLightHelper.js';
import { HemisphereLightHelper } from './helpers/HemisphereLightHelper.js';
import { GridHelper } from './helpers/GridHelper.js';
import { PolarGridHelper } from './helpers/PolarGridHelper.js';
import { DirectionalLightHelper } from './helpers/DirectionalLightHelper.js';
import { CameraHelper } from './helpers/CameraHelper.js';
import { BoxHelper } from './helpers/BoxHelper.js';
import { Box3Helper } from './helpers/Box3Helper.js';
import { PlaneHelper } from './helpers/PlaneHelper.js';
import { ArrowHelper } from './helpers/ArrowHelper.js';
import { AxesHelper } from './helpers/AxesHelper.js';
import { Light } from './lights/Light.js';
import { SpotLight } from './lights/SpotLight.js';
import { SpotLightShadow } from './lights/SpotLightShadow.js';
import { PointLight } from './lights/PointLight.js';
import { RectAreaLight } from './lights/RectAreaLight.js';
import { HemisphereLight } from './lights/HemisphereLight.js';
import { DirectionalLight } from './lights/DirectionalLight.js';
import { DirectionalLightShadow } from './lights/DirectionalLightShadow.js';
import { AmbientLight } from './lights/AmbientLight.js';
import { LightShadow } from './lights/LightShadow.js';
import { LightProbe } from './lights/LightProbe.js';
import { AmbientLightProbe } from './lights/AmbientLightProbe.js';
import { HemisphereLightProbe } from './lights/HemisphereLightProbe.js';
import { ImageLoader } from './loaders/ImageLoader.js';
import { ImageBitmapLoader } from './loaders/ImageBitmapLoader.js';
import { FileLoader } from './loaders/FileLoader.js';
import { Loader } from './loaders/Loader.js';
import { LoaderUtils } from './loaders/LoaderUtils.js';
import { Cache } from './loaders/Cache.js';
import { AudioLoader } from './loaders/AudioLoader.js';
import { TextureLoader } from './loaders/TextureLoader.js';
import { CubeTextureLoader } from './loaders/CubeTextureLoader.js';
import { DataTextureLoader } from './loaders/DataTextureLoader.js';
import { CompressedTextureLoader } from './loaders/CompressedTextureLoader.js';
import { ObjectLoader } from './loaders/ObjectLoader.js';
import { MaterialLoader } from './loaders/MaterialLoader.js';
import { BufferGeometryLoader } from './loaders/BufferGeometryLoader.js';
import { AnimationLoader } from './loaders/AnimationLoader.js';
import { Audio } from './audio/Audio.js';
import { AudioListener } from './audio/AudioListener.js';
import { PositionalAudio } from './audio/PositionalAudio.js';
import { AudioContext } from './audio/AudioContext.js';
import { AudioAnalyser } from './audio/AudioAnalyser.js';
import { AnimationClip } from './animation/AnimationClip.js';
import { AnimationMixer } from './animation/AnimationMixer.js';
import { AnimationObjectGroup } from './animation/AnimationObjectGroup.js';
import { AnimationUtils } from './animation/AnimationUtils.js';
import { KeyframeTrack } from './animation/KeyframeTrack.js';
import { PropertyMixer } from './animation/PropertyMixer.js';
import { PropertyBinding } from './animation/PropertyBinding.js';
import { NumberKeyframeTrack } from './animation/tracks/NumberKeyframeTrack.js';
import { QuaternionKeyframeTrack } from './animation/tracks/QuaternionKeyframeTrack.js';
import { StringKeyframeTrack } from './animation/tracks/StringKeyframeTrack.js';
import { VectorKeyframeTrack } from './animation/tracks/VectorKeyframeTrack.js';
import { ColorKeyframeTrack } from './animation/tracks/ColorKeyframeTrack.js';
import { BooleanKeyframeTrack } from './animation/tracks/BooleanKeyframeTrack.js';
import { Shape } from './extras/core/Shape.js';
import { Path } from './extras/core/Path.js';
import { ShapePath } from './extras/core/ShapePath.js';
import { Font } from './extras/core/Font.js';
import { Curve } from './extras/core/Curve.js';
import { CurvePath } from './extras/core/CurvePath.js';
import { CatmullRomCurve3 } from './extras/curves/CatmullRomCurve3.js';
import { CubicBezierCurve } from './extras/curves/CubicBezierCurve.js';
import { CubicBezierCurve3 } from './extras/curves/CubicBezierCurve3.js';
import { EllipseCurve } from './extras/curves/EllipseCurve.js';
import { LineCurve } from './extras/curves/LineCurve.js';
import { LineCurve3 } from './extras/curves/LineCurve3.js';
import { QuadraticBezierCurve } from './extras/curves/QuadraticBezierCurve.js';
import { QuadraticBezierCurve3 } from './extras/curves/QuadraticBezierCurve3.js';
import { SplineCurve } from './extras/curves/SplineCurve.js';
import { ArcCurve } from './extras/curves/ArcCurve.js';
import { Grids } from './extras/Grids.js';
import {tubeGeometry} from './extras/TubeGeometry.js';
import { IcosahedronGeometry, IcosahedronBufferGeometry } from './geometries/IcosahedronGeometry.js';
import { CylinderGeometry, CylinderBufferGeometry } from './geometries/CylinderGeometry.js';
import { TorusGeometry, TorusBufferGeometry } from './geometries/TorusGeometry.js';
import { BoxGeometry, BoxBufferGeometry } from './geometries/BoxGeometry.js';
import { SphereGeometry, SphereBufferGeometry } from './geometries/SphereGeometry.js';
import { PlaneGeometry, PlaneBufferGeometry } from './geometries/PlaneGeometry.js';
import { RingGeometry, RingBufferGeometry } from './geometries/RingGeometry.js';
import { CircleGeometry, CircleBufferGeometry } from './geometries/CircleGeometry.js';
import { LatheGeometry, LatheBufferGeometry } from './geometries/LatheGeometry.js';
import { ConeGeometry, ConeBufferGeometry } from './geometries/ConeGeometry.js';
import { DodecahedronGeometry, DodecahedronBufferGeometry } from './geometries/DodecahedronGeometry.js';
import { ExtrudeGeometry, ExtrudeBufferGeometry } from './geometries/ExtrudeGeometry.js';
import { OctahedronGeometry, OctahedronBufferGeometry } from './geometries/OctahedronGeometry.js';
import { PolyhedronGeometry, PolyhedronBufferGeometry } from './geometries/PolyhedronGeometry.js';
import { ShapeGeometry, ShapeBufferGeometry } from './geometries/ShapeGeometry.js';
import { TetrahedronGeometry, TetrahedronBufferGeometry } from './geometries/TetrahedronGeometry.js';
import { TorusKnotGeometry, TorusKnotBufferGeometry } from './geometries/TorusKnotGeometry.js';
import { TubeGeometry, TubeBufferGeometry } from './geometries/TubeGeometry.js';
import { EdgesGeometry } from './geometries/EdgesGeometry.js';
import { WireframeGeometry } from './geometries/WireframeGeometry.js';
import { WebGLCubeRenderTarget } from './renderers/WebGLCubeRenderTarget.js';
import { WebGLArrayRenderTarget } from './renderers/WebGLArrayRenderTarget.js';
import { WebGL3DRenderTarget } from './renderers/WebGL3DRenderTarget.js';
import * as Geometries from './geometries/Geometries.js';
function ColorKeyframeTrack(name, times, values, interpolation) {
  KeyframeTrack.call(this, name, times, values, interpolation);
}
ColorKeyframeTrack.prototype = Object.assign(Object.create(KeyframeTrack.prototype), {
  constructor: ColorKeyframeTrack,
  ValueTypeName: "color",
  ValueBufferType: Float32Array,
  DefaultInterpolation: 2201
});
function tubeGeometry(path, tubularSegments, radius, radialSegments, closed) {
  const frames = path.getFrenetFrames(tubularSegments, closed), tangents = frames.tangents, normals = frames.normals, binormals = frames.binormals;
  const
    vertices = [],
    indices = [];
  function addSegment() {
    let
      u,
      v,
      i,
      j,
      i2;
    for (i = 0; i < tubularSegments; i++) {
      u = i / (tubularSegments - 1);
      const center = path.getPointAt(u);
      for (j = 0; j < radialSegments; j++) {
        v = j / (radialSegments - 1) * Math.PI * 2;
        const
          sin = Math.sin(v),
          cos = -Math.cos(v),
          normal = normals[i],
          binormal = binormals[i],
          vertex = new Vector3();
        vertex.x = center.x + radius * (cos * normal.x + sin * binormal.x);
        vertex.y = center.y + radius * (cos * normal.y + sin * binormal.y);
        vertex.z = center.z + radius * (cos * normal.z + sin * binormal.z);
        vertices.push(vertex.x, vertex.y, vertex.z);
      }
    }
    for (j = 1; j <= tubularSegments; j++) {
      for (i = 1; i <= radialSegments; i++) {
        i2 = i % radialSegments;
        const
          a = (j - 1) * radialSegments + i2,
          b = (j - 1) * radialSegments + (i - 1),
          c = (j % tubularSegments) * radialSegments + (i - 1),
          d = (j % tubularSegments) * radialSegments + i2;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
  }
  addSegment();
  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  bufferGeometry.setIndex(indices);
  return bufferGeometry;
}
class WebGLObjects {
  constructor(gl, geometries, attributes, info) {
    this.gl = gl;
    this.geometries = geometries;
    this.attributes = attributes;
    this.info = info;
    this.updateMap = new WeakMap();
  }
  update(object) {
    const frame = this.info.render.frame;
    const geometry = object.geometry;
    const buffergeometry = this.geometries.get(object, geometry);
    if (this.updateMap.get(buffergeometry) !== frame) {
      this.geometries.update(buffergeometry);
      this.updateMap.set(buffergeometry, frame);
    }
    if (object.isInstancedMesh) {
      this.attributes.update(object.instanceMatrix, this.gl.ARRAY_BUFFER);
      if (object.instanceColor !== null) {
        this.attributes.update(object.instanceColor, this.gl.ARRAY_BUFFER);
      }
    }
    return buffergeometry;
  }
  dispose() {
    this.updateMap = new WeakMap();
  }
}
class WebGLAnimation {
  constructor(gl, attributes, info, objects) {
    this.gl = gl;
    this.attributes = attributes;
    this.info = info;
    this.objects = objects;
    this.cache = new Map();
    this.context = gl.getContext();
    this.isWebGL2 = this.context.isWebGL2;
  }
  update(object, program) {
    const cacheKey = this.getCacheKey(object, program);
    let data = this.cache.get(cacheKey);
    if (data === void 0) {
      data = {
        object,
        program,
        uniforms: {}
      };
      this.cache.set(cacheKey, data);
    }
    if (object.isSkinnedMesh) {
      const skeleton = object.skeleton;
      const skeletonTexture = skeleton.getTexture();
      if (data.uniforms.boneTexture !== skeletonTexture) {
        data.uniforms.boneTexture = skeletonTexture;
      }
    }
    return data;
  }
  getCacheKey(object, program) {
    return `${object.id}:${program.id}`;
  }
  dispose() {
    this.cache.clear();
  }
}
class WebGLMorphtargets {
  constructor(gl, attributes, info, objects) {
    this.gl = gl;
    this.attributes = attributes;
    this.info = info;
    this.objects = objects;
    this.morphInfluences = new Float32Array(8);
    this.cache = new Map();
  }
  update(object, program) {
    const cacheKey = this.getCacheKey(object, program);
    let data = this.cache.get(cacheKey);
    if (data === void 0) {
      const morphTargets = object.morphTargetInfluences;
      const morphAttributes = object.geometry.morphAttributes;
      const morphTargetsCount = morphTargets !== void 0 ? morphTargets.length : 0;
      const morphAttribute = morphAttributes.position || morphAttributes.normal || morphAttributes.color;
      const morphTargetsTexture = morphAttribute !== void 0 && morphAttribute.isMorphTexture ? morphAttribute.texture : null;
      let morphInfluencesSum = 0;
      for (let i = 0; i < morphTargetsCount; i++) {
        morphInfluencesSum += morphTargets[i];
      }
      data = {
        object,
        program,
        uniforms: {
          morphTargetInfluences: this.morphInfluences
        }
      };
      if (morphTargetsTexture !== null) {
        data.uniforms.morphTargetsTexture = morphTargetsTexture;
        data.uniforms.morphTargetsCount = morphTargetsCount;
        data.uniforms.morphTargetsTextureSize = new Vector2(morphTargetsTexture.image.width, morphTargetsTexture.image.height);
      }
      if (morphInfluencesSum > 0) {
        data.uniforms.morphTargetBaseInfluence = morphTargets[0];
        data.uniforms.morphTargetInfluences = this.morphInfluences;
      }
      this.cache.set(cacheKey, data);
    }
    const morphInfluences = object.morphTargetInfluences;
    if (morphInfluences !== void 0) {
      const morphTargetsCount = morphInfluences.length;
      for (let i = 0; i < morphTargetsCount; i++) {
        this.morphInfluences[i] = morphInfluences[i];
      }
    }
    return data;
  }
  getCacheKey(object, program) {
    return `${object.id}:${program.id}`;
  }
  dispose() {
    this.cache.clear();
  }
}
class WebGLPrograms {
  constructor(renderer, extensions, capabilities) {
    this.renderer = renderer;
    this.extensions = extensions;
    this.capabilities = capabilities;
    this.programs = [];
    this.shaderIDs = {
      MeshDepthMaterial: "depth",
      MeshDistanceMaterial: "distance",
      MeshNormalMaterial: "normal",
      MeshBasicMaterial: "basic",
      MeshLambertMaterial: "lambert",
      MeshPhongMaterial: "phong",
      MeshToonMaterial: "toon",
      MeshStandardMaterial: "standard",
      MeshPhysicalMaterial: "physical",
      MeshMatcapMaterial: "matcap",
      LineBasicMaterial: "basic",
      LineDashedMaterial: "dashed",
      PointsMaterial: "points",
      ShadowMaterial: "shadow",
      SpriteMaterial: "sprite"
    };
    this.vertexShader = `
precision highp float;
precision highp int;
#define SHADER_NAME ShaderMaterial
#define VERTEX_SHADER
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define LOG2 1.4426950408889634
#define EPSILON 1e-6
#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
vec3 R_Lambert( const in vec3 lightDir, const in vec3 normal ) {
	return saturate( dot( lightDir, normal ) ) * RECIPROCAL_PI;
}
vec3 D_Lambert( const in vec3 lightDir, const in vec3 normal ) {
	return saturate( dot( lightDir, normal ) ) * RECIPROCAL_PI * vec3(1.0);
}
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
vec3 R_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in BlinnPhongMaterial material ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( material.specularShininess, dotNH );
	return F * G * D;
}
vec3 D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess ) * RECIPROCAL_PI;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
vec3 F_Schlick( const in vec3 f0, const in float dotVH ) {
	float f = pow( 1.0 - dotVH, 5.0 );
	return f + f0 * ( 1.0 - f );
}
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
in vec3 position;
in vec3 normal;
in vec2 uv;
in vec2 uv1;
#ifdef USE_COLOR
	in vec3 color;
#endif
#ifdef USE_MORPHTARGETS
	in float morphTarget0;
	in float morphTarget1;
	in float morphTarget2;
	in float morphTarget3;
	#ifdef USE_MORPHNORMALS
		in vec3 morphNormal0;
		in vec3 morphNormal1;
		in vec3 morphNormal2;
		in vec3 morphNormal3;
	#else
		in float morphTarget4;
		in float morphTarget5;
		in float morphTarget6;
		in float morphTarget7;
	#endif
#endif
#ifdef USE_SKINNING
	in vec4 skinIndex;
	in vec4 skinWeight;
#endif
#ifdef USE_INSTANCING
	in mat4 instanceMatrix;
#endif
#ifdef USE_INSTANCING_COLOR
	in vec3 instanceColor;
#endif
`;
    this.fragmentShader = `
precision highp float;
precision highp int;
#define SHADER_NAME ShaderMaterial
#define FRAGMENT_SHADER
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define LOG2 1.4426950408889634
#define EPSILON 1e-6
#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
vec3 R_Lambert( const in vec3 lightDir, const in vec3 normal ) {
	return saturate( dot( lightDir, normal ) ) * RECIPROCAL_PI;
}
vec3 D_Lambert( const in vec3 lightDir, const in vec3 normal ) {
	return saturate( dot( lightDir, normal ) ) * RECIPROCAL_PI * vec3(1.0);
}
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
vec3 R_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in BlinnPhongMaterial material ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( material.specularShininess, dotNH );
	return F * G * D;
}
vec3 D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess ) * RECIPROCAL_PI;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
vec3 F_Schlick( const in vec3 f0, const in float dotVH ) {
	float f = pow( 1.0 - dotVH, 5.0 );
	return f + f0 * ( 1.0 - f );
}
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
`;
  }
  getProgramCacheKey(parameters) {
    const array = [];
    if (parameters.shaderID) {
      array.push(parameters.shaderID);
    } else {
      array.push(parameters.fragmentShader);
      array.push(parameters.vertexShader);
    }
    if (parameters.defines !== void 0) {
      for (const name in parameters.defines) {
        array.push(name);
        array.push(parameters.defines[name]);
      }
    }
    if (parameters.isRawShaderMaterial === void 0) {
      this.getProgramCacheKey_old(parameters, array);
    }
    array.push(this.renderer.outputColorSpace);
    return array.join();
  }
  getProgramCacheKey_old(parameters, array) {
    if (parameters.supportsVertexTextures !== void 0) {
      array.push("vertexTextures");
      array.push(parameters.supportsVertexTextures ? 1 : 0);
    }
    array.push(parameters.instancing ? 1 : 0);
    array.push(parameters.instancingColor ? 1 : 0);
  }
  getParameters(material, lights, shadows, scene, object) {
    const fog = scene.fog;
    const environment = material.isMeshStandardMaterial ? scene.environment : null;
    const envMap = (material.isMeshStandardMaterial ? this.renderer.getEnvironmentMap(environment) : null) || material.envMap || (material.isMeshStandardMaterial ? this.renderer.getEnvironmentMap(scene.environment) : null);
    const shaderID = this.shaderIDs[material.type];
    if (material.isShaderMaterial) {
      shaderID = material.vertexShader;
    }
    const vertexShader = material.isShaderMaterial ? material.vertexShader : ShaderLib[shaderID].vertexShader;
    const fragmentShader = material.isShaderMaterial ? material.fragmentShader : ShaderLib[shaderID].fragmentShader;
    const defines = material.defines;
    const customVertexShader = material.customVertexShader;
    const customFragmentShader = material.customFragmentShader;
    const customProgramCacheKey = material.customProgramCacheKey;
    const instanced = object.isInstancedMesh;
    const instancedColor = instanced && object.instanceColor && object.instanceColor.isInstancedBufferAttribute;
    let vertexNeeds = "";
    if (material.isMeshBasicMaterial)
      vertexNeeds += "uv ";
    if (material.isMeshLambertMaterial || material.isMeshPhongMaterial || material.isMeshToonMaterial || material.isMeshStandardMaterial || material.isMeshPhysicalMaterial)
      vertexNeeds += "normal ";
    if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
      if (material.map)
        vertexNeeds += "uv ";
      if (material.aoMap)
        vertexNeeds += "uv ";
      if (material.lightMap)
        vertexNeeds += "uv ";
      if (material.emissiveMap)
        vertexNeeds += "uv ";
      if (material.bumpMap)
        vertexNeeds += "uv normal ";
      if (material.normalMap)
        vertexNeeds += "uv normal tangent ";
      if (material.displacementMap)
        vertexNeeds += "uv ";
      if (material.roughnessMap)
        vertexNeeds += "uv ";
      if (material.metalnessMap)
        vertexNeeds += "uv ";
      if (material.alphaMap)
        vertexNeeds += "uv ";
      if (material.transmissionMap)
        vertexNeeds += "uv ";
      if (material.thicknessMap)
        vertexNeeds += "uv ";
      if (material.clearcoatMap)
        vertexNeeds += "uv ";
      if (material.clearcoatNormalMap)
        vertexNeeds += "uv normal tangent ";
      if (material.clearcoatRoughnessMap)
        vertexNeeds += "uv ";
      if (material.sheenColorMap)
        vertexNeeds += "uv ";
      if (material.sheenRoughnessMap)
        vertexNeeds += "uv ";
      if (material.iridescenceMap)
        vertexNeeds += "uv ";
      if (material.iridescenceThicknessMap)
        vertexNeeds += "uv ";
      if (material.specularIntensityMap)
        vertexNeeds += "uv ";
      if (material.specularColorMap)
        vertexNeeds += "uv ";
    }
    const vertexShaderParts = [];
    if (vertexNeeds.includes("uv"))
      vertexShaderParts.push(ShaderChunk.uv_pars_vertex);
    if (vertexNeeds.includes("normal"))
      vertexShaderParts.push(ShaderChunk.normal_pars_vertex);
    if (vertexNeeds.includes("tangent"))
      vertexShaderParts.push(ShaderChunk.tangent_pars_vertex);
    const fragmentShaderParts = [];
    if (vertexNeeds.includes("uv"))
      fragmentShaderParts.push(ShaderChunk.uv_pars_fragment);
    if (vertexNeeds.includes("normal"))
      fragmentShaderParts.push(ShaderChunk.normal_pars_fragment);
    const parameters = {
      isShaderMaterial: material.isShaderMaterial,
      isRawShaderMaterial: material.isRawShaderMaterial,
      shaderID,
      vertexShader,
      fragmentShader,
      defines,
      customVertexShader,
      customFragmentShader,
      customProgramCacheKey,
      instancing: instanced,
      instancingColor: instancedColor,
      vertexNeeds,
      vertexShaderParts,
      fragmentShaderParts
    };
    return parameters;
  }
  acquireProgram(parameters, cacheKey) {
    let program;
    for (let p = 0, pl = this.programs.length; p < pl; p++) {
      const preexistingProgram = this.programs[p];
      if (preexistingProgram.cacheKey === cacheKey) {
        program = preexistingProgram;
        ++program.usedTimes;
        break;
      }
    }
    if (program === void 0) {
      program = new WebGLProgram(this.renderer, cacheKey, parameters, this.extensions, this.capabilities);
      this.programs.push(program);
    }
    return program;
  }
  releaseProgram(program) {
    if (--program.usedTimes === 0) {
      const i = this.programs.indexOf(program);
      this.programs[i] = this.programs[this.programs.length - 1];
      this.programs.pop();
      program.destroy();
    }
  }
  dispose() {
    this.programs.forEach(function(program) {
      program.destroy();
    });
    this.programs.length = 0;
  }
}
let programId = 0;
class WebGLProgram {
  constructor(renderer, cacheKey, parameters, extensions, capabilities) {
    this.id = programId++;
    this.cacheKey = cacheKey;
    this.usedTimes = 1;
    this.program = null;
    this.vertexShader = null;
    this.fragmentShader = null;
    this.renderer = renderer;
    this.extensions = extensions;
    this.capabilities = capabilities;
    const defines = parameters.defines;
    let vertexShader = parameters.vertexShader;
    let fragmentShader = parameters.fragmentShader;
    let shadowMapEnabled = renderer.shadowMap.enabled && parameters.shadowMapEnabled;
    let useFog = parameters.fog;
    let fogExp2 = useFog && parameters.fogExp2;
    let fogLinear = useFog && parameters.fogLinear;
    let toneMapping = parameters.toneMapping;
    let vertexShaderParts = parameters.vertexShaderParts;
    let fragmentShaderParts = parameters.fragmentShaderParts;
    let customVertexShader = parameters.customVertexShader;
    let customFragmentShader = parameters.customFragmentShader;
    let isRawShaderMaterial = parameters.isRawShaderMaterial === true;
    let shaderName = parameters.shaderName;
    let instancing = parameters.instancing;
    let instancingColor = parameters.instancingColor;
    let vertexNeeds = parameters.vertexNeeds;
    let prefixVertex, prefixFragment;
    if (isRawShaderMaterial) {
      prefixVertex = [
        "#version 300 es",
        "precision " + capabilities.precision + " float;",
        "precision " + capabilities.precision + " int;",
        "#define SHADER_NAME " + shaderName,
        ...Object.keys(defines).map((name) => "#define " + name + " " + defines[name]),
        ...vertexShaderParts,
        customVertexShader || ""
      ].join("\n");
      prefixFragment = [
        "#version 300 es",
        "precision " + capabilities.precision + " float;",
        "precision " + capabilities.precision + " int;",
        "#define SHADER_NAME " + shaderName,
        ...Object.keys(defines).map((name) => "#define " + name + " " + defines[name]),
        ...fragmentShaderParts,
        customFragmentShader || ""
      ].join("\n");
    } else {
      prefixVertex = [
        "precision " + capabilities.precision + " float;",
        "precision " + capabilities.precision + " int;",
        "#define SHADER_NAME " + shaderName,
        ...Object.keys(defines).map((name) => "#define " + name + " " + defines[name]),
        shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        shadowMapEnabled ? "#define SHADOWMAP_TYPE_PCF_SOFT" : "",
        useFog && fogExp2 ? "#define USE_FOG" : "",
        useFog && fogExp2 ? "#define FOG_EXP2" : "",
        useFog && fogLinear ? "#define USE_FOG" : "",
        instancing ? "#define USE_INSTANCING" : "",
        instancingColor ? "#define USE_INSTANCING_COLOR" : "",
        ...vertexShaderParts,
        customVertexShader || ""
      ].join("\n");
      prefixFragment = [
        "precision " + capabilities.precision + " float;",
        "precision " + capabilities.precision + " int;",
        "#define SHADER_NAME " + shaderName,
        ...Object.keys(defines).map((name) => "#define " + name + " " + defines[name]),
        shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
        useFog && fogExp2 ? "#define USE_FOG" : "",
        useFog && fogExp2 ? "#define FOG_EXP2" : "",
        useFog && fogLinear ? "#define USE_FOG" : "",
        toneMapping !== NoToneMapping ? "#define TONE_MAPPING " + toneMapping : "",
        ...fragmentShaderParts,
        customFragmentShader || ""
      ].join("\n");
    }
    vertexShader = prefixVertex + "\n" + vertexShader;
    fragmentShader = prefixFragment + "\n" + fragmentShader;
    const gl = renderer.getContext();
    const glVertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(glVertexShader, vertexShader);
    gl.compileShader(glVertexShader);
    const glFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(glFragmentShader, fragmentShader);
    gl.compileShader(glFragmentShader);
    const program = gl.createProgram();
    gl.attachShader(program, glVertexShader);
    gl.attachShader(program, glFragmentShader);
    gl.linkProgram(program);
    this.program = program;
    this.vertexShader = glVertexShader;
    this.fragmentShader = glFragmentShader;
  }
  getUniforms() {
    if (this.cachedUniforms === void 0) {
      this.cachedUniforms = new WebGLUniforms(this.program, this.renderer);
    }
    return this.cachedUniforms;
  }
  getAttributes() {
    if (this.cachedAttributes === void 0) {
      this.cachedAttributes = this.fetchAttributes();
    }
    return this.cachedAttributes;
  }
  destroy() {
    const gl = this.renderer.getContext();
    gl.deleteProgram(this.program);
    this.program = null;
  }
  fetchAttributes() {
    const attributes = {};
    const gl = this.renderer.getContext();
    const n = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveAttrib(this.program, i);
      const name = info.name;
      attributes[name] = gl.getAttribLocation(this.program, name);
    }
    return attributes;
  }
}
class WebGLUniforms {
  constructor(program, renderer) {
    this.program = program;
    this.renderer = renderer;
    this.seq = [];
    this.map = {};
    const gl = renderer.getContext();
    const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const info = gl.getActiveUniform(program, i), addr = gl.getUniformLocation(program, info.name);
      parseUniform(info, addr, this);
    }
  }
  setValue(gl, name, value, textures) {
    const u = this.map[name];
    if (u !== void 0)
      u.setValue(gl, value, textures);
  }
  set(gl, object, name) {
    const u = this.map[name];
    if (u !== void 0)
      u.setValue(gl, object[name], this.renderer.textures);
  }
  setOptional(gl, object, name) {
    const u = this.map[name];
    if (u !== void 0 && object[name] !== void 0)
      u.setValue(gl, object[name], this.renderer.textures);
  }
  staticupload(gl, seq, values, textures) {
    for (let i = 0, n = seq.length; i !== n; ++i) {
      const u = seq[i], v = values[u.id];
      if (v.needsUpdate !== false) {
        u.setValue(gl, v.value, textures);
      }
    }
  }
  staticseqWithValue(seq, values) {
    const r = [];
    for (let i = 0, n = seq.length; i !== n; ++i) {
      const u = seq[i];
      if (u.id in values)
        r.push(u);
    }
    return r;
  }
}
function parseUniform(info, addr, container) {
  const gl = container.renderer.getContext();
  const path = info.name, pathLength = path.length;
  const regExp = /([\w\d_]+)(\])?(\[|\.)?/g;
  let match, indice, name, address, uniforms, uniform;
  while ((match = regExp.exec(path)) !== null && match.index < pathLength) {
    indice = match[1];
    if (match[2] === "]") {
      name = match[1];
      uniforms[name].setValue = function(gl, value) {
        if (Array.isArray(value)) {
          for (let i = 0, l = value.length; i < l; i++) {
            const element = value[i];
            const UniformSub = this.Uniforms[i] || (this.Uniforms[i] = new this.Uniform(gl, this.id + "[" + i + "]", this.addr));
            UniformSub.setValue(gl, element);
          }
        }
      };
    } else if (match[3] === "[") {
      name = match[1];
      address = gl.getUniformLocation(container.program, name + "[0]");
      uniform = new StructuredUniform(name, address, info.type, info.size, gl, container.renderer);
    } else if (match[3] === ".") {
      name = match[1];
      address = gl.getUniformLocation(container.program, name);
      uniform = new PureArrayUniform(name, address, info.type, info.size, gl, container.renderer);
    } else {
      name = match[1];
      address = addr;
      uniform = new SingleUniform(name, address, info.type, info.size, gl, container.renderer);
    }
    uniforms = container.map[name] = uniform;
    container.seq.push(uniform);
  }
}
function Reinterpret(type, size, gl) {
  let setter, array;
  switch (type) {
    case gl.FLOAT:
      setter = gl.uniform1fv;
      array = new Float32Array(1 * size);
      break;
    case gl.FLOAT_VEC2:
      setter = gl.uniform2fv;
      array = new Float32Array(2 * size);
      break;
    case gl.FLOAT_VEC3:
      setter = gl.uniform3fv;
      array = new Float32Array(3 * size);
      break;
    case gl.FLOAT_VEC4:
      setter = gl.uniform4fv;
      array = new Float32Array(4 * size);
      break;
    case gl.FLOAT_MAT2:
      setter = gl.uniformMatrix2fv;
      array = new Float32Array(4 * size);
      break;
    case gl.FLOAT_MAT3:
      setter = gl.uniformMatrix3fv;
      array = new Float32Array(9 * size);
      break;
    case gl.FLOAT_MAT4:
      setter = gl.uniformMatrix4fv;
      array = new Float32Array(16 * size);
      break;
    case gl.INT:
    case gl.BOOL:
    case gl.SAMPLER_2D:
    case gl.SAMPLER_CUBE:
    case 5124:
      setter = gl.uniform1iv;
      array = new Int32Array(1 * size);
      break;
    case gl.INT_VEC2:
    case gl.BOOL_VEC2:
      setter = gl.uniform2iv;
      array = new Int32Array(2 * size);
      break;
    case gl.INT_VEC3:
    case gl.BOOL_VEC3:
      setter = gl.uniform3iv;
      array = new Int32Array(3 * size);
      break;
    case gl.INT_VEC4:
    case gl.BOOL_VEC4:
      setter = gl.uniform4iv;
      array = new Int32Array(4 * size);
      break;
  }
  return {
    setValue: function(gl, value) {
      if (Array.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i++) {
          const e = value[i];
          if (e.isColor) {
            array.set(e.toArray(), i * 3);
          } else if (e.isVector3) {
            array.set(e.toArray(), i * 3);
          } else {
            array[i] = e;
          }
        }
      } else {
        if (value.isColor) {
          array.set(value.toArray());
        } else if (value.isVector3) {
          array.set(value.toArray());
        } else {
          array[0] = value;
        }
      }
      setter.call(gl, this.addr, array);
    }
  };
}
class SingleUniform {
  constructor(id, addr, type, size, gl, renderer) {
    this.id = id;
    this.addr = addr;
    this.cache = [];
    this.renderer = renderer;
    this.setValue = Reinterpret(type, size, gl).setValue;
  }
}
class PureArrayUniform {
  constructor(id, addr, type, size, gl, renderer) {
    this.id = id;
    this.addr = addr;
    this.cache = [];
    this.size = size;
    this.renderer = renderer;
    this.setValue = Reinterpret(type, size, gl).setValue;
  }
}
class StructuredUniform {
  constructor(id, addr, type, size, gl, renderer) {
    this.id = id;
    this.addr = addr;
    this.cache = [];
    this.renderer = renderer;
    this.seq = [];
    this.map = {};
    const path = this.id, pathLength = path.length;
    const regExp = /([\w\d_]+)(\])?(\[|\.)?/g;
    let match, indice, name, address, uniforms, uniform;
    while ((match = regExp.exec(path)) !== null && match.index < pathLength) {
      indice = match[1];
      if (match[2] === "]") {
        name = match[1];
        uniforms[name].setValue = function(gl, value) {
          if (Array.isArray(value)) {
            for (let i = 0, l = value.length; i < l; i++) {
              const element = value[i];
              const UniformSub = this.Uniforms[i] || (this.Uniforms[i] = new this.Uniform(gl, this.id + "[" + i + "]", this.addr));
              UniformSub.setValue(gl, element);
            }
          }
        };
      } else {
        name = match[1];
        address = gl.getUniformLocation(renderer.program, name);
        uniform = new SingleUniform(name, address, type, size, gl, renderer);
        this.map[name] = uniform;
        this.seq.push(uniform);
      }
    }
  }
  setValue(gl, value) {
    const seq = this.seq;
    for (let i = 0, n = seq.length; i !== n; ++i) {
      const u = seq[i];
      u.setValue(gl, value[u.id]);
    }
  }
}
class WebGLShader {
  constructor(gl, type, string) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, string);
    gl.compileShader(shader);
    this.shader = shader;
  }
}
class WebGLState {
  constructor(gl, extensions, capabilities) {
    this.gl = gl;
    this.extensions = extensions;
    this.capabilities = capabilities;
    this.states = {};
    this.currentProgram = null;
    this.currentMaterialId = -1;
    this.currentGeometryProgram = "";
    this.currentRenderTarget = null;
    this.currentActiveTexture = null;
    this.currentBoundTextures = {};
    this.currentScissor = new Vector4();
    this.currentScissorTest = null;
    this.currentViewport = new Vector4();
  }
  init() {
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 4);
    this.setProgram(null);
  }
  setProgram(program) {
    if (this.currentProgram !== program) {
      this.gl.useProgram(program);
      this.currentProgram = program;
      return true;
    }
    return false;
  }
  activeTexture(webglSlot) {
    if (this.currentActiveTexture !== webglSlot) {
      this.gl.activeTexture(webglSlot);
      this.currentActiveTexture = webglSlot;
    }
  }
  bindTexture(webglType, webglTexture, webglSlot) {
    const boundTexture = this.currentBoundTextures[webglSlot];
    if (boundTexture === void 0 || boundTexture.type !== webglType || boundTexture.texture !== webglTexture) {
      this.activeTexture(this.gl.TEXTURE0 + webglSlot);
      this.gl.bindTexture(webglType, webglTexture);
      this.currentBoundTextures[webglSlot] = {
        type: webglType,
        texture: webglTexture
      };
    }
  }
  unbindTexture() {
    const boundTexture = this.currentBoundTextures[this.currentActiveTexture - this.gl.TEXTURE0];
    if (boundTexture !== void 0) {
      this.gl.bindTexture(boundTexture.type, null);
      this.currentBoundTextures[this.currentActiveTexture - this.gl.TEXTURE0] = void 0;
    }
  }
  scissor(scissor) {
    if (this.currentScissor.equals(scissor) === false) {
      this.gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
      this.currentScissor.copy(scissor);
    }
  }
  setScissorTest(scissorTest) {
    if (this.currentScissorTest !== scissorTest) {
      if (scissorTest) {
        this.gl.enable(this.gl.SCISSOR_TEST);
      } else {
        this.gl.disable(this.gl.SCISSOR_TEST);
      }
      this.currentScissorTest = scissorTest;
    }
  }
  viewport(viewport) {
    if (this.currentViewport.equals(viewport) === false) {
      this.gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
      this.currentViewport.copy(viewport);
    }
  }
  reset() {
    for (let i = 0; i < this.currentBoundTextures.length; i++) {
      const boundTexture = this.currentBoundTextures[i];
      if (boundTexture !== void 0) {
        this.activeTexture(this.gl.TEXTURE0 + i);
        this.gl.bindTexture(boundTexture.type, null);
      }
    }
    this.currentProgram = null;
    this.currentMaterialId = -1;
    this.currentGeometryProgram = "";
  }
}
class WebGLTextures {
  constructor(gl, extensions, state, properties, capabilities, utils, info) {
    this.gl = gl;
    this.extensions = extensions;
    this.state = state;
    this.properties = properties;
    this.capabilities = capabilities;
    this.utils = utils;
    this.info = info;
    this.textureUnit = 0;
  }
  allocateTextureUnit() {
    const textureUnit = this.textureUnit;
    if (textureUnit >= this.capabilities.maxTextures) {
      console.warn("WebGLRenderer: Trying to use " + textureUnit + " texture units while this GPU supports only " + this.capabilities.maxTextures);
    }
    this.textureUnit += 1;
    return textureUnit;
  }
  resetTextureUnits() {
    this.textureUnit = 0;
  }
  setTexture2D(texture, slot) {
    const textureProperties = this.properties.get(texture);
    if (texture.isVideoTexture)
      this.updateVideoTexture(texture);
    if (texture.isFramebufferTexture)
      ;
    else {
      if (textureProperties.__webglInit === void 0) {
        textureProperties.__webglInit = true;
        texture.addEventListener("dispose", this.onTextureDispose);
      }
      if (textureProperties.__webglTexture === void 0) {
        textureProperties.__webglTexture = this.gl.createTexture();
        this.info.memory.textures++;
      }
    }
    this.state.activeTexture(this.gl.TEXTURE0 + slot);
    this.state.bindTexture(this.gl.TEXTURE_2D, textureProperties.__webglTexture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    const image = texture.image;
    if (image !== null) {
      const isRenderable = this.isRenderable(image);
      const isVideo = texture.isVideoTexture;
      if (isRenderable || isVideo) {
        const mipmaps = texture.mipmaps;
        let level = 0;
        let internalFormat = this.utils.convert(texture.format, texture.colorSpace);
        let glFormat = this.utils.convert(texture.format);
        let glType = this.utils.convert(texture.type);
        this.setTextureParameters(this.gl.TEXTURE_2D, texture);
        if (texture.isCompressedTexture) {
          for (let i = 0, l = mipmaps.length; i < l; i++) {
            const mipmap = mipmaps[i];
            if (texture.format !== 33776) {
              if (texture.format !== void 0) {
                if (this.gl.compressedTexImage2D !== void 0) {
                  this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, level, internalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
                } else {
                  console.warn("WebGLRenderer: Attempt to load compressed texture format '" + texture.format + "' rejected by compressed texture extension.");
                }
              }
            } else {
              this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, level, internalFormat, mipmap.width, mipmap.height, 0, mipmap.data);
            }
            level++;
          }
        } else {
          const mipmap = mipmaps[0];
          this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, glFormat, glType, image);
        }
        if (texture.generateMipmaps) {
          this.generateMipmap(this.gl.TEXTURE_2D, texture, image.width, image.height);
        }
      }
    } else {
      this.state.activeTexture(this.gl.TEXTURE0 + slot);
      this.state.bindTexture(this.gl.TEXTURE_2D, null);
    }
  }
  setTexture2DArray(texture, slot) {
    const textureProperties = this.properties.get(texture);
    if (textureProperties.__webglInit === void 0) {
      textureProperties.__webglInit = true;
      texture.addEventListener("dispose", this.onTextureDispose);
    }
    if (textureProperties.__webglTexture === void 0) {
      textureProperties.__webglTexture = this.gl.createTexture();
      this.info.memory.textures++;
    }
    this.state.activeTexture(this.gl.TEXTURE0 + slot);
    this.state.bindTexture(this.gl.TEXTURE_2D_ARRAY, textureProperties.__webglTexture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    const image = texture.image;
    if (image !== null) {
      this.setTextureParameters(this.gl.TEXTURE_2D_ARRAY, texture);
      const mipmaps = texture.mipmaps;
      let level = 0;
      let internalFormat = this.utils.convert(texture.format, texture.colorSpace);
      let glFormat = this.utils.convert(texture.format);
      let glType = this.utils.convert(texture.type);
      if (texture.isCompressedArrayTexture) {
        for (let i = 0, l = mipmaps.length; i < l; i++) {
          const mipmap = mipmaps[i];
          this.gl.compressedTexImage3D(this.gl.TEXTURE_2D_ARRAY, level, internalFormat, mipmap.width, mipmap.height, image.depth, 0, mipmap.data);
          level++;
        }
      } else {
        this.gl.texImage3D(this.gl.TEXTURE_2D_ARRAY, level, internalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
      }
      if (texture.generateMipmaps) {
        this.generateMipmap(this.gl.TEXTURE_2D_ARRAY, texture, image.width, image.height);
      }
    }
  }
  setTexture3D(texture, slot) {
    const textureProperties = this.properties.get(texture);
    if (textureProperties.__webglInit === void 0) {
      textureProperties.__webglInit = true;
      texture.addEventListener("dispose", this.onTextureDispose);
    }
    if (textureProperties.__webglTexture === void 0) {
      textureProperties.__webglTexture = this.gl.createTexture();
      this.info.memory.textures++;
    }
    this.state.activeTexture(this.gl.TEXTURE0 + slot);
    this.state.bindTexture(this.gl.TEXTURE_3D, textureProperties.__webglTexture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    const image = texture.image;
    if (image !== null) {
      this.setTextureParameters(this.gl.TEXTURE_3D, texture);
      const mipmaps = texture.mipmaps;
      let level = 0;
      let internalFormat = this.utils.convert(texture.format, texture.colorSpace);
      let glFormat = this.utils.convert(texture.format);
      let glType = this.utils.convert(texture.type);
      if (texture.isCompressed3DTexture) {
        for (let i = 0, l = mipmaps.length; i < l; i++) {
          const mipmap = mipmaps[i];
          this.gl.compressedTexImage3D(this.gl.TEXTURE_3D, level, internalFormat, mipmap.width, mipmap.height, mipmap.depth, 0, mipmap.data);
          level++;
        }
      } else {
        this.gl.texImage3D(this.gl.TEXTURE_3D, level, internalFormat, image.width, image.height, image.depth, 0, glFormat, glType, image.data);
      }
      if (texture.generateMipmaps) {
        this.generateMipmap(this.gl.TEXTURE_3D, texture, image.width, image.height);
      }
    }
  }
  setTextureCube(texture, slot) {
    const textureProperties = this.properties.get(texture);
    if (textureProperties.__webglInit === void 0) {
      textureProperties.__webglInit = true;
      texture.addEventListener("dispose", this.onTextureDispose);
    }
    if (textureProperties.__webglTexture === void 0) {
      textureProperties.__webglTexture = this.gl.createTexture();
      this.info.memory.textures++;
    }
    this.state.activeTexture(this.gl.TEXTURE0 + slot);
    this.state.bindTexture(this.gl.TEXTURE_CUBE_MAP, textureProperties.__webglTexture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, texture.flipY);
    this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, texture.unpackAlignment);
    const images = texture.image;
    if (Array.isArray(images) && images.length === 6) {
      this.setTextureParameters(this.gl.TEXTURE_CUBE_MAP, texture);
      for (let i = 0; i < 6; i++) {
        const image = images[i];
        if (texture.isCompressedTexture) {
          const mipmaps = image.mipmaps;
          for (let j = 0, jl = mipmaps.length; j < jl; j++) {
            const mipmap = mipmaps[j];
            if (texture.format !== 33776) {
              if (texture.format !== void 0) {
                if (this.gl.compressedTexImage2D !== void 0) {
                  this.gl.compressedTexImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, this.utils.convert(texture.format, texture.colorSpace), mipmap.width, mipmap.height, 0, mipmap.data);
                } else {
                  console.warn("WebGLRenderer: Attempt to load compressed texture format '" + texture.format + "' rejected by compressed texture extension.");
                }
              }
            } else {
              this.gl.compressedTexImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, this.utils.convert(texture.format, texture.colorSpace), mipmap.width, mipmap.height, 0, mipmap.data);
            }
          }
        } else {
          this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, this.utils.convert(texture.format, texture.colorSpace), this.utils.convert(texture.format), this.utils.convert(texture.type), image);
        }
      }
      if (texture.generateMipmaps) {
        this.generateMipmap(this.gl.TEXTURE_CUBE_MAP, texture, images[0].width, images[0].height);
      }
    }
  }
  setTextureParameters(textureType, texture) {
    this.gl.texParameteri(textureType, this.gl.TEXTURE_WRAP_S, this.utils.convert(texture.wrapS));
    this.gl.texParameteri(textureType, this.gl.TEXTURE_WRAP_T, this.utils.convert(texture.wrapT));
    if (textureType === this.gl.TEXTURE_3D || textureType === this.gl.TEXTURE_2D_ARRAY) {
      this.gl.texParameteri(textureType, this.gl.TEXTURE_WRAP_R, this.utils.convert(texture.wrapR));
    }
    this.gl.texParameteri(textureType, this.gl.TEXTURE_MAG_FILTER, this.utils.convert(texture.magFilter));
    this.gl.texParameteri(textureType, this.gl.TEXTURE_MIN_FILTER, this.utils.convert(texture.minFilter));
    if (texture.anisotropy > 1 || this.properties.get(texture).__currentAnisotropy) {
      const extension = this.extensions.get("EXT_texture_filter_anisotropic");
      if (extension) {
        this.gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, this.capabilities.maxAnisotropy));
        this.properties.get(texture).__currentAnisotropy = texture.anisotropy;
      }
    }
  }
  isRenderable(image) {
    if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      return true;
    }
    return false;
  }
  updateVideoTexture(texture) {
    const frame = this.info.render.frame;
    const textureProperties = this.properties.get(texture);
    if (textureProperties.__frame !== frame) {
      textureProperties.__frame = frame;
      texture.update();
    }
  }
  onTextureDispose(event) {
    const texture = event.target;
    const textureProperties = this.properties.get(texture);
    const webglTexture = textureProperties.__webglTexture;
    if (webglTexture !== void 0) {
      this.gl.deleteTexture(webglTexture);
      this.info.memory.textures--;
    }
    this.properties.remove(texture);
  }
  generateMipmap(target, texture, width, height) {
    this.gl.generateMipmap(target);
    const textureProperties = this.properties.get(texture);
    textureProperties.__maxMipLevel = Math.log2(Math.max(width, height));
  }
  dispose() {
  }
}
function WebGLBackground(renderer, state, objects, premultipliedAlpha) {
  const gl = renderer.getContext();
  const state = new WebGLState(gl, renderer.extensions, renderer.capabilities);
  const objects = new WebGLObjects(gl, renderer.geometries, renderer.attributes, renderer.info);
  const boxMesh = new Mesh(
    new BoxGeometry(1, 1, 1),
    new ShaderMaterial({
      uniforms: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        backgroundBlurriness: { value: 0 },
        backgroundIntensity: { value: 1 }
      },
      vertexShader: `
        varying vec3 vWorldDirection;
        void main() {
          vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
          vWorldDirection = worldPosition.xyz - cameraPosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform samplerCube envMap;
        uniform float flipEnvMap;
        uniform float backgroundBlurriness;
        uniform float backgroundIntensity;
        varying vec3 vWorldDirection;
        void main() {
          vec3 texelColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ), backgroundBlurriness );
          gl_FragColor = vec4( texelColor, 1.0 );
          gl_FragColor.rgb *= backgroundIntensity;
        }
      `,
      depthTest: false,
      depthWrite: false,
      side: 1
    })
  );
  let background = null;
  let backgroundVersion = 0;
  let backgroundBlurriness = 0;
  let backgroundIntensity = 1;
  function render(renderList, scene) {
    let forceClear = false;
    if (background !== scene.background || backgroundVersion !== scene.backgroundVersion || backgroundBlurriness !== scene.backgroundBlurriness || backgroundIntensity !== scene.backgroundIntensity) {
      if (background) {
        if (background.isColor) {
          renderer.setClearColor(background, renderer.getClearAlpha());
          forceClear = true;
        } else if (background.isTexture) {
          boxMesh.material.uniforms.envMap.value = background;
          boxMesh.material.uniforms.flipEnvMap.value = background.isCubeTexture ? -1 : 1;
          boxMesh.material.uniforms.backgroundBlurriness.value = scene.backgroundBlurriness;
          boxMesh.material.uniforms.backgroundIntensity.value = scene.backgroundIntensity;
          boxMesh.material.needsUpdate = true;
          objects.update(boxMesh);
          renderList.unshift(boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null);
        }
      } else {
        renderer.setClearColor(16777215, 1);
        forceClear = true;
      }
      background = scene.background;
      backgroundVersion = scene.backgroundVersion;
      backgroundBlurriness = scene.backgroundBlurriness;
      backgroundIntensity = scene.backgroundIntensity;
    }
    if (renderer.autoClear || forceClear) {
      renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
    }
  }
  return {
    render
  };
}
const F32A = new Float32Array(1);
const I32A = new Int32Array(1);
function getTypedArray(type, size) {
  if (type === 5126)
    return new Float32Array(size);
  if (type === 5123)
    return new Uint16Array(size);
  if (type === 5125)
    return new Uint32Array(size);
  return null;
}
function getComponentSize(type) {
  if (type === 5126)
    return 4;
  if (type === 5123)
    return 2;
  if (type === 5125)
    return 4;
  return 0;
}
function getArrayType(type) {
  if (type === 5126)
    return Float32Array;
  if (type === 5123)
    return Uint16Array;
  if (type === 5125)
    return Uint32Array;
  return null;
}
function getBuffer(attribute, bufferType) {
  if (attribute.isInterleavedBufferAttribute)
    attribute = attribute.data;
  const buffers = this.properties.get(attribute);
  if (buffers === void 0) {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    const usage = attribute.usage === 35040 ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW;
    gl.bufferData(bufferType, attribute.array, usage);
    gl.bindBuffer(bufferType, null);
    this.info.memory.geometries++;
    buffers = {
      buffer,
      type: attribute.array.constructor,
      bytesPerElement: attribute.array.BYTES_PER_ELEMENT,
      version: attribute.version,
      needsUpdate: false
    };
    this.properties.set(attribute, buffers);
  }
  return buffers;
}
class WebGLAttributes {
  constructor(gl, capabilities) {
    this.gl = gl;
    this.capabilities = capabilities;
    this.buffers = new WeakMap();
    this.info = {
      memory: {
        geometries: 0
      }
    };
  }
  createBuffer(attribute, bufferType) {
    const array = attribute.array;
    const usage = attribute.usage;
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, array, usage);
    gl.bindBuffer(bufferType, null);
    return {
      buffer,
      type: array.constructor,
      bytesPerElement: array.BYTES_PER_ELEMENT,
      version: attribute.version
    };
  }
  updateBuffer(buffer, attribute, bufferType) {
    const array = attribute.array;
    const updateRange = attribute.updateRange;
    const gl = this.gl;
    gl.bindBuffer(bufferType, buffer);

    if (updateRange.count === -1) {
      // Not using update ranges
      gl.bufferSubData(bufferType, 0, array);
    } else {
      if (this.capabilities.isWebGL2) {
        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array, updateRange.offset, updateRange.count);
      } else {
        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
      }

      updateRange.count = -1; // reset range
    }

    gl.bindBuffer(bufferType, null);
  }

  get(attribute) {
    if (attribute.isInterleavedBufferAttribute)
      attribute = attribute.data;
    return this.buffers.get(attribute);
  }
  remove(attribute) {
    if (attribute.isInterleavedBufferAttribute)
      attribute = attribute.data;
    const data = this.buffers.get(attribute);
    if (data) {
      this.gl.deleteBuffer(data.buffer);
      this.buffers.delete(attribute);
    }
  }
  update(attribute, bufferType) {
    if (attribute.isGLBufferAttribute) {
      const buffer = this.get(attribute);
      if (buffer === undefined) {
        this.buffers.set(attribute, this.createBuffer(attribute, bufferType));
      } else if (buffer.version < attribute.version) {
        this.updateBuffer(buffer.buffer, attribute, bufferType);
        buffer.version = attribute.version;
      }
      return;
    }
    if (attribute.isInterleavedBufferAttribute)
      attribute = attribute.data;
    const data = this.buffers.get(attribute);
    if (data === undefined) {
      this.buffers.set(attribute, this.createBuffer(attribute, bufferType));
    } else if (data.version < attribute.version) {
      this.updateBuffer(data.buffer, attribute, bufferType);
      data.version = attribute.version;
    }
  }
}
class WebGLGeometries {
  constructor(gl, attributes, info) {
    this.gl = gl;
    this.attributes = attributes;
    this.info = info;
    this.geometries = new WeakMap();
    this.wireframeAttributes = new WeakMap();
  }
  onGeometryDispose(event) {
    const geometry = event.target;
    const buffergeometry = this.geometries.get(geometry);
    if (buffergeometry.index) {
      this.attributes.remove(buffergeometry.index);
    }
    for (const name in buffergeometry.attributes) {
      this.attributes.remove(buffergeometry.attributes[name]);
    }
    geometry.removeEventListener("dispose", this.onGeometryDispose);
    this.geometries.delete(geometry);
    const wireframeAttribute = this.wireframeAttributes.get(buffergeometry);
    if (wireframeAttribute) {
      this.attributes.remove(wireframeAttribute);
      this.wireframeAttributes.delete(buffergeometry);
    }
    this.info.memory.geometries--;
  }
  get(object, geometry) {
    let buffergeometry = this.geometries.get(geometry);
    if (buffergeometry)
      return buffergeometry;
    geometry.addEventListener("dispose", this.onGeometryDispose);
    if (geometry.isBufferGeometry) {
      buffergeometry = geometry;
    } else if (geometry.isGeometry) {
      if (geometry._bufferGeometry === undefined) {
        geometry._bufferGeometry = new BufferGeometry().setFromObject(object);
      }
      buffergeometry = geometry._bufferGeometry;
    }
    this.geometries.set(geometry, buffergeometry);
    this.info.memory.geometries++;
    return buffergeometry;
  }
  update(geometry) {
    const index = geometry.index;
    const attributes = geometry.attributes;
    if (index !== null) {
      this.attributes.update(index, this.gl.ELEMENT_ARRAY_BUFFER);
    }
    for (const name in attributes) {
      this.attributes.update(attributes[name], this.gl.ARRAY_BUFFER);
    }
    const morphAttributes = geometry.morphAttributes;
    for (const name in morphAttributes) {
      const array = morphAttributes[name];
      for (let i = 0, l = array.length; i < l; i++) {
        this.attributes.update(array[i], this.gl.ARRAY_BUFFER);
      }
    }
  }
  getWireframeAttribute(geometry) {
    let attribute = this.wireframeAttributes.get(geometry);
    if (attribute)
      return attribute;
    const indices = [];
    const geometryIndex = geometry.index;
    const geometryPosition = geometry.attributes.position;
    let version = 0;
    if (geometryIndex !== null) {
      const array = geometryIndex.array;
      version = geometryIndex.version;
      for (let i = 0, l = array.length; i < l; i += 3) {
        const a = array[i + 0];
        const b = array[i + 1];
        const c = array[i + 2];
        indices.push(a, b, b, c, c, a);
      }
    } else {
      const array = geometryPosition.array;
      version = geometryPosition.version;
      for (let i = 0, l = array.length / 3 - 1; i < l; i += 3) {
        const a = i + 0;
        const b = i + 1;
        const c = i + 2;
        indices.push(a, b, b, c, c, a);
      }
    }
    attribute = new (getArrayType(geometryPosition.array.BYTES_PER_ELEMENT * 8 > 16 ? 5125 : 5123))(indices);
    this.attributes.update(attribute, this.gl.ELEMENT_ARRAY_BUFFER);
    this.wireframeAttributes.set(geometry, attribute);
    attribute.version = version;
    return attribute;
  }
}
class WebGLProperties {
  constructor() {
    this.properties = new WeakMap();
  }
  get(object) {
    let map = this.properties.get(object);
    if (map === void 0) {
      map = {};
      this.properties.set(object, map);
    }
    return map;
  }
  remove(object) {
    this.properties.delete(object);
  }
  update(object, key, value) {
    this.properties.get(object)[key] = value;
  }
  dispose() {
    this.properties = new WeakMap();
  }
}
class WebGLRenderLists {
  constructor(properties) {
    this.properties = properties;
    this.lists = new Map();
  }
  get(scene, renderCallDepth) {
    const list = this.lists.get(scene);
    let renderList;
    if (list === void 0) {
      renderList = new WebGLRenderList(this.properties);
      this.lists.set(scene, [renderList]);
    } else {
      if (renderCallDepth >= list.length) {
        renderList = new WebGLRenderList(this.properties);
        list.push(renderList);
      } else {
        renderList = list[renderCallDepth];
      }
    }
    return renderList;
  }
  dispose() {
    this.lists.clear();
  }
}
class WebGLRenderList {
  constructor(properties) {
    this.properties = properties;
    this.renderItems = [];
    this.renderItemsIndex = 0;
    this.opaque = [];
    this.transparent = [];
    this.defaultProgram = {
      id: -1
    };
  }
  init() {
    this.renderItemsIndex = 0;
    this.opaque.length = 0;
    this.transparent.length = 0;
  }
  getNextRenderItem(object, geometry, material, groupOrder, z, group) {
    let renderItem = this.renderItems[this.renderItemsIndex];
    if (renderItem === void 0) {
      renderItem = {
        id: object.id,
        object,
        geometry,
        material,
        program: this.defaultProgram,
        groupOrder,
        renderOrder: object.renderOrder,
        z,
        group
      };
      this.renderItems[this.renderItemsIndex] = renderItem;
    } else {
      renderItem.id = object.id;
      renderItem.object = object;
      renderItem.geometry = geometry;
      renderItem.material = material;
      renderItem.program = this.defaultProgram;
      renderItem.groupOrder = groupOrder;
      renderItem.renderOrder = object.renderOrder;
      renderItem.z = z;
      renderItem.group = group;
    }
    this.renderItemsIndex++;
    return renderItem;
  }
  push(object, geometry, material, groupOrder, z, group) {
    const renderItem = this.getNextRenderItem(object, geometry, material, groupOrder, z, group);
    (material.transparent === true ? this.transparent : this.opaque).push(renderItem);
  }
  unshift(object, geometry, material, groupOrder, z, group) {
    const renderItem = this.getNextRenderItem(object, geometry, material, groupOrder, z, group);
    (material.transparent === true ? this.transparent : this.opaque).unshift(renderItem);
  }
  sort(customOpaqueSort, customTransparentSort) {
    if (this.opaque.length > 1)
      this.opaque.sort(customOpaqueSort || painterSortStable);
    if (this.transparent.length > 1)
      this.transparent.sort(customTransparentSort || reversePainterSortStable);
  }
  finish() {
    for (let i = this.renderItemsIndex, l = this.renderItems.length; i < l; i++) {
      const renderItem = this.renderItems[i];
      if (renderItem.id === null)
        break;
      renderItem.id = null;
      renderItem.object = null;
      renderItem.geometry = null;
      renderItem.material = null;
      renderItem.program = null;
      renderItem.group = null;
    }
  }
}
function painterSortStable(a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  } else if (a.renderOrder !== b.renderOrder) {
    return a.renderOrder - b.renderOrder;
  } else if (a.program && b.program && a.program.id !== b.program.id) {
    return a.program.id - b.program.id;
  } else if (a.material.id !== b.material.id) {
    return a.material.id - b.material.id;
  } else if (a.z !== b.z) {
    return a.z - b.z;
  } else {
    return a.id - b.id;
  }
}
function reversePainterSortStable(a, b) {
  if (a.groupOrder !== b.groupOrder) {
    return a.groupOrder - b.groupOrder;
  } else if (a.renderOrder !== b.renderOrder) {
    return a.renderOrder - b.renderOrder;
  } else if (a.z !== b.z) {
    return b.z - a.z;
  } else {
    return a.id - b.id;
  }
}
class WebGLShadowMap {
  constructor(_renderer, _objects, _capabilities) {
    this._renderer = _renderer;
    this._objects = _objects;
    this._capabilities = _capabilities;
    this._enabled = false;
    this._autoUpdate = true;
    this._needsUpdate = false;
    this._type = 3;
    this._render = function(shadowsArray, scene, camera) {
      if (this._enabled === false)
        return;
      if (this._autoUpdate === false && this._needsUpdate === false)
        return;
      for (let i = 0, il = shadowsArray.length; i < il; i++) {
        const light = shadowsArray[i];
        const shadow = light.shadow;
        if (shadow === null) {
          console.warn("THREE.WebGLShadowMap:", light, "has no shadow.");
          continue;
        }
        const shadowCamera = shadow.camera;
        shadow.updateMatrices(light);
        if (shadow.needsUpdate === false && this._autoUpdate === false)
          continue;
        const _frustum = new Frustum();
        _frustum.setFromProjectionMatrix(shadowCamera.projectionMatrix);
        const renderList = this._renderer.renderLists.get(scene, 0);
        renderList.init();
        const _projectObject = (object) => {
          if (object.isLight)
            return;
          if (object.visible === false)
            return;
          if (object.castShadow === true && (_frustum.intersectsObject(object) || _frustum.containsPoint(object.position))) {
            const material = object.material;
            if (Array.isArray(material)) {
              for (let j = 0, jl = material.length; j < jl; j++) {
                const group = object.geometry.groups[j];
                const groupMaterial = material[j];
                if (groupMaterial.visible === true) {
                  const newMaterial = this._getShadowMaterial(object, groupMaterial, light, shadowCamera);
                  renderList.push(object, object.geometry, newMaterial, group.start, 0, null);
                }
              }
            } else if (material.visible === true) {
              const newMaterial = this._getShadowMaterial(object, material, light, shadowCamera);
              renderList.push(object, object.geometry, newMaterial, 0, 0, null);
            }
          }
          for (let i = 0, l = object.children.length; i < l; i++) {
            _projectObject(object.children[i]);
          }
        };
        _projectObject(scene);
        this._renderer.setRenderTarget(shadow.map);
        this._renderer.clear();
        this._renderer.renderBufferDirect(shadowCamera, null, renderList.opaque, this._renderer.sortObjects);
        shadow.needsUpdate = false;
      }
      this._needsUpdate = false;
    };
    this._getShadowMaterial = function(object, material, light, camera) {
      let shadowMaterial;
      if (light.isPointLight) {
        shadowMaterial = new MeshDistanceMaterial();
      } else {
        shadowMaterial = new MeshDepthMaterial({
          depthPacking: 3201
        });
      }
      if (object.isSkinnedMesh) {
        shadowMaterial.skinning = true;
      }
      shadowMaterial.morphTargets = material.morphTargets;
      shadowMaterial.morphNormals = material.morphNormals;
      return shadowMaterial;
    };
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
  }
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(value) {
    this._autoUpdate = value;
  }
  get needsUpdate() {
    return this._needsUpdate;
  }
  set needsUpdate(value) {
    this._needsUpdate = value;
  }
  get type() {
    return this._type;
  }
  set type(value) {
    if (this._type !== value) {
      if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
        throw new Error("THREE.WebGLShadowMap: Invalid shadow type.");
      }
      this._type = value;
      this._needsUpdate = true;
    }
  }
  render(shadowsArray, scene, camera) {
    this._render(shadowsArray, scene, camera);
  }
}
class WebGLUtils {
  constructor(gl, extensions, capabilities) {
    this.gl = gl;
    this.extensions = extensions;
    this.capabilities = capabilities;
  }
  convert(p, colorSpace) {
    let outputColorSpace;
    if (colorSpace !== void 0) {
      outputColorSpace = colorSpace;
    } else {
      const renderer = this.renderer;
      outputColorSpace = renderer ? renderer.outputColorSpace : "srgb";
    }
    let result = null;
    switch (p) {
      case 1015:
        result = this.gl.REPEAT;
        break;
      case 1016:
        result = this.gl.CLAMP_TO_EDGE;
        break;
      case 1017:
        result = this.gl.MIRRORED_REPEAT;
        break;
      case 1003:
        result = this.gl.NEAREST;
        break;
      case 1004:
        result = this.gl.NEAREST_MIPMAP_NEAREST;
        break;
      case 1005:
        result = this.gl.NEAREST_MIPMAP_LINEAR;
        break;
      case 1006:
        result = this.gl.LINEAR;
        break;
      case 1007:
        result = this.gl.LINEAR_MIPMAP_NEAREST;
        break;
      case 1008:
        result = this.gl.LINEAR_MIPMAP_LINEAR;
        break;
      case 1022:
        result = this.gl.UNSIGNED_BYTE;
        break;
      case 1023:
        result = this.gl.UNSIGNED_SHORT_4_4_4_4;
        break;
      case 1024:
        result = this.gl.UNSIGNED_SHORT_5_5_5_1;
        break;
      case 1025:
        result = this.gl.UNSIGNED_SHORT_5_6_5;
        break;
      case 1026:
        result = this.gl.UNSIGNED_INT_24_8;
        break;
      case 1009:
        result = this.gl.ALPHA;
        break;
      case 1010:
        result = this.gl.RGB;
        break;
      case 1011:
        result = this.gl.RGBA;
        break;
      case 1012:
        result = this.gl.LUMINANCE;
        break;
      case 1013:
        result = this.gl.LUMINANCE_ALPHA;
        break;
      case 1014:
        result = this.gl.DEPTH_COMPONENT;
        break;
      case 1021:
        if (outputColorSpace === "srgb") {
          result = this.gl.SRGB;
        } else {
          result = this.gl.RGB;
        }
        break;
      case 6408:
        if (outputColorSpace === "srgb") {
          result = 35905;
        } else {
          result = this.gl.RGBA;
        }
        break;
      default:
        result = p;
    }
    return result;
  }
}
export { ACESFilmicToneMapping, AddEquation, AdditiveAnimation, AdditiveBlending, AlphaFormat, AlwaysDepth, AmbientLight, AmbientLightProbe, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BasicShadowMap, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxGeometry, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasTexture, CatmullRomCurve3, CineonToneMapping, CircleGeometry, ClampToEdgeWrapping, Clock, Color, ColorKeyframeTrack, ColorManagement, CompressedArrayTexture, Compressed3DTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, CubeCamera, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubeUVRefractionMapping, CubicBezierCurve, CubicBezierCurve3, CullFaceBack, CullFaceFront, CullFaceNone, CustomBlending, CustomToneMapping, CylinderGeometry, Cylindrical, Data3DTexture, DataArrayTexture, DataTexture, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthTexture, DirectionalLight, DirectionalLightHelper, DirectionalLightShadow, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, EqualDepth, Euler, EventDispatcher, ExtrudeGeometry, Face3, FileLoader, Float16BufferAttribute, Float32BufferAttribute, Float64BufferAttribute, FloatType, Fog, FogExp2, Font, FramebufferTexture, FrontSide, Frustum, GLBufferAttribute, GreaterEqualDepth, GridHelper, Grids, Group, HalfFloatType, HemisphereLight, HemisphereLightHelper, HemisphereLightProbe, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int8BufferAttribute, Int32BufferAttribute, IntType, InterleavedBufferAttribute, InvertStencilOp, KeepStencilOp, KeyframeTrack, LOD, LambertMaterial, LatheGeometry, Layers, LessDepth, LessEqualDepth, Light, LightProbe, LightShadow, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LineSegments, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearToneMapping, Loader, LoaderUtils, LuminanceAlphaFormat, LuminanceFormat, MathUtils, Material, MaterialLoader, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeverDepth, NoBlending, NoColors, NoToneMapping, NormalBlending, NotEqualDepth, NumberKeyframeTrack, Object3D, ObjectLoader, OctahedronGeometry, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PMREMGenerator, Path, PerspectiveCamera, Plane, PlaneGeometry, PlaneHelper, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, QuaternionKeyframeTrack, Quat as Quaternion, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_4x4_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBFormat, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RawShaderMaterial, Ray, Raycaster, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, RingGeometry, SRGBColorSpace, Scene, ShaderChunk, ShaderLib, ShaderMaterial, ShadowMaterial, Shape, ShapeGeometry, ShapePath, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, Sphere, SphereGeometry, Spherical, SplineCurve, SpotLight, SpotLightHelper, SpotLightShadow, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TetrahedronGeometry, Texture, TextureLoader, TorusGeometry, TorusKnotGeometry, Triangle, TubeGeometry, UVMapping, Uint16BufferAttribute, Uint32BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, UniformsLib, UniformsUtils, UnsignedByteType, UnsignedInt248Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, VideoTexture, WebGLArrayRenderTarget, WebGLCubeRenderTarget, WebGL3DRenderTarget, WebGLMultipleRenderTargets, WebGLRenderTarget, WebGLRenderer, WireframeGeometry, ZeroFactor, ZeroStencilOp, _SRGBAFormat, sRGBEncoding, tubeGeometry };
