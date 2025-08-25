export default function HeroVideo() {
  return (
    <video
      className="absolute top-0 -z-10 min-h-[calc(100dvh-3.5rem)] w-full object-cover"
      playsInline
      muted
      loop
      autoPlay
    >
      <source src="/banner.mp4" />
    </video>
  );
}
