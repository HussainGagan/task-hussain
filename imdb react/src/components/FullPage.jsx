// eslint-disable-next-line react/prop-types
function FullPage({ children }) {
  return (
    <div className="h-screen bg-[#f9fafb] flex items-center justify-center">
      {children}
    </div>
  );
}

export default FullPage;
