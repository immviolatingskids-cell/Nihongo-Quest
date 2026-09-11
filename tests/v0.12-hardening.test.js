import test from 'node:test';
import assert from 'node:assert/strict';
import {exportSave,getState,importSave,resetSave} from '../src/state.js';

test('v0.12 save import sanitises malformed collection shapes without changing schema',()=>{
  const save=JSON.parse(exportSave());
  save.schemaVersion=1;
  save.culture={discovered:'not-a-list',owned:{},acknowledged:3,placements:'invalid'};
  save.focus={sessions:'invalid'};
  save.garden={milestones:'invalid',recentGrowth:{}};
  save.reviews={broken:null,valid:{correct:2,wrong:0}};
  importSave(JSON.stringify(save));
  const state=getState();
  assert.equal(state.schemaVersion,4);
  assert.deepEqual(state.culture.discovered,[]);
  assert.deepEqual(state.culture.owned,[]);
  assert.deepEqual(state.culture.acknowledged,[]);
  assert.deepEqual(state.focus.sessions,[]);
  assert.deepEqual(state.garden.milestones,[]);
  assert.equal(state.reviews.broken,undefined);
  assert.equal(state.reviews.valid.skills.recognition,28);
  resetSave();
});

test('v0.12 persistence failures do not prevent canonical state updates',()=>{
  const original=globalThis.localStorage;
  globalThis.localStorage={getItem:()=>null,setItem:()=>{throw new Error('quota')}};
  try{importSave(JSON.stringify({...JSON.parse(exportSave()),xp:123}));assert.equal(getState().xp,123)}finally{globalThis.localStorage=original;resetSave()}
});
