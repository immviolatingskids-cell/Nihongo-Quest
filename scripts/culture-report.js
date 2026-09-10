import {culturalItems,validateCulturalItems} from '../src/cultural-items.js';
import {STOREKEEPER} from '../src/storekeeper.js';
import fs from 'node:fs';
import path from 'node:path';
const report=validateCulturalItems();
console.log('Cultural Collection');
console.log(`Items: ${culturalItems.length}`);
console.log(`Discovery hooks: ${report.counts.discoveryHooks}`);
const existingImages=culturalItems.filter(item=>fs.existsSync(path.resolve('assets',item.image.card.replace('./assets/',''))));
console.log(`Images: ${existingImages.length} / ${culturalItems.length}`);
for(const item of culturalItems.filter(item=>!fs.existsSync(path.resolve('assets',item.image.card.replace('./assets/','')))))console.log(`Missing image: ${item.id} -> ${item.image.card}`);
console.log(`Audio capable: ${report.counts.audio} / ${culturalItems.length}`);
console.log(`Placement metadata: ${report.counts.placement} / ${culturalItems.length}`);
const storekeeperImages=new Set(Object.values(STOREKEEPER.imageSlots.expressions).filter(Boolean));
console.log(`Storekeeper states: ${Object.values(STOREKEEPER.imageSlots.expressions).filter(Boolean).length} / ${STOREKEEPER.expressions.length} mapped (${storekeeperImages.size} source files)`);
if(!report.valid){console.error(report.issues.join('\n'));process.exitCode=1}
