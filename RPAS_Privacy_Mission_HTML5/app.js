const roles = {
  surveyor:{name:"Land surveyor",desc:"Boundaries, neighbouring property, client data and GIS",caseFile:"activities/surveyor-case.html"},
  engineer:{name:"Engineer",desc:"Active worksites, worker notice, inspection data and BIM",caseFile:"activities/engineer-case.html"},
  farmer:{name:"Farmer",desc:"Rural overflight, Agritech platforms and farm data",caseFile:"activities/farmer-case.html"},
  photographer:{name:"Commercial photographer",desc:"Bystanders, consent, editing and client delivery",caseFile:"activities/photographer-case.html"}
};

const missions = [
  {id:1,title:"Know the rules",desc:"Challenge assumptions before learning the legal framework.",file:"activities/myth-vs-fact.html",thumb:"assets/images/tom-pils-opening.png",brief:"Commit to each judgement, reveal the explanation, then retry any misconception.",outcomes:["Distinguish common myths from operational facts","Recognise when APP obligations may apply"]},
  {id:2,title:"Spot the risk",desc:"Scan a mixed-use site for hidden privacy exposure.",file:"activities/privacy-hotspot.html",thumb:"assets/images/common-scenarios-hotspot.png",brief:"Find the visual risks. The goal is not speed. It is noticing what a routine flight plan can miss.",outcomes:["Identify people, property and data risks","Apply the reasonable-person lens"]},
  {id:3,title:"Plan the mission",desc:"Configure capture, flight boundaries and data handling.",file:"activities/mission-planner.html",thumb:"assets/images/mission-planner.png",brief:"Make trade-offs and watch the privacy risk change. A technically legal flight can still be a poor privacy decision.",outcomes:["Apply privacy by design","Minimise capture, access and retention"]},
  {id:4,title:"Choose your track",desc:"Navigate an incident grounded in your operating context.",file:null,brief:"Your role controls this case. Make decisions, inspect consequences, and compare them with the shared principles.",outcomes:["Transfer principles to your profession","See operational consequences"]},
  {id:5,title:"Guard the data",desc:"Work through the Notifiable Data Breach threshold.",file:"activities/ndb-decision-tree.html",brief:"Use this as structured practice, not a substitute for escalation or legal advice. The NDB scheme applies only where the Privacy Act covers the entity and information.",outcomes:["Recognise a possible eligible data breach","Know when to contain, assess and escalate"]},
  {id:6,title:"Fly the workflow",desc:"Practise the decisions before, during and after flight.",file:"activities/preflight-checklist.html",thumb:"assets/images/conclusion.png",brief:"Complete the checklist first. You can then launch the in-air and post-job bonus challenges from this mission.",outcomes:["Use a privacy-conscious workflow","Turn learning into a repeatable field habit"]}
];

const badges = [
  {name:"Risk Spotter",icon:"⌖",need:2,desc:"Complete risk identification practice"},
  {name:"Privacy Planner",icon:"⌁",need:3,desc:"Complete privacy-by-design planning"},
  {name:"Data Guardian",icon:"▣",need:5,desc:"Complete breach threshold practice"},
  {name:"Flight-Safe Operator",icon:"◇",need:6,desc:"Complete the full formative route"}
];

const resources = [
  {title:"Privacy law quick reference",file:"Privacy_Law_Quick_Reference_Card.pdf",tags:["all"]},
  {title:"What counts as personal data?",file:"What_is_Considered_Personal_Data.pdf",tags:["all"]},
  {title:"Store drone footage safely",file:"Storing_Drone_Footage_Safely.pdf",tags:["all"]},
  {title:"Privacy charter template",file:"Privacy_Charter_Handout_Template.pdf",tags:["all"]},
  {title:"Online privacy policy",file:"Online_Privacy_Policy.pdf",tags:["all"]},
  {title:"Surveyor pre-flight checklist",file:"PreFlight_Privacy_Checklist_Surveyor.pdf",tags:["surveyor"]},
  {title:"Engineer pre-flight checklist",file:"PreFlight_Privacy_Checklist_Engineer.pdf",tags:["engineer"]},
  {title:"Farmer pre-flight checklist",file:"PreFlight_Privacy_Checklist_Farmer.pdf",tags:["farmer"]},
  {title:"Brand content checklist",file:"PreFlight_Privacy_Checklist_Advertising_Brand_Content.pdf",tags:["photographer"]},
  {title:"Wedding and event checklist",file:"PreFlight_Privacy_Checklist_Wedding_Event_Videographer.pdf",tags:["photographer"]},
  {title:"Documentary and news checklist",file:"PreFlight_Privacy_Checklist_Documentary_News_Footage.pdf",tags:["photographer"]}
];

let state = JSON.parse(localStorage.getItem("rpasPrivacyMission") || '{"role":"","completed":[],"reflections":{}}');
let currentMission = null;
const $ = s => document.querySelector(s);
const save = () => localStorage.setItem("rpasPrivacyMission",JSON.stringify(state));

function renderRoles(){
  $("#roleGrid").innerHTML = Object.entries(roles).map(([key,r]) =>
    `<button class="role-card ${state.role===key?"selected":""}" data-role="${key}" aria-pressed="${state.role===key}">
      <strong>${r.name}</strong><span>${r.desc}</span></button>`).join("");
  document.querySelectorAll("[data-role]").forEach(b=>b.onclick=()=>{
    state.role=b.dataset.role; save(); renderAll(); showToast(`${roles[state.role].name} path selected.`);
  });
}

