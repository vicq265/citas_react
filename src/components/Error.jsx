const Error = ({children}) => {
  return (
    <div
      className="bg-red-800 text-white p-3 rounded-md 
            uppercase font-bold text-center mb-3"
    >
      {children}
    </div>
  );
};

export default Error;
