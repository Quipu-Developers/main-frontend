// home pc

import React, { useRef, useEffect, memo } from 'react';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

extend({ OrbitControls });

const Sphere = (props) => {
  const mesh = useRef();

  return (
    <mesh {...props} ref={mesh}>
      {/* eslint-disable-next-line */}
      <sphereGeometry args={[props.size, 100, 100]} />
      <meshPhysicalMaterial {...props.material} />
    </mesh>
  );
};

const Torus = (props) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.x = props.rotationX;
      mesh.current.rotation.y = props.rotationY;
    }
  }, [props.rotationX, props.rotationY]);

  return (
    <mesh {...props} ref={mesh}>
      {/* eslint-disable-next-line */}
      <torusGeometry args={[props.size, props.tube, 32, 100]} />
      <meshPhysicalMaterial {...props.material} />
    </mesh>
  );
};

const Capsule = (props) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  useEffect(() => {
    if (mesh.current) {
      mesh.current.rotation.x = props.rotationX;
      mesh.current.rotation.z = props.rotationZ;
    }
  }, [props.rotationX, props.rotationZ]);

  return (
    <mesh {...props} ref={mesh}>
      {/* eslint-disable-next-line */}
      <capsuleGeometry args={[props.size, props.tube, 32, 32]} />
      <meshPhysicalMaterial {...props.material} />
    </mesh>
  );
};

const CameraAspectUpdater = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const updateCameraAspect = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', updateCameraAspect);
    updateCameraAspect(); // 초기 실행

    return () => window.removeEventListener('resize', updateCameraAspect);
  }, [camera, gl]);

  return null;
};

const Object3D1 = () => {
  return (
    <Canvas
      camera={{
        fov: 40,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: [1.2, -2, -5],
      }}
    >
      <CameraAspectUpdater />
      {/* eslint-disable-next-line */}
      <ambientLight intensity={1} />
      {/* eslint-disable-next-line */}
      <pointLight position={[-5, 0, 5]} intensity={100} />
      {/* eslint-disable-next-line */}
      <pointLight position={[0, 10, 0]} intensity={100} />

      {/* 보라색 구 */}
      <Sphere
        position={[-0.3, -1, -1]}
        size={0.8}
        material={{
          color: '#B4B4FF',
          transparent: true,
          opacity: 0.6,
          clearcoat: 0.3,
          clearcoatRoughness: 0.2,
        }}
      />
      {/* 파란색 구 */}
      <Sphere
        position={[-1.5, 0.5, -3]}
        size={0.7}
        material={{
          color: '#9AB9FF',
          transparent: true,
          opacity: 0.6,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        }}
      />
      {/* 민트색 구 */}
      <Sphere
        position={[2, 0.3, -1]}
        size={0.75}
        material={{
          color: '#95CFFE',
          transparent: true,
          opacity: 0.6,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        }}
      />
      {/* 작은 구 */}
      <Sphere
        position={[0.2, 0.5, -1]}
        size={0.2}
        material={{
          color: '#B0A0CD',
          transparent: true,
          opacity: 0.8,
          clearcoat: 0.5,
          clearcoatRoughness: 0.2,
        }}
      />
      {/* 분홍색 링 */}
      <Torus
        position={[0.3, -0.8, -3]}
        size={0.45}
        tube={0.15}
        material={{
          color: '#FFDCFF',
          transparent: true,
          opacity: 0.8,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        }}
        rotationX={-Math.PI / 5}
        rotationY={Math.PI / 5}
      />
      {/* 보라색 링 */}
      <Torus
        position={[1.5, 0.8, -2]}
        size={0.35}
        tube={0.1}
        material={{
          color: '#B4B4FF',
          transparent: true,
          opacity: 0.8,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        }}
        rotationX={-Math.PI / 5}
        rotationY={-Math.PI / 5}
      />
      {/* 회색 링 */}
      <Torus
        position={[2.4, -1.5, -2]}
        size={0.35}
        tube={0.1}
        material={{
          color: '#D2D2FF',
          transparent: true,
          opacity: 0.8,
          clearcoat: 0.2,
          clearcoatRoughness: 0.2,
        }}
        rotationX={-Math.PI / 2}
        rotationY={-Math.PI / 5}
      />
      {/* 보라색 캡슐 */}
      <Capsule
        position={[1.3, -1, -1]}
        size={0.17}
        tube={0.3}
        material={{
          color: '#9282CD',
          transparent: true,
          opacity: 0.6,
          clearcoat: 0.6,
          clearcoatRoughness: 0.2,
        }}
        rotationX={Math.PI / 5}
        rotationZ={Math.PI / 4}
      />
      {/* 파란색 캡슐 */}
      <Capsule
        position={[2.2, -0.7, -3]}
        size={0.17}
        tube={0.3}
        material={{
          color: '#87AFEB',
          transparent: true,
          opacity: 0.6,
          clearcoat: 0.6,
          clearcoatRoughness: 0.2,
        }}
        rotationX={Math.PI / 6}
        rotationZ={-Math.PI / 6}
      />

      <OrbitControls minDistance={2} maxDistance={5} target={[0.7, 0.2, 0]} enableZoom={false} />
    </Canvas>
  );
};

export default memo(Object3D1);
