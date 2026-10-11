"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="state-card" role="alert">
      <div className="eyebrow">Something went wrong</div>
      <h2>We couldn’t load this view.</h2>
      <p>Please try again. If the problem continues, check that the API service is running.</p>
      <button className="button-primary" onClick={() => reset()}>Try again</button>
    </div>
  );
}
