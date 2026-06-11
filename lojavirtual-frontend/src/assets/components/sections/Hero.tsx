import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="px-8 py-16 md:py-24 max-w-4xl">
      <div className="flex items-center gap-2 text-purple-400 font-bold mb-6">
        <span className="bg-purple-500/20 p-1 rounded">⚡</span> NEXT-GEN GADGETS
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
        TECH THAT <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300">
          EMPOWERS
        </span> <br/>
        EVERY DAY
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-md mb-8">
        Smart. Sleek. Seamless. Explore technology designed to elevate the way you live.
      </p>
      <button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold px-8 py-4 rounded-full flex items-center gap-4 transition-all">
        EXPLORE DEVICES <ArrowRight size={20} />
      </button>
    </section>
  );
};