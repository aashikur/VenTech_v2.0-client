import { useRef } from "react";
import { toPng } from "html-to-image";

const IDCardGenerator = () => {
  const cardRef = useRef();

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "id_card.png";
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="p-6">
      {/* ID Card Preview */}
      <div
        ref={cardRef}
        className="w-[300px] h-[180px] border relative bg-[url('/templates/id-bg.png')] bg-cover rounded-lg text-white p-4"
      >
        <img
          src="https://titanui.com/wp-content/uploads/2025/05/06/Realistic-Modern-ID-Card-Mockup-1024x774.webp"
          alt="photo"
          className="w-16 h-16 rounded-full absolute top-4 left-4"
        />
        <div className="absolute top-4 left-24">
          <p className="font-bold text-lg">John Doe</p>
          <p>Phone: 0123456789</p>
          <p>ID: EMP-101</p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Download ID Card
      </button>
    </div>
  );
};

export default IDCardGenerator;
