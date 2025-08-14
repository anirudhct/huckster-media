import { Link } from "react-router";
import BottamPoster from "../components/shared/BottamPoster";

const socials = [
  {
    label: "LinkedIn",
    href: "https://ae.linkedin.com/company/huckstermena",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/huckstermena/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61569637804729",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCFszTXBFQKPcVpKeyttrL2w",
  },
];

export default function Footer() {
  return (
    <div className="space-y-3 p-5">
      <BottamPoster />

      <div className="border-t border-white/70" />
      <footer className="relative z-30 w-full">
        <div className="flex w-full flex-wrap justify-center gap-3 md:justify-between">
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <Link
                to={s.href}
                target="_blank"
                className="3xl:text-lg 5xl:text-xl 7xl:text-2xl group relative text-sm sm:text-base"
                aria-label="socials"
              >
                {s.label}
                <div className="transition-tranform absolute w-0 group-hover:border border-white duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <p className="4xl:text-lg 5xl:text-xl 7xl:text-2xl z-50 text-center text-sm xl:text-base">
            © {new Date().getFullYear()} Huckster Productions. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
