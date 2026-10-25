/* AgentProofBench: local interactions over the manuscript's fixed observations. */
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const C = { ink:'#172c3e', muted:'#64788b', blue:'#5271ae', blueSoft:'#eaf0f8', gold:'#c29442', goldSoft:'#fcf4e2', orange:'#ed9a59', red:'#d85b59', redSoft:'#fbeeed', line:'#dce4eb', other:'#c5d0dc' };
  const text = (x,y,s,size=13,fill=C.ink,weight=400,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" ${extra}>${s}</text>`;
  const roundRect = (x,y,w,h,fill='#fff',stroke=C.line,r=10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
  const check = (x,y,color=C.blue,size=9) => `<path d="M${x-size*.55} ${y}l${size*.4} ${size*.45} ${size*.85}-${size*.95}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cross = (x,y,color=C.red,size=6) => `<path d="m${x-size} ${y-size} ${size*2} ${size*2}m0-${size*2}-${size*2} ${size*2}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round"/>`;
  const badge = (x,y,id,r=13) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${id==='A'?C.goldSoft:C.blueSoft}" stroke="${id==='A'?'#dfc58e':'#9bb4d7'}"/>${text(x,y+4,id,12,id==='A'?'#997327':C.blue,500,'text-anchor="middle"')}`;
  const avatar = (x,y,color=C.blue) => `<circle cx="${x}" cy="${y-4}" r="3.4" fill="none" stroke="${color}" stroke-width="1.2"/><path d="M${x-6} ${y+7}v-1c0-7 12-7 12 0v1" fill="none" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/>`;
  const issue = (x,y,w,name,id) => `${roundRect(x,y,w,41,'#fff','#dbe4ec',6)}<circle cx="${x+16}" cy="${y+20}" r="5.3" fill="none" stroke="#8397ab" stroke-width="1.1"/>${text(x+31,y+24,name,12)}${badge(x+w-24,y+20,id,11)}`;
  const arrowDefs = `<defs><marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="${C.blue}" stroke-width="1.2"/></marker><marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="${C.red}" stroke-width="1.2"/></marker><marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="${C.gold}" stroke-width="1.2"/></marker></defs>`;
  let scene = 'source';

  function workspace(x,y,w,mobile=false) {
    const changed = scene !== 'source';
    const h = mobile ? 170 : 198;
    return `<g transform="translate(${x} ${y})">${roundRect(0,0,w,h,'#fbfcfd','#d7e1e9',11)}
      <path d="M0 28h${w}" stroke="#e2e9ee"/><circle cx="14" cy="14" r="2.4" fill="#ccd6df"/><circle cx="24" cy="14" r="2.4" fill="#ccd6df"/><circle cx="34" cy="14" r="2.4" fill="#ccd6df"/>${text(49,18,'Workspace / Teams',10,C.muted)}
      ${roundRect(13,43,w-26,42,changed?'#fafbfc':C.goldSoft,changed?'#e3e9ef':'#dcc592',7)}${avatar(30,63,changed?'#9babb8':'#a38245')}${text(47,68,changed?'Legacy':'Backend',13,changed?C.muted:C.ink,changed?400:500)}${badge(w-37,64,'A',11)}
      ${changed ? `${roundRect(13,95,w-26,42,C.blueSoft,'#a9beda',7)}${avatar(30,115)}${text(47,120,'Backend',13,C.ink,500)}${badge(w-37,116,'B',11)}` : `<path d="M22 106h${w-68}M22 119h${w-105}" stroke="#e5eaf0" stroke-width="5" stroke-linecap="round"/>`}
      ${text(16,h-14,`Name lookup → ${changed?'B':'A'}`,10,changed?C.blue:'#997327',500)}
    </g>`;
  }

  function outcome(x,y,w,mobile=false) {
    const id = scene === 'changed' ? 'B' : 'A';
    const h = mobile ? 135 : 157;
    return `<g transform="translate(${x} ${y})">${roundRect(0,0,w,h,'#fff','#d9e3eb',11)}${text(15,25,'Assigned team',10,C.muted)}${issue(13,37,w-26,'Epic issue',id)}${issue(13,85,w-26,'Redis issue',id)}${!mobile?text(16,146,scene==='replay'?'Earlier decision, replayed':'Result after the task',9,C.muted):''}</g>`;
  }

  function verifier(x,y,w,mobile=false) {
    const h=mobile?169:198, pass=scene!=='changed', valid=scene!=='replay';
    return `<g transform="translate(${x} ${y})">${roundRect(0,0,w,h,'#fafbfd','#d7e1e9',11)}
      <path d="M18 19v-4c0-8 12-8 12 0v4m-13 0h14v11H17z" fill="none" stroke="#7e93a9" stroke-width="1.4" stroke-linejoin="round"/>${text(41,27,'Frozen source program',11,C.ink,500)}
      ${roundRect(13,43,w-26,38,'#edf1f6','none',6)}${text(25,67,'expected_team = A',13,'#627993',400,'font-family="ui-monospace,monospace"')}
      ${text(17,108,'Verifier',11,C.muted)}${pass?check(w-88,103,C.blue,8):cross(w-88,103,C.red,5)}${text(w-71,108,pass?'PASS':'REJECT',11,pass?C.blue:C.red,500)}
      <path d="M16 122h${w-32}" stroke="#e0e7ed"/>${text(17,148,'Reference',11,C.muted)}${valid?check(w-88,143,C.blue,8):cross(w-88,143,C.red,5)}${text(w-71,148,valid?'Correct':'Failure',11,valid?C.blue:C.red,500)}
      ${!mobile?text(16,184,'The code is identical across all three views.',9,C.muted):''}
    </g>`;
  }

  function drawRequirement(mobile=false) {
    const color=scene==='replay'?C.red:C.blue;
    const label=scene==='replay'?'Replay the old choice':'Resolve the current name';
    if (mobile) return `<svg class="mobile-scene" viewBox="0 0 340 675" role="img" aria-label="${scene==='source'?'Source workspace: Backend is team A. Assigning both issues to A passes the frozen check and the reference.':scene==='changed'?'Changed workspace: Backend is team B. Correctly assigning both issues to B is rejected by the frozen program, which expects A.':'Changed workspace: Backend is team B. Replaying the old assignment to A passes the frozen program and fails the reference.'}">${arrowDefs}
      ${text(17,23,'CURRENT INITIAL STATE',9,C.muted,500,'letter-spacing="1.2"')}${workspace(15,34,310,true)}
      <path d="M169 211C149 219 149 235 169 245" fill="none" stroke="${color}" stroke-width="1.4" marker-end="url(#arrow-${scene==='replay'?'red':'blue'})"/>${text(184,230,label,9,color)}
      ${text(17,266,'TERMINAL OUTCOME',9,C.muted,500,'letter-spacing="1.2"')}${outcome(15,279,310,true)}
      <path d="M169 422C150 431 150 447 169 455" fill="none" stroke="${C.blue}" stroke-width="1.4" marker-end="url(#arrow-blue)"/>${text(184,443,'Apply the same check',9,C.muted)}
      ${text(17,476,'ACCEPTANCE DECISION',9,C.muted,500,'letter-spacing="1.2"')}${verifier(15,489,310,true)}
    </svg>`;
    return `<svg class="desktop-scene" viewBox="0 0 1160 310" role="img" aria-label="${scene==='source'?'The source Backend team has identity A. The outcome matches both the frozen verifier and reference.':scene==='changed'?'The current Backend team has identity B. A correct assignment to B fails the frozen check for A.':'Replaying an assignment to the old identity A passes the frozen verifier while failing the current reference.'}">${arrowDefs}
      <ellipse cx="177" cy="158" rx="173" ry="126" fill="#f5f8fb"/><ellipse cx="974" cy="158" rx="176" ry="127" fill="#f5f8fb"/>
      ${text(28,31,'CURRENT INITIAL STATE',10,C.muted,500,'letter-spacing="1.5"')}${text(438,31,'TERMINAL OUTCOME',10,C.muted,500,'letter-spacing="1.5"')}${text(827,31,'ACCEPTANCE DECISION',10,C.muted,500,'letter-spacing="1.5"')}
      <path d="M340 153C382 109 393 109 431 145" fill="none" stroke="${color}" stroke-width="1.5" marker-end="url(#arrow-${scene==='replay'?'red':'blue'})"/><path d="M706 144C752 191 776 191 817 153" fill="none" stroke="${C.blue}" stroke-width="1.5" marker-end="url(#arrow-blue)"/>
      ${workspace(25,49,310)}${outcome(438,69,267)}${verifier(824,49,310)}
      ${text(385,270,label,10,color,400,'text-anchor="middle"')}${text(764,270,'Apply the same check',10,C.muted,400,'text-anchor="middle"')}
    </svg>`;
  }
  function updateScene(value) {
    scene=value;
    $$('[data-scene]').forEach(b=>{const active=b.dataset.scene===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $('#requirement-scene').innerHTML=drawRequirement(false).replaceAll('arrow-','requirement-desktop-arrow-')+drawRequirement(true).replaceAll('arrow-','requirement-mobile-arrow-');
    $('#scene-explanation').textContent={source:'The name Backend resolves to team A. The correct result and the frozen check agree.',changed:'Backend now resolves to B. A correct result is rejected because the program retains A.',replay:'The old decision assigns both issues to A. The frozen program accepts it; the current requirement fails.'}[value];
    $('.scene-status-dot').style.background=value==='source'?C.blue:C.red;
  }
  $$('[data-scene]').forEach(b=>b.addEventListener('click',()=>updateScene(b.dataset.scene)));
  updateScene('source');

  $$('.assignment-glyphs').forEach(container=>{
    const total=container.id==='perfect-assignments'?33:11, correct=container.id==='perfect-assignments'?32:1;
    container.innerHTML=Array.from({length:total},(_,i)=>`<span class="assignment-glyph ${i>=correct?'other':''}" title="Assignment ${i+1}: ${i<correct?'both openings correctly delivered':'other delivery outcome'}" aria-hidden="true"><i></i><i></i></span>`).join('');
  });

  $$('[data-acceptance]').forEach(button=>button.addEventListener('click',()=>{
    const valid=button.dataset.acceptance==='valid', values=valid?[77.8,98.6]:[3.5,31.7];
    $$('[data-acceptance]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $('#program-bar').style.width=`${values[0]}%`;$('#online-bar').style.width=`${values[1]}%`;
    $('#program-value').innerHTML=`${values[0]}<span>%</span>`;$('#online-value').innerHTML=`${values[1]}<span>%</span>`;
    $('#acceptance-metric').textContent=valid?'Valid anchors accepted':'Failures accepted';
    $('#acceptance-direction').textContent=valid?'Higher is better':'Lower is better';
    $('.comparison-bars').setAttribute('aria-label',`${valid?'Valid acceptance':'False acceptance'}: program B12 ${values[0]} percent; online API12 ${values[1]} percent`);
    $('#acceptance-takeaway').innerHTML=valid?'<strong>77.8% of valid anchors</strong> are accepted by programs, compared with 98.6% by the online judge.':'<strong>28.2 percentage points</strong> lower false acceptance on matched collection failures.';
  }));

  const modelData={flash:{counts:[89,83,82],interval:'[−5.47, +1.57]'},pro:{counts:[83,81,79],interval:'[−10.16, 0.00]'}};
  function drawRing(count,label,note,index) {
    const cx=110,cy=109,r=83,segments=96;
    const paths=Array.from({length:segments},(_,i)=>{
      const a=(-90+i/segments*360+0.65)*Math.PI/180,b=(-90+(i+1)/segments*360-0.65)*Math.PI/180;
      return `<path d="M${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)}A${r} ${r} 0 0 1 ${cx+r*Math.cos(b)} ${cy+r*Math.sin(b)}" fill="none" stroke="${i<count?C.blue:'#e4ebf2'}" stroke-width="9"/>`;
    }).join('');
    return `<div class="ring-unit"><svg viewBox="0 0 220 213" role="img" aria-label="${label}: ${count} of 96 programs fully correct">${paths}${text(cx,cy+2,count,47,C.blue,400,'text-anchor="middle" letter-spacing="-2"')}${text(cx,cy+27,'of 96 programs',11,C.muted,400,'text-anchor="middle" class="ring-denominator"')}<text x="110" y="137" text-anchor="middle" class="ring-denominator-mobile" font-size="22" fill="${C.muted}"><tspan x="110">of 96</tspan><tspan x="110" dy="22">programs</tspan></text>${text(cx,cy+46,`0${index+1}`,9,'#8da0b3',500,'text-anchor="middle" class="ring-index"')}</svg><h3>${label}</h3><p>${note}</p></div>`;
  }
  function updateModel(model) {
    $$('[data-model]').forEach(b=>{const active=b.dataset.model===model;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    const d=modelData[model];
    $('#reuse-rings').innerHTML=drawRing(d.counts[0],'Source panel','Construction-state outcomes',0)+drawRing(d.counts[1],'Related panel','A changed required identity or value',1)+drawRing(d.counts[2],'Joint pass','Related panel + replay witness',2);
    $('#reuse-transition').textContent=model==='pro'?'Source → related: 80 remain fully correct; 1 becomes correct; 3 acquire a panel error.':'Source → related: 83 remain fully correct; 6 acquire a panel error.';
    $('#reuse-interval').innerHTML=`${d.interval} <small>pp</small>`;
  }
  $$('[data-model]').forEach(b=>b.addEventListener('click',()=>updateModel(b.dataset.model)));
  updateModel('flash');

  let policy='neutral';
  function drawBranch(mobile=false) {
    const gate=policy==='gate', tone=gate?C.red:C.gold, arrow=gate?'red':'gold';
    const node=(x,y,w,title,final=false)=>`<g transform="translate(${x} ${y})">${roundRect(0,0,w,110,'#fff','#dce5ed',10)}${text(15,25,title,11,C.muted)}${badge(34,58,final&&gate?'A':'B',15)}${text(62,56,final&&gate?'Legacy team':'Backend team',14,C.ink,500)}${text(62,76,'Both issues assigned',10,C.muted)}${final&&gate?cross(w-26,57,C.red,6):check(w-26,57,C.blue,10)}${text(15,98,final&&gate?'Reference failure · gate PASS':'Reference correct',10,final&&gate?C.red:C.blue,500)}</g>`;
    const middle=(x,y,w)=>`<g transform="translate(${x} ${y})">${roundRect(0,0,w,110,gate?'#fcf0ef':'#fcf7eb','none',10)}${text(w/2,30,gate?'Generic rejection':'Neutral continuation',12,tone,500,'text-anchor="middle"')}${text(w/2,57,gate?'Outcome not accepted':'Preserve valid work',12,C.ink,400,'text-anchor="middle"')}${text(w/2,82,gate?'2 issue updates':'0 mutating requests',11,C.muted,400,'text-anchor="middle"')}</g>`;
    if (mobile) return `<svg class="mobile-scene" viewBox="0 0 325 517" role="img" aria-label="${gate?'Correct assignment to Backend B, generic rejection, two updates to Legacy A, then an incorrect delivered result that the gate accepts.':'Correct assignment to Backend B, neutral continuation with no mutations, and correct delivery.'}">${arrowDefs}${text(12,21,'SAVED OPENING',9,C.muted,500,'letter-spacing="1"')}${node(12,33,301,'Correct completed work')}
      <path d="M162 151C146 164 146 179 162 190" fill="none" stroke="${tone}" stroke-width="1.4" marker-end="url(#arrow-${arrow})"/>
      ${middle(12,201,301)}<path d="M162 320C146 333 146 348 162 359" fill="none" stroke="${tone}" stroke-width="1.4" marker-end="url(#arrow-${arrow})"/>${text(12,385,'DELIVERED RESULT',9,C.muted,500,'letter-spacing="1"')}${node(12,397,301,gate?'Changed to the old identity':'Preserved current identity',true)}</svg>`;
    return `<svg class="desktop-scene" viewBox="0 0 1110 208" role="img" aria-label="${gate?'The program gate rejects correct Backend B, two updates move the issues to Legacy A, and the gate passes the incorrect result.':'Neutral continuation preserves correct Backend B and makes no mutating requests.'}">${arrowDefs}${text(15,23,'SAVED OPENING',10,C.muted,500,'letter-spacing="1.1"')}${text(414,23,'CONTINUATION',10,C.muted,500,'letter-spacing="1.1"')}${text(808,23,'DELIVERED RESULT',10,C.muted,500,'letter-spacing="1.1"')}
      <path d="M297 102C340 51 366 51 410 102M700 102C744 152 763 152 803 102" fill="none" stroke="${tone}" stroke-width="1.6" marker-end="url(#arrow-${arrow})"/>
      ${node(15,49,280,'Correct completed work')}${middle(414,49,282)}${node(808,49,287,gate?'Changed to the old identity':'Preserved current identity',true)}
    </svg>`;
  }
  function updatePolicy(value) {
    policy=value;
    $$('[data-policy]').forEach(b=>{const active=b.dataset.policy===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    $('#branch-scene').innerHTML=drawBranch(false).replaceAll('arrow-','branch-desktop-arrow-')+drawBranch(true).replaceAll('arrow-','branch-mobile-arrow-');
    $('#branch-caption').textContent=value==='neutral'?'Neutral continuation preserves the correct assignment to the current Backend team.':'The program gate rejects the correct state. The actor changes both issues to the old team, and the gate accepts the resulting failure.';
  }
  $$('[data-policy]').forEach(b=>b.addEventListener('click',()=>updatePolicy(b.dataset.policy)));
  updatePolicy('neutral');

  /* Means below are copied from the matched P2 cost table, retaining its complete-usage support. */
  const costs={
  "flash-natural": {
    "cold": 0.13955161272727273,
    "warm": 0.006157155863636363,
    "online": 0.026727963,
    "neutral": 0.007044305545454546,
    "program_n": 22,
    "online_n": 21
  },
  "flash-checkpoint": {
    "cold": 0.1389940456818182,
    "warm": 0.005599588818181817,
    "online": 0.05510145959090909,
    "neutral": 0.005997795590909091,
    "program_n": 22,
    "online_n": 22
  },
  "pro-natural": {
    "cold": 0.1562887703181818,
    "warm": 0.039170433772727276,
    "online": 0.04666849895454546,
    "neutral": 0.032396589545454546,
    "program_n": 22,
    "online_n": 22
  },
  "pro-checkpoint": {
    "cold": 0.15321037031818183,
    "warm": 0.036092033772727274,
    "online": 0.0741902399090909,
    "neutral": 0.027952971818181818,
    "program_n": 22,
    "online_n": 22
  }
};
  function updateCost() {
    const key=$('#cost-cohort').value,d=costs[key],k=Number($('#reuse-count').value),C0=d.cold-d.warm;
    const value=d.warm+C0/k;
    $('#cost-value').textContent=`$${value.toFixed(4)}`;$('#cost-use-label').textContent=k;$('#reuse-count-output').textContent=k;
    $('#cost-support').textContent=`${d.program_n} program / ${d.online_n} online fee records.`;
    const mobile=window.matchMedia('(max-width: 560px)').matches;
    const w=mobile?340:565,h=mobile?204:224,left=mobile?48:43,right=mobile?328:547,top=20,bottom=mobile?166:188,max=.18;
    const axisFont=mobile?13:9;
    const x=v=>left+(v-1)/39*(right-left),y=v=>bottom-v/max*(bottom-top);
    const curve=Array.from({length:157},(_,i)=>{const t=1+i/4;return `${i?'L':'M'}${x(t).toFixed(2)} ${y(d.warm+C0/t).toFixed(2)}`;}).join(' ');
    const ticks=[0,.05,.1,.15].map(v=>`<path d="M${left} ${y(v)}H${right}" stroke="#e8edf2"/>${text(left-9,y(v)+3,`$${v.toFixed(2)}`,axisFont,C.muted,400,'text-anchor="end"')}`).join('');
    const xticks=[1,10,20,30,40].map(v=>`${text(x(v),bottom+19,v,axisFont,C.muted,400,'text-anchor="middle"')}`).join('');
    $('#cost-chart').innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Calculated mean policy fees for ${key.replace('-',' ')}, from one through forty uses. At ${k} uses the program-gate fee is ${value.toFixed(4)} dollars.">${ticks}<path d="M${left} ${y(d.online)}H${right}" stroke="${C.orange}" stroke-width="1.7" stroke-dasharray="4 4"/><path d="M${left} ${y(d.neutral)}H${right}" stroke="${C.gold}" stroke-width="1.7" stroke-dasharray="2 3"/><path d="${curve}" fill="none" stroke="${C.blue}" stroke-width="2.5"/><path d="M${x(k)} ${top}V${bottom}" stroke="#a4b8d0" stroke-dasharray="3 4"/><circle cx="${x(k)}" cy="${y(value)}" r="5" fill="${C.blue}" stroke="#fff" stroke-width="2"/>${xticks}${text(right,bottom+35,'uses',mobile?13:8,C.muted,400,'text-anchor="end"')}</svg>`;
  }
  $('#reuse-count').addEventListener('input',updateCost);$('#cost-cohort').addEventListener('change',updateCost);window.matchMedia('(max-width: 560px)').addEventListener('change',updateCost);updateCost();

  const menu=$('.menu-toggle'),nav=$('#main-nav');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open);});
  $$('#main-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
  const navSections=['acceptance','reuse','execution','figures'].map(id=>document.getElementById(id));
  function scrollProgress(){
    const available=document.documentElement.scrollHeight-window.innerHeight;
    $('.reading-progress span').style.width=`${available>0?window.scrollY/available*100:0}%`;
    const threshold=window.scrollY+Math.min(window.innerHeight*.3,230);
    const current=navSections.filter(section=>section.offsetTop<=threshold).at(-1);
    $$('#main-nav a[href^="#"]').forEach(a=>a.classList.toggle('active',!!current&&a.hash===`#${current.id}`));
  }
  window.addEventListener('scroll',scrollProgress,{passive:true});
  window.addEventListener('resize',scrollProgress,{passive:true});
  scrollProgress();

  const cards=$$('.figure-card'),dialog=$('#figure-dialog');let activeCard=0,zoom=1,lastTrigger=null;
  function filterFigures(category) {
    $$('[data-filter]').forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
    cards.forEach(card=>card.hidden=category!=='all'&&card.dataset.category!==category);
  }
  $$('[data-filter]').forEach(b=>b.addEventListener('click',()=>filterFigures(b.dataset.filter)));
  $$('[data-filter-link]').forEach(a=>a.addEventListener('click',()=>filterFigures(a.dataset.filterLink)));
  function setZoom(value) {zoom=Math.max(1,Math.min(3,value));$('#dialog-image').style.width=`${zoom*100}%`;$('#zoom-reset').textContent=`${Math.round(zoom*100)}%`;$('#zoom-out').disabled=zoom===1;$('#zoom-in').disabled=zoom===3;}
  function showFigure(index) {
    activeCard=index;const card=cards[index];$('#dialog-title').textContent=card.dataset.title;$('#dialog-image').src=card.dataset.image;$('#dialog-image').alt=$('img',card).alt;$('#dialog-caption').textContent=card.dataset.caption;$('#open-svg').href=card.dataset.image;setZoom(1);$('.dialog-viewport').scrollTo(0,0);
  }
  function openFigure(index){lastTrigger=cards[index];showFigure(index);dialog.showModal();document.body.classList.add('dialog-open');$('#close-dialog').focus();}
  function closeFigure(){dialog.close();document.body.classList.remove('dialog-open');if(lastTrigger)lastTrigger.focus();}
  function stepFigure(offset){const visible=cards.map((card,index)=>!card.hidden?index:-1).filter(i=>i>=0);const current=visible.indexOf(activeCard);showFigure(visible[(current+offset+visible.length)%visible.length]);}
  cards.forEach((c,i)=>c.addEventListener('click',()=>openFigure(i)));$('#close-dialog').addEventListener('click',closeFigure);$('#next-figure').addEventListener('click',()=>stepFigure(1));$('#previous-figure').addEventListener('click',()=>stepFigure(-1));$('#zoom-in').addEventListener('click',()=>setZoom(zoom+.25));$('#zoom-out').addEventListener('click',()=>setZoom(zoom-.25));$('#zoom-reset').addEventListener('click',()=>setZoom(1));
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeFigure();});
  dialog.addEventListener('click',e=>{if(e.target===dialog)closeFigure();});
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();stepFigure(1);}if(e.key==='ArrowLeft'){e.preventDefault();stepFigure(-1);}if(e.key==='+'||e.key==='='){e.preventDefault();setZoom(zoom+.25);}if(e.key==='-'){e.preventDefault();setZoom(zoom-.25);}if(e.key==='0'){e.preventDefault();setZoom(1);}});

  $('#copy-bibtex').addEventListener('click',async()=>{
    const button=$('#copy-bibtex'),content=$('#bibtex').textContent;
    try { await navigator.clipboard.writeText(content); }
    catch (_) { const field=document.createElement('textarea');field.value=content;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();const copied=document.execCommand('copy');field.remove();if(!copied){$('#copy-status').textContent='Select the citation text to copy it.';return;} }
    button.textContent='Copied';$('#copy-status').textContent='BibTeX citation copied to clipboard.';setTimeout(()=>{button.innerHTML='Copy BibTeX <span aria-hidden="true">⧉</span>';},2000);
  });
})();
