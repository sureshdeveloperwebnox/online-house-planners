'use client'; // Only needed if using Next.js

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'; // Changed to default import
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import TitleText from '../Title/TitleText';
import TiteHead from '../Title/TitleHead';
import { TitleCard } from '../Title/TitleCard';
import { NavBarComponents } from '../NavBar/NavBarComponent';
import VoiceScroll from './VoiceCommands/VoiceScroll';
import CircularGallery from '../CircularGallery/CircularGallery';
import Carousel from '../Carousel/Carousel';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import { CompareComponent } from '../CompareComponent/CompareComponent';
import { DraggableCardComponent } from '../DraggableCard/DraggableCardComponent';
import { CardComponent } from '../CardHeader/CardComponent';
import WelcomeText from '../WelcomeText/WelcomeText';
import FocusText from '../TrueFocusText/FocusText';
import FallingText from '../FallingText/FallingText';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import AnimatedText from '../OurServiceText';
import TrailingImage from '../TrailingImages/TraillingImage';
import ConsultationCard from '../ConsultationCard/ConsultationCard';
import SpotlightCard from './SpotlightCard/SpotlightCard';
import Footer from '../Footer/Footer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { HouseAnimation } from '../HouseAnimation/HouseAnimation';

export const SmoothScrollHero = () => {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const textReveal = `At Online House Planners, we bring your dream space to life with the power of a fully digital experience. Our team of licensed architects, creative interior designers, skilled engineers, and expert planners work together seamlessly to deliver stunning designs.
Let’s design a home that doesn’t just look amazing but feels right—with every detail thoughtfully aligned to your lifestyle, your taste, and your values.
  `

  return (
    <div className="bg-white-950">
      <Nav />
      <TitleCard />
 <VoiceScroll />
      <Hero />
            {/* <HouseAnimation /> */}

      {/* <BathroomSection /> */}
{/* <Carousel/> */}
  {/* <InfiniteScroll
    isTilted={true}
    tiltDirection='left'
    autoplay={true}
    autoplaySpeed={10}
    autoplayDirection="down"
    pauseOnHover={true}
  /> */}

    <CardComponent />

        {/* <WelcomeText
        text= "Build Without Limits. Plan Without Stress.!"
        animateBy="letters"
        direction="top"
        className="text-5xl font-bold"
        delay={50}
        once={true}
         /> */}
  <CompareComponent />
  <FocusText />

{/* <div style={{ height: "2000px", paddingTop: "1000px" }}> */}

    {/* </div> */}
    {/* <Canvas> */}

<AnimatedText />
{/* </Canvas> */}

  <DraggableCardComponent />

  {/* <div className=''>How We Works</div> */}

      {/* <FallingText
        text="Online House Plan – Online interior design are designed at Online House Planners with collective of online architects, online interior designers, engineers, and online house planners working together to build the best online house plan, online interior design, online 3d elevation, and much more. We provide the best house design with a licensed online architect in India. We Believe…Every house design evolves organically, encompassing all – from the shell to minute details with vastu house plans. We, therefore design only as a whole as all these should necessarily be seamlessly integrated to create a wholesome edifice that is truly functional & Aesthetically pleasing with a perfect blend of Creativity + technicality.!"
        highlightWords={["fall"]}
        trigger="scroll"
        fontSize="2rem"
        backgroundColor="white"
        gravity={0.5}
      /> */}
      {/* </div> */}

      <div>
        
      </div>
  <ScrollReveal
        text= {textReveal}
        className="bg-gray-100 p-10"
      />
      {/* <Schedule /> */}

      <TrailingImage />
      {/* <ConsultationCard /> */}

      {/* <SpotlightCard/> */}
      <Footer />
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      {/* <SiSpacex className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          const target = document.getElementById("launch-schedule");
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
            });
          }
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        LAUNCH SCHEDULE <FiArrowRight />
      </button> */}
      
{/* <TiteHead
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Online House Planners
</TiteHead> */}
      <TitleText />
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      {/* <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" /> */}
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [0, 20]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/images/house/hero-house.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="/images/house/houseimage-6.jpg"
        alt="Example of a space launch"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="/images/house/houseimage-3.jpg"
        alt="Example of a space launch"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="/images/house/houseimage-4.jpg"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="/images/house/whitehouse1.jpg"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} rounded-lg shadow-xl`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>
      <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
      <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
      <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
      <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
      <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
      <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
      <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};


// Room Model
const BathroomModel = () => {
  const { scene } = useGLTF('/models/the_bathroom_free.glb');
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to rotation (0 to π/2) for a 90-degree rotation
  const rotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI / 2]);
  
  return (
    <motion.group
      animate={{ 
        rotateX: rotation,
      }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <primitive 
        object={scene} 
        scale={2}
        position={[0, -1.5, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </motion.group>
  );
};


const BathroomSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={sectionRef} className="h-screen w-full bg-zinc-950">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
        <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={0.5} />
        <BathroomModel />
        <OrbitControls 
          enableZoom={false}
          enableRotate={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};
