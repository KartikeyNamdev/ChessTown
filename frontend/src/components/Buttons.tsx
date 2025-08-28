export const Buttons = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <button
        className="bg-[#81b64c] text-xl sm:text-2xl md:text-3xl px-5 sm:px-6 py-3 sm:py-4 rounded-2xl hover:bg-[#b2e068] transition text-white font-mono"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
