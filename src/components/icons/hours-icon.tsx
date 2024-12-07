const CalendarIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" />
    <rect x="10.5" y="8.5" width="1" height="5" rx="0.5" stroke="black" />
    <rect x="11.5" y="13.5" width="1" height="6" rx="0.5" transform="rotate(-90 11.5 13.5)" stroke="black" />
  </svg>
);

export default CalendarIcon;
