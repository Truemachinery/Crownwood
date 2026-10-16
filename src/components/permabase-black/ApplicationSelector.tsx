"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import styles from "@/app/chemicals/permabase-black/permabase-black.module.css";

const applications = [
  {
    name: "Ranch & private roads",
    title: "A better arrival. All the way in.",
    description:
      "Give suitable dirt and caliche access roads a more cohesive, dark surface. Start with the material you have and the way you use the road.",
    details: [
      "Ranch entrances and long driveways",
      "Farm and private access routes",
      "Low-speed traffic on suitable soils",
    ],
    question: "Tell us the road length, width, and existing surface.",
  },
  {
    name: "Rural & county routes",
    title: "Put the road ahead in focus.",
    description:
      "Evaluate polymer stabilization for suitable low-speed rural routes where loose material and dust are recurring maintenance concerns. Establish the project requirements before treating the full road.",
    details: [
      "Selected low-speed unpaved routes",
      "Defined drainage and traffic requirements",
      "Demonstration sections for evaluation",
    ],
    question: "Share the road conditions, traffic, and project specifications.",
  },
  {
    name: "Yards & working areas",
    title: "A working surface with a finished look.",
    description:
      "Bring stabilization, dust control, and appearance into the same conversation for suitable laydown yards and staging areas. Equipment loads and turning movements guide the recommendation.",
    details: [
      "Low-speed storage and laydown areas",
      "Selected construction staging surfaces",
      "Service access and maintenance routes",
    ],
    question: "Let us know the area, equipment, and loading conditions.",
  },
];

export function ApplicationSelector() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const application = applications[selected];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % applications.length;
    else if (event.key === "ArrowLeft")
      next = (index + applications.length - 1) % applications.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = applications.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className={styles.selector}>
      <div
        role="tablist"
        aria-label="Choose your project type"
        className={styles.tabs}
      >
        {applications.map((item, index) => (
          <button
            key={item.name}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span>0{index + 1}</span>
            {item.name}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        tabIndex={0}
        className={styles.applicationPanel}
      >
        <div>
          <h3>{application.title}</h3>
          <p>{application.description}</p>
        </div>
        <div>
          <ul>
            {application.details.map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}
          </ul>
          <a href="#quote">
            {application.question}
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </div>
  );
}
