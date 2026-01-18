
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

const settingsBox = document.getElementById("settingsBox");
const themeBox = document.getElementById("themeBox");
const langBox = document.getElementById("langBox");
const colorPalette = document.getElementById("colorPalette");
const textColorBox = document.getElementById("textColorBox");

/* MENU */
menuBtn.onclick = ()=>{
  sideMenu.style.right="0";
  overlay.style.display="block";
};

overlay.onclick = ()=>{
  sideMenu.style.right="-260px";
  overlay.style.display="none";
  settingsBox.style.display="none";
  themeBox.style.display="none";
  langBox.style.display="none";
  colorPalette.style.display="none";
  textColorBox.style.display="none";
};

/* TOGGLES */
function toggleSettings(){
  settingsBox.style.display = settingsBox.style.display==="block"?"none":"block";
}
function toggleThemeBox(){
  themeBox.style.display = themeBox.style.display==="block"?"none":"block";
  langBox.style.display="none";
}
function toggleLangBox(){
  langBox.style.display = langBox.style.display==="block"?"none":"block";
  themeBox.style.display="none";
}
function toggleColors(){
  colorPalette.style.display = colorPalette.style.display==="flex"?"none":"flex";
}
function toggleTextColor(){
  textColorBox.style.display = textColorBox.style.display==="block"?"none":"block";
}

/* ================= CONFIRM SYSTEM ================= */
const confirmModal = document.getElementById("confirmModal");
const saveBtn = document.getElementById("saveChange");
const cancelBtn = document.getElementById("cancelChange");
let pendingAction = null;

function askConfirm(action){
  pendingAction = action;
  confirmModal.style.display="flex";
}

cancelBtn.onclick = ()=>{
  confirmModal.style.display="none";
  pendingAction=null;
};

saveBtn.onclick = ()=>{
  if(pendingAction) pendingAction();
  confirmModal.style.display="none";
  pendingAction=null;
};

/* THEME */
function confirmTheme(t){
  askConfirm(()=>{
    document.body.classList.toggle("dark", t==="dark");
    localStorage.setItem("theme", t);
  });
}

/* MAIN COLOR */
document.querySelectorAll("#colorPalette span").forEach(dot=>{
  dot.onclick = ()=>{
    const c = dot.dataset.color;
    askConfirm(()=>{
      document.documentElement.style.setProperty("--main", c);
      localStorage.setItem("mainColor", c);
    });
  };
});

/* TEXT COLOR */
document.querySelectorAll(".text-color span").forEach(dot=>{
  dot.onclick = ()=>{
    const c = dot.dataset.text;
    askConfirm(()=>{
      document.documentElement.style.setProperty("--text", c);
      localStorage.setItem("textColor", c);
    });
  };
});

/* LANGUAGE */
function confirmLanguage(l){
  askConfirm(()=>{
    setLanguage(l);
    localStorage.setItem("language", l);
  });
}

