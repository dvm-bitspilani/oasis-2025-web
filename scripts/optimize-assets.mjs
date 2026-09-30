import sharp from 'sharp';
import {readdir,readFile,writeFile,stat,unlink} from 'node:fs/promises';
async function walk(dir){let r=[];for(const e of await readdir(dir,{withFileTypes:true})){let p=dir+'/'+e.name;if(e.isDirectory())r.push(...await walk(p));else r.push(p)}return r}
const sources=[...await walk('src'),'index.html'];const sourceTexts=new Map(await Promise.all(sources.filter(x=>/\.(tsx?|scss|css|html)$/.test(x)).map(async p=>[p,await readFile(p,'utf8')])));
let report=[];
for(const file of await walk('public')){
 if(file.endsWith('.svg')&&(await stat(file)).size>600000){let s=await readFile(file,'utf8');const before=Buffer.byteLength(s);const matches=[...s.matchAll(/data:image\/(png|jpeg);base64,([A-Za-z0-9+/=\s]+)/g)];for(const m of matches){const b=await sharp(Buffer.from(m[2],'base64')).resize({width:3200,withoutEnlargement:true}).webp({quality:88}).toBuffer();s=s.replace(m[0],'data:image/webp;base64,'+b.toString('base64'))}await writeFile(file,s);report.push({file,before,after:Buffer.byteLength(s)});}
 if(/\.(png|jpe?g)$/i.test(file)&&(await stat(file)).size>250000){
 const before=(await stat(file)).size;const out=file.replace(/\.(png|jpe?g)$/i,'.webp');const width=file.includes('/contact/')?640:file.includes('/gallery/')?1600:3200;
 await sharp(file).resize({width,withoutEnlargement:true}).webp({quality:88}).toFile(out);
 const originalUrl=file.slice(6),newUrl=out.slice(6);
 for(const [source,s] of sourceTexts){sourceTexts.set(source,s.split(originalUrl).join(newUrl))}
 report.push({file,before,after:(await stat(out)).size});await unlink(file);
 }
}
for(const [source,s] of sourceTexts)await writeFile(source,s);
await writeFile('evidence/assets.json',JSON.stringify(report,null,2));
