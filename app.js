const tracker = [
  ["Foundation","I can explain what enterprise architecture is and why it matters."],
  ["Foundation","I can distinguish strategy, capability, process, application, data and technology."],
  ["EA Framework","I can explain the purpose of the major architecture phases."],
  ["EA Framework","I can name an appropriate artifact for a given decision."],
  ["Vision","I can turn stakeholder statements into objectives and constraints."],
  ["Vision","I can create a logical transition roadmap."],
  ["Business Architecture","I can distinguish capability from process."],
  ["Business Architecture","I can identify the business capabilities affected by a scenario."],
  ["Data / App / Tech","I can explain application and data responsibilities."],
  ["Data / App / Tech","I can reason about integration, privacy and regulatory constraints."],
  ["Data / App / Tech","I can explain Clean Core in practical terms."],
  ["Data / App / Tech","I can compare solution options using business constraints rather than slogans."],
  ["Defense","I can answer using objective → constraints → decision → rationale → trade-off → risk → roadmap."],
  ["Practice","I can complete a connected case without looking at a model answer."],
  ["Practice","I can score my own response and identify one improvement."],
  ["Exam readiness","I have checked the current official P_SAPEA certification page."],
  ["Exam readiness","I have completed at least three timed defense drills."]
];

const key="p_sapea_tracker_v2";
const state=JSON.parse(localStorage.getItem(key)||"{}");
const list=document.getElementById("trackerList");
const groups={};
tracker.forEach((item,i)=>(groups[item[0]]??=[]).push([i,item[1]]));
Object.entries(groups).forEach(([group,items])=>{
  const wrap=document.createElement("div"); wrap.className="tracker-group";
  const title=document.createElement("div"); title.className="tracker-title"; title.textContent=group;
  wrap.appendChild(title);
  items.forEach(([i,text])=>{
    const row=document.createElement("label"); row.className="tracker-item";
    const cb=document.createElement("input"); cb.type="checkbox"; cb.checked=!!state[i];
    cb.addEventListener("change",()=>{state[i]=cb.checked;localStorage.setItem(key,JSON.stringify(state));});
    row.append(cb,document.createTextNode(text)); wrap.appendChild(row);
  });
  list.appendChild(wrap);
});
document.getElementById("resetTracker").onclick=()=>{localStorage.removeItem(key);location.reload();};

const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
menuBtn.onclick=()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)};
document.querySelectorAll(".sidebar a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const links=[...document.querySelectorAll(".sidebar a")];
const sections=[...document.querySelectorAll("main section")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));}});
},{rootMargin:"-20% 0px -65% 0px"});
sections.forEach(s=>observer.observe(s));
