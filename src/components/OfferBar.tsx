import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function OfferBar() {
  return (
    <div className="flex items-center justify-center gap-6 bg-[#F4F4F4] p-2">
      <GrFormPrevious className="cursor-pointer"/>
      <span className="text-sm font-medium">
        Get 10% off on business sign up
      </span>
      <GrFormNext className="cursor-pointer"/>
    </div>
  );
}

export default OfferBar;
