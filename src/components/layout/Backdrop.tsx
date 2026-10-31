// Səhifə fonu: işıq kürələri, şüşə zolaqlar və kino dənəsi (grain)
// Kürələr səhifə boyu müxtəlif hündürlükdə yerləşir ki, scroll edəndə fon dəyişsin.
const ORBS = [
  { top: "-6%", left: "-18%", size: "62rem", className: "orb orb-strong orb-drift" },
  { top: "12%", left: "60%", size: "50rem", className: "orb orb-drift-slow" },
  { top: "26%", left: "-20%", size: "52rem", className: "orb orb-strong orb-drift" },
  { top: "38%", left: "58%", size: "56rem", className: "orb orb-strong orb-drift-slow" },
  { top: "52%", left: "-24%", size: "54rem", className: "orb orb-drift" },
  { top: "64%", left: "55%", size: "58rem", className: "orb orb-strong orb-drift-slow" },
  { top: "78%", left: "-12%", size: "52rem", className: "orb orb-strong orb-drift" },
  { top: "90%", left: "45%", size: "50rem", className: "orb orb-drift-slow" },
];

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ORBS.map((o) => (
        <span
          key={o.top}
          className={o.className}
          style={{ top: o.top, left: o.left, width: o.size, height: o.size }}
        />
      ))}
      {/* Hero üzərində şaquli şüşə zolaqlar */}
      <div className="fluted absolute inset-x-0 top-0 h-[120vh]" />
      {/* Bütün səhifəyə dən */}
      <div className="grain fixed inset-0" />
    </div>
  );
}
