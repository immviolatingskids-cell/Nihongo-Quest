import {curriculum, vocabulary} from './data.js';

// A small, explainable policy. Scores are deliberately visible in the reasons below.
const vowels = ['あ','い','う','え','お'];
const clamp = (n,min=0,max=100) => Math.max(min, Math.min(max, Number(n)||0));
const reviewScore = r => clamp(r?.skills?.recognition ?? ((r?.correct||0)*14-(r?.wrong||0)*9));

export function directLearning(state={}, seed=0) {
  const s = state || {}, reviews=s.reviews||{}, kana=s.kana||{}, grammar=s.grammar||{}, answers=Array.isArray(s.answers)?s.answers:[], studyDays=Array.isArray(s.studyDays)?s.studyDays:[], sessions=Array.isArray(s.focus?.sessions)?s.focus.sessions:[];
  const recent=answers.slice(-12).filter(a=>a && a.correct===false);
  const weakKana=Object.entries(kana).filter(([,r])=>(r?.wrong||0)>(r?.correct||0) || (r?.wrong||0)>=2).sort(([a],[b])=>a.localeCompare(b));
  const vowelWeak=vowels.filter(char=>kana[char] && (kana[char].wrong||0)>=(kana[char].correct||0));
  const recentWords=[...new Set(recent.filter(a=>a.kind!=='kana'&&a.id).map(a=>a.id))].filter(id=>vocabulary.some(w=>w.id===id));
  const next=curriculum.find(n=>!s.curriculum?.[n.id]?.complete && !s.curriculum?.[n.id]?.completed);
  let focus='Continue your Japanese path', activity='journey', reason='Your saved progress is ready for the next Journey node.', priority='normal', minutes=5;
  if(vowelWeak.length){focus='Reinforce the five vowels'; activity='kana'; reason=`${vowelWeak.join('、')} need more correct recalls before you move on.`; priority='high'; minutes=2;}
  else if(weakKana.length){focus='Review weak hiragana'; activity='kana'; reason=`${weakKana[0][0]} has more misses than correct recalls, so a short review will help.`; priority='high'; minutes=5;}
  else if(recentWords.length){focus='Revisit recently missed vocabulary'; activity='mistakes'; reason=`You recently missed ${vocabulary.find(w=>w.id===recentWords[0])?.meaning||'some vocabulary'}; retrieval practice is the useful next step.`; priority='high'; minutes=5;}
  else if(next && (Object.keys(reviews).length || Object.keys(kana).length || Object.keys(grammar).length || answers.length || studyDays.length || sessions.length || Object.keys(s.curriculum||{}).length)){focus=next.title; activity='journey'; reason=`${next.title} is the next unlocked learning step.`; minutes=next.type==='story'?3:5;}
  else if(Object.keys(reviews).length){focus='Practise a strong area with light variation'; activity='review'; reason='Your reviewed areas are stable, so a varied review keeps them available.'; priority='normal'; minutes=5;}
  else {focus='Begin with the five vowels'; activity='kana'; reason='There is not enough saved performance data yet, so the safest start is the vowel foundation.'; priority='low'; minutes=2;}
  const requested=Number(s.focus?.lastDuration)||minutes;
  const sessionLength=[2,5,10].includes(requested)?requested:([2,5,10].includes(minutes)?minutes:5);
  return {focus,activity,reason,minutes:sessionLength,estimatedSession:`${sessionLength} minutes`,priority,fallback:'Begin with the five vowels',seed:Number(seed)||0};
}

export const learningDirector = directLearning;
