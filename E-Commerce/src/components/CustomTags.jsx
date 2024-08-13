export const Button = ({ children, onClick, className = "", style, disabled }) => {
  return (
    <button disabled={disabled}
      style={style}
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export const H1 = ({ children, className = "" }) => {
  return (
    <h1 className={`text-[#d6e5e4] text-3xl font-bold ${className}`}>
      {children}
    </h1>
  );
};

export const P = ({ children, className = "" }) => {
  return <p className={`text-[#d3d7d6] ${className}`}>{children}</p>;
};

export const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      required
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-transparent rounded-lg p-2 text-black focus:outline-none ${className}`}
    />
  );
};
