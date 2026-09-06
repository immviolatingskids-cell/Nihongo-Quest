const KEY='nihongo-quest-v1';
const today=()=>new Date().toISOString().slice(0,10);
export const defaults=()=>({
 schemaVersion:2,xp:0,coins:30,streak:1,lastStudy:today(),studyDays:[today()],answers:[],reviews:{},kana:{},grammar:{},conversations:{},curriculum:{},
 companion:'kitsune',achievements:[],quests:{date:today(),review:0,master:0,conversation:0},
 settings:{romaji:true,furigana:true,reducedMotion:false,sound:true,fontSize:16,sessionLength:7}
});
let state=load();
function load(){try{return merge(defaults(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{return defaults()}}
function merge(base,saved){const next={...base,...saved,settings:{...base.settings,...saved?.settings},quests:{...base.quests,...saved?.quests},curriculum:{...base.curriculum,...saved?.curriculum}};Object.entries(next.reviews||{}).forEach(([id,r])=>{if(!r.skills)r.skills={recognition:scoreFromOld(r),recall:0,listening:0,production:0};next.reviews[id]=r});next.schemaVersion=2;return next}
function scoreFromOld(r){return Math.min(100,Math.max(0,(r.correct||0)*14-(r.wrong||0)*9))}
export function getState(){return state}
export function update(mutator){mutator(state);localStorage.setItem(KEY,JSON.stringify(state));document.documentElement.style.setProperty('--base-size',state.settings.fontSize+'px');document.documentElement.classList.toggle('reduce-motion',state.settings.reducedMotion);return state}
export function exportSave(){return JSON.stringify(state,null,2)}
export function importSave(text){const next=JSON.parse(text);if(!next||typeof next!=='object')throw Error('That file is not a valid save.');state=merge(defaults(),next);update(()=>{});return state}
export function resetSave(){state=defaults();update(()=>{})}
