import {culturalItems,validateCulturalItems} from '../src/cultural-items.js';
import {STOREKEEPER} from '../src/storekeeper.js';
const report=validateCulturalItems();
console.log('Cultural Collection');
console.log(`Items: ${culturalItems.length}`);
console.log(`Discovery hooks: ${report.counts.discoveryHooks}`);
console.log(`Images: ${report.counts.images} / ${culturalItems.length}`);
console.log(`Audio capable: ${report.counts.audio} / ${culturalItems.length}`);
console.log(`Placement metadata: ${report.counts.placement} / ${culturalItems.length}`);
console.log(`Storekeeper states: 0 / ${STOREKEEPER.expressions.length} artwork supplied`);
if(!report.valid){console.error(report.issues.join('\n'));process.exitCode=1}
