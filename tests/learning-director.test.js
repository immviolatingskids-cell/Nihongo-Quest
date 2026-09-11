import test from 'node:test';
import assert from 'node:assert/strict';
import {directLearning} from '../src/learning-director.js';

const base={reviews:{},kana:{},answers:[],curriculum:{},focus:{lastDuration:5}};
test('director prioritises weak kana and vowels',()=>{assert.equal(directLearning({...base,kana:{か:{correct:0,wrong:3}}}).activity,'kana');assert.match(directLearning({...base,kana:{あ:{correct:0,wrong:1}}}).focus,/vowels/)});
test('director reviews recent errors and falls back to Journey',()=>{assert.equal(directLearning({...base,answers:[{kind:'word',id:'ohayo',correct:false}]}).activity,'mistakes');assert.equal(directLearning({...base,kana:{か:{correct:2,wrong:0}},curriculum:{'path.kana.vowels':{complete:true}}}).activity,'journey')});
test('director has an insufficient-data fallback and deterministic output',()=>{const a=directLearning(base,7),b=directLearning(base,7);assert.equal(a.activity,'kana');assert.deepEqual(a,b);});
test('director respects supported session lengths and persistence-shaped state',()=>{for(const n of [2,5,10])assert.equal(directLearning({...base,focus:{lastDuration:n}}).minutes,n);assert.equal(directLearning({schemaVersion:1}).fallback,'Begin with the five vowels');});
