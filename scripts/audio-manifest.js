import {vocabulary,kanaFamilies,grammar,scenarios} from '../src/data.js';

const items=[];
kanaFamilies.forEach(f=>f.items.forEach(([char])=>items.push({id:`kana:${char}`,type:'kana',text:char})));
vocabulary.forEach(w=>{items.push({id:`vocab:${w.id}`,type:'vocabulary',text:w.kana});items.push({id:`sentence:${w.id}`,type:'sentence',text:w.example})});
grammar.forEach(g=>items.push({id:`grammar:${g.id}`,type:'sentence',text:g.example}));
scenarios.forEach(s=>(s.scenes||[s]).forEach((scene,i)=>items.push({id:`conversation:${s.id}:${i}`,type:'conversation',text:scene.prompt})));
const counts=Object.fromEntries([...new Set(items.map(x=>x.type))].map(type=>[type,items.filter(x=>x.type===type).length]));
console.log(JSON.stringify({total:items.length,counts,localAssets:0,ttsFallback:'ja-JP speechSynthesis',unavailable:0},null,2));
