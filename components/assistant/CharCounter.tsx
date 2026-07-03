export default function CharCounter({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  const overLimit = current > max;
  const nearLimit = !overLimit && current >= max * 0.9;

  const color = overLimit
    ? "text-red-600"
    : nearLimit
      ? "text-amber-600"
      : "text-emerald-600";

  return (
    <span className={`text-xs font-medium tabular-nums ${color}`}>
      {current} / {max}
    </span>
  );
}
