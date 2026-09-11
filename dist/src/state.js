const KEY='nihongo-quest-v1';
const today=()=>new Date().toISOString().slice(0,10);
export const defaults=()=>({
 schemaVersion:4,xp:0,coins:30,streak:1,answerStreak:0,lastStudy:today(),studyDays:[today()],answers:[],processedAttempts:{},activeSession:null,focus:{lastDuration:5,sessions:[]},garden:{initialized:false,lastCounts:{blossoms:0,kana:0,grammar:0,conversations:0,branches:0},milestones:[],recentGrowth:[]},reviews:{},kana:{},grammar:{},conversations:{},curriculum:{},companionPresence:{reaction:'idle',event:'INIT',message:'A quiet moment is still part of the journey.',lastEventAt:0,lastSeenDate:null,seenEvents:0},
 companion:'sakura',achievements:[],culture:{discovered:[],owned:[],acknowledged:[],shopVisits:0,placements:{}},quests:{date:today(),review:0,master:0,conversation:0},
 settings:{romaji:true,furigana:true,reducedMotion:false,sound:true,fontSize:16,sessionLength:7},audio:{voice:'auto',speed:'normal',autoPlay:false}
});
let state=load();
const storage=()=>globalThis.localStorage||{getItem:()=>null,setItem:()=>{}};
function load(){try{return merge(defaults(),JSON.parse(storage().getItem(KEY)||'{}'))}catch{return defaults()}}
function merge(base,saved){const next={...base,...saved,settings:{...base.settings,...saved?.settings},quests:{...base.quests,...saved?.quests},culture:{...base.culture,...saved?.culture,discovered:[...new Set(saved?.culture?.discovered||[])],owned:[...new Set(saved?.culture?.owned||[])],acknowledged:[...new Set(saved?.culture?.acknowledged||[])],placements:{...base.culture.placements,...saved?.culture?.placements}},curriculum:{...base.curriculum,...saved?.curriculum},focus:{...base.focus,...saved?.focus,sessions:saved?.focus?.sessions||base.focus.sessions},garden:{...base.garden,...saved?.garden,lastCounts:{...base.garden.lastCounts,...saved?.garden?.lastCounts},milestones:saved?.garden?.milestones||base.garden.milestones,recentGrowth:saved?.garden?.recentGrowth||base.garden.recentGrowth},companionPresence:{...base.companionPresence,...saved?.companionPresence}};Object.entries(next.reviews||{}).forEach(([id,r])=>{if(!r.skills)r.skills={recognition:scoreFromOld(r),recall:0,listening:0,production:0};next.reviews[id]=r});next.schemaVersion=4;return next}
function scoreFromOld(r){return Math.min(100,Math.max(0,(r.correct||0)*14-(r.wrong||0)*9))}
export function getState(){return state}
export function update(mutator){mutator(state);storage().setItem(KEY,JSON.stringify(state));if(globalThis.document?.documentElement){document.documentElement.style.setProperty('--base-size',state.settings.fontSize+'px');document.documentElement.classList.toggle('reduce-motion',state.settings.reducedMotion)}return state}
export function exportSave(){return JSON.stringify(state,null,2)}
export function importSave(text){const next=JSON.parse(text);if(!next||typeof next!=='object')throw Error('That file is not a valid save.');next.audio={...defaults().audio,...(next.audio||{})};state=merge(defaults(),next);update(()=>{});return state}
export function resetSave(){state=defaults();update(()=>{})}
