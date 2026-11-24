const base='https://xzhuyktqmrtygmvmtgir.supabase.co';
const key="sb_publishable_tmq52WlUdF3AigFP-i_pNA_R27zeHv4";
async function request(path,body,token){const res=await fetch(base+path,{method:'POST',headers:{apikey:key,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},body:JSON.stringify(body),cache:'no-store'});if(!res.ok)throw new Error('Acesso não autorizado ou serviço indisponível');return res.json();}
export async function login(email,password){const session=await request('/auth/v1/token?grant_type=password',{email,password});return session.access_token;}
export async function counts(token){const rows=await request('/rest/v1/rpc/regional_counts',{},token);return rows.map(r=>({uf:'ES',city:r.city,specialty:r.specialty,count:Number(r.count)}));}
