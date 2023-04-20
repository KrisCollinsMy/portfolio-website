/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 office2.gltf
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/office2.gltf')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0, -703.71]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-264.03, 0, 502.34]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={100}>
            <mesh geometry={nodes.Chair1_FabricGrey_0.geometry} material={materials.FabricGrey} />
            <mesh geometry={nodes.Chair1_Wood_0.geometry} material={materials.Wood} />
          </group>
          <group position={[-264.03, 0, 402.2]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.Desk_PaintWhite_0.geometry} material={materials.PaintWhite} />
            <mesh geometry={nodes.Desk_SteelBlack_0.geometry} material={materials.SteelBlack} />
          </group>
          <group position={[-349.96, 88.87, 387.29]} rotation={[-Math.PI / 2, 0, 0.55]} scale={100}>
            <mesh geometry={nodes.Lamp1_LightsWhite_0.geometry} material={materials.LightsWhite} />
            <mesh geometry={nodes.Lamp1_SteelBlack_0.geometry} material={materials.SteelBlack} />
          </group>
          <group position={[-274.72, 268.68, 419.25]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.Light2_LightsYellow_0.geometry} material={materials.LightsYellow} />
            <mesh geometry={nodes.Light2_SteelBlack_0.geometry} material={materials.SteelBlack} />
          </group>
          <mesh geometry={nodes.Keyboard_Keyboard_0.geometry} material={materials.Keyboard} position={[-262.12, 88.87, 407.64]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.Monitor_PlasticBlack_0.geometry} material={materials.PlasticBlack} position={[-261.54, 88.87, 380.84]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
          <mesh geometry={nodes.Mouse_PlasticBlack_0.geometry} material={materials.PlasticBlack} position={[-216.12, 88.87, 413.47]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/office2.gltf')
