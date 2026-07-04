export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 25C9.5 25 10.5 12 16 12C20 12 20.5 19 24.5 19C27 19 27.5 9 28 7"
        stroke="url(#vantage-logo-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="7" r="2.25" fill="url(#vantage-logo-gradient)" />
      <defs>
        <linearGradient
          id="vantage-logo-gradient"
          x1="4"
          y1="25"
          x2="28"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
