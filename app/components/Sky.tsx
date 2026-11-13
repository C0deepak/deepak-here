// Quiet backdrop: a soft gradient, a few blurred clouds, faint stars at night.

const stars = Array.from({ length: 60 }, (_, i) => {
  const r = (n: number) => {
    const v = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
    return Math.round((v - Math.floor(v)) * 1000) / 1000;
  };
  return { x: r(1) * 100, y: r(2) * 55, s: 1 + r(3) * 1.2, d: r(4) * 4 };
});

const clouds = [
  { left: "-5%", top: "8%", w: "38%", h: "22%", delay: "0s" },
  { left: "60%", top: "4%", w: "45%", h: "26%", delay: "-8s" },
  { left: "25%", top: "30%", w: "50%", h: "18%", delay: "-15s" },
];

export default function Sky() {
  return (
    <div aria-hidden className="sky absolute inset-0 overflow-hidden">
      {clouds.map((c, i) => (
        <span key={i} className="cloud-soft" style={{ left: c.left, top: c.top, width: c.w, height: c.h, animationDelay: c.delay }} />
      ))}
      <div className="stars absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
          />
        ))}
      </div>
    </div>
  );
}
