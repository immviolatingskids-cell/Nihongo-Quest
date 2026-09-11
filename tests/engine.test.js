import test from 'node:test';
import assert from 'node:assert/strict';
import {createQuestion,evaluateAnswer,evaluateConversationAnswer,normalizeAnswer,recordAnswerResult,recordWord,nextSkill,journeyItems,mistakeItems,buildSession,buildFocusSession,focusResumeIndex,describeSession,completeGrammar,completeConversation,recordFocusSession,gardenProgress,gardenGrowthScore,syncGardenProgress,recommendNext,adaptiveSupport,journeyMap} from '../src/engine.js';
import {getState,resetSave,importSave} from '../src/state.js';
import {subscribeCompanion} from '../src/companion.js';

test.beforeEach(()=>resetSave());

test('normalises Japanese and punctuation without fuzzy matching',()=>{
  assert.equal(normalizeAnswer('  ありがとう！ '),'ありがとう');
  const q=createQuestion({type:'word',word:{id:'w1',kana:'ありがとう',romaji:'arigatō'},stage:'recall',prompt:'thank you',answer:'ありがとう',accepted:['arigatō']});
  assert.equal(evaluateAnswer(q,'ありがとう！').correct,true);
  assert.equal(evaluateAnswer(q,'ありがと').correct,false);
});

test('supports accepted alternatives and structured result metadata',()=>{
  const q=createQuestion({type:'word',word:{id:'w1',kana:'わたし',romaji:'watashi'},stage:'recognition',prompt:'わたし',answer:'I / me',accepted:['watashi']},{source:'due review'});
  const result=evaluateAnswer(q,'watashi');
  assert.deepEqual({correct:result.correct,matchedAlternative:result.matchedAlternative,contentId:result.contentId,stage:result.stage,source:result.source},{correct:true,matchedAlternative:'watashi',contentId:'w1',stage:'recognition',source:'due review'});
  const meaningQuestion=createQuestion({type:'word',word:{id:'w2',kana:'みず',romaji:'mizu'},stage:'recognition',prompt:'みず',answer:'water'});
  assert.equal(evaluateAnswer(meaningQuestion,'mizu').correct,false);
});

test('one answer result records one progress event and XP award',()=>{
  const result=evaluateAnswer(createQuestion({type:'kana',char:'あ',romaji:'a'},{source:'focused practice'}),'a');
  recordAnswerResult(result);
  assert.equal(getState().answers.length,1);
  assert.equal(getState().xp,8);
  assert.equal(getState().kana['あ'].correct,1);
});

test('recording an answer emits one companion answer event',()=>{
  const events=[];
  const unsubscribe=subscribeCompanion(event=>events.push(event.event));
  const result=evaluateAnswer(createQuestion({type:'kana',char:'あ',romaji:'a'}),'a');
  recordAnswerResult(result);
  unsubscribe();
  assert.deepEqual(events,['ANSWER_CORRECT']);
});

test('canonical recording is idempotent for repeated attempt IDs',()=>{
  const result={...evaluateAnswer(createQuestion({type:'kana',char:'あ',romaji:'a'}),'a'),attemptId:'session-1:0'};
  recordAnswerResult(result);
  const duplicate=recordAnswerResult(result);
  assert.equal(duplicate.duplicate,true);
  assert.equal(getState().answers.length,1);
  assert.equal(getState().xp,8);
});

test('engine owns answer streak events after three correct attempts',()=>{
  const events=[];
  const unsubscribe=subscribeCompanion(event=>events.push(event.event));
  for(let i=0;i<3;i++)recordAnswerResult({...evaluateAnswer(createQuestion({type:'kana',char:['あ','い','う'][i],romaji:['a','i','u'][i]}),'a'.replace('a',['a','i','u'][i])),attemptId:`streak:${i}`});
  unsubscribe();
  assert.ok(events.includes('ANSWER_STREAK'));
  assert.equal(getState().answerStreak,3);
});

