interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-2.5
        rounded-[10px]
        border
        border-slate-200
        bg-white
        px-5
        text-[13px]
        font-semibold
        text-slate-800
        transition-all
        duration-200
        hover:border-slate-300
        hover:bg-slate-50
        active:scale-[0.99]
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;