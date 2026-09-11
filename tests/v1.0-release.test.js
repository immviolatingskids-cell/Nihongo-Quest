import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');

test('v1.0 shell exposes a keyboard skip path and descriptive document metadata',()=>{
  assert.match(html,/name="description"/);
  assert.match(html,/href="#main-content">Skip to main content/);
  assert.match(app,/id="main-content" tabindex="-1"/);
  assert.match(css,/\.skip-link:focus/);
});
