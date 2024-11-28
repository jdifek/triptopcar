const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="7.5" y="1.5" width="1" height="5" rx="0.5" stroke="black" />
    <rect x="15.5" y="1.5" width="1" height="5" rx="0.5" stroke="black" />
    <rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="2"
      stroke="black"
      strokeWidth="2"
    />
    <rect x="4.5" y="8.5" width="15" height="1" stroke="black" />
    <rect x="12.5" y="11.5" width="1" height="7" rx="0.5" stroke="black" />
    <rect
      x="12.9773"
      y="11.2429"
      width="1"
      height="4.62469"
      rx="0.5"
      transform="rotate(45 12.9773 11.2429)"
      stroke="black"
    />
  </svg>
);

export default CalendarIcon;