/* LANGUAGE DATA */
const lang = {
  en: {
    /* HEADER + HERO */
    school: "M.M Public School Mundeshwari",
    hero: "Education for a Better Future",
    hero_sub: "Discipline • Knowledge • Values",
    admission: "Admission",

    /* FEATURES (OLD) */
    f1: "Smart Classes",
    f2: "Experienced Teachers",
    f3: "Safe Campus",
    f4: "Digital Learning",

    /* SMART FEATURES (NEW) */
    videos: "Videos",
    pdf: "PDF",
    notes: "Notes",
    gallery: "Gallery",
    documents: "Documents",
    offline_test: "Offline Test",
    online_test: "Online Test",
    ai: "AI Learning",
    double_chat: "Double Chat",

    /* PRINCIPAL MESSAGE */
    principal_title: "Principal's Message",
    principal_msg:
      "Welcome to M.M Public School Mundeshwari. Our mission is to provide quality education with discipline, values and modern learning to shape a better future.",
    principal_name: "— Principal",

    /* FACILITIES */
    facility_title: "Our Facilities",
    facility1: "Science Laboratory",
    facility2: "Library",
    facility3: "Computer Lab",
    facility4: "Sports Ground",
    facility5: "Transport Facility",
    facility6: "Medical Support",

    /* ARRANGEMENTS */
    arrange_title: "School Arrangements",
    arr1: "Classroom Arrangement",
    arr2: "Exam Arrangement",
    arr3: "Seating Plan",
    arr4: "Transport Arrangement",

    /* CONTACT HELP */
    contact_title: "Contact Help",
    contact_call: "Call Us",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_address: "School Address",
    contact_add_text: "Mundeshwari, Bihar",

    /* FOOTER */
    footer_tagline: "Quality Education with Discipline & Values",
    footer_links: "Quick Links",
    footer_home: "Home",
    footer_admission: "Admission",
    footer_gallery: "Gallery",
    footer_contact: "Contact",
    footer_contact_title: "Contact",
    footer_copy: "All Rights Reserved."
  },

  hi: {
    /* HEADER + HERO */
    school: "एम.एम. पब्लिक स्कूल मुंडेश्वरी",
    hero: "एक बेहतर भविष्य के लिए शिक्षा",
    hero_sub: "अनुशासन • ज्ञान • संस्कार",
    admission: "प्रवेश",

    /* FEATURES (OLD) */
    f1: "स्मार्ट कक्षाएं",
    f2: "अनुभवी शिक्षक",
    f3: "सुरक्षित परिसर",
    f4: "डिजिटल शिक्षा",

    /* SMART FEATURES (NEW) */
    videos: "वीडियो",
    pdf: "पीडीएफ",
    notes: "नोट्स",
    gallery: "गैलरी",
    documents: "दस्तावेज़",
    offline_test: "ऑफलाइन टेस्ट",
    online_test: "ऑनलाइन टेस्ट",
    ai: "एआई लर्निंग",
    double_chat: "डबल चैट",

    /* PRINCIPAL MESSAGE */
    principal_title: "प्रधानाचार्य का संदेश",
    principal_msg:
      "एम.एम. पब्लिक स्कूल मुंडेश्वरी में आपका स्वागत है। हमारा उद्देश्य अनुशासन, संस्कार और आधुनिक शिक्षा के माध्यम से छात्रों के उज्ज्वल भविष्य का निर्माण करना है।",
    principal_name: "— प्रधानाचार्य",

    /* FACILITIES */
    facility_title: "हमारी सुविधाएँ",
    facility1: "विज्ञान प्रयोगशाला",
    facility2: "पुस्तकालय",
    facility3: "कंप्यूटर लैब",
    facility4: "खेल मैदान",
    facility5: "परिवहन सुविधा",
    facility6: "चिकित्सा सुविधा",

    /* ARRANGEMENTS */
    arrange_title: "विद्यालय व्यवस्थाएँ",
    arr1: "कक्षा व्यवस्था",
    arr2: "परीक्षा व्यवस्था",
    arr3: "बैठने की व्यवस्था",
    arr4: "परिवहन व्यवस्था",

    /* CONTACT HELP */
    contact_title: "संपर्क सहायता",
    contact_call: "कॉल करें",
    contact_whatsapp: "व्हाट्सएप",
    contact_email: "ईमेल",
    contact_address: "विद्यालय पता",
    contact_add_text: "मुंडेश्वरी, बिहार",

    /* FOOTER */
    footer_tagline: "अनुशासन और संस्कार के साथ गुणवत्तापूर्ण शिक्षा",
    footer_links: "त्वरित लिंक",
    footer_home: "होम",
    footer_admission: "प्रवेश",
    footer_gallery: "गैलरी",
    footer_contact: "संपर्क",
    footer_contact_title: "संपर्क",
   footer_copy: "सर्वाधिकार सुरक्षित।"
  }
};
function setLanguage(l){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.innerText = lang[l][el.dataset.i18n];
  });
}

/* RESTORE AFTER REFRESH */
window.onload = ()=>{
  const theme = localStorage.getItem("theme");
  if(theme==="dark") document.body.classList.add("dark");

  const mainColor = localStorage.getItem("mainColor");
  if(mainColor) document.documentElement.style.setProperty("--main", mainColor);

  const textColor = localStorage.getItem("textColor");
  if(textColor) document.documentElement.style.setProperty("--text", textColor);

  const savedLang = localStorage.getItem("language");
  if(savedLang) setLanguage(savedLang);
};
/* ================= BOTTOM NAV CLICK ================= */

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    
    // remove active from all
    document.querySelectorAll('.nav-item')
      .forEach(b => b.classList.remove('active'));
    
    // add active to clicked
    btn.classList.add('active');
    
    // future use (page / section)
    const target = btn.getAttribute('data-target');
    console.log('Nav clicked:', target);
    
  });
});
/* ================= AUTO COPYRIGHT YEAR ================= */
document.getElementById("year").textContent = new Date().getFullYear();
/* ===== DISABLE COPY / RIGHT CLICK ===== */

