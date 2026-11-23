import {put,get} from '@vercel/blob';
import {randomBytes,randomUUID,timingSafeEqual} from 'node:crypto';
import {seal,restore} from '../backup/crypto.mjs';
import assert from 'node:assert/strict';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const secret=process.env.CRON_SECRET;
 const actual=Buffer.from(req.headers.authorization||''), expected=Buffer.from('Bearer '+(secret||''));
 if(!secret||secret.length<32||actual.length!==expected.length||!timingSafeEqual(actual,expected))return res.status(401).json({error:'Unauthorized'});
 if(req.method!=='GET'&&req.method!=='POST')return res.status(405).end();
 try{
 const key=Buffer.from(process.env.BACKUP_ENCRYPTION_KEY||'','base64');
 if(key.length!==32||!process.env.BLOB_READ_WRITE_TOKEN)throw Error('Configuration missing');
 const id=randomUUID(), source={schema:1,synthetic:true,patients:[{id:'test-'+id}],appointments:[]};
 const snapshot=seal(source,key);
 const blob=await put('homologation/'+id+'.json',JSON.stringify(snapshot),{access:'private',contentType:'application/json'});
 const downloaded=await get(blob.url,{access:'private',useCache:false});
 if(!downloaded||downloaded.statusCode!==200)throw Error('Read failed');
 const restored=restore(JSON.parse(await new Response(downloaded.stream).text()),key);
 assert.deepEqual(restored,source);
 assert.throws(()=>restore(snapshot,randomBytes(32)));
 const tampered={...snapshot,tag:Buffer.alloc(16).toString('base64')};assert.throws(()=>restore(tampered,key));
 const report={id,at:new Date().toISOString(),scope:'synthetic-only',storage:'private',restoration:'verified',wrongKeyRejected:true,tamperingRejected:true,digest:snapshot.digest};
 await put('homologation/reports/'+id+'.json',JSON.stringify(report),{access:'private',contentType:'application/json'});
 return res.status(200).json(report);
 }catch{return res.status(503).json({error:'Backup validation failed'});}
}
