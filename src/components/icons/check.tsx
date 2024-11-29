import clsx from "clsx";

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="9" stroke="#455873" stroke-width="2" />
      <rect
        x="7.87868"
        y="11.5858"
        width="1"
        height="5"
        rx="0.5"
        transform="rotate(-45 7.87868 11.5858)"
        stroke="#455873"
      />
      <rect
        x="15.9545"
        y="9.33845"
        width="1"
        height="7.17823"
        rx="0.5"
        transform="rotate(45 15.9545 9.33845)"
        stroke="#455873"
      />
    </svg>
  );
};

export default CheckIcon;
