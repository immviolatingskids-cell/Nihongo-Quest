import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const state=readFileSync(new URL('../src/state.js',import.meta.url),'utf8');
const engine=readFileSync(new URL('../src/engine.js',import.meta.url),'utf8');
const review=readFileSync(new URL('../docs/milestones/v0.10_ADAPTIVE_LEARNING_DESIGN_DATA_SAFETY_REVIEW.md',import.meta.url),'utf8');

test('v0.10 review keeps adaptive implementation outside canonical save and engine state',()=>{
  assert.doesNotMatch(state,/adaptive|personaliz|inferredAbility|learnerProfile/i);
  assert.doesNotMatch(engine,/adaptive|personaliz|inferredAbility|learnerProfile/i);
  assert.match(review,/implementation remains blocked on an approved design\/data-safety decision/);
});

test('v0.10 review explicitly preserves current progression boundaries',()=>{
  assert.match(review,/existing local save data/);
  assert.match(review,/canonical mastery and progression untouched/);
  assert.match(review,/No adaptive fields, algorithms, remote telemetry, or new progression state/);
});
