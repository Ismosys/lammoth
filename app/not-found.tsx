import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-40">
      <p className="label">404</p>
      <h1 className="display-lg mt-6" style={{ maxWidth: "14ch" }}>
        This road leads nowhere
      </h1>
      <p className="body-copy mt-7">
        The page you were looking for is not here.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/" className="btn">
          Return Home
        </Link>
        <Link href="/music" className="btn btn-ghost">
          Browse the Music
        </Link>
      </div>
    </section>
  );
}
