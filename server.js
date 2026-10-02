const http=require('http'),fs=require('fs'),path=require('path'); const PORT=3000, publicDir=path.join(__dirname,'public');
function send(res,status,type,body){res.writeHead(status,{'Content-Type':type});res.end(body)}
http.createServer((req,res)=>{
 if(req.method==='GET'&&req.url==='/api/courses') return send(res,200,'application/json',JSON.stringify([{id:1,title:'Математика',level:'5 класс'},{id:2,title:'Русский язык',level:'5 класс'}]));
 if(req.method==='POST'&&req.url==='/api/feedback'){let body='';req.on('data',c=>body+=c);req.on('end',()=>{try{const d=JSON.parse(body||'{}');if(!d.message||d.message.trim().length<3)return send(res,400,'application/json',JSON.stringify({error:'Message is too short'}));return send(res,201,'application/json',JSON.stringify({status:'created',message:d.message}))}catch{return send(res,400,'application/json',JSON.stringify({error:'Invalid JSON'}))}});return}
 let fp=req.url==='/'?path.join(publicDir,'index.html'):path.join(publicDir,req.url); if(!fp.startsWith(publicDir))return send(res,403,'text/plain','Forbidden'); fs.readFile(fp,(e,d)=>{if(e)return send(res,404,'text/plain','Not found');const ext=path.extname(fp);send(res,200,ext==='.css'?'text/css':ext==='.js'?'application/javascript':'text/html; charset=utf-8',d)})
}).listen(PORT,'127.0.0.1',()=>console.log('Demo app: http://127.0.0.1:'+PORT));
