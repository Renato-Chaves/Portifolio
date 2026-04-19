import Link from "next/link";

export default function SoftwarePage() {
  return (
    <main
      className="grid h-screen w-screen place-items-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0e1f3a 0%, var(--sw-bg) 55%, #030812 100%)",
        color: "var(--sw-ink)",
      }}
    >
      <div className="text-center">
        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "var(--sw-accent)",
            marginBottom: 24,
          }}
        >
          {"// SOFTWARE PORTFOLIO — UNDER CONSTRUCTION"}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(48px, 8vw, 120px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Coming soon.
        </h1>
        <Link
          href="/"
          className="mt-10 inline-block"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--sw-accent)",
            padding: "10px 18px",
            border: "1px solid var(--sw-accent)",
          }}
        >
          ← Back to selection
        </Link>
      </div>
    </main>
  );
}
