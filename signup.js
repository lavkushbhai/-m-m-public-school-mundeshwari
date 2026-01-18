import { db } from "./firebase.js";
import { ref, get, set, push, remove } from
"https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

window.signup = async ()=>{
  const n=name.value.trim();
  const m=mobile.value.trim();
  const a=aadhaar.value.trim();
  const e=email.value.trim();

  if(!n || !a || a.length!==4 || !e){
    alert("सभी जरूरी जानकारी सही डालो");
    return;
  }

  try{
    const schoolId = await generateSchoolId();

    await push(ref(db,"students"),{
      name:n,
      mobile:m,
      aadhaar:a,
      email:e,
      schoolId,
      time:new Date().toLocaleString()
    });

    msg.innerHTML=`✅ Signup Successful<br>School ID: <b>${schoolId}</b>`;
    name.value=mobile.value=aadhaar.value=email.value="";
  }catch(err){
    alert("Error");
  }
};

/* SCHOOL ID WITH FREE-ID SYSTEM */
async function generateSchoolId(){
  const year = new Date().getFullYear();

  const freeSnap = await get(ref(db,"freeIds"));
  let num;

  if(freeSnap.exists()){
    const keys = Object.keys(freeSnap.val()).sort();
    num = keys[0];
    await remove(ref(db,"freeIds/"+num));
  }else{
    const cSnap = await get(ref(db,"schoolCounter"));
    let c = cSnap.exists()?cSnap.val()+1:1;
    await set(ref(db,"schoolCounter"),c);
    num = String(c).padStart(3,"0");
  }

  return `MMPSM-${year}-${num}`;
}