import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {COMPANION_EVENTS,COMPANION_REACTIONS,emitCompanion,initializeCompanion,selectCompanionDialogue} from '../src/companion.js';
import {getState,importSave,resetSave} from '../src/state.js';
const app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');

test.beforeEach(()=>resetSave());

test('companion dialogue selection is deterministic for the same persisted context',()=>{
  const presence={seenEvents:4};
  assert.equal(selectCompanionDialogue(COMPANION_EVENTS.SESSION_STARTED,presence),selectCompanionDialogue(COMPANION_EVENTS.SESSION_STARTED,presence));
  assert.ok(Object.values(COMPANION_REACTIONS).some(reaction=>reaction.message===selectCompanionDialogue('UNKNOWN',presence)));
});

test('first visit and returning visit are explicit persisted states',()=>{
  initializeCompanion();
  assert.equal(getState().companionPresence.event,'FIRST_VISIT');
  assert.equal(getState().companionPresence.reaction,'welcome');
  const saved=JSON.parse(JSON.stringify(getState()));
  saved.companionPresence.lastSeenDate='2000-01-01';
  importSave(JSON.stringify(saved));
  initializeCompanion();
  assert.equal(getState().companionPresence.event,'USER_RETURNED');
  assert.equal(getState().companionPresence.reaction,'welcome');
});

test('quest, mistake, discovery and milestone events select contextual reactions',()=>{
  emitCompanion(COMPANION_EVENTS.QUEST_STARTED,{force:true});
  assert.equal(getState().companionPresence.reaction,'thinking');
  emitCompanion(COMPANION_EVENTS.ANSWER_INCORRECT,{focus:true,force:true});
  assert.equal(getState().companionPresence.reaction,'encouraging');
  emitCompanion(COMPANION_EVENTS.CULTURAL_ITEM_DISCOVERED,{focus:true,force:true});
  assert.equal(getState().companionPresence.reaction,'surprised');
  emitCompanion(COMPANION_EVENTS.MILESTONE_REACHED,{focus:true,force:true});
  assert.equal(getState().companionPresence.reaction,'surprised');
  assert.ok(getState().companionPresence.seenEvents>=4);
});

test('contextual reactions persist their canonical event for accessible surfaces',()=>{
  emitCompanion(COMPANION_EVENTS.GARDEN_GROWTH,{force:true,message:'The Garden noticed your practice.'});
  const presence=getState().companionPresence;
  assert.equal(presence.event,COMPANION_EVENTS.GARDEN_GROWTH);
  assert.equal(presence.message,'The Garden noticed your practice.');
  const exported=JSON.parse(JSON.stringify(getState()));
  importSave(JSON.stringify(exported));
  assert.equal(getState().companionPresence.event,COMPANION_EVENTS.GARDEN_GROWTH);
});

test('Sakura presence is mounted across app surfaces with accessible responsive fallback',()=>{
  const app=fs.readFileSync(path.resolve('src/app.js'),'utf8');
  const styles=fs.readFileSync(path.resolve('src/styles.css'),'utf8');
  assert.match(app,/sakuraPresence\('shell'\)/);
  assert.match(app,/sakura-companion\.webp/);
  assert.match(app,/data-companion-event/);
  assert.match(app,/aria-live="polite"/);
  assert.match(styles,/\.sakura-presence/);
  assert.match(styles,/prefers-reduced-motion:reduce/);
});

test('revamped companion surface includes Kohaku and character runtime assets',()=>{assert.match(app,/Sakura & Kohaku/);assert.match(app,/characters\/kohaku\/kohaku-neutral\.webp/);assert.match(app,/characters\/sakura\/sakura-\$\{active\.tone/)});
