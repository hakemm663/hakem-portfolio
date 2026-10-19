import Link from "next/link";
export default function NotFound() {
  return (<main id="main" className="grid min-h-screen place-content-center gap-4 px-6 text-center">
    <h1 className="text-5xl font-semibold">Page not found</h1>
    <p className="text-mute">That page doesn&apos;t exist. The work is on the home page.</p>
    <Link href="/" className="btn btn-primary mx-auto">Back to home</Link>
  </main>);
}
