import { FC } from "react";

const SeatIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_872_76)">
      <path
        d="M14 19H9C6.79086 19 5 17.2091 5 15V7"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M20 21H18C17.4477 21 17 20.5523 17 20V16.4542C17 15.9201 16.5803 15.4803 16.0468 15.4553L13 15.3125M13 15.3125H10C9.44772 15.3125 9 14.8648 9 14.3125V9C9 8.44772 9.44772 8 10 8H11C12.1046 8 13 8.89543 13 10V15.3125Z"
        stroke="black"
        strokeWidth="2"
      />
      <circle cx="11" cy="4" r="1" stroke="black" strokeWidth="2" />
      <path
        d="M13 10L15.8083 11.6047C16.2616 11.8638 16.7746 12 17.2967 12H20"
        stroke="black"
        strokeWidth="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_872_76">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SeatIcon;
