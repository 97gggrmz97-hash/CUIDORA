import {regionalMap} from './regional.mjs';
export function indicators(rows,{city='',specialty=''}={}){
 const filtered=rows.filter(r=>r.uf==='ES'&&(!specialty||r.specialty===specialty));
 const groups=regionalMap(filtered);
 const visible=groups.filter(r=>!city||r.city===city);
 return {groups:visible,professionals:visible.reduce((s,r)=>s+r.count,0),coveredMunicipalities:groups.length,coverage:groups.length/78*100,remainingMunicipalities:78-groups.length};
}
export function mapUrl(city='',layer='m'){
 const q=encodeURIComponent((city?city+', ':'')+'Espírito Santo, Brasil');
 return 'https://maps.google.com/maps?q='+q+'&z='+(city?13:8)+'&t='+(layer==='k'?'k':'m')+'&output=embed';
}
