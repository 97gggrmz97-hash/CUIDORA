import {test} from 'node:test';
import assert from 'node:assert/strict';
import {indicators,mapUrl} from './indicators.mjs';
const rows=[{uf:'ES',city:'Vitória',specialty:'Fonoaudiologia',count:10},{uf:'ES',city:'Serra',specialty:'Psicologia',count:6},{uf:'ES',city:'Colatina',specialty:'Fonoaudiologia',count:2},{uf:'MG',city:'Belo Horizonte',specialty:'Fonoaudiologia',count:100}];
test('ES e especialidade',()=>{const x=indicators(rows,{specialty:'Fonoaudiologia'});assert.equal(x.professionals,10);assert.equal(x.coveredMunicipalities,1);assert.equal(x.remainingMunicipalities,77)});
test('município',()=>assert.equal(indicators(rows,{city:'Serra'}).professionals,6));
test('satélite e ruas',()=>{assert.equal(new URL(mapUrl('Vitória','k')).searchParams.get('t'),'k');assert.equal(new URL(mapUrl()).searchParams.get('z'),'8')});
