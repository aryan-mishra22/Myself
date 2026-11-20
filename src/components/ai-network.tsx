const nodes = [
  { name: "Data", x: 75, y: 170 },
  { name: "Python", x: 140, y: 505 },
  { name: "Django", x: 660, y: 505 },
  { name: "React", x: 735, y: 195 },
];

const connections = [
  "M75 170 Q130 15 420 55",
  "M140 505 C-20 350 0 60 420 55",
  "M660 505 C820 375 800 50 420 55",
  "M735 195 Q680 30 420 55",
];

export function AINetwork() {
  return (
    <svg className="ai-network" viewBox="0 0 800 600" fill="none" aria-hidden="true" focusable="false">
      {connections.map((path, index) => (
        <g key={path} className={`ai-network__branch ai-network__branch--${index}`}>
          <path d={path} className="ai-network__connection" />
          <path d={path} pathLength={100} className="ai-network__signal" style={{ animationDelay: `${index * -2}s` }} />
        </g>
      ))}
      <path d="M75 170 Q-10 430 140 505 Q420 620 660 505 Q800 360 735 195" className="ai-network__connection ai-network__connection--outer" />
      {nodes.map((node) => (
        <g key={node.name} transform={`translate(${node.x} ${node.y})`}>
          <circle r="20" className="ai-network__node-ring" />
          <circle r="5" className="ai-network__node-core" />
          <text y="37" textAnchor="middle" className="ai-network__label">{node.name}</text>
        </g>
      ))}
      <g transform="translate(420 55)">
        <circle r="34" className="ai-network__pulse" />
        <circle r="25" className="ai-network__hub" />
        <text y="5" textAnchor="middle" className="ai-network__hub-label">AI</text>
        <circle cx="-30" cy="-8" r="2" className="ai-network__node-core" />
        <circle cx="29" cy="13" r="2" className="ai-network__node-core" />
      </g>
    </svg>
  );
}
