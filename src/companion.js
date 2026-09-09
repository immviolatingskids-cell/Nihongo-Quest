import {getState,update} from './state.js';

export const COMPANION_EVENTS={ANSWER_CORRECT:'ANSWER_CORRECT',ANSWER_WRONG:'ANSWER_WRONG',LESSON_COMPLETE:'LESSON_COMPLETE',SESSION_START:'SESSION_START',RETURNING_USER:'RETURNING_USER',NEW_MILESTONE:'NEW_MILESTONE'};
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
const reactionFor={ANSWER_CORRECT:'happy',ANSWER_WRONG:'encouraging',LESSON_COMPLETE:'celebrating',SESSION_START:'welcome',RETURNING_USER:'welcome',NEW_MILESTONE:'surprised'};
let listeners=[];
export function companionState(){return getState().companionPresence}
export function subscribeCompanion(fn){listeners.push(fn);return()=>{listeners=listeners.filter(x=>x!==fn)}}
export function emitCompanion(event,payload={}){const key=reactionFor[event]||'idle',r=COMPANION_REACTIONS[key];update(s=>{s.companionPresence={reaction:key,event,message:payload.message||r.message,lastEventAt:Date.now(),seenEvents:(s.companionPresence?.seenEvents||0)+1}});listeners.forEach(fn=>fn({event,reaction:key,...payload}));return r}
export function initializeCompanion(){const s=getState(),last=s.companionPresence?.lastEventAt||0,away=last&&Date.now()-last>6*60*60*1000;emitCompanion(away?COMPANION_EVENTS.RETURNING_USER:COMPANION_EVENTS.SESSION_START,{message:away?'Welcome back. Your progress can wait — let’s take one small step.':'Ready when you are. Let’s learn together.'})}
export const reactionKeys=Object.keys(COMPANION_REACTIONS);
