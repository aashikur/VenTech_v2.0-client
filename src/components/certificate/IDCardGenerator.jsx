import { useRef, useEffect, useState } from "react";
import { toPng } from "html-to-image";
import useAxiosPublic from "@/hooks/axiosPublic";

const IDCardGenerator = () => {
  const cardRef = useRef();
  const axiosPublic = useAxiosPublic();

  const [user, setUser] = useState(null);

  // ✅ Sync logged-in user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access-token"); // or your token key
        if (!token) return;

        const { data } = await axiosPublic.get("/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data?.user);
        console.log("✅ Synced user:", data.user);
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Download ID card
  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${user?.name || "id_card"}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Employee ID Card
      </h2>

      {/* ID Card Preview */}
      <div
        ref={cardRef}
        className="w-[350px] h-[220px] border relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-r from-red-600 to-red-400 text-white mx-auto"
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full h-10 bg-black/30 flex items-center px-4 text-sm uppercase tracking-wide">
          <span>VenTech Corporation</span>
        </div>

        {/* Photo */}
        <div className="absolute top-12 left-4">
          <img
            src={
              user?.photoURL ||
              "https://via.placeholder.com/80x80.png?text=Photo"
            }
            alt="employee"
            className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-md"
          />
        </div>

        {/* Details */}
        <div className="absolute top-12 left-28 space-y-1">
          <p className="font-bold text-lg leading-tight">
            {user?.name || "Employee Name"}
          </p>
          <p className="text-sm">Phone: {user?.phone || "000-0000000"}</p>
          <p className="text-sm">ID: {user?._id?.slice(-6) || "EMP-XXX"}</p>
          <p className="text-xs opacity-80">
            Role: {user?.role || "staff"} | Status:{" "}
            <span className="capitalize">{user?.status || "active"}</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-black/40 flex justify-between items-center px-4 text-xs">
          <span>Issued: {user?.createdAt?.slice(0, 10) || "2025-01-01"}</span>
          <span>Valid: 1 Year</span>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Download ID Card
        </button>
      </div>
    </div>
  );
};

export default IDCardGenerator;
