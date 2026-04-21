/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const ADMIN_EMAIL         = "agita1business@gmail.com";
const ADMIN_PASSWORD      = "agita_admin_2026";
const TOTAL_SECS          = 7200;

// ─── COLOUR CONFIG ───────────────────────────────────────────────────────────
const CFG = {
  English:     { c:"#b45309", l:"#fef3c7", i:"📖" },
  Mathematics: { c:"#0369a1", l:"#e0f2fe", i:"📐" },
  Physics:     { c:"#1565c0", l:"#dbeafe", i:"⚡" },
  Chemistry:   { c:"#065f46", l:"#d1fae5", i:"🧪" },
  Biology:     { c:"#581c87", l:"#ede9fe", i:"🧬" },
};

// ─── SUBJECT COMBINATIONS ────────────────────────────────────────────────────
const COMBOS = [
  { label:"Physics, Chemistry & Biology",     sciences:["Physics","Chemistry","Biology"]     },
  { label:"Physics, Chemistry & Mathematics", sciences:["Mathematics","Physics","Chemistry"] },
  { label:"Physics, Biology & Mathematics",   sciences:["Mathematics","Physics","Biology"]   },
  { label:"Chemistry, Biology & Mathematics", sciences:["Mathematics","Chemistry","Biology"] },
  { label:"Economics, Government & Literature (Art/SS)", sciences:["Physics","Chemistry","Biology"] },
];