test('session builders expose selection reasons',()=>{
  const journey=journeyItems();
  assert.ok(journey.length>0);
  assert.ok(journey.every(item=>item.source));
  assert.ok(Array.isArray(mistakeItems()));
});

test('canonical session dispatcher and debug view preserve mode context',()=>{
  const session=buildSession('review',{length:3});
  assert.equal(session.mode,'review');
  assert.equal(session.reason,'due review');
  assert.ok(session.items.length<=3);
  const debug=describeSession(session);
  assert.equal(debug.length,session.items.length);
  assert.ok(debug.every(item=>item.source==='due review'));
});

test('conversation evaluation reuses structured results without vocabulary assumptions',()=>{
  const result=evaluateConversationAnswer({scenarioId:'intro',sceneIndex:1,answers:['はい、すきです','はい'],model:'はい、にほんごがすきです。'},'はい！');
  assert.equal(result.correct,true);
  assert.equal(result.contentType,'conversation');
  assert.equal(result.contentId,'intro');
  assert.equal(result.stage,'conversation');
});

test('grammar completion is idempotent',()=>{
  completeGrammar('grammar.test');
  const duplicate=completeGrammar('grammar.test');
  assert.equal(duplicate.duplicate,true);
  assert.equal(getState().xp,20);
});

test('conversation completion awards one scenario result',()=>{
  completeConversation('scenario.test',true);
  assert.equal(getState().conversations['scenario.test'].count,1);
  assert.equal(getState().quests.conversation,1);
  assert.equal(getState().xp,30);
});

test('save state reserves a compact active-session checkpoint',()=>{
  assert.equal(getState().activeSession,null);
});

test('skill progression advances through the supported ladder',()=>{
  const id='word.progression';
  assert.equal(nextSkill(undefined),'recognition');
  recordWord(id,true,'recognition');
  assert.equal(nextSkill(getState().reviews[id]),'recall');
  recordWord(id,true,'recall');
  assert.equal(nextSkill(getState().reviews[id]),'listening');
  recordWord(id,true,'listening');
  assert.equal(nextSkill(getState().reviews[id]),'production');
});

test('question contracts cover recall, listening and production stages',()=>{
  const word={id:'word.stages',kana:'たべる',romaji:'taberu',meaning:'to eat',example:'りんごをたべます。',exampleEn:'I eat an apple.'};
  const recall=createQuestion({type:'word',word,stage:'recall'});
  const listening=createQuestion({type:'word',word,stage:'listening',answer:word.meaning});
  const production=createQuestion({type:'word',word,stage:'production'});
  assert.deepEqual([recall.expected,listening.expected,production.expected],['たべる','to eat','たべる']);
  assert.deepEqual([recall.inputType,listening.inputType,production.inputType],['text','choice','text']);
  assert.equal(evaluateAnswer(recall,'taberu').correct,true);
  assert.equal(evaluateAnswer(production,'たべる').correct,true);
});

test('question and session boundaries reject malformed or empty inputs clearly',()=>{
  assert.throws(()=>createQuestion({type:'word',word:{id:'missing-kana'}}),/requires a word id and kana/);
  assert.throws(()=>createQuestion(null),/must include a content type/);
  assert.deepEqual(buildSession('focused',{items:[]}).items,[]);
  assert.deepEqual(buildSession('curriculum',{items:[]}).items,[]);
});

test('legacy saves migrate review records without losing counts',()=>{
  importSave(JSON.stringify({xp:24,reviews:{legacy:{correct:2,wrong:1,interval:3,due:0}}}));
  const review=getState().reviews.legacy;
  assert.equal(getState().xp,24);
  assert.equal(review.correct,2);
  assert.equal(review.wrong,1);
  assert.deepEqual(review.skills,{recognition:19,recall:0,listening:0,production:0});
});

