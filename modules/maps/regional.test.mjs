import {test} from "node:test";
import assert from "node:assert/strict";
import {regionalMap} from "./regional.mjs";
test("combina contagens e suprime grupos pequenos",()=>{
 assert.deepEqual(regionalMap([{uf:"ES",city:"Vitória",count:3},{uf:"es",city:"vitória",count:4},{uf:"ES",city:"Colatina",count:2}]),[{uf:"ES",city:"vitória",count:7}]);
});
test("rejeita redução do limiar",()=>assert.throws(()=>regionalMap([],{minimum:1})));
test("não retorna coordenadas ou identificadores",()=>assert.deepEqual(regionalMap([{uf:"ES",city:"Vitória",count:5,lat:1,userId:"fake"}]),[{uf:"ES",city:"Vitória",count:5}]));
