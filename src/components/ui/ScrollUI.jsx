import { useScrollStore } from "@/hooks/useScrollStore";
import BreakingNews from '@/pages/BreakingNews';
import NoveXperience from '@/pages/NoveXperience';
import HiveXperience from '@/pages/HiveXperience';
import Enter from '@/pages/Enter';

export default function ScrollUI({ pages = 12 }) {
  const scrollOffset = useScrollStore((state) => state.scrollOffset);
  const currentPage = Math.floor(scrollOffset * pages);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {currentPage === 0 && (
        <Enter />
      )}
      {currentPage === 3 && (
        <NoveXperience />
      )}
      {currentPage === 5 && (
        <HiveXperience />
      )}
      {/* Pages 2,5,6 empty */}
    </div>
  );
}
