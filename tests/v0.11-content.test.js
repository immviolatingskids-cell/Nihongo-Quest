import test from 'node:test';
import assert from 'node:assert/strict';
import {curriculum,vocabulary,scenarios,validateContent} from '../src/data.js';
import {curriculumItems,journeyMap} from '../src/engine.js';

test('v0.11 routine slice uses stable canonical content and prerequisites',()=>{
  const words=['mainichi','okiru','nemuru','yomu'];
  const node=curriculum.find(item=>item.id==='path.words.routine');
  const story=curriculum.find(item=>item.id==='path.story.routine');
  assert.ok(node&&story);
  assert.deepEqual(node.content,words);
  assert.deepEqual(story.requires,['path.words.routine']);
  assert.ok(words.every(id=>vocabulary.some(word=>word.id===id)));
  assert.ok(scenarios.some(item=>item.id==='routine'));
  assert.equal(validateContent().valid,true);
});

test('v0.11 routine node reuses the canonical session item contract',()=>{
  const node=curriculum.find(item=>item.id==='path.words.routine');
  const items=curriculumItems(node,{reviews:{},kana:{}});
  assert.equal(items.length,4);
  assert.ok(items.every(item=>item.type==='word'&&item.source==='curriculum requirement'));
});

test('v0.11 routine slice is visible in the existing Journey map',()=>{
  const chapter=journeyMap({reviews:{},kana:{},curriculum:{},conversations:{},grammar:{}}).find(item=>item.id==='everyday-rhythm');
  assert.deepEqual(chapter.nodeIds,['path.words.routine','path.story.routine']);
  assert.deepEqual(chapter.nodes.map(item=>item.id),chapter.nodeIds);
});
