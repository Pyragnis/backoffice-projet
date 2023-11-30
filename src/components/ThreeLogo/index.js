// ThreeCustomModel.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const ThreeCustomModel = () => {
  const mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(120, 120);
    renderer.setClearColor(0x000000, 0);

    mount.current.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    // Charger votre modèle glTF ici
    loader.load('path/to/your/model.gltf', (gltf) => {
      scene.add(gltf.scene);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Nettoyer les ressources lors du démontage du composant
      renderer.dispose();
    };
  }, []);

  return <div ref={mount} style={{ margin: '10px' }} />;
};

export default ThreeCustomModel;
