
const majors=["The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"];
const suits=["Wands","Cups","Swords","Pentacles"];
const ranks=["Ace","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
const deck=[...majors];
for(const s of suits){for(const r of ranks){deck.push(`${r} of ${s}`);}}

let spreadSize=3,locked=false;
const btn3=document.getElementById("spread3");
const btn9=document.getElementById("spread9");
const drawBtn=document.getElementById("drawButton");
const reading=document.getElementById("readingArea");
const info=document.getElementById("readingInfo");

btn3.onclick=()=>{if(locked)return;spreadSize=3;btn3.classList.add("active");btn9.classList.remove("active");};
btn9.onclick=()=>{if(locked)return;spreadSize=9;btn9.classList.add("active");btn3.classList.remove("active");};

drawBtn.onclick=()=>{
 if(locked){
   locked=false;
   drawBtn.textContent="Shuffle & Draw";
   reading.innerHTML="";
   info.textContent="";
   return;
 }
 draw();
 locked=true;
 drawBtn.textContent="New Reading";
};

function rand(max){
 if(window.crypto&&crypto.getRandomValues){
  const a=new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0]%max;
 }
 return Math.floor(Math.random()*max);
}
function shuffle(arr){
 const a=[...arr];
 for(let i=a.length-1;i>0;i--){
   const j=rand(i+1);
   [a[i],a[j]]=[a[j],a[i]];
 }
 return a;
}
function draw(){
 const d=shuffle(deck);
 const revs=document.getElementById("reversalToggle").checked;
 reading.innerHTML="";
 const wrap=document.createElement("div");
 if(spreadSize===3){
   wrap.style.display="grid";
   wrap.style.gap="12px";
 }else{
   wrap.style.position="relative";
   wrap.style.height="700px";
 }
 const pos9=[[120,0],[20,90],[120,90],[220,90],[120,180],[220,270],[220,360],[220,450],[220,540]];
 const labels=["Past","Present","Future"];
 for(let i=0;i<spreadSize;i++){
   const c=document.createElement("div");
   c.className="card";
   const rev=revs&&rand(2)===1;
   if(spreadSize===9){
     c.style.position="absolute";
     c.style.left=pos9[i][0]+"px";
     c.style.top=pos9[i][1]+"px";
     c.style.width="140px";
   }
   c.innerHTML=`<div style="font-size:.8rem;color:#726D66">${spreadSize===3?labels[i]:"Position "+(i+1)}</div>
   <div style="font-family:Georgia,serif;font-size:1.05rem;margin:8px 0">${d[i]}</div>
   <div>${rev?"↧ Reversed":"↑ Upright"}</div>`;
   wrap.appendChild(c);
 }
 reading.appendChild(wrap);
 info.textContent="Reading "+new Date().toLocaleString();
}
