import {vocabulary,kanaFamilies,grammar,companions,confusionPairs,curriculum} from './data.js';
import {getState,update} from './state.js';
import {emitCompanion,COMPANION_EVENTS} from './companion.js';
const DAY=86400000;
export const shuffle=a=>[...a].sort(()=>Math.random()-.5);
export const SKILLS=['recognition','recall','listening','production'];
export const QUESTION_TYPES={WORD:'word',KANA:'kana'};
export const normalizeAnswer=value=>String(value??'').normalize('NFKC').replace(/[。、.!！?？\s]/g,'').toLowerCase();
export function createQuestion(item,{source='practice'}={}){
 if(item.type==='kana')return {id:`kana:${item.char}`,contentId:item.char,contentType:'kana',stage:item.stage||'recognition',prompt:item.char,expected:item.romaji,accepted:[],inputType:'choice',choices:item.options||[],audioTarget:item.char,source,metadata:{romaji:item.romaji}};
 const word=item.word,stage=item.stage||'recognition';
 const prompt=item.prompt??(stage==='recall'?word.meaning:stage==='production'?word.exampleEn:word.kana);
 const expected=item.answer|| (stage==='recall'||stage==='production'?word.kana:word.meaning);
 const japaneseAnswer=expected===word.kana||stage==='recall'||stage==='production';
 return {id:`${word.id}:${stage}`,contentId:word.id,contentType:'word',stage,prompt,expected,accepted:item.accepted||(japaneseAnswer?[word.romaji]:[]),inputType:item.inputType||(stage==='recall'||stage==='production'?'text':'choice'),choices:item.options||[],audioTarget:word.kana,source,metadata:{word}};
}
export function evaluateAnswer(question,submitted){const value=String(submitted??''),expected=String(question.expected??''),accepted=[expected,...(question.accepted||[])].filter(Boolean);const matched=accepted.find(answer=>normalizeAnswer(answer)===normalizeAnswer(value));return {correct:Boolean(matched),submitted:value,expected,matchedAlternative:matched&&matched!==expected?matched:null,contentId:question.contentId,contentType:question.contentType,stage:question.stage,source:question.source,questionId:question.id};}
export const skillScores=r=>({recognition:0,recall:0,listening:0,production:0,...r?.skills});
export const mastery=r=>!r?0:Math.min(5,Math.floor(Object.values(skillScores(r)).reduce((a,b)=>a+b,0)/80));
export const overallMastery=r=>Math.round(Object.values(skillScores(r)).reduce((a,b)=>a+b,0)/4);
export const nextSkill=r=>[...SKILLS].sort((a,b)=>skillScores(r)[a]-skillScores(r)[b])[0];
export const dueWords=()=>vocabulary.filter(w=>{const r=getState().reviews[w.id];return !r||!r.due||r.due<=Date.now()}).sort((a,b)=>(getState().reviews[b.id]?.wrong||0)-(getState().reviews[a.id]?.wrong||0));
export const weakWords=()=>vocabulary.filter(w=>getState().reviews[w.id]?.wrong).sort((a,b)=>{const x=getState().reviews;return (x[b.id].wrong-x[b.id].correct)-(x[a.id].wrong-x[a.id].correct)});
export function recordWord(id,correct,mode='recognition'){
 const skill=SKILLS.includes(mode)?mode:(mode==='listening'?'listening':'recognition');
 update(s=>{const r=s.reviews[id]||{correct:0,wrong:0,interval:0,due:0,skills:{recognition:0,recall:0,listening:0,production:0}};r.skills=skillScores(r);r.skills[skill]=Math.max(0,Math.min(100,r.skills[skill]+(correct?18:-11)));if(correct){r.correct++;const floor=Math.min(...Object.values(r.skills));r.interval=floor<30?1:floor<60?3:Math.min(30,Math.max(7,Math.round((r.interval||3)*1.7)));r.due=Date.now()+r.interval*DAY;s.xp+=skill==='production'?18:12}else{r.wrong++;r.interval=0;r.due=Date.now()+10*60*1000}r.last=Date.now();s.reviews[id]=r;s.answers.push({date:new Date().toISOString(),kind:'word',id,correct,mode:skill});s.quests.review++;if(mastery(r)>=4)s.quests.master=Math.max(s.quests.master,Object.values(s.reviews).filter(x=>mastery(x)>=4).length);touchDay(s)});
 checkAchievements();emitCompanion(correct?COMPANION_EVENTS.ANSWER_CORRECT:COMPANION_EVENTS.ANSWER_INCORRECT,{wordId:id});
}
export function recordAnswerResult(result){
 if(result.attemptId&&getState().processedAttempts?.[result.attemptId])return {...result,duplicate:true};
 if(result.contentType==='kana')recordKana(result.contentId,result.correct);
 else recordWord(result.contentId,result.correct,result.stage);
 if(result.attemptId)update(s=>{s.processedAttempts={...(s.processedAttempts||{}),[result.attemptId]:Date.now()}});
 update(s=>{s.answerStreak=result.correct?(s.answerStreak||0)+1:0});
 if(result.correct&&getState().answerStreak>=3)emitCompanion(COMPANION_EVENTS.ANSWER_STREAK,{streak:getState().answerStreak});
 return result;
}
export function completeSession(summary={}){emitCompanion(COMPANION_EVENTS.SESSION_COMPLETED,{message:summary.message||'Session complete — your practice is safely recorded.'});return summary;}
export function recordKana(char,correct){update(s=>{const r=s.kana[char]||{correct:0,wrong:0};r[correct?'correct':'wrong']++;s.kana[char]=r;s.answers.push({date:new Date().toISOString(),kind:'kana',id:char,correct});if(correct)s.xp+=8;touchDay(s)});checkAchievements();emitCompanion(correct?COMPANION_EVENTS.ANSWER_CORRECT:COMPANION_EVENTS.ANSWER_INCORRECT,{kana:char})}
export function completeGrammar(id){update(s=>{s.grammar[id]={learned:true,date:Date.now()};s.xp+=20;touchDay(s)});checkAchievements();emitCompanion(COMPANION_EVENTS.LESSON_COMPLETE,{message:'That grammar pattern is now in your journal.'})}
export function completeConversation(id,perfect){update(s=>{s.conversations[id]={count:(s.conversations[id]?.count||0)+1,perfect:perfect||s.conversations[id]?.perfect};s.quests.conversation++;s.xp+=perfect?30:20;touchDay(s)});checkAchievements();emitCompanion(COMPANION_EVENTS.LESSON_COMPLETE,{message:perfect?'A perfect conversation! Sakura is cheering for you.':'Conversation complete. Every reply helps.'})}
function touchDay(s){const d=new Date().toISOString().slice(0,10);if(!s.studyDays.includes(d))s.studyDays.push(d);s.lastStudy=d}
export function checkAchievements(){update(s=>{const add=(id)=>{if(!s.achievements.includes(id))s.achievements.push(id)};const kanaCorrect=s.answers.filter(a=>a.kind==='kana'&&a.correct).length;if(kanaCorrect>=50)add('kana50');if(Object.values(s.reviews).filter(r=>mastery(r)>=4).length>=10)add('master10');if(Object.values(s.conversations).some(c=>c.perfect))add('perfectTalk');if(s.studyDays.length>=7)add('week')})}
export const achievementData=[{id:'kana50',icon:'あ',name:'Kana Spark',detail:'50 kana correct'},{id:'master10',icon:'🏆',name:'Word Keeper',detail:'10 words mastered'},{id:'perfectTalk',icon:'💬',name:'Smooth Talker',detail:'Perfect conversation'},{id:'week',icon:'🔥',name:'Seven Suns',detail:'Study on 7 days'}];
export function journeyItems(){const s=getState(),n=s.settings.sessionLength;const due=dueWords(),weak=weakWords();const dueIds=new Set(due.map(w=>w.id)),weakIds=new Set(weak.map(w=>w.id));const words=[...new Map([...weak.slice(0,2),...due,...shuffle(vocabulary)].map(w=>[w.id,w])).values()].slice(0,Math.max(3,n-2));const unlockedFamilies=kanaFamilies.slice(0,Math.max(1,Math.floor(s.xp/100)+1));const fam=unlockedFamilies[unlockedFamilies.length-1];const kana=shuffle(fam.items).slice(0,2).map(([char,romaji])=>({type:'kana',char,romaji,source:'new material'}));return shuffle([...words.map(word=>({type:'word',word,stage:nextSkill(s.reviews[word.id]),source:weakIds.has(word.id)?'recent mistake':dueIds.has(word.id)?'due review':'new material'})),...kana]).slice(0,n)}
export function mistakeItems(){const weak=weakWords();const kana=Object.entries(getState().kana).filter(([,r])=>r.wrong>r.correct/2).sort((a,b)=>b[1].wrong-a[1].wrong).flatMap(([char])=>{for(const f of kanaFamilies){const x=f.items.find(i=>i[0]===char);if(x){const pair=confusionPairs.find(p=>p[0]===char||p[1]===char),paired=pair&&f.items.find(i=>i[0]===(pair[0]===char?pair[1]:pair[0]));return [{type:'kana',char,romaji:x[1],source:'recent mistake'},...(paired?[{type:'kana',char:paired[0],romaji:paired[1],source:'confusion pair'}]:[])]}}return []});return [...weak.slice(0,6).map(word=>({type:'word',word,source:'recent mistake'})),...kana.slice(0,4)]}
export function buildSession(mode,options={}){
 if(mode==='journey')return {mode,reason:'balanced journey',items:journeyItems()};
 if(mode==='review')return {mode,reason:'due review',items:dueWords().slice(0,options.length||getState().settings.sessionLength).map(word=>({type:'word',word,stage:nextSkill(getState().reviews[word.id]),source:'due review'}))};
 if(mode==='mistakes')return {mode,reason:'recent mistakes',items:mistakeItems()};
 if(mode==='focused')return {mode,reason:'focused practice',items:options.items||[]};
 if(mode==='curriculum')return {mode,reason:'curriculum requirement',items:options.items||[]};
 return {mode,reason:'practice',items:options.items||[]};
}
export function describeSession(session){return (session?.items||[]).map(item=>({contentId:item.type==='word'?item.word?.id:item.char,contentType:item.type,stage:item.stage||'recognition',source:item.source||session.reason||'practice',mastery:item.type==='word'?mastery(getState().reviews[item.word.id]):null}));}
export function dailyQuests(){const s=getState();if(s.quests.date!==new Date().toISOString().slice(0,10))update(x=>x.quests={date:new Date().toISOString().slice(0,10),review:0,master:0,conversation:0});return [{label:'Review 10 items',value:s.quests.review,target:10,icon:'↻'},{label:'Master 2 words',value:s.quests.master,target:2,icon:'◆'},{label:'Complete a conversation',value:s.quests.conversation,target:1,icon:'💬'}]}
export const weeklyQuest=()=>({label:'Study on 5 days',value:getState().studyDays.filter(d=>Date.now()-new Date(d).getTime()<7*DAY).length,target:5});
export const currentGrammar=()=>grammar.filter(g=>g.level<=Math.max(1,Math.floor(getState().xp/160)+1));
export const activeCompanion=()=>({id:'sakura',name:'Sakura',icon:'🌸',effect:'Reacts to your learning events and keeps you moving.'});
export function confusionFor(char){return confusionPairs.find(p=>p[0]===char||p[1]===char)}
export const nodeUnlocked=node=>node.requires.every(id=>getState().curriculum[id]?.complete);
export const nodeComplete=id=>!!getState().curriculum[id]?.complete;
export function completeNode(id){update(s=>{s.curriculum[id]={complete:true,date:Date.now()};s.xp+=25;touchDay(s)});checkAchievements();emitCompanion(COMPANION_EVENTS.NEW_MILESTONE,{nodeId:id,message:'A new chapter is open. That was a meaningful step.'})}
export function nextCurriculumNode(){return curriculum.find(n=>nodeUnlocked(n)&&!nodeComplete(n))||curriculum[curriculum.length-1]}
export function curriculumProgress(){return curriculum.filter(n=>nodeComplete(n)).length/curriculum.length}
export function stageLabel(stage){return {recognition:'Recognise',recall:'Recall from memory',listening:'Listen',production:'Produce Japanese'}[stage]}
