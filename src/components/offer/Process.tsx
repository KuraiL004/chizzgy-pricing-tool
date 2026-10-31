import { PROCESS } from "@/config/offer-config";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

// İdeyadan təhvilə qədər — bütün mərhələlər bizdədir
export function Process() {
  return (
    <section id="proses" className="max-w-6xl mx-auto px-5 py-20 sm:py-28 scroll-mt-20">
      <Reveal>
        <SectionHeader
          eyebrow="Başdan sona"
          title="Siz yalnız çəkilişə gəlirsiniz. Qalanı bizdədir."
          description="Hər videonu ideyadan paylaşıma qədər biz hazırlayırıq. Sizə ideal nəticə təqdim olunur."
        />

        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((step, i) => (
            <li
              key={step.title}
              className={`surface rounded-[22px] p-5 sm:p-6 flex flex-col ${i === PROCESS.length - 1 ? "surface-glow sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <span className="text-[40px] font-light leading-none text-label-3 tabular-nums">0{i + 1}</span>
              <h3 className="mt-8 text-[19px] font-semibold text-label">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-snug text-label-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
