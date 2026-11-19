export function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-background__aurora ambient-background__aurora--blue" />
      <div className="ambient-background__aurora ambient-background__aurora--violet" />
      <div className="ambient-background__aurora ambient-background__aurora--teal" />
      <div className="ambient-background__particles">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37 + 7) % 100}%`,
              top: `${(index * 23 + 11) % 100}%`,
              animationDelay: `${index * -2.3}s`,
              animationDuration: `${24 + (index % 5) * 6}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
