// components/demo.tsx
import ShaderBackground from "@/components/ui/shader-background";

const DemoOne = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <ShaderBackground />
      <div className="z-10 text-white text-center">
        <h1 className="text-5xl font-bold tracking-tight">Immersive Shader</h1>
        <p className="mt-4 text-lg text-gray-300">Background integration complete.</p>
      </div>
    </div>
  );
};

export { DemoOne };