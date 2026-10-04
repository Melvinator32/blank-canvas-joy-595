const {chromium}=require('playwright');const {spawn}=require('child_process');const assert=require('assert');const fs=require('fs');
const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const seed=JSON.parse(fs.readFileSync(`${ROOT}/public/data/site-content.json`,'utf8'));
const origin='http://127.0.0.1:5175';
(async()=>{
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','5175'],{cwd:ROOT,stdio:'pipe'});
try {
 await new Promise((resolve,reject)=>{server.stdout.on('data',s=>{if(s.toString().includes('Local:'))resolve()});server.on('error',reject)});
 const browser=await chromium.launch({...(process.env.CHROMIUM_EXECUTABLE_PATH ? {executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-zygote','--single-process']} : {}),headless:true});const p=await browser.newPage();
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://fonts.googleapis.com/**',r=>r.abort());
 let mode='success',remote=structuredClone(seed),writes=[];
 await p.route('https://api.github.com/repos/**',async route=>{
  const req=route.request(),url=new URL(req.url()),path=url.pathname.replace('/repos/Melvinator32/blank-canvas-joy-595',''),method=req.method();
  if(mode==='unauthorized'){await route.fulfill({status:401,contentType:'application/json',body:'{}'});return;}
  if(mode==='permission' && method==='POST'){await route.fulfill({status:403,contentType:'application/json',body:'{}'});return;}
  let data;
  if(path.startsWith('/git/ref/')) data={object:{sha:'test-head'}};
  else if(path==='/git/commits/test-head')data={tree:{sha:'test-base-tree'}};
  else if(path.startsWith('/contents/'))data={encoding:'base64',content:Buffer.from(JSON.stringify(remote)).toString('base64')};
  else if(method==='POST' && path==='/git/blobs'){writes.push({path,body:req.postDataJSON()});data={sha:'test-photo-blob'};}
  else if(method==='POST' && path==='/git/trees'){writes.push({path,body:req.postDataJSON()});data={sha:'test-tree'};}
  else if(method==='POST' && path==='/git/commits'){writes.push({path,body:req.postDataJSON()});data={sha:'test-new-commit'};}
  else if(method==='PATCH'){writes.push({path,body:req.postDataJSON()});if(mode==='race'){await route.fulfill({status:422,contentType:'application/json',body:'{}'});return;}data={object:{sha:'test-new-commit'}};}
  else throw new Error(`Unexpected mocked API ${method} ${path}`);
  await route.fulfill({status:method==='POST'?201:200,contentType:'application/json',body:JSON.stringify(data)});
 });
 const launch=async()=>{await p.getByRole('button',{name:'Edit site',exact:true}).click();};
 const title=()=>p.locator('[data-field="home.title"]');
 const saved=async(text)=>{await p.waitForFunction(async expected=>{const db=await new Promise((resolve,reject)=>{const q=indexedDB.open('sixth-street-editor',1);q.onsuccess=()=>resolve(q.result);q.onerror=reject;});const value=await new Promise((resolve,reject)=>{const t=db.transaction('drafts');const q=t.objectStore('drafts').get('site');q.onsuccess=()=>resolve(q.result);q.onerror=reject;});db.close();return value?.content.text['home.title']===expected},text)};
 await p.goto(`${origin}/#/`);await launch();await title().fill('A newly edited studio');await saved('A newly edited studio');
 assert(await title().innerText()==='A newly edited studio');
 await p.getByRole('button',{name:'Undo',exact:true}).click();assert(await title().innerText()===seed.text['home.title']);
 await p.getByRole('button',{name:'Redo',exact:true}).click();assert(await title().innerText()==='A newly edited studio');
 await p.getByRole('button',{name:'Preview',exact:true}).click();assert(await p.locator('[contenteditable]').count()===0);assert(await p.locator('.hero h1').innerText().then(s=>s.includes('A newly edited studio')));
 await p.getByRole('button',{name:'Resume editing',exact:true}).click();
 await p.getByLabel('Page to edit').selectOption('#/about');await p.locator('[data-field="journey.collective.name"]').fill('Nashville Collective edited');
 await p.locator('[data-image="journey.collective.logo"] button').click();await p.getByLabel('Image description',{exact:true}).fill('Updated Nashville logo');await p.getByRole('button',{name:'Apply photo'}).click();
 await p.getByLabel('Page to edit').selectOption('#/portfolio');
 const gallery=p.locator('.portfolio-row').first();assert(await gallery.locator('.gallery-photo').count()===4);
 await gallery.getByRole('button',{name:'Add photo',exact:true}).click();await p.locator('dialog input[type="file"]').setInputFiles(`${ROOT}/public/images/nashville-logo.webp`);await p.getByRole('button',{name:'Apply photo'}).click();assert(await gallery.locator('.gallery-photo').count()===5);
 await gallery.getByRole('button',{name:'Move photo 5 earlier',exact:true}).click();
 await gallery.getByRole('button',{name:'Remove photo 1',exact:true}).click();assert(await gallery.locator('.gallery-photo').count()===4);
 await p.getByLabel('Page to edit').selectOption('#/');await p.getByRole('button',{name:'Add artist',exact:true}).click();await p.getByLabel('Artist 1',{exact:true}).fill('Test Artist');
 await saved('A newly edited studio');
 await p.getByRole('button',{name:'Close editor',exact:true}).click();await p.getByRole('button',{name:'Edit site',exact:true}).waitFor();assert(await p.locator('.hero h1').textContent().then(s=>s.includes(seed.text['home.title'])));
 await p.reload();await launch();assert(await title().innerText()==='A newly edited studio');assert(await p.getByLabel('Artist 1',{exact:true}).inputValue()==='Test Artist');
 // Untrusted text stays plain text; edits do not inject markup.
 await title().fill('<img src=x onerror="window.editorXss=true">');assert(await title().locator('img').count()===0);assert(await p.evaluate(()=>window.editorXss)===undefined);await p.getByRole('button',{name:'Undo',exact:true}).click();
 // Inspect all three pages in edit and preview modes at phone, tablet, desktop widths.
 for(const width of [320,390,820,1440]) {
  await p.setViewportSize({width,height:950});
  for(const hash of ['#/','#/about','#/portfolio']){
   await p.getByLabel('Page to edit').selectOption(hash);await p.waitForURL(`**/${hash}`);
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow editing ${width} ${hash}`);
   await p.getByRole('button',{name:'Preview',exact:true}).click();assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow preview ${width} ${hash}`);await p.getByRole('button',{name:'Resume editing',exact:true}).click();
  }
 }
 await p.setViewportSize({width:1440,height:1000});await p.getByLabel('Page to edit').selectOption('#/about');await p.screenshot({path:require('path').join(require('os').tmpdir(),'sixth-street-editor-desktop.png')});
 await p.setViewportSize({width:390,height:844});await p.screenshot({path:require('path').join(require('os').tmpdir(),'sixth-street-editor-phone.png')});
 // Invalid token and read-only token failures preserve drafts and never claim success.
 await p.getByRole('button',{name:'Publish',exact:true}).click();await p.getByLabel('GitHub publishing token').fill('github_pat_fake_test_only');mode='unauthorized';await p.getByRole('button',{name:'Publish changes',exact:true}).click();await p.getByRole('alert').filter({hasText:'invalid or expired'}).waitFor();assert(writes.length===0);
 mode='permission';await p.getByRole('button',{name:'Publish changes',exact:true}).click();await p.getByRole('alert').filter({hasText:'Publishing is blocked'}).waitFor();assert(writes.length===0);
 // Another editor's newer content stops writes before upload.
 mode='success';remote.text['home.title']='Someone else published';await p.getByRole('button',{name:'Publish changes',exact:true}).click();await p.getByRole('alert').filter({hasText:'Someone has published a newer version'}).waitFor();assert(writes.length===0);remote=structuredClone(seed);
 // Complete mocked publication creates image+content tree, then a non-forced branch update.
 await p.getByRole('button',{name:'Publish changes',exact:true}).click();await p.getByRole('status').filter({hasText:'Published to GitHub'}).waitFor();
 const tree=writes.find(x=>x.path==='/git/trees').body;assert(tree.base_tree==='test-base-tree');assert(tree.tree.length===2);assert(tree.tree.some(e=>e.path.includes('/public/images/uploads/') && e.sha==='test-photo-blob'));
 const final=JSON.parse(tree.tree.find(e=>e.path.endsWith('site-content.json')).content);assert(final.text['home.title']==='A newly edited studio');assert(final.text['journey.collective.name']==='Nashville Collective edited');assert(final.artistGroups[0].artists[0]==='Test Artist');assert(final.galleries.residential.length===4);assert(Object.values(final.images).every(i=>!i.src.startsWith('data:')));
 assert(writes.at(-1).body.force===false);assert(writes.at(-1).body.sha==='test-new-commit');
 assert(await p.evaluate(()=>JSON.stringify({...localStorage,...sessionStorage}).includes('github_pat_fake_test_only'))===false);
 // A branch race is rejected with force:false and leaves the new draft intact.
 remote=structuredClone(final);mode='race';writes=[];
 await p.locator('[data-field="journey.title"]').fill('New journey draft');
 await p.getByRole('button',{name:'Publish',exact:true}).click();await p.getByRole('button',{name:'Publish changes',exact:true}).click();
 await p.getByRole('alert').filter({hasText:'changed while you were publishing'}).waitFor();
 assert(writes.at(-1).body.force===false);assert(await p.locator('[data-field="journey.title"]').innerText()==='New journey draft');
 await p.getByRole('button',{name:'Keep editing',exact:true}).click();
 // Invalid imports preserve content; valid imports can be previewed and discarded.
 await p.locator('.editor-more summary').click();
 await p.locator('.editor-more input[type="file"]').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"version":1}')});
 await p.getByRole('status').filter({hasText:'not a valid Sixth Street Creative draft'}).waitFor();assert(await p.locator('[data-field="journey.title"]').innerText()==='New journey draft');
 const imported=structuredClone(final);imported.text['journey.title']='Imported journey';
 await p.locator('.editor-more input[type="file"]').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(imported))});
 assert(await p.locator('[data-field="journey.title"]').innerText()==='Imported journey');
 await p.locator('.editor-more').getByRole('button',{name:'Discard draft',exact:true}).click();
 await p.locator('dialog').getByRole('button',{name:'Discard draft',exact:true}).click();await p.locator('dialog').waitFor({state:'hidden'});
 assert(await p.locator('[data-field="journey.title"]').innerText()===final.text['journey.title']);
 assert(!errors.length,errors.join('\n'));
 await browser.close();console.log('PASS: inline edits, undo/redo, preview, IndexedDB draft recovery, multi-page editing, image upload/reorder/removal, artists, 24 responsive states, plain-text safety, invalid token, permissions, conflict protection, atomic publishing, non-forced branch races, and import validation (mocked GitHub).');
}finally {server.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
