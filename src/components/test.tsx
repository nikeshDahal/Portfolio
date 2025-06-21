export const NoPage = () => {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('/src/assets/images/fuckOFF.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-white font-bold">! Page not found.</p>
      </div>
    </div>
  );
};
