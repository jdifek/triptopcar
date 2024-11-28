import { FC } from "react";

const TransmissionIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 9H6C4.34315 9 3 10.3431 3 12V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V12C21 10.3431 19.6569 9 18 9H17.5"
      stroke="black"
      strokeWidth="2"
    />
    <path
      d="M15 7.33333V15.5C15 16.6046 14.1046 17.5 13 17.5C11.8954 17.5 11 16.6046 11 15.5V7.5C11 6.94772 10.5523 6.5 10 6.5H9C8.44772 6.5 8 6.05228 8 5.5H6.5C6.22386 5.5 6 5.27614 6 5C6 4.72386 6.22386 4.5 6.5 4.5H8V4C8 3.44772 8.44772 3 9 3H15.75C16.7165 3 17.5 3.7835 17.5 4.75V4.83333C17.5 5.75381 16.7538 6.5 15.8333 6.5C15.3731 6.5 15 6.8731 15 7.33333Z"
      stroke="black"
      strokeWidth="2"
    />
    <rect x="5.5" y="14.5" width="2" height="1" rx="0.5" stroke="black" />
    <rect x="5.5" y="17.5" width="2" height="1" rx="0.5" stroke="black" />
    <rect x="5.5" y="11.5" width="2" height="1" rx="0.5" stroke="black" />
  </svg>
);

export default TransmissionIcon;
