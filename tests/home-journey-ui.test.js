import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');

test('Home derives its single primary action from the canonical Journey recommendation',()=>{
  const home=app.slice(app.indexOf('function homeView()'),app.indexOf('function questRow'));
  assert.match(home,/r=recommendNext\(\)/);
  assert.match(home,/data-journey-resume/);
  assert.match(home,/data-recommend/);
  assert.match(home,/adaptiveSupport\(r\)/);
  assert.match(home,/adaptive-explanation/);
  assert.doesNotMatch(home,/data-start="journey"/);
});

test('Home exposes welcome, progress, and a bounded daily quest without new state',()=>{
  assert.match(app,/class="home-welcome sakura-horizon"/);
  assert.match(app,/aria-label="Learning progress"/);
  assert.match(app,/Today’s bounded quest/);
  assert.match(app,/quests\.map\(q=>questRow\(q\)\)/);
});

test('Sakura Horizon layout includes tablet, mobile, focus, and reduced-motion rules',()=>{
  assert.match(css,/--horizon-surface:/);
  assert.match(css,/@media\(max-width:900px\).*\.home-welcome/s);
  assert.match(css,/@media\(max-width:560px\).*\.home-primary-actions \.btn\{width:100%\}/s);
  assert.match(css,/\.journey-node-body:focus-visible/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\).*\.home-welcome/s);
});

test('release hardening keeps mobile navigation readable and key artwork stable',()=>{
  assert.match(css,/\.mobile-nav\{display:grid;grid-template-columns:repeat\(5,1fr\)/);
  assert.match(app,/sakura-companion\.webp" alt="Sakura, your learning companion" width="480" height="560" loading="lazy"/);
  assert.match(app,/data-companion-event/);
});
