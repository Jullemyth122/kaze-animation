import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useProgress,Loader, OrbitControls, Environment, Text, useTexture, Sky } from "@react-three/drei";
import { useGlobal } from "@/functionality/GlobalFunctionality";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from 'three'

const tl = gsap.timeline();
const welcomeScreen = gsap.timeline({
  paused: true,
});

interface Time {
    time: number;
}

interface PlaneLineImg {
    img: string;
    i: number;
    gap: number
}

const PlaneLines = ({img,i,gap}:PlaneLineImg) => {

    const planeRef = useRef<any>(null);
    const texture = useTexture(img)

    useLayoutEffect(() => {

        if (planeRef.current) {
            let g = planeRef.current
            let z = 7         
            let p = g.parameters;
            let hw = p.width * 0.5;
            
            let a = new THREE.Vector2(-hw, 0);
            let b = new THREE.Vector2(0, z);
            let c = new THREE.Vector2(hw, 0);
            
            let ab = new THREE.Vector2().subVectors(a, b);
            let bc = new THREE.Vector2().subVectors(b, c);
            let ac = new THREE.Vector2().subVectors(a, c);
            
            let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
            
            let center = new THREE.Vector2(0, z - r);
            let baseV = new THREE.Vector2().subVectors(a, center);
            let baseAngle = baseV.angle() - (Math.PI / 2);
            let arc = baseAngle * 2;
            
            let uv = g.attributes.uv;
            let pos = g.attributes.position;
            let mainV = new THREE.Vector2();
            for (let i = 0; i < uv.count; i++){
                let uvRatio = 1 - uv.getX(i);
                let y = pos.getY(i);
                mainV.copy(c).rotateAround(center, (arc * uvRatio));
                pos.setXYZ(i, mainV.x, y, -mainV.y);
            }
            
            pos.needsUpdate = true;
        }
    },[])

    return (
        <mesh
            position={
                [-40 + (i * 20),-2,-20]
            }
            // rotation={[0,Math.PI / 2 * i, 0]}
        >
            <planeGeometry 
                ref={planeRef}
                args={[20,10,70,70]}
            ></planeGeometry>
            <meshBasicMaterial
                side={ THREE.DoubleSide }  
                map = { texture }
                // wireframe={true}
            />
        </mesh>
    )
}

interface PlaneGeometryImageProps {
    position: any;
    rotation: any;
}

const PlaneGeometryImage = ({ position,rotation }:PlaneGeometryImageProps) => {
    return (<>
        <group position={position} rotation={rotation}>
            {[
                "./img/hot spring (1).png",
                "./img/night city (1).png",
                "./img/shrine (1).png",
                "./img/horizon.png",
                "./img/lantern festival.png",
            ].map((elem,i) => {
                return (
                    <>
                        <PlaneLines key={i} img={elem} i = {i} gap = {i + 1}/>
                    </>
                )
            })}
        </group>
    </>)
}

const Surface = () => {
    return (
        <>
            <mesh 
                rotation={[-Math.PI * 0.5,0,0]}
                position={[0,-7,1]} 
                castShadow
                receiveShadow
            >
                <planeGeometry args={[200,200]}/>
                <meshStandardMaterial 
                    roughness={0.3}
                    metalness={0.3}
                    side={ THREE.DoubleSide }
                />
            </mesh>
        </>
    )
}

const Scene = ({time}: Time) => {
    const { 
        viewport: { width } ,camera, gl: { domElement }
    } = useThree()

    useEffect(() => {
        camera.far = 5000
        camera.position.set(0,0,10)
        camera.lookAt(0,0,0)
    },[])

    return (
        <>
            <OrbitControls 
                args={[camera,domElement]} 
            />

            <Text
                position={[0, 0.7, -3]}
                rotation={[0, 0, 0]}
                lineHeight={1.3}
                font='/FogtwoNo5.otf'
                fontSize={ 2 }
                material-toneMapped={false}
                anchorX='center'
                anchorY='middle'
            >
              Kaze {time}%  Web
            </Text>
            <Surface/>
            <PlaneGeometryImage position={[0,0,0]} rotation={[0,0,0]}/>
            <PlaneGeometryImage position={[0,0,0]} rotation={[ 0 , Math.PI, 0]}/>
            <Sky
            distance={450000} 
            sunPosition={[100, 10, 20]} 
            inclination={30} 
            azimuth={0.25}
            mieCoefficient={0.2}
            rayleigh={1}
            mieDirectionalG={1}
            turbidity={1}    
            />
            <Environment preset='sunset'/>
        </>
    )
}

const LoadersIn3D: React.FC = ({}) => {

    const { progress } = useProgress()

    const { setLoaderComplete } = useGlobal();

    // initializing loader
    const [time, setTime] = useState<number>(0);

    const handleLoaderComplete = () => {
        setLoaderComplete(true);
    };

    function startTimer() {
        let startTime = Date.now();
        let endTime = startTime + 10000;
        let id = setInterval(frame, 10);
        
        function frame() {
            let currentTime = Date.now();
            let elapsed = currentTime - startTime;
            let percentage = Math.floor(elapsed / 10000 * 100);
            if (currentTime >= endTime) {
                clearInterval(id);
                welcomeScreen.play()
                percentage = 100;
                setTime(percentage);
            } else {
                setTime(percentage);
            }
            
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
                
        startTimer()
        
        // tl.to(".bracket", {
        //     duration: 0.3,
        //     scale: 1,
        //     margin: 0,
        // });
        // tl.to("#loader", {
        //     duration: 10,
        // });

        // // welcome screen
        // welcomeScreen.to(".loading-section", {
        //     y: -10,
        //     opacity: 0,
        // });
        // welcomeScreen.to(".loading-screen", {
        //     duration: 0.8,
        //     y: -2000,
        //     ease: "Power4.out",
        // });
        // welcomeScreen.to(
        //     ".after-block",
        //     {
        //         duration: 0.8,
        //         y: -2000,
        //         ease: "Power4.out",
        //         onComplete: handleLoaderComplete,
        //     },
        //     "-=0.4"
        // );
        
        // console.log(progress)
        // useLoading()
        // loader();
    }, [
        // progress
    ]);
    

    return (
        <div className="loading-screen absolute z-[13] h-screen w-full overflow-hidden bg-black text-white">
            <Canvas shadows gl={{antialias:true}}>
                <Scene time={time}></Scene>
            </Canvas>
        </div>
    )
}

export default LoadersIn3D