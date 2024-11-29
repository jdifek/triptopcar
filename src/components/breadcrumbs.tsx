import Link from "next/link";

interface BreadcrumbsProps {
  pathname: string;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathname, className }) => {
  const pathNameWithoutSlug = pathname.split("/").slice(0, -1).join("/");
  const breadcrumbs = pathNameWithoutSlug.split("/").filter(Boolean);

  return (
    <nav className={className}>
      <ul className="flex items-center text-white gap-6">
        <li className="flex items-center gap-2">
          <div className="p-3 rounded-full bg-white text-brand-base aspect-square flex items-center justify-center w-10 h-10">
            1
          </div>
          <Link href={`${"/"}`}>
            {"Search-results"
              .split("-")
              .filter((b) => b.trim().length !== 0)
              .map((b) => b[0]?.toUpperCase() + b.substring(1))
              .join(" ")}
          </Link>
          <span>{">"}</span>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center gap-2">
            <li className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-white text-brand-base aspect-square flex items-center justify-center w-10 h-10">
                {index + 2}
              </div>
              {index >= breadcrumbs.length - 1 ? (
                <span>
                  {breadcrumb
                    .split("-")
                    .filter((b) => b.trim().length !== 0)
                    .map((b) => b[0]?.toUpperCase() + b.substring(1))
                    .join(" ")}
                </span>
              ) : (
                <Link href={`${breadcrumb}`}>
                  {breadcrumb
                    .split("-")
                    .filter((b) => b.trim().length !== 0)
                    .map((b) => b[0]?.toUpperCase() + b.substring(1))
                    .join(" ")}
                </Link>
              )}
            </li>
            {index < breadcrumbs.length - 1 && <span>{">"}</span>}
          </div>
        ))}
        {pathname.includes("booking") && (
          <li className="flex items-center gap-2">
            <span className="-translate-x-3">{">"}</span>
            <div className="p-3 rounded-full bg-white text-brand-base aspect-square flex items-center justify-center w-10 h-10">
              {3}
            </div>
            <span>Checkout Details</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
