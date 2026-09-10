import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {culturalItems,culturalById,validateCulturalItems} from '../src/cultural-items.js';
import {discoverItem,acquireItem,isDiscovered,isOwned} from '../src/engine.js';
import {getState,importSave,exportSave} from '../src/state.js';
import {STOREKEEPER,SHOP_BRANDING,STOREKEEPER_REACTION_MAP,storekeeperLine} from '../src/storekeeper.js';

test('cultural registry is valid and has meaningful breadth',()=>{const report=validateCulturalItems();assert.equal(report.valid,true);assert.ok(culturalItems.length>=12);assert.equal(culturalById.get('furin').audioId,'culture:furin');assert.ok(culturalItems.every(x=>x.placement&&x.discoveryId))});
test('discovery and ownership are distinct and idempotent',()=>{const first=discoverItem('furin');assert.equal(first.duplicate,false);assert.equal(isDiscovered('furin'),true);assert.equal(isOwned('furin'),false);assert.equal(acquireItem('furin').duplicate,false);assert.equal(isOwned('furin'),true);assert.equal(discoverItem('furin').duplicate,true);assert.equal(acquireItem('furin').duplicate,true);assert.equal(discoverItem('missing').ok,false);assert.equal(acquireItem('missing').ok,false)});
test('ownership cannot bypass discovery and culture state round-trips',()=>{importSave(JSON.stringify({...JSON.parse(exportSave()),culture:{discovered:[],owned:[]}}));assert.equal(acquireItem('daruma').reason,'undiscovered');discoverItem('daruma');acquireItem('daruma');const saved=JSON.parse(exportSave());importSave(JSON.stringify(saved));assert.equal(isOwned('daruma'),true);assert.deepEqual(getState().culture.owned,['daruma'])});
test('Storekeeper has stable identity and bounded dialogue',()=>{assert.equal(STOREKEEPER.id,'aoi');assert.equal(STOREKEEPER.expressions.length,7);assert.ok(storekeeperLine('greeting'));assert.ok(storekeeperLine('greeting',100))});
test('approved Aoi presentation mapping is explicit and reusable',()=>{assert.equal(SHOP_BRANDING.image,'./assets/shop/aoi-shop-sign.png');assert.equal(STOREKEEPER_REACTION_MAP.welcome,'welcoming');assert.equal(STOREKEEPER_REACTION_MAP.happy,'smiling');assert.equal(STOREKEEPER_REACTION_MAP.thinking,'thoughtful');assert.equal(STOREKEEPER.imageSlots.expressions.amused,STOREKEEPER.imageSlots.expressions.smiling);assert.ok(Object.values(STOREKEEPER.imageSlots.expressions).every(Boolean))});
test('approved Aoi artwork files resolve from the production namespace',()=>{const files=new Set(['aoi-open.png','aoi-smiling.png','aoi-welcoming.png','aoi-shop-sign.png']);for(const file of files)assert.equal(fs.existsSync(path.resolve('assets/shop',file)),true,file)});
