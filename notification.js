import { db, ref, onValue, update } from "./firebase.js";

const notifyRef = ref(db,"notifications");
let all = [];
let lastImportant = 0;

/* SOUND */
const impSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);

/* LOAD */
onValue(notifyRef,(snap)=>{
  all=[];
  let unseen=0, importantCount=0;

  snap.forEach(c=>{
    const d={ key:c.key, ...c.val() };
    if(!d.seen) unseen++;
    if(d.important && !d.seen) importantCount++;
    all.push(d);
  });

  /* SOUND */
  if(importantCount>lastImportant){
    impSound.play().catch(()=>{});
  }
  lastImportant=importantCount;

  /* BADGE */
  const badge=document.getElementById("notifyCount");
  if(unseen>0){
    badge.innerText=unseen;
    badge.style.display="block";
  }else{
    badge.style.display="none";
  }
});

/* OPEN */
window.openNotify=()=>{
  const impBox=document.getElementById("importantBox");
  const list=document.getElementById("notifyList");
  impBox.innerHTML="";
  list.innerHTML="";

  const imp=all.filter(n=>n.important);
  const normal=all.filter(n=>!n.important);

  imp.forEach(n=>{
    impBox.innerHTML+=`
      <div class="notify-item important">
        <b>${n.text}<span class="notify-badge">IMPORTANT</span></b><br>
        <small>${n.time}</small>
      </div>
    `;
    update(ref(db,"notifications/"+n.key),{seen:true});
  });

  normal.forEach(n=>{
    list.innerHTML+=`
      <div class="notify-item">
        <b>${n.text}</b><br>
        <small>${n.time}</small>
      </div>
    `;
    update(ref(db,"notifications/"+n.key),{seen:true});
  });

  document.getElementById("notifyPopup").style.display="flex";

  if(imp.length>0){
    impBox.scrollIntoView({behavior:"smooth"});
  }
};

/* CLOSE */
window.closeNotify=()=>{
  document.getElementById("notifyPopup").style.display="none";
};