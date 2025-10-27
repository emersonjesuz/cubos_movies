interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  value: number;
  isBluer?: boolean;
}

export function CircularProgress({ value, isBluer = true, ...props }: CircularProgressProps) {
  const strokeWidth = 10;
  const radius = 70 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg className="relative w-[140px] h-[140px]" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {isBluer && (
        <foreignObject x={0} y={0} width={140} height={140}>
          <div
            style={{
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 100%)",
              overflow: "hidden",
            }}
          />
        </foreignObject>
      )}

      <circle cx={70} cy={70} r={radius} fill="none" stroke="#fff" strokeOpacity={0.27} strokeWidth={strokeWidth} />

      <circle
        cx={70}
        cy={70}
        r={radius}
        fill="none"
        stroke="#FFE000"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />

      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontWeight="bold" fontFamily="sans-serif">
        <tspan fill="#FFE000" fontSize="20">
          {value}
        </tspan>
        <tspan fill="#ffffff" fontSize="10">
          %
        </tspan>
      </text>
    </svg>
  );
}
