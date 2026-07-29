/**
 * Layered background used behind every page: two slow-drifting color blobs plus a
 * topographic contour-line pattern (thematically tied to national park maps).
 * Fixed and pointer-events-none so it never interferes with page content.
 */
export function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="bg-topo absolute inset-0 opacity-[0.05]" />
      <div className="blob-drift-1 absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="blob-drift-2 absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="blob-drift-1 absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl [animation-delay:-8s]" />
    </div>
  );
}
