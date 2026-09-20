const parts=['app-parts/app-00.txt','app-parts/app-01.txt','app-parts/app-02.txt','app-parts/app-03.txt','app-parts/app-04.txt','app-parts/app-05.txt'];
const responses=await Promise.all(parts.map(p=>fetch(p)));
if(responses.some(r=>!r.ok)) throw new Error('Dashboard code failed to load.');
const code=(await Promise.all(responses.map(r=>r.text()))).join('');
const url=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));
try{await import(url)}finally{URL.revokeObjectURL(url)}
