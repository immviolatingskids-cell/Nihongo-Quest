import test from 'node:test';
import assert from 'node:assert/strict';
import {AUDIO_PROVIDERS,audioCapability,resolveAudio,audioDiagnostics,playJapanese} from '../src/audio.js';
import {importSave,getState,exportSave} from '../src/state.js';

test('audio service is safe when browser speech APIs are absent',()=>{assert.equal(audioCapability().provider,AUDIO_PROVIDERS.UNAVAILABLE);assert.equal(resolveAudio({text:'こんにちは'}).available,false);assert.equal(audioDiagnostics().preference.voice,'auto')});
test('asset requests retain stable semantic metadata and prefer assets',()=>{const r=resolveAudio({text:'ねこ',asset:'./assets/audio/vocab-neko.mp3',contentId:'vocab:neko',type:'vocabulary'});assert.equal(r.provider,AUDIO_PROVIDERS.ASSET);assert.equal(r.contentId,'vocab:neko')});
test('audio preferences survive legacy-compatible import and export',async()=>{const save=JSON.parse(exportSave());delete save.audio;importSave(JSON.stringify(save));assert.deepEqual(getState().audio,{voice:'auto',speed:'normal',autoPlay:false});assert.equal((await playJapanese({text:'x'})).reason,'unavailable')});
