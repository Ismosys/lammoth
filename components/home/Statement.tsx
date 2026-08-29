import Reveal from "@/components/Reveal";
import { statement } from "@/content/site";

export default function Statement() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--raised)" }}
      aria-label="Statement"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 50%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="shell relative flex min-h-[70svh] items-center py-32">
        <Reveal y={36}>
          <p className="display-lg" style={{ maxWidth: "18ch" }}>
            {statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
