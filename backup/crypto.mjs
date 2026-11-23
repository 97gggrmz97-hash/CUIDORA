import {randomBytes,createCipheriv,createDecipheriv,createHash} from 'node:crypto';
export function seal(data,key){
 if(!Buffer.isBuffer(key)||key.length!==32) throw Error('Invalid key');
 const iv=randomBytes(12), cipher=createCipheriv('aes-256-gcm',key,iv);
 cipher.setAAD(Buffer.from('CUIDORA:v1'));
 const plain=Buffer.from(JSON.stringify(data));
 const ciphertext=Buffer.concat([cipher.update(plain),cipher.final()]);
 return {version:1,iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),ciphertext:ciphertext.toString('base64'),digest:createHash('sha256').update(plain).digest('hex')};
}
export function restore(snapshot,key){
 if(snapshot.version!==1||!Buffer.isBuffer(key)||key.length!==32) throw Error('Invalid snapshot or key');
 const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(snapshot.iv,'base64'));
 decipher.setAAD(Buffer.from('CUIDORA:v1'));decipher.setAuthTag(Buffer.from(snapshot.tag,'base64'));
 const plain=Buffer.concat([decipher.update(Buffer.from(snapshot.ciphertext,'base64')),decipher.final()]);
 if(createHash('sha256').update(plain).digest('hex')!==snapshot.digest) throw Error('Integrity mismatch');
 return JSON.parse(plain.toString('utf8'));
}
