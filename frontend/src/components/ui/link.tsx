import Link from "next/link";

interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  text: string;
  href: string;
}

const CustomLink: React.FC<LinkButtonProps> = ({ text, href, ...props }) => {
  return (
    <Link
      href={href}
      {...props}
      className="text-sm font-medium text-blue-600 hover:underline"
    >
      {text}
    </Link>
  );
};

export default CustomLink;
