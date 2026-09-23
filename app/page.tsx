import Image from "next/image";
import { ArrowDown, Clock3, ShieldCheck, Swords, Trophy } from "lucide-react";
import RegistrationForm from "@/components/registration-form";

const divisions = [
  { name: "Under 13", label: "Young ballers", note: "Age eligibility will be confirmed before the event." },
  { name: "Under 16", label: "Next generation", note: "Guardian details are required for every youth player." },
  { name: "Open", label: "No age ceiling", note: "For adult players ready to prove themselves." },
];

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="V1 Streets home"><span>V</span><b>1</b> STREETS</a>
        <nav aria-label="Main navigation">
          <a href="#format">The format</a>
          <a href="#divisions">Divisions</a>
          <a className="nav-cta" href="#register">Register</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true">
          <Image src="/v1-streets-poster.png" alt="" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
        </div>
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow">Jamaica&apos;s 1 vs 1 football competition</p>
          <h1>SMALL PITCH.<br /><em>BIG TALENT.</em></h1>
          <p className="hero-copy">No teammates to hide behind. Just your touch, your nerve and your moment. Step into the cage and show the streets what you can do.</p>
          <div className="hero-actions">
            <a className="button primary" href="#register">Register to compete</a>
            <a className="button ghost" href="#format">See how it works <ArrowDown size={18} /></a>
          </div>
          <p className="event-note"><span /> Next event details will be announced soon</p>
        </div>
      </section>

      <section className="marquee" aria-label="V1 Streets values">
        <div>FAST FEET <span>✦</span> SHARP SKILLS <span>✦</span> ONE WINNER <span>✦</span> FAST FEET <span>✦</span> SHARP SKILLS</div>
      </section>

      <section className="section format-section" id="format">
        <div className="section-heading">
          <p className="eyebrow">The battle</p>
          <h2>ONE BALL.<br />TWO PLAYERS.<br /><em>NO EXCUSES.</em></h2>
        </div>
        <div className="format-grid">
          <article><span>01</span><Swords /><h3>Head to head</h3><p>Every matchup is pure 1 vs 1 football. Attack, defend and create your own moment.</p></article>
          <article><span>02</span><Clock3 /><h3>Fast rounds</h3><p>Short, intense rounds keep the action moving and put every touch under pressure.</p></article>
          <article><span>03</span><Trophy /><h3>Play to win</h3><p>Progress through your division and earn the right to be called the V1 Streets champion.</p></article>
        </div>
        <p className="rules-note"><ShieldCheck size={18} /> Final match rules, event date, venue, entry fee and prize details will be shared with registered players before payment.</p>
      </section>

      <section className="section division-section" id="divisions">
        <div className="section-heading inline-heading">
          <div><p className="eyebrow">Choose your stage</p><h2>THREE DIVISIONS.<br /><em>ONE STREET.</em></h2></div>
          <p>Whatever your age, the standard stays the same: respect the game, back your skill and compete with character.</p>
        </div>
        <div className="division-grid">
          {divisions.map((division, index) => (
            <article key={division.name}>
              <p>0{index + 1} / DIVISION</p>
              <h3>{division.name}</h3>
              <strong>{division.label}</strong>
              <span>{division.note}</span>
              <a href="#register">Enter this division →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="register-section" id="register">
        <div className="register-intro">
          <p className="eyebrow">Claim your spot</p>
          <h2>READY TO<br /><em>STEP IN?</em></h2>
          <p>Complete the form to register your interest. The V1 Streets team will contact you with eligibility confirmation, event details and payment instructions.</p>
          <div className="registration-steps">
            <span><b>1</b> Send your details</span>
            <span><b>2</b> We confirm eligibility</span>
            <span><b>3</b> Pay and secure your place</span>
          </div>
        </div>
        <RegistrationForm />
      </section>

      <footer>
        <div className="brand"><span>V</span><b>1</b> STREETS</div>
        <p>Play. Compete. Connect. Belong.</p>
        <p>© {new Date().getFullYear()} V1 Streets. All rights reserved.</p>
      </footer>
    </main>
  );
}