test('Focus Quest profiles create bounded, useful sessions and remember metadata',()=>{
  for(const duration of [2,5,10]){
    const focus=buildFocusSession(duration);
    assert.equal(focus.mode,'focus');
    assert.equal(focus.duration,duration);
    assert.ok(focus.items.length<=focus.budget);
    assert.ok(focus.items.every(item=>item.source));
  }
  recordFocusSession({duration:2,questionsAttempted:1,questionsCompleted:1,completed:false,earlyExit:true});
  assert.equal(getState().focus.lastDuration,2);
  assert.equal(getState().focus.sessions.at(-1).earlyExit,true);
  assert.equal(focusResumeIndex({index:0,answered:false},3),0);
  assert.equal(focusResumeIndex({index:0,answered:true},3),1);
  assert.equal(focusResumeIndex({index:9,answered:true},3),2);
});

test('Garden growth derives balanced contributions from meaningful learning',()=>{
  const review={correct:4,wrong:0,skills:{recognition:80,recall:80,listening:80,production:80}};
  importSave(JSON.stringify({reviews:{ohayo:review},kana:{'あ':{correct:3,wrong:0}},grammar:{desu:{learned:true}},conversations:{intro:{count:1}},curriculum:{'path.kana.vowels':{complete:true}}}));
  const garden=gardenProgress();
  assert.deepEqual(garden.counts,{blossoms:1,kana:1,grammar:1,conversations:1,branches:1});
  assert.equal(gardenGrowthScore(garden.counts),17);
  assert.equal(garden.level,2);
  assert.ok(garden.unlocked.includes('first-blossom'));
  assert.ok(garden.unlocked.includes('lantern'));
});

test('Garden unlock and growth events are durable and non-duplicating',()=>{
  importSave(JSON.stringify({reviews:{ohayo:{correct:4,wrong:0,skills:{recognition:80,recall:80,listening:80,production:80}}},garden:{initialized:true,lastCounts:{blossoms:0,kana:0,grammar:0,conversations:0,branches:0},milestones:[],recentGrowth:[]}}));
  const events=[];const unsubscribe=subscribeCompanion(event=>events.push(event.event));
  syncGardenProgress();syncGardenProgress();unsubscribe();
  assert.equal(events.filter(event=>event==='GARDEN_UNLOCK').length,1);
  assert.equal(getState().garden.milestones.length,1);
  assert.equal(getState().garden.recentGrowth.length>0,true);
});

test('Garden level boundaries are deterministic and never decay',()=>{
  const review={correct:4,wrong:0,skills:{recognition:80,recall:80,listening:80,production:80}};
  importSave(JSON.stringify({reviews:{ohayo:review,konnichiwa:review},garden:{initialized:true,lastCounts:{blossoms:0,kana:0,grammar:0,conversations:0,branches:0},milestones:[],recentGrowth:[]}}));
  const before=gardenProgress();
  assert.equal(before.score,8);
  assert.equal(before.level,2);
  assert.equal(gardenProgress().level,2);
  assert.equal(gardenProgress().score,8);
});

test('Journey recommendation and node statuses give deterministic direction',()=>{
  const fresh=recommendNext();
  assert.equal(fresh.action,'node');
  assert.equal(fresh.nodeId,'path.kana.vowels');
  const map=journeyMap();
  assert.equal(map[0].nodes[0].status,'recommended');
  assert.equal(map[0].nodes[1].status,'future');
  importSave(JSON.stringify({activeSession:{id:'journey-1',kind:'curriculum',title:'First sounds',nodeId:'path.kana.vowels',index:2,answered:false}}));
  const resumed=recommendNext();
  assert.equal(resumed.action,'resume');
  assert.equal(resumed.reason,'You stopped here last time.');
});

test('adaptive support explains canonical signals without creating progression state',()=>{
  const recommendation=recommendNext();
  const support=adaptiveSupport(recommendation);
  assert.equal(support.action,recommendation.action);
  assert.ok(Array.isArray(support.signals));
  assert.match(support.explanation,/Based on/);
  assert.equal(Object.prototype.hasOwnProperty.call(getState(),'adaptive'),false);
});
