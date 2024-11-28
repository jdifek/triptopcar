const EngineIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 14V9.5H7.5V6.5H11M5 14V17.5858C5 17.851 5.10536 18.1054 5.29289 18.2929L6 19L7.70711 20.7071C7.89464 20.8946 8.149 21 8.41421 21H15.5C16.0523 21 16.5 20.5523 16.5 20V16.5C16.5 15.9477 16.9477 15.5 17.5 15.5H19V18H21C21.5523 18 22 17.5523 22 17V9.5C22 8.94772 21.5523 8.5 21 8.5H19V11H17.0884C16.7252 11 16.3906 10.8031 16.2142 10.4856L14.2858 7.01436C14.1094 6.69689 13.7748 6.5 13.4116 6.5H11M5 14H2M11 6.5V4"
      stroke="black"
      strokeWidth="2"
    />
    <rect x="1.5" y="9.5" width="1" height="9" rx="0.5" stroke="black" />
    <rect
      x="7.5"
      y="3.5"
      width="1"
      height="7"
      rx="0.5"
      transform="rotate(-90 7.5 3.5)"
      stroke="black"
    />
    <rect
      x="8.5"
      y="14.5"
      width="1"
      height="5"
      rx="0.5"
      transform="rotate(-90 8.5 14.5)"
      stroke="black"
    />
    <rect
      x="12.4142"
      y="9.87874"
      width="1"
      height="5"
      rx="0.5"
      transform="rotate(45 12.4142 9.87874)"
      stroke="black"
    />
    <rect
      x="13.2426"
      y="13.7071"
      width="1"
      height="5"
      rx="0.5"
      transform="rotate(45 13.2426 13.7071)"
      stroke="black"
    />
    <rect
      x="8.5"
      y="14.5"
      width="1"
      height="5"
      rx="0.5"
      transform="rotate(-90 8.5 14.5)"
      stroke="black"
    />
  </svg>
);

export default EngineIcon;
