import CurvedCard from "../shared/CurvedCard";
import Img from "../ui/Image";
import Parallax from "../shared/Parallax";

export default function SeenHeard() {
  return (
    <>
      <Parallax offsetY={-200}>
        <CurvedCard className="bg-pink text-center">
          <span className="font-anton text-[25vw] leading-none">Seen &</span>

          <div className="font-anton relative flex justify-center text-[25vw] leading-none">
            <span className="overflow-hidden">Hea</span>
            <Img
              src="/assets/footer/footer_work.jpeg"
              className="relative -mt-10 h-36 w-28 -rotate-6 object-cover sm:-mt-20 sm:h-96 sm:w-[26rem]"
            />
            <span className="overflow-hidden">rd</span>
          </div>
        </CurvedCard>
      </Parallax>
    </>
  );
}
