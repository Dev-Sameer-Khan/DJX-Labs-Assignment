import "./ui.css";
import { useAtom } from "jotai";
import { useRef, useState, useEffect } from "react";
import { UIAtom, CONTENT } from "./ui.jotai";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

const NAV = [
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "works", label: "Works" },
  { key: "contact", label: "Contact" },
];

function AboutPanel() {
  const d = CONTENT.about;
  const e = CONTENT.contact;
  return (
    <div className="panel-content">
      <p className="tagline inter">{d.tagline}</p>
      <div className="body-text">
        {d.body.map((p, i) => (
          <p key={i} className="inter">
            {p}
          </p>
        ))}
      </div>
      <div className="divider" />
      <p className="section-label inter">What We Do</p>
      <ul className="pill-list">
        {d.list.map((item, i) => (
          <li
            key={i}
            className="pill inter"
            style={{ "--delay": `${i * 0.05}s` }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="panel-content">
        <p className="tagline inter">{d.tagline}</p>
        <div className="contact-list">
          {e.details.map((item, i) => (
            <div
              key={i}
              className="contact-row"
              style={{ "--delay": `${i * 0.08}s` }}
            >
              <span className="contact-label inter">{item.label}</span>
              {item.href ? (
                <a href={item.href} className="contact-value link inter">
                  {item.value}
                </a>
              ) : (
                <span className="contact-value inter">{item.value}</span>
              )}
            </div>
          ))}
        </div>
        <div className="divider" />
        <div className="cta-block">
          <p className="cta-text orbiton">
            Ready to build something extraordinary?
          </p>
          <a href="mailto:hello@visualab.studio" className="cta-btn inter">
            Start a Project <span className="cta-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ServicesPanel() {
  const d = CONTENT.services;
  return (
    <div className="panel-content">
      <p className="tagline inter">{d.tagline}</p>
      <div className="services-grid">
        {d.items.map((item, i) => (
          <div
            key={i}
            className="service-card"
            style={{ "--delay": `${i * 0.06}s` }}
          >
            <span className="service-icon">{item.icon}</span>
            <div>
              <p className="service-title orbiton">{item.title}</p>
              <p className="service-desc inter">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorksPanel() {
  const d = CONTENT.works;
  return (
    <div className="panel-content">
      <p className="tagline inter">{d.tagline}</p>
      <div className="works-list">
        {d.items.map((item, i) => (
          <div
            key={i}
            className="work-item"
            style={{ "--delay": `${i * 0.07}s` }}
          >
            <div className="work-header">
              <span className="work-title orbiton">{item.title}</span>
              <span className="work-tag inter">{item.tag}</span>
            </div>
            <p className="work-desc inter">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel() {
  const d = CONTENT.contact;
  return (
    <div className="panel-content">
      <p className="tagline inter">{d.tagline}</p>
      <div className="contact-list">
        {d.details.map((item, i) => (
          <div
            key={i}
            className="contact-row"
            style={{ "--delay": `${i * 0.08}s` }}
          >
            <span className="contact-label inter">{item.label}</span>
            {item.href ? (
              <a href={item.href} className="contact-value link inter">
                {item.value}
              </a>
            ) : (
              <span className="contact-value inter">{item.value}</span>
            )}
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="cta-block">
        <p className="cta-text orbiton">
          Ready to build something extraordinary?
        </p>
        <a href="mailto:hello@visualab.studio" className="cta-btn inter">
          Start a Project <span className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}

const PANELS = {
  about: AboutPanel,
  services: ServicesPanel,
  works: WorksPanel,
  contact: ContactPanel,
};

export default function SceneUI() {
  const [ui, setUI] = useAtom(UIAtom);
  const [visible, setVisible] = useState(Boolean(ui.current));
  const [animKey, setAnimKey] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (ui.current !== null && !visible) {
      setVisible(true);
    }
    if (ui.current === null && visible) {
      setVisible(false);
    }
  }, [ui.current]);

  const select = (key) => {
    if (ui.current === key) {
      setVisible(false);
      setTimeout(() => setUI((s) => ({ ...s, current: null })), 380);
      return;
    }
    if (visible) {
      setVisible(false);
      setTimeout(() => {
        setUI((s) => ({ ...s, current: key }));
        setAnimKey((k) => k + 1);
        scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
        setVisible(true);
      }, 300);
    } else {
      setUI((s) => ({ ...s, current: key }));
      setAnimKey((k) => k + 1);
      setVisible(true);
    }
  };

  const Panel = ui.current ? PANELS[ui.current] : null;
  const title = ui.current ? CONTENT[ui.current].label : "";

  // gsap.registerPlugin(SplitText)

  // const text = new SplitText.create({})

  return (
    <>
      {/* Vertical nav */}
      <div className="orbiton fixed max-[599px]:top-6 top-8 max-[599px]:-left-8 -left-10 -rotate-45 bg-white  text-[#1a4fd6] font-[Orbiton] font-bold flex items-center w-[10%] max-[599px]:w-[40%] justify-center text-2xl">
        VisuaLab
      </div>
      <div className="orbiton split fixed top-5 max-[599px]:top-2 max-[599px]:right-0 text-center right-5 text-white font-[Orbiton] font-bold flex flex-col items-center w-auto max-[599px]:w-[70%] rounded-lg shadow-lg">
        <span className="text-xl capitalize">
          A playground for creative visual solutions.
        </span>
        <span className="text-sm text-white/50">
          Click on Islands to View Details
        </span>
      </div>

      <div className="orbiton fixed bottom-0 left-1/2 -translate-x-1/2 rounded-md text-white/50 font-[Orbiton] flex flex-col items-center justify-center select-none">
        <span>Scroll to Explore</span>
        <span className="animate-bounce mt-1 text-2xl" aria-hidden="true">
          ↓
        </span>
      </div>

      {/* Right panel */}
      <aside className={`scene-panel ${visible ? "open" : ""}`}>
        {/* Bleeds into 3D */}
        <div className="panel-atmosphere" />
        <div className="panel-fog-left" />

        <div className="panel-inner">
          <div className="panel-header">
            <div className="header-counter inter">
              <span className="counter-current">
                {ui.current
                  ? String(
                      NAV.findIndex((n) => n.key === ui.current) + 1,
                    ).padStart(2, "0")
                  : "00"}
              </span>
              <span className="counter-sep">/</span>
              <span className="counter-total">04</span>
            </div>

            <h2 className="panel-title orbiton" key={`t-${animKey}`}>
              {title}
            </h2>

            <button className="close-btn" onClick={() => select(ui.current)}>
              <span />
              <span />
            </button>
          </div>

          <div className="panel-scroll" ref={scrollRef}>
            {Panel && (
              <div key={animKey} className="panel-anim">
                <Panel />
              </div>
            )}
          </div>

          <div className="panel-footer">
            <span className="footer-studio inter">VISUALAB STUDIO</span>
            <span className="footer-year inter">2025</span>
          </div>
        </div>
      </aside>
    </>
  );
}