// ─── QUESTION BANK (JAMB past-question difficulty) ───────────────────────────
const QB = {

  English: [
    // Comprehension / Vocabulary in Context
    { id:"E1",  s:"English", t:"Vocabulary",    q:"'The politician's perfidious conduct alienated his supporters.' PERFIDIOUS means:",                                   opts:["Admirable","Treacherous","Courageous","Indifferent"],           ans:1, sol:"Perfidious = deliberately disloyal or treacherous. The politician betrayed trust." },
    { id:"E2",  s:"English", t:"Vocabulary",    q:"'Her garrulous nature made meetings drag on for hours.' GARRULOUS means:",                                           opts:["Silent","Aggressive","Excessively talkative","Charming"],      ans:2, sol:"Garrulous = excessively talkative, especially about trivial things." },
    { id:"E3",  s:"English", t:"Vocabulary",    q:"'The judge was known for his equitable decisions.' EQUITABLE means:",                                                opts:["Biased","Fair and impartial","Speedy","Harsh"],                ans:1, sol:"Equitable = fair and impartial — treating all parties equally." },
    { id:"E4",  s:"English", t:"Vocabulary",    q:"'His obsequious flattery disgusted the dignified guest.' OBSEQUIOUS means:",                                          opts:["Sincere","Brutally honest","Excessively eager to please","Reluctant"], ans:2, sol:"Obsequious = excessively compliant or flattering in a servile way." },
    { id:"E5",  s:"English", t:"Vocabulary",    q:"'The scientist's hypothesis was corroborated by subsequent experiments.' CORROBORATED means:",                       opts:["Contradicted","Confirmed","Ignored","Questioned"],              ans:1, sol:"Corroborate = confirm or give support to a statement or theory." },
    { id:"E6",  s:"English", t:"Antonyms",      q:"Opposite of TACITURN:",                                                                                             opts:["Quiet","Loquacious","Hostile","Shy"],                          ans:1, sol:"Taciturn = reserved/saying little. Its antonym is loquacious (very talkative)." },
    { id:"E7",  s:"English", t:"Antonyms",      q:"Opposite of PENURIOUS:",                                                                                            opts:["Miserly","Wealthy","Stingy","Frugal"],                         ans:1, sol:"Penurious = extremely poor/stingy. Antonym = wealthy/opulent." },
    { id:"E8",  s:"English", t:"Antonyms",      q:"Opposite of EPHEMERAL:",                                                                                            opts:["Brief","Fleeting","Eternal","Rapid"],                          ans:2, sol:"Ephemeral = lasting a very short time. Antonym = eternal/permanent." },
    { id:"E9",  s:"English", t:"Antonyms",      q:"Opposite of ACRIMONY:",                                                                                             opts:["Bitterness","Resentment","Goodwill","Hostility"],              ans:2, sol:"Acrimony = bitterness or ill feeling. Antonym = goodwill/cordiality." },
    { id:"E10", s:"English", t:"Antonyms",      q:"Opposite of SYCOPHANTIC:",                                                                                          opts:["Flattering","Fawning","Honest and independent","Submissive"],  ans:2, sol:"Sycophantic = fawning/flattering. Antonym = honest and independent." },
    // Idioms
    { id:"E11", s:"English", t:"Idioms",        q:"'He was given a taste of his own medicine.' This means:",                                                            opts:["He was given medicine he prescribed","He was treated the same bad way he treats others","He received a reward","He was hospitalised"], ans:1, sol:"'A taste of your own medicine' = to be treated the same unpleasant way you treat others." },
    { id:"E12", s:"English", t:"Idioms",        q:"'She threw a spanner in the works.' This means she:",                                                                opts:["Fixed the machinery","Deliberately caused a problem in a plan","Helped solve a problem","Started a new project"], ans:1, sol:"'Throw a spanner in the works' = to deliberately cause a disruption to a plan." },
    { id:"E13", s:"English", t:"Idioms",        q:"'The news was a double-edged sword.' This means:",                                                                   opts:["It had two swords","It had both good and bad consequences","It was very sharp news","It cut deeply"], ans:1, sol:"'Double-edged sword' = something that has both advantages and disadvantages." },
    { id:"E14", s:"English", t:"Idioms",        q:"'He has an axe to grind with the management.' This means:",                                                          opts:["He is a carpenter","He wants to sharpen tools","He has a personal grievance or selfish motive","He is angry without reason"], ans:2, sol:"'Have an axe to grind' = to have a personal grievance or hidden selfish motive." },
    { id:"E15", s:"English", t:"Idioms",        q:"'The committee decided to sweep the issue under the carpet.' This means they:",                                       opts:["Cleaned the office","Resolved the issue permanently","Deliberately hid or ignored the problem","Postponed the meeting"], ans:2, sol:"'Sweep under the carpet' = to hide or ignore a problem rather than dealing with it." },
    // Phrasal Verbs
    { id:"E16", s:"English", t:"Phrasal Verbs", q:"'The meeting was PUT OFF until further notice.' PUT OFF means:",                                                      opts:["Cancelled permanently","Postponed","Brought forward","Ended abruptly"], ans:1, sol:"'Put off' = to postpone or delay to a later time. Different from 'call off' which means cancel." },
    { id:"E17", s:"English", t:"Phrasal Verbs", q:"'The government decided to CLAMP DOWN on examination malpractice.' CLAMP DOWN means:",                               opts:["Ignore","Encourage","Take strict action against","Investigate"], ans:2, sol:"'Clamp down on' = to take strict action to suppress or prevent something." },
    { id:"E18", s:"English", t:"Phrasal Verbs", q:"'She was asked to ACCOUNT FOR the missing funds.' ACCOUNT FOR means:",                                               opts:["Find","Spend","Provide a satisfactory explanation for","Recover"], ans:2, sol:"'Account for' = to give a satisfactory explanation or justification for something." },
    { id:"E19", s:"English", t:"Phrasal Verbs", q:"'The soldier GAVE HIMSELF UP to the enemy.' GAVE HIMSELF UP means:",                                                 opts:["Killed himself","Surrendered","Escaped","Fought bravely"], ans:1, sol:"'Give oneself up' = to surrender, especially to authorities or an enemy." },
    { id:"E20", s:"English", t:"Phrasal Verbs", q:"'He tends to TALK DOWN TO his subordinates.' TALK DOWN TO means:",                                                   opts:["Speak quietly","Speak in a condescending/patronising way","Motivate","Shout at"], ans:1, sol:"'Talk down to' = to speak to someone as if they are inferior or less intelligent." },
    // Grammar
    { id:"E21", s:"English", t:"Grammar",       q:"Choose the grammatically correct sentence:",                                                                         opts:["Between you and I, the results are poor","Between you and me, the results are poor","Between you and me, the results is poor","Between you and I, the results is poor"], ans:1, sol:"'Between' is a preposition, so it takes object pronouns: 'me' not 'I'. Correct: 'Between you and me'." },
    { id:"E22", s:"English", t:"Grammar",       q:"'No sooner _______ he arrived than the trouble started.'",                                                            opts:["did","had","has","was"], ans:1, sol:"'No sooner...than' construction requires past perfect: 'No sooner HAD he arrived than...' " },
    { id:"E23", s:"English", t:"Grammar",       q:"'The committee _______ yet to reach a consensus.'",                                                                   opts:["is","are","was","were"], ans:0, sol:"In formal British English (JAMB standard), 'committee' is collective noun treated as singular: 'is yet to reach'." },
    { id:"E24", s:"English", t:"Grammar",       q:"'Had I known you were coming, I _______ prepared a meal.'",                                                           opts:["will have","would have","should have","could"], ans:1, sol:"Third conditional (unreal past): 'Had I known...' = 'If I had known...' → 'would have prepared'." },
    { id:"E25", s:"English", t:"Grammar",       q:"'The data _______ collected from three separate sources.'",                                                           opts:["was","were","is","has been"], ans:0, sol:"In JAMB/formal Nigerian English, 'data' is commonly treated as singular: 'data was collected'. Note: 'data were' is also acceptable in strict Latin grammar." },
    { id:"E26", s:"English", t:"Grammar",       q:"'It is imperative that every candidate _______ the rules.'",                                                          opts:["obeys","obeyed","obey","will obey"], ans:2, sol:"After 'imperative that', 'important that', 'essential that' → use subjunctive bare infinitive: 'obey' (not 'obeys')." },
    { id:"E27", s:"English", t:"Grammar",       q:"'She is one of those students who _______ always late.'",                                                             opts:["is","was","are","has been"], ans:2, sol:"The relative clause 'who...late' refers to 'those students' (plural) → 'are' is correct." },
    { id:"E28", s:"English", t:"Grammar",       q:"Choose the correct sentence:",                                                                                        opts:["He is the most unique candidate","She is very unique","This is a unique opportunity","That is the most uniquest design"], ans:2, sol:"'Unique' means one of a kind — it cannot be qualified by 'most' or 'very'. Only 'a unique opportunity' (option C) is correct." },
    { id:"E29", s:"English", t:"Concord",       q:"'A large number of students _______ absent from the lecture.'",                                                       opts:["was","is","were","has been"], ans:2, sol:"'A large number of' = plural → 'were'. Contrast: 'The number of students WAS large' (singular)." },
    { id:"E30", s:"English", t:"Concord",       q:"'Either the students or their teacher _______ to blame.'",                                                            opts:["are","is","were","have been"], ans:1, sol:"'Either...or' → verb agrees with nearer subject ('teacher' = singular) → 'is'." },
    { id:"E31", s:"English", t:"Concord",       q:"'Measles _______ a very contagious disease.'",                                                                        opts:["are","were","is","have been"], ans:2, sol:"Diseases ending in -s (measles, mumps, diabetes, rabies) take singular verbs: 'is'." },
    { id:"E32", s:"English", t:"Concord",       q:"'Two-thirds of the examination paper _______ on grammar.'",                                                           opts:["focus","focuses","are","have focused"], ans:1, sol:"Fractions with uncountable/singular subjects → singular verb. 'Paper' is singular → 'focuses'." },
    // Reported Speech / Tags
    { id:"E33", s:"English", t:"Reported Speech", q:"Direct: She said 'I have been waiting for hours.' Reported speech:",                                                opts:["She said she has been waiting for hours","She said she had been waiting for hours","She said she was waiting for hours","She said she waited for hours"], ans:1, sol:"Tense backshift: present perfect 'have been' → past perfect 'had been'. Time expression stays." },
    { id:"E34", s:"English", t:"Question Tags",  q:"'You hardly know him, _______ ?'",                                                                                   opts:["do you","don't you","did you","didn't you"], ans:0, sol:"'Hardly' is a negative adverb → the sentence is negative → use a POSITIVE tag: 'do you?'" },
    { id:"E35", s:"English", t:"Question Tags",  q:"'I am right, _______ ?'",                                                                                            opts:["am I not","aren't I","isn't it","don't I"], ans:1, sol:"Tag for 'I am...' is the irregular 'aren't I?' (not 'am I not?' which is too formal/archaic for JAMB)." },
    // Prepositions
    { id:"E36", s:"English", t:"Prepositions",   q:"'The new law will take _______ effect from January.'",                                                               opts:["on","into","in","at"], ans:1, sol:"The correct expression is 'take INTO effect' when referring to a law coming into force. Contrast 'take effect' (no preposition) which also works." },
    { id:"E37", s:"English", t:"Prepositions",   q:"'He was acquitted _______ all charges of fraud.'",                                                                   opts:["from","of","for","with"], ans:1, sol:"'Acquitted of' is the correct legal collocation. You are acquitted OF a charge." },
    { id:"E38", s:"English", t:"Prepositions",   q:"'The policy is not in keeping _______ our core values.'",                                                            opts:["to","for","with","of"], ans:2, sol:"'In keeping with' = in accordance with. Fixed prepositional phrase." },
    // Spelling / Oral
    { id:"E39", s:"English", t:"Spelling",       q:"Which is CORRECTLY spelled?",                                                                                        opts:["Supercede","Supersede","Superceed","Superseed"], ans:1, sol:"SUPERSEDE is the correct spelling — from Latin 'supersedere'. A common JAMB trap." },
    { id:"E40", s:"English", t:"Spelling",       q:"Which word is INCORRECTLY spelled?",                                                                                  opts:["Sacrilegious","Mischievous","Liason","Bureaucracy"], ans:2, sol:"Correct spelling: LIAISON (not 'liason'). Memory trick: LI-A-I-SON." },
    { id:"E41", s:"English", t:"Spelling",       q:"Which is CORRECTLY spelled?",                                                                                        opts:["Neccessary","Necessary","Neccesary","Necesary"], ans:1, sol:"NECESSARY: one C, double S. Memory: one Collar, two Socks (1C, 2S)." },
    { id:"E42", s:"English", t:"Oral English",   q:"In 'RECORD' (noun), which syllable carries the primary stress?",                                                     opts:["re- (first)","RE- (first) same as verb","-cord (second)","Both equally"], ans:0, sol:"NOUN: RE-cord (stress on first syllable). VERB: re-CORD (stress on second). Classic JAMB question." },
    { id:"E43", s:"English", t:"Oral English",   q:"Which word does NOT rhyme with 'PEAR'?",                                                                             opts:["Bear","Bare","Peer","Wear"], ans:2, sol:"'Pear', 'bear', 'bare', 'wear' all sound /eə/. 'Peer' sounds /ɪə/ — different vowel sound." },
    { id:"E44", s:"English", t:"Oral English",   q:"In which word is the underlined letter silent? CHECK: kNife, wRite, liMb, deBt",                                    opts:["kNife","wRite","liMb","deBt"], ans:2, sol:"In 'limb', the final 'b' is silent. All options have silent letters, but JAMB typically tests 'b' in 'limb/bomb/thumb/comb'." },
    // Interpretation / Fixed Expressions
    { id:"E45", s:"English", t:"Interpretation", q:"'The lecturer's argument did not cut any ice with the committee.' This means:",                                       opts:["The argument froze the committee","The argument had no effect or influence","The argument was too cold","The argument was irrelevant"], ans:1, sol:"'Cut no ice' = to have no influence or effect on someone." },
    { id:"E46", s:"English", t:"Interpretation", q:"'She kept her cards close to her chest during the negotiation.' This means she:",                                    opts:["Was dishonest","Refused to participate","Did not reveal her plans or intentions","Cheated during the process"], ans:2, sol:"'Keep cards close to your chest' = to keep your plans, thoughts or intentions secret." },
    { id:"E47", s:"English", t:"Interpretation", q:"'The young doctor was thrown in at the deep end on his first day.' This means he:",                                  opts:["Nearly drowned","Was given an easy task","Was placed in a very difficult situation without preparation","Was welcomed warmly"], ans:2, sol:"'Thrown in at the deep end' = given a very difficult task without preparation." },
    // Common Errors
    { id:"E48", s:"English", t:"Common Errors",  q:"Identify the error: 'Despite of the rain, the match continued.'",                                                    opts:["Despite should be Although","'of' should be removed — 'Despite' takes no preposition","Match should be game","Continued should be continue"], ans:1, sol:"'Despite' is NEVER followed by 'of'. Correct: 'Despite the rain...' OR 'In spite of the rain...'" },
    { id:"E49", s:"English", t:"Common Errors",  q:"Choose the correct sentence:",                                                                                        opts:["I look forward to hear from you","I look forward to hearing from you","I look forward hearing from you","I look forward to have heard from you"], ans:1, sol:"'Look forward to' → the 'to' is a PREPOSITION (not part of infinitive), so it takes a gerund: 'hearing'." },
    { id:"E50", s:"English", t:"Common Errors",  q:"Identify the error: 'The reason for his failure is because he did not study.'",                                      opts:["'failure' should be 'failing'","'because' should be 'that'","'study' should be 'studied'","There is no error"], ans:1, sol:"'The reason is because' is redundant. Correct: 'The reason is THAT he did not study.'" },
    { id:"E51", s:"English", t:"Common Errors",  q:"'He was asked to revert back to his original position.' The error is:",                                              opts:["'revert' should be 'return'","'back' is redundant since 'revert' already means go back","'original' is incorrect","'position' should be 'place'"], ans:1, sol:"'Revert' already means 'go back', so 'back' is redundant. Correct: 'revert to his original position'." },
    { id:"E52", s:"English", t:"Common Errors",  q:"Choose the CORRECT sentence:",                                                                                        opts:["He is taller than I am","He is more taller than me","He is more tall than I","He is the most tallest"], ans:0, sol:"'Taller than I am' is correct. Avoid double comparatives ('more taller') and double superlatives ('most tallest')." },
  ],
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [combo, setCombo] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [secs, setSecs] = useState(TOTAL_SECS);

  const subjects = combo ? ["English", ...combo.sciences] : [];
  const questions = subjects.flatMap((s) => QB[s] || []);

  const submit = useCallback(() => setSubmitted(true), []);

  useEffect(() => {
    if (!combo || submitted) return;
    if (secs <= 0) { submit(); return; }
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [combo, submitted, secs, submit]);

  if (!combo) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h1>AGITA Mock CBT</h1>
        <p>Select your subject combination to begin.</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {COMBOS.map((c) => (
            <li key={c.label} style={{ margin: "8px 0" }}>
              <button
                onClick={() => setCombo(c)}
                style={{ padding: "10px 14px", width: "100%", textAlign: "left", cursor: "pointer" }}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const score = submitted
    ? questions.reduce((n, q) => n + (answers[q.id] === q.ans ? 1 : 0), 0)
    : 0;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 820, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{combo.label}</h2>
        <div style={{ fontVariantNumeric: "tabular-nums" }}>Time: {mm}:{ss}</div>
      </header>

      {submitted && (
        <div style={{ padding: 12, background: "#ecfdf5", border: "1px solid #10b981", borderRadius: 8, margin: "12px 0" }}>
          <strong>Score: {score} / {questions.length}</strong>
        </div>
      )}

      <ol>
        {questions.map((q) => {
          const picked = answers[q.id];
          return (
            <li key={q.id} style={{ margin: "16px 0", padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                [{q.s} · {q.t}] {q.q}
              </div>
              {q.opts.map((opt, i) => (
                <label key={i} style={{ display: "block", margin: "4px 0" }}>
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={picked === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  />{" "}
                  {opt}
                </label>
              ))}
              {submitted && (
                <div style={{ marginTop: 8, fontSize: 14, color: picked === q.ans ? "#065f46" : "#991b1b" }}>
                  {picked === q.ans ? "Correct." : `Correct answer: ${q.opts[q.ans]}.`} {q.sol}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!submitted && (
        <button onClick={submit} style={{ padding: "10px 16px", cursor: "pointer" }}>
          Submit
        </button>
      )}
    </div>
  );
}
