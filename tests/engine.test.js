import test from 'node:test';
import assert from 'node:assert/strict';
import {createQuestion,evaluateAnswer,normalizeAnswer,recordAnswerResult,journeyItems,mistakeItems} from '../src/engine.js';
import {getState,resetSave} from '../src/state.js';
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

test('session builders expose selection reasons',()=>{
  const journey=journeyItems();
  assert.ok(journey.length>0);
  assert.ok(journey.every(item=>item.source));
  assert.ok(Array.isArray(mistakeItems()));
});
