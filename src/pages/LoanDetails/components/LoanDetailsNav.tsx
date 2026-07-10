import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
  { id: "applicant-info", label: "Applicant Information" },
  { id: "loan-details", label: "Loan Details" },
  { id: "disbursements-info", label: "Disbursements Information" },
  { id: "commission", label: "Commission" },
  { id: "broker-info", label: "Broker Information" },
  { id: "additional-info", label: "Additional Information" },
];

const LoanDetailsNav = () => {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <nav className="w-full lg:w-[220px] lg:shrink-0">
      <div className="sticky top-[88px] space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={clsx(
              "w-full rounded-lg px-4 py-2.5 text-left text-[14px] font-medium transition-colors",
              activeId === item.id
                ? "bg-[#f0eeff] text-[#6d4cff]"
                : "text-[#65606c] hover:bg-[#f2f0f7] hover:text-[#4b4a53]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default LoanDetailsNav;
