interface props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export function SecondaryButton({
  children,
  className = "min-w-44",
  onClick,
  type = "button",
  ...props
}: props) {
  return (
    <button
      className={`border-blue text-blue2 cursor-pointer rounded border bg-blue-400 py-2 disabled:border-gray-500 disabled:text-gray-500 ${className} common-styles-here`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
