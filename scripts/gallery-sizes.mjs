import sharp from 'sharp';
import {readdir,mkdir} from 'node:fs/promises';
await mkdir('public/images/gallery/responsive',{recursive:true});
for(const file of await readdir('public/images/gallery')){
 if(!file.startsWith('gallery_') || !file.endsWith('.webp')) continue;
 for(const width of [400,800]) await sharp('public/images/gallery/'+file).resize({width,withoutEnlargement:true}).webp({quality:80}).toFile('public/images/gallery/responsive/'+file.replace('.webp',`-${width}.webp`));
}

for (const width of [1600,800]) await sharp("public/images/landing/background1.webp").resize({width}).webp({quality:78}).toFile(`public/images/gallery/background-${width}.webp`);