// disable right click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// disable copy
document.addEventListener('copy', function(e) {
  e.preventDefault();
  alert("Copy disabled on this website");
});

// disable cut
document.addEventListener('cut', function(e) {
  e.preventDefault();
});
/* ==================================================
   GLOBAL VARIABLES
================================================== */
let lastForm = "";

/* ==================================================
   BASIC HELPERS
================================================== */
function closeAll() {
  document.querySelectorAll(".signup-popup")
    .forEach(p => p.style.display = "none");
}

/* ==================================================
   POPUP LOADING (INSIDE POPUP ONLY)
================================================== */
function showPopupLoading(time = 1500, callback) {
  closeAll();
  document.getElementById("popupLoading").style.display = "flex";
  
  setTimeout(() => {
    document.getElementById("popupLoading").style.display = "none";
    if (callback) callback();
  }, time);
}

/* ==================================================
   SIGN UP MAIN OPTIONS
================================================== */
function openSignup() {
  showPopupLoading(1200, () => {
    document.getElementById("signupPopup").style.display = "flex";
  });
}

/* ==================================================
   OPEN FORMS
================================================== */
function openStudent() {
  lastForm = "student";
  showPopupLoading(1200, () => {
    document.getElementById("studentBox").style.display = "flex";
  });
}

function openParent() {
  lastForm = "parent";
  showPopupLoading(1200, () => {
    document.getElementById("parentBox").style.display = "flex";
  });
}

function openOfficial() {
  lastForm = "official";
  showPopupLoading(1200, () => {
    document.getElementById("officialBox").style.display = "flex";
  });
}

/* ==================================================
   BACK TO OPTIONS
================================================== */
function back() {
  showPopupLoading(1000, () => {
    document.getElementById("signupPopup").style.display = "flex";
  });
}

/* ==================================================
   PREVIEW FUNCTIONS
================================================== */
function studentPreview() {
  document.getElementById("previewText").innerHTML = `
    <b>Name:</b> ${sname.value}<br>
    <b>Father:</b> ${fname.value}<br>
    <b>Mother:</b> ${mname.value}<br>
    <b>Mobile:</b> ${smobile.value}<br>
    <b>Aadhar:</b> XXXX-${saadhar.value}
  `;
  
  showPopupLoading(1000, () => {
    document.getElementById("previewBox").style.display = "flex";
  });
}

function parentPreview() {
  document.getElementById("previewText").innerHTML = `
    <b>Parent:</b> ${pname.value}<br>
    <b>Student:</b> ${pstudent.value}<br>
    <b>Mobile:</b> ${pmobile.value}
  `;
  
  showPopupLoading(1000, () => {
    document.getElementById("previewBox").style.display = "flex";
  });
}

function officialPreview() {
  document.getElementById("previewText").innerHTML = `
    <b>Name:</b> ${oname.value}<br>
    <b>Designation:</b> ${odesign.value}<br>
    <b>Mobile:</b> ${omobile.value}
  `;
  
  showPopupLoading(1000, () => {
    document.getElementById("previewBox").style.display = "flex";
  });
}

/* ==================================================
   EDIT FORM FROM PREVIEW
================================================== */
function edit() {
  showPopupLoading(800, () => {
    if (lastForm === "student") {
      document.getElementById("studentBox").style.display = "flex";
    }
    if (lastForm === "parent") {
      document.getElementById("parentBox").style.display = "flex";
    }
    if (lastForm === "official") {
      document.getElementById("officialBox").style.display = "flex";
    }
  });
}

/* ==================================================
   COMPLETE SIGN UP (NO LOCALHOST ALERT)
================================================== */
function complete() {
  showPopupLoading(1500, () => {
    document.getElementById("successPopup").style.display = "flex";
  });
}

