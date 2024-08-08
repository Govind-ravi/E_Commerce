export const PrimaryButton = ({ children, onClick, className='' }) => {
  return (
    <button
      onClick={onClick}
      className={`font-semibold bg-gradient-to-r from-[#199b8e] to-[#09635b] text-[#d5f4ee] py-2 px-4 rounded hover:from-[#106d64] hover:to-[#06453f] ${className}`}
    >
      {children}
    </button>
  );
};

export const H1 = ({ children, className='' }) => {
  return <h1 className={`text-[#d6e5e4] text-3xl font-bold ${ className}`}>{children}</h1>;
};

export const P = ({ children, className='' }) => {
  return <p className={`text-[#d3d7d6] ${className}`}>{children}</p>;
};

export const Input = ({ type, placeholder, value, onChange, className='' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-lg p-2 text-black focus:outline-none ${className}`}
    />
  );
};