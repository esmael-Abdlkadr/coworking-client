import Particles from "react-tsparticles";

export default function dynamicParticles() {
  return (
    <Particles
      options={{
        fullScreen: false,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          opacity: { value: 0.2 },
          size: { value: 3 },
          move: { speed: 1, direction: "none" },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
        },
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
