type ButtonProps = {
    children: React.ReactNode;  // childrenで渡された内容を表示する
    onClick: () => void;
  };
 
  const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        {children}  {/* childrenを表示 */}
      </button>
    );
  };
 
  export default Button;