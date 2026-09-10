import test from 'node:test';
import assert from 'node:assert/strict';
import {culturalItems,culturalById,validateCulturalItems} from '../src/cultural-items.js';
import {discoverItem,acquireItem,isDiscovered,isOwned} from '../src/engine.js';
import {getState,importSave,exportSave} from '../src/state.js';
import {STOREKEEPER,storekeeperLine} from '../src/storekeeper.js';

test('cultural registry is valid and has meaningful breadth',()=>{const report=validateCulturalItems();assert.equal(report.valid,true);assert.ok(culturalItems.length>=12);assert.equal(culturalById.get('furin').audioId,'culture:furin');assert.ok(culturalItems.every(x=>x.placement&&x.discoveryId))});
test('discovery and ownership are distinct and idempotent',()=>{const first=discoverItem('furin');assert.equal(first.duplicate,false);assert.equal(isDiscovered('furin'),true);assert.equal(isOwned('furin'),false);assert.equal(acquireItem('furin').duplicate,false);assert.equal(isOwned('furin'),true);assert.equal(discoverItem('furin').duplicate,true);assert.equal(acquireItem('furin').duplicate,true);assert.equal(discoverItem('missing').ok,false);assert.equal(acquireItem('missing').ok,false)});
test('ownership cannot bypass discovery and culture state round-trips',()=>{importSave(JSON.stringify({...JSON.parse(exportSave()),culture:{discovered:[],owned:[]}}));assert.equal(acquireItem('daruma').reason,'undiscovered');discoverItem('daruma');acquireItem('daruma');const saved=JSON.parse(exportSave());importSave(JSON.stringify(saved));assert.equal(isOwned('daruma'),true);assert.deepEqual(getState().culture.owned,['daruma'])});
test('Storekeeper has stable identity and bounded dialogue',()=>{assert.equal(STOREKEEPER.id,'aoi');assert.equal(STOREKEEPER.expressions.length,7);assert.ok(storekeeperLine('greeting'));assert.ok(storekeeperLine('greeting',100))});
