import Lottie from "lottie-react";
import loading from "@/assets/lottie/heart-beat.json"

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <h2 className="text-6xl">L</h2> */}
      <div className="max-w-[250px]">
        {/* <Lottie animationData={loading}></Lottie> */}
        <span class="loading loading-spinner text-accent"></span>

        <div className="flex justify-center mt-5">
          VenTech Loading..
        </div>
      </div>
      {/* <h2 className="text-6xl">...........</h2> */}
    </div>
  );
};

export default Loading;
