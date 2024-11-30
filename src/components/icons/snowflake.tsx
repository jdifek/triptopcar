interface SnowflakeIconProps {
  className?: string;
}

const SnowflakeIcon: React.FC<SnowflakeIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.90192 5.70575L9 6.80382L10.0981 2.70575M7 3.33972L12.5 12.866M13.9019 21.2942L15 17.1961L19.0981 18.2942M17 20.6602L11.5 11.134"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M3 15L6 12L3 9M2 12H13M21 15L18 12L21 9M22 12H11"
        stroke="black"
        strokeWidth="2"
      />
      <path
        d="M13.9019 2.70575L15 6.80382L19.0981 5.70575M17 3.33972L11.5 12.866M4.90192 18.2942L9 17.1961L10.0981 21.2942M7 20.6602L12.5 11.134"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default SnowflakeIcon;
