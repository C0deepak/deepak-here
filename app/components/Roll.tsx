/** Text that rolls up on hover; the parent (or itself) needs `group` for parent-triggered hover. */
export default function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
