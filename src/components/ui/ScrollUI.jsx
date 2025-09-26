import { useScrollStore } from "@/hooks/useScrollStore";
import BreakingNews from '@/pages/BreakingNews';

export default function ScrollUI({ pages = 12 }) {
  const scrollOffset = useScrollStore((state) => state.scrollOffset);
  const currentPage = Math.floor(scrollOffset * pages);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {currentPage === 0 && (
        <BreakingNews />
      )}
      {currentPage === 3 && (
        <div className="hive-section">
          <h2 className="text-5xl text-yellow-400">HiveXperience Section</h2>
        </div>
      )}
      {currentPage === 5 && (
        <div className="nove-section">
          <h2 className="text-5xl text-purple-400">NoveXperience Section</h2>
        </div>
      )}
      {/* Pages 2,5,6 empty */}
    </div>
  );
}
