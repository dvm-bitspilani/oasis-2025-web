import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';
async function walk(dir){let r=[];for(const e of await readdir(dir,{withFileTypes:true})){let p=dir+'/'+e.name;if(e.isDirectory())r.push(...await walk(p));else r.push(p)}return r}
const files=await walk('dist');for(const file of files)assert((await stat(file)).size<25*1024*1024,`Pages limit: ${file}`);
const html=await readFile('dist/index.html','utf8');assert(html.includes('oasis2025.bits-oasis.org'));assert(!/<script(?![^>]*src=)[^>]*>\s*[^<\s]/.test(html));
const headers=await readFile('dist/_headers','utf8');assert(!headers.includes('unsafe-eval'));assert(headers.split('\n').every(l=>l.length<2000));
for(const font of ['japanRamen','ShipporiMincho-Regular','AbhayaLibre-ExtraBold','IbarraRealNova-Regular','NoyagiDemo','TheLastShuriken'])assert(files.includes(`dist/fonts/${font}.woff2`));
const src=(await Promise.all((await walk('src')).filter(p=>/\.tsx?$/.test(p)).map(p=>readFile(p,'utf8')))).join('\n');assert(!/fetch\(|axios|localStorage|sessionStorage|useGoogleLogin|useCookies|redirectWithPost/.test(src),'Live backend/auth/storage remains');
console.log('Pages asset limits, CSP, canonical, local original fonts and absence of backend/auth/storage verified.');