function renderNav(){
  $("#missionNav").innerHTML=missions.map(m=>`<button data-open="${m.id}">${state.completed.includes(m.id)?"✓":"○"} &nbsp; ${String(m.id).padStart(2,"0")} · ${m.title}</button>`).join("");
}

function renderMissions(){
  $("#missionCards").innerHTML=missions.map(m=>{
    const done=state.completed.includes(m.id);
    const extras=m.id===6?`<div class="bonus"><a href="activities/in-air-decisions.html" target="_blank">Bonus: in-air decisions</a><br><a href="activities/post-job-sequencing.html" target="_blank">Bonus: post-job sequence</a></div>`:"";
    return `<article class="mission-card ${done?"complete":""}">
      ${m.thumb?`<img class="mission-thumb" src="${m.thumb}" alt="">`:""}
      <div class="mission-number"><span>MISSION ${String(m.id).padStart(2,"0")}</span><span>${done?"PRACTISED":"AVAILABLE"}</span></div>
      <h3>${m.title}</h3><p>${m.desc}</p><ul>${m.outcomes.map(x=>`<li>${x}</li>`).join("")}</ul>${extras}
      <button class="${done?"secondary":"primary"}" data-open="${m.id}">${done?"Practise again":"Launch mission"}</button>
    </article>`;
  }).join("");
  document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openMission(Number(b.dataset.open)));
}

function renderProgress(){
  const n=state.completed.length,pct=Math.round(n/missions.length*100),xp=n*100;
  $("#meterFill").style.width=pct+"%"; document.querySelector(".meter").setAttribute("aria-valuenow",pct);
  $("#progressLabel").textContent=pct+"%"; $("#missionCount").textContent=`${n} of 6 missions`; $("#xpLabel").textContent=xp+" XP";
  const levels=n<2?["01","OBSERVER"]:n<4?["02","PLANNER"]:n<6?["03","GUARDIAN"]:["04","FIELD READY"];
  $("#levelLabel").textContent=`LEVEL ${levels[0]} · ${levels[1]}`;
}

function renderBadges(){
  $("#badgeGrid").innerHTML=badges.map(b=>`<div class="badge ${state.completed.includes(b.need)?"unlocked":""}">
    <span class="badge-icon" aria-hidden="true">${b.icon}</span><strong>${b.name}</strong><span>${state.completed.includes(b.need)?"Unlocked through practice":b.desc}</span></div>`).join("");
}

function renderResources(){
  const f=$("#resourceFilter").value || state.role || "all";
  $("#resourceGrid").innerHTML=resources.filter(r=>f==="all"||r.tags.includes("all")||r.tags.includes(f)).map(r=>
    `<article class="resource-card"><span class="tag">${r.tags[0]==="all"?"All operators":roles[r.tags[0]].name}</span>
      <a href="resources/${encodeURIComponent(r.file)}" download>${r.title}</a><span>PDF field resource</span></article>`).join("");
}

function openMission(id){
  if(id===4 && !state.role){$("#rolePanel").scrollIntoView({behavior:"smooth"});showToast("Choose an operating context before launching the case mission.");return}
  currentMission=missions.find(m=>m.id===id);
  const file=id===4?roles[state.role].caseFile:currentMission.file;
  $("#dialogKicker").textContent=`MISSION ${String(id).padStart(2,"0")} · FORMATIVE PRACTICE`;
  $("#dialogTitle").textContent=currentMission.title;
  $("#dialogBrief").textContent=currentMission.brief;
  $("#activityFrame").src=file;
  $("#reflectionText").value=state.reflections[id]||"";
  $("#activityDialog").showModal();
}

function completeMission(){
  const id=currentMission.id;
  state.reflections[id]=$("#reflectionText").value.trim();
  if(!state.completed.includes(id))state.completed.push(id);
  state.completed.sort((a,b)=>a-b);save();renderAll();
  $("#activityDialog").close();$("#activityFrame").src="about:blank";
  showToast(`Mission ${String(id).padStart(2,"0")} practised. +100 XP. Your insight has been banked locally.`);
}

function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),4000)}
function renderAll(){renderRoles();renderNav();renderMissions();renderProgress();renderBadges();$("#resourceFilter").value=state.role||"all";renderResources()}

$("#startMission").onclick=()=>$("#rolePanel").scrollIntoView({behavior:"smooth"});
document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>$(b.dataset.scroll).scrollIntoView({behavior:"smooth"}));
$("#resourceFilter").onchange=renderResources;
$("#closeDialog").onclick=()=>{$("#activityDialog").close();$("#activityFrame").src="about:blank"};
$("#retryActivity").onclick=()=>{const s=$("#activityFrame").src;$("#activityFrame").src=s;showToast("Activity restarted. Retrying carries no penalty.")};
$("#completeMission").onclick=completeMission;
$("#resetProgress").onclick=()=>{if(confirm("Reset role, XP, badges and saved reflections in this browser?")){state={role:"",completed:[],reflections:{}};save();renderAll();showToast("Local progress reset.")}};
$("#activityDialog").addEventListener("cancel",()=>{$("#activityFrame").src="about:blank"});
renderAll();
