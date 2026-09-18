interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="
        w-full
        rounded-xl
        bg-[#FF9D23]
        py-3.5
        font-semibold
        text-white
        shadow-md
        shadow-orange-300
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-[#f28c0c]
        hover:shadow-lg
        hover:shadow-orange-200
        active:translate-y-0
        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
};

export default Button;