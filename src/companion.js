import {getState,update} from './state.js';

export const COMPANION_EVENTS={SESSION_STARTED:'SESSION_STARTED',ANSWER_CORRECT:'ANSWER_CORRECT',ANSWER_INCORRECT:'ANSWER_INCORRECT',ANSWER_STREAK:'ANSWER_STREAK',LESSON_STARTED:'LESSON_STARTED',LESSON_COMPLETED:'LESSON_COMPLETED',MILESTONE_REACHED:'MILESTONE_REACHED',USER_RETURNED:'USER_RETURNED',SESSION_COMPLETED:'SESSION_COMPLETED',ANSWER_WRONG:'ANSWER_INCORRECT',LESSON_COMPLETE:'LESSON_COMPLETED',SESSION_START:'SESSION_STARTED',RETURNING_USER:'USER_RETURNED',NEW_MILESTONE:'MILESTONE_REACHED'};
export const COMPANION_REACTIONS={
 idle:{label:'Idle',emoji:'🌸',tone:'idle',message:'A quiet moment is still part of the journey.'},
 happy:{label:'Happy',emoji:'😊',tone:'happy',message:'Nice one! That answer is settling in.'},
 encouraging:{label:'Encouraging',emoji:'💪',tone:'encouraging',message:'Keep going. One small step is enough.'},
 celebrating:{label:'Celebrating',emoji:'🎉',tone:'celebrating',message:'You finished a lesson. I’m proud of you!'},
 thinking:{label:'Thinking',emoji:'🤔',tone:'thinking',message:'Let’s slow down and look at the pattern together.'},
 surprised:{label:'Surprised',emoji:'✨',tone:'surprised',message:'A new milestone already? That’s wonderful.'},
 sleepy:{label:'Sleepy',emoji:'🌙',tone:'sleepy',message:'A gentle review is plenty for tonight.'},
 welcome:{label:'Welcome back',emoji:'🌷',tone:'welcome',message:'Welcome back. Ready for one more little step?'}
};
const reactionFor={ANSWER_CORRECT:'happy',ANSWER_WRONG:'encouraging',LESSON_COMPLETE:'celebrating',SESSION_START:'welcome',RETURNING_USER:'welcome',NEW_MILESTONE:'surprised',LESSON_STARTED:'thinking',ANSWER_STREAK:'celebrating',LESSON_COMPLETED:'celebrating',SESSION_COMPLETED:'celebrating',USER_RETURNED:'welcome',MILESTONE_REACHED:'surprised',ANSWER_INCORRECT:'encouraging'};
export const COMPANION_DIALOGUE={
  SESSION_STARTED:{welcome:['Ready when you are. Let’s learn together.','A small step is enough for today.']},
  USER_RETURNED:{welcome:['Welcome back! Want something easy to warm up?','Good to see you again. We can ease in gently.']},
  ANSWER_CORRECT:{happy:['Nice one! That answer is settling in.','よくできました！ That one is blooming.']},
  ANSWER_INCORRECT:{encouraging:['Keep going. One small step is enough.','No worries — let’s look at the pattern together.']},
  ANSWER_STREAK:{celebrating:['You’re finding your rhythm.','A lovely little streak is growing.']},
  LESSON_COMPLETED:{celebrating:['You finished a lesson. That is worth celebrating.','Lesson complete — your Japanese grew today.']},
  MILESTONE_REACHED:{surprised:['A new milestone already? That’s wonderful.']}
};
let listeners=[];
const priority={ANSWER_INCORRECT:1,ANSWER_CORRECT:1,ANSWER_STREAK:2,LESSON_STARTED:2,SESSION_STARTED:3,USER_RETURNED:3,LESSON_COMPLETED:4,SESSION_COMPLETED:4,MILESTONE_REACHED:4};
export function companionState(){return getState().companionPresence}
export function subscribeCompanion(fn){listeners.push(fn);return()=>{listeners=listeners.filter(x=>x!==fn)}}
function pick(lines){return lines[Math.floor(Math.random()*lines.length)]}
export function emitCompanion(event,payload={}){const key=reactionFor[event]||'idle',r=COMPANION_REACTIONS[key],now=Date.now(),presence=getState().companionPresence||{};
  const important=['LESSON_COMPLETED','MILESTONE_REACHED','USER_RETURNED','SESSION_COMPLETED','SESSION_STARTED'].includes(event);
  if(!important&&(priority[presence.event]||0)>=4&&now-(presence.lastEventAt||0)<1800)return r;
  const streakUpgrade=event==='ANSWER_STREAK'&&presence.event==='ANSWER_CORRECT';
  if(!important&&!streakUpgrade&&now-(presence.lastEventAt||0)<1800)return r;
  const lines=COMPANION_DIALOGUE[event]?.[key]||[];
  update(s=>{s.companionPresence={...s.companionPresence,reaction:key,event,message:payload.message||pick(lines)||r.message,lastEventAt:now,seenEvents:(s.companionPresence?.seenEvents||0)+1,lastSeenDate:new Date().toISOString().slice(0,10)}});
  listeners.forEach(fn=>fn({event,reaction:key,...payload}));return r}
export function initializeCompanion(){const s=getState(),lastDate=s.companionPresence?.lastSeenDate,last=lastDate?new Date(lastDate+'T00:00:00').getTime():0,days=last?Math.floor((Date.now()-last)/86400000):0;emitCompanion(days>=1?COMPANION_EVENTS.USER_RETURNED:COMPANION_EVENTS.SESSION_STARTED,{message:days>=3?'Welcome back! Want something easy to warm up?':days>=1?'Good to see you again. We can ease in gently.':undefined})}
export const reactionKeys=Object.keys(COMPANION_REACTIONS);
