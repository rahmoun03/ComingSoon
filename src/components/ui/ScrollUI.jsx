import { useScrollStore } from "@/hooks/useScrollStore";

export default function ScrollUI({ pages = 6 }) {
  const scrollOffset = useScrollStore((state) => state.scrollOffset);
  const currentPage = Math.floor(scrollOffset * pages);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {currentPage === 0 && (
        <div className="hero-section">
          <h1 className="text-6xl font-bold text-white">Hero Section</h1>
        </div>
      )}
      {currentPage === 2 && (
        <div className="hive-section">
          <h2 className="text-5xl text-yellow-400">HiveXperience Section</h2>
        </div>
      )}
      {currentPage === 3 && (
        <div className="nove-section">
          <h2 className="text-5xl text-purple-400">NoveXperience Section</h2>
        </div>
      )}
      {/* Pages 2,5,6 empty */}
    </div>
  );
}
