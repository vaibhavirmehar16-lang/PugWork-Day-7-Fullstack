import Link from "next/link";

export default function NotFound() {
  return (
    <div className="state-card">
      <div className="eyebrow">404 · Not found</div>
      <h2>We couldn’t find that employee.</h2>
      <p>The record may have been deleted or the link may be incorrect.</p>
      <Link className="button-primary" href="/employees">Back to directory</Link>
    </div>
  );
}
