import clsx from "clsx";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
      <svg
        width="24"
        className={className}
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="11.5" y="2.5" width="1" height="5" rx="0.5" stroke="black" />
        <rect x="11.5" y="16.5" width="1" height="5" rx="0.5" stroke="black" />
        <rect
          x="21.5"
          y="11.5"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(90 21.5 11.5)"
          stroke="black"
        />
        <rect
          x="7.5"
          y="11.5"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(90 7.5 11.5)"
          stroke="black"
        />
        <rect
          x="18.3743"
          y="4.93941"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(45 18.3743 4.93941)"
          stroke="black"
        />
        <rect
          x="8.45409"
          y="14.8181"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(45 8.45409 14.8181)"
          stroke="black"
        />
        <rect
          x="19.0558"
          y="18.3792"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(135 19.0558 18.3792)"
          stroke="black"
        />
        <rect
          x="9.18685"
          y="8.44922"
          width="1"
          height="5"
          rx="0.5"
          transform="rotate(135 9.18685 8.44922)"
          stroke="black"
        />
      </svg>
  );
};

export default Loader;
