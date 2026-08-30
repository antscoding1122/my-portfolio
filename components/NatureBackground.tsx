// Animated GIF as the full-screen page background.
export default function NatureBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://i.gifer.com/Vs69.gif"
        alt=""
        className="h-full w-full object-cover"
      />
      {/* Subtle overlay so content stays readable without hiding the GIF */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}