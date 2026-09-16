import test from 'node:test';
import assert from 'node:assert/strict';
import {directLearning,buildDirectedItems} from '../src/learning-director.js';
const base={reviews:{},kana:{},answers:[],curriculum:{},focus:{lastDuration:5}};
test('directed vowel and weak-kana sessions contain their targets',()=>{
  const vowels=directLearning(base,3); assert.deepEqual(buildDirectedItems(base,vowels,3).map(x=>x.char),['あ','い','う','え','お']);
  const weak={...base,kana:{ぬ:{correct:0,wrong:3}}}; const r=directLearning(weak,3); assert.deepEqual(buildDirectedItems(weak,r,3).map(x=>x.char),['ぬ']);
});
test('directed mistakes contain actual missed vocabulary',()=>{const s={...base,answers:[{kind:'word',id:'ohayo',correct:false}]};const r=directLearning(s,1);assert.equal(r.activity,'mistakes');assert.equal(buildDirectedItems(s,r,1)[0].word.id,'ohayo');});
test('same state and seed produce identical directed items and empty pools are safe',()=>{const a=buildDirectedItems(base,directLearning(base,9),9),b=buildDirectedItems(base,directLearning(base,9),9);assert.deepEqual(a,b);assert.equal(buildDirectedItems({...base,answers:[{kind:'word',id:'missing',correct:false}]}, {activity:'mistakes',targetIds:['missing']}).length,0);});
test('director review targets use canonical due semantics',()=>{
  const state={...base,reviews:{ohayo:{correct:3,wrong:0,due:Date.now()+86400000},konnichiwa:{correct:1,wrong:1,due:0}}};
  const recommendation={activity:'review',targetIds:['ohayo','konnichiwa']};
  const items=buildDirectedItems(state,recommendation);
  assert.deepEqual(items.map(item=>item.word.id),['konnichiwa']);
  assert.ok(items.every(item=>item.source==='due review'));
});