/* ==================================================
   BACK TO HOME
================================================== */
function goHome() {
  showPopupLoading(1000, () => {
    document.getElementById("successPopup").style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/* ===== LOADING ===== */
function showLoading(next){
  const l = document.getElementById("loadingPopup");
  l.style.display="flex";
  setTimeout(()=>{
    l.style.display="none";
    next();
  },3000);
}

/* ===== SAMASYA ===== */
function openHelp(){
  showLoading(()=>{
    document.getElementById("helpPopup").style.display="flex";
    document.getElementById("helpList").style.display="block";
    document.getElementById("helpSolution").style.display="none";
  });
}

function closeHelp(){
  document.getElementById("helpPopup").style.display="none";
  speechSynthesis.cancel();
}

function openSolution(type){
  document.getElementById("helpList").style.display="none";
  document.getElementById("helpSolution").style.display="block";

  const t=document.getElementById("solTitle");
  const p=document.getElementById("solText");

  t.innerText = type+" समस्या";
  p.innerText = type+" से जुड़ी जानकारी यहाँ दी गई है।";

  saveHistory(type);
}

function goBack(){
  document.getElementById("helpSolution").style.display="none";
  document.getElementById("helpList").style.display="block";
  speechSynthesis.cancel();
}

function speakSolution(){
  const u=new SpeechSynthesisUtterance(
    solTitle.innerText+". "+solText.innerText
  );
  u.lang="hi-IN";
  speechSynthesis.speak(u);
}

/* ===== HISTORY ===== */
function saveHistory(title){
  let h=JSON.parse(localStorage.getItem("history"))||[];
  h.unshift({title,time:new Date().toLocaleString()});
  localStorage.setItem("history",JSON.stringify(h));
}

function openHistory(){
  showLoading(()=>{
    document.getElementById("historyPopup").style.display="flex";
    renderHistory();
  });
}

function closeHistory(){
  document.getElementById("historyPopup").style.display="none";
}

function renderHistory(){
  const box=document.getElementById("historyList");
  const h=JSON.parse(localStorage.getItem("history"))||[];
  box.innerHTML = h.length
    ? h.map(i=>`<p>📌 ${i.title}<br><small>${i.time}</small></p>`).join("")
    : "<p>No history found.</p>";
}

/* ===== CONFIRM ===== */
function confirmClear(){
  document.getElementById("confirmPopup").style.display="flex";
}
function closeConfirm(){
  document.getElementById("confirmPopup").style.display="none";
}
function clearHistory(){
  localStorage.removeItem("history");
  closeConfirm();
  renderHistory();
}
function openFeedbackDash() {
  document.getElementById("feedbackDash").style.display = "flex";
}

function closeFeedbackDash() {
  document.getElementById("feedbackDash").style.display = "none";
}

/* PLACEHOLDER – next steps में replace होगा */
function openSendFeedback() {
  alert("Next step: Send Feedback page");
}

function openViewFeedback() {
  alert("Next step: View Admin Reply page");
}
/* OPEN / CLOSE */
function openHF(){
  document.getElementById("hfOverlay").style.display="flex";
}
function closeHF(e){
  if(e.target.id==="hfOverlay"){
    document.getElementById("hfOverlay").style.display="none";
  }
}

/* PAGE NAVIGATION */
function goHelp(){
  window.location.href="help.html";
}

function goFeedback(){
  window.location.href="feedback.html";
}
function openAddressPopup() {
  document.getElementById("addressPopup").style.display = "flex";
}

function closeAddressPopup() {
  document.getElementById("addressPopup").style.display = "none";
}
function openMedicalPopup() {
  document.getElementById("medicalPopup").style.display = "flex";
}

function closeMedicalPopup() {
  document.getElementById("medicalPopup").style.display = "none";
}
function openTransportPopup() {
  document.getElementById("transportPopup").style.display = "flex";
}

function closeTransportPopup() {
  document.getElementById("transportPopup").style.display = "none";
}
function openFacilityPopup(name) {
  document.getElementById("facilityTitle").innerText = name;
  document.getElementById("facilityPopup").style.display = "flex";
}

function closeFacilityPopup() {
  document.getElementById("facilityPopup").style.display = "none";
}
function openOfflineTest() {
  const popup = document.getElementById("loadingPopup");
  popup.style.display = "flex";
  
  setTimeout(() => {
    window.location.href = "offline-test.html";
  }, 3000);
}
document.getElementById("offlineCard").addEventListener("click", function() {
  window.location.assign("offline-test.html");
});
document.addEventListener("DOMContentLoaded", function() {
  
  const officialLogin = document.getElementById("officialLogin");
  const popup = document.getElementById("loadingPopup");
  
  if (!officialLogin) return;
  
  officialLogin.addEventListener("click", function(e) {
    e.preventDefault();
    
    popup.style.display = "flex";
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 3000); // ⏱ 3 second
  });
  
});
document.addEventListener("DOMContentLoaded", function() {
  
  const doubleChat = document.getElementById("doubleChatCard");
  const popup = document.getElementById("loadingPopup");
  
  if (!doubleChat) return;
  
  doubleChat.addEventListener("click", function() {
    
    popup.style.display = "flex";
    
    setTimeout(() => {
      window.location.href = "student-login.html";
    }, 3000); // ⏱ 3 second loading
  });
  
});