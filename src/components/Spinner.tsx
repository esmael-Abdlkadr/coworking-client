import "../../css/LoadingSpinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-8 h-8 m-auto border-4 border-t-transparent border-blue-500 rounded-full animate-spin animation-delay-200"></div>
        <div className="absolute inset-0 w-4 h-4 m-auto border-4 border-t-transparent border-blue-500 rounded-full animate-spin animation-delay-400"></div>
      </div>
    </div>
    // <div className="spinner-container">
    //   <div className="spinner">
    //     <div className="brand-name">
    //       <span>D</span>
    //       <span>E</span>
    //       <span>B</span>
    //       <span>O</span>
    //     </div>
    //     <div className="ring"></div>
    //   </div>
    // </div>
  );
};

export default Spinner;
