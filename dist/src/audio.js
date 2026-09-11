import {getState} from './state.js';
export const AUDIO_PROVIDERS={ASSET:'asset',TTS:'tts',UNAVAILABLE:'unavailable'};
export const AUDIO_TYPES={KANA:'kana',VOCABULARY:'vocabulary',SENTENCE:'sentence',CONVERSATION:'conversation',SAKURA:'sakura'};
export const SAKURA_AUDIO={greeting:'sakura:greeting',growth:'sakura:growth',levelUp:'sakura:level-up'};
let voices=[];let listeners=[];let active=null;let lastPlayback={text:'',at:0};
const synth=()=>globalThis.speechSynthesis;const japanese=v=>String(v?.lang||'').toLowerCase().startsWith('ja');
export function getJapaneseVoices(){return voices.filter(japanese)}
export function audioCapability(){const tts=Boolean(synth()&&globalThis.SpeechSynthesisUtterance);return {ttsAvailable:tts,japaneseVoiceAvailable:getJapaneseVoices().length>0,assetAvailable:false,available:tts||getJapaneseVoices().length>0, listeningEligible:tts||getJapaneseVoices().length>0,provider:tts?AUDIO_PROVIDERS.TTS:AUDIO_PROVIDERS.UNAVAILABLE}}
export function loadVoices(){if(!synth())return[];voices=synth().getVoices?.()||[];listeners.forEach(fn=>fn(voices));return voices}
if(synth()?.addEventListener)synth().addEventListener('voiceschanged',loadVoices);loadVoices();
export function resolveAudio({text,asset=null,contentId=null,type=AUDIO_TYPES.VOCABULARY}={}){const c=audioCapability();return {contentId,type,text,asset,provider:asset?AUDIO_PROVIDERS.ASSET:c.ttsAvailable?AUDIO_PROVIDERS.TTS:AUDIO_PROVIDERS.UNAVAILABLE,available:Boolean(asset||c.ttsAvailable)}}
function rate(){const speed=getState().audio?.speed||'normal';return speed==='slow'?.62:speed==='fast'?1:.82}
function selectedVoice(){const pref=getState().audio?.voice||'auto';return getJapaneseVoices().find(v=>v.voiceURI===pref||v.name===pref)||getJapaneseVoices()[0]||null}
export function stopAudio(){try{synth()?.cancel()}catch{};active=null;listeners.forEach(fn=>fn({playing:false}))}
export function playJapanese(request={}){const text=String(request.text||'').trim();if(!text)return Promise.resolve({ok:false,reason:'empty'});if(getState().settings?.sound===false)return Promise.resolve({ok:false,reason:'disabled'});const now=Date.now();if(lastPlayback.text===text&&now-lastPlayback.at<350)return Promise.resolve({ok:false,reason:'duplicate'});lastPlayback={text,at:now};const r=resolveAudio({...request,text});if(!r.available)return Promise.resolve({ok:false,reason:'unavailable',provider:r.provider});if(request.priority==='low'&&active)return Promise.resolve({ok:false,reason:'busy'});stopAudio();if(r.provider===AUDIO_PROVIDERS.ASSET&&globalThis.Audio)return new Promise(resolve=>{const a=new Audio(r.asset);active=a;a.onended=()=>{active=null;resolve({ok:true,provider:r.provider})};a.onerror=()=>resolve(playTts(text));a.play().catch(()=>resolve(playTts(text)))});return Promise.resolve(playTts(text))}
function playTts(text){if(!synth()||!globalThis.SpeechSynthesisUtterance)return {ok:false,reason:'unavailable',provider:AUDIO_PROVIDERS.UNAVAILABLE};const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.rate=rate();const v=selectedVoice();if(v)u.voice=v;u.onstart=()=>{active=u;listeners.forEach(fn=>fn({playing:true,text}))};u.onend=()=>{active=null;listeners.forEach(fn=>fn({playing:false}))};synth().speak(u);return {ok:true,provider:AUDIO_PROVIDERS.TTS,voice:v?.name||null,rate:u.rate}}
export function playSakuraLine(text,id=SAKURA_AUDIO.greeting){return playJapanese({text,contentId:id,type:AUDIO_TYPES.SAKURA,priority:'low'})}
export function subscribeAudio(fn){listeners.push(fn);return()=>{listeners=listeners.filter(x=>x!==fn)}}
export function audioDiagnostics(){return {capability:audioCapability(),voices:getJapaneseVoices().map(v=>({name:v.name,lang:v.lang,uri:v.voiceURI})),preference:getState().audio||{}}}
