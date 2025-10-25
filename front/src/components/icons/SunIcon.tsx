import * as React from "react";

export default function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={3} fill="#F1DDFF" fillOpacity={0.98} stroke="#EEEEF0" strokeWidth={2} />
      <path
        d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636L7.05 7.05"
        stroke="#F1DDFF"
        strokeOpacity={0.98}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
