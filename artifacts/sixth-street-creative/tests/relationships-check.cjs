const {chromium}=require('playwright');
const {spawn}=require('child_process');
const assert=require('assert');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const seed=require(`${ROOT}/public/data/site-content.json`);
(async()=>{
 const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5176'],{cwd:ROOT,stdio:'pipe'});
 let browser;
 try{
  await new Promise((resolve,reject)=>{server.stdout.on('data',s=>{if(s.toString().includes('Local:'))resolve()});server.on('error',reject)});
  browser=await chromium.launch({headless:true, ...(process.env.CHROMIUM_EXECUTABLE_PATH ? {executablePath:process.env.CHROMIUM_EXECUTABLE_PATH} : {}), args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-zygote','--single-process']});
  const p=await browser.newPage(); const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.route('https://fonts.googleapis.com/**',r=>r.abort());
  let published;
  await p.route('https://api.github.com/repos/**',async route=>{
   const req=route.request(),url=new URL(req.url()),endpoint=url.pathname.replace('/repos/Melvinator32/blank-canvas-joy-595','');let data;
   if(endpoint.startsWith('/git/ref/'))data={object:{sha:'head'}};
   else if(endpoint==='/git/commits/head')data={tree:{sha:'tree'}};
   else if(endpoint.startsWith('/contents/'))data={content:Buffer.from(JSON.stringify(seed)).toString('base64')};
   else if(endpoint==='/git/blobs')data={sha:'photo'};
   else if(endpoint==='/git/trees'){published=JSON.parse(req.postDataJSON().tree.find(e=>e.path.endsWith('site-content.json')).content);data={sha:'new-tree'};}
   else if(endpoint==='/git/commits')data={sha:'new-head'};
   else if(req.method()==='PATCH')data={};
   else throw Error(endpoint);
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
  });
  await p.goto('http://127.0.0.1:5176/#/');
  await p.getByRole('button',{name:'Edit site',exact:true}).click();
  await p.getByRole('button',{name:'Add client',exact:true}).click();
  await p.getByLabel('Client 1 name',{exact:true}).fill('First Client');
  await p.getByLabel('Client 1 description',{exact:true}).fill('A thoughtful art collection.');
  await p.locator('.client-logo .image-edit-button').click();
  await p.locator('dialog input[type="file"]').setInputFiles(`${ROOT}/public/images/nashville-logo.webp`);
  await p.getByRole('button',{name:'Apply photo',exact:true}).click();
  await p.getByRole('button',{name:'Add client',exact:true}).click();
  await p.getByLabel('Client 2 name',{exact:true}).fill('Second Client');
  await p.getByRole('button',{name:'Move client 2 earlier',exact:true}).click();
  assert(await p.getByLabel('Client 1 name',{exact:true}).inputValue()==='Second Client');
  await p.getByRole('button',{name:'Remove client 1',exact:true}).click();
  assert(await p.getByLabel('Client 1 name',{exact:true}).inputValue()==='First Client');
  const group=p.locator('.artist-group').first();
  await group.getByRole('button',{name:'Add artist',exact:true}).click();
  const firstIndex=await group.locator('.artist-entry').count();
  await group.getByLabel(`Artist ${firstIndex}`,{exact:true}).fill('Remove Artist');
  await group.getByRole('button',{name:'Add artist',exact:true}).click();
  const entry=group.locator('.artist-entry').last();
  await entry.locator('input').fill('Keep Artist');
  await entry.getByRole('button',{name:'Add headshot or logo',exact:true}).click();
  await p.getByLabel('Photo URL',{exact:true}).fill('https://example.com/artist.png');
  await p.getByRole('button',{name:'Apply photo',exact:true}).click();
  await group.getByRole('button',{name:'Remove Remove Artist',exact:true}).click();
  assert(await group.locator('.artist-entry').last().locator('img').getAttribute('src')==='https://example.com/artist.png');
  await group.locator('.artist-entry').last().locator('input').fill('Renamed Artist');
  await p.getByRole('button',{name:'Close editor',exact:true}).click(); await p.getByRole('button',{name:'Edit site',exact:true}).waitFor({state:'visible'});
  await p.reload();await p.getByRole('button',{name:'Edit site',exact:true}).click();
  assert(await p.getByLabel('Client 1 name',{exact:true}).inputValue()==='First Client');
  assert(await group.locator('.artist-entry').last().locator('input').inputValue()==='Renamed Artist');
  for(const width of [320,820,1440]){
   await p.setViewportSize({width,height:950});
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Edit overflow ${width}`);
   await p.getByRole('button',{name:'Preview',exact:true}).click();
   assert(await p.locator('.client-card h3').innerText()==='First Client');
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Preview overflow ${width}`);
   await p.getByRole('button',{name:'Resume editing',exact:true}).click();
  }
  await p.getByRole('button',{name:'Publish',exact:true}).click();
  await p.getByLabel('GitHub publishing token').fill('github_pat_fake_test');
  await p.getByRole('button',{name:'Publish changes',exact:true}).click();
  await p.getByRole('status').filter({hasText:'Published to GitHub'}).waitFor();
  assert(published.clients.length===1 && published.clients[0].name==='First Client');
  assert(published.images[published.clients[0].imageId].src.startsWith('/images/uploads/'));
  const g=published.artistGroups[0];assert(g.artists.at(-1)==='Renamed Artist');assert(published.images[g.imageIds.at(-1)].src==='https://example.com/artist.png');
  assert(!errors.length,errors.join('\n'));
  console.log('PASS: clients add/edit/logo/reorder/remove, artist photo associations after deletion and rename, draft recovery, responsive edit/preview, and atomic publication with old content.');
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
