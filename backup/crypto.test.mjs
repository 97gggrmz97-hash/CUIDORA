import {test} from 'node:test';import assert from 'node:assert/strict';import {randomBytes} from 'node:crypto';import {seal,restore} from './crypto.mjs';
test('isolated synthetic round trip',()=>{const key=randomBytes(32),source={patients:[{id:'synthetic-1'}],appointments:[]};const snapshot=seal(source,key);const target=restore(JSON.parse(JSON.stringify(snapshot)),key);assert.deepEqual(target,source);assert.notEqual(target,source);});
test('wrong key rejected',()=>{const s=seal({synthetic:true},randomBytes(32));assert.throws(()=>restore(s,randomBytes(32)));});
test('tampering rejected',()=>{const k=randomBytes(32),s=seal({synthetic:true},k);const b=Buffer.from(s.ciphertext,'base64');b[0]^=1;s.ciphertext=b.toString('base64');assert.throws(()=>restore(s,k));});
