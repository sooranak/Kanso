
const majors=["The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"];
const suits=["Wands","Cups","Swords","Pentacles"];
const ranks=["Ace","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];

const deck=[...majors];
suits.forEach(s=>ranks.forEach(r=>deck.push(`${r} of ${s}`)));

let spreadSize=3;
let locked=false;

spread3.onclick=()=>{
 if(locked)return;
 spreadSize=3;
 spread3.classList.add("active");
 spread9.classList.remove("active");
};

spread9.onclick=()=>{
 if(locked)return;
 spreadSize=9;
 spread9.classList.add("active");
 spread3.classList.remove("active");
};

drawButton.onclick=()=>{
 if(locked){
  locked=false;
  drawButton.textContent="Shuffle & Draw";
  readingArea.innerHTML="";
  return;
 }
 draw();
 locked=true;
 drawButton.textContent="New Reading";
};

function random(max){
 const a=new Uint32Array(1);
 crypto.getRandomValues(a);
 return a[0]%max;
}

function shuffle(a){
 a=[...a];
 for(let i=a.length-1;i>0;i--){
  let j=random(i+1);
  [a[i],a[j]]=[a[j],a[i]];
 }
 return a;
}

function draw(){
 const cards=shuffle(deck);
 const allowRev=reversalToggle.checked;
 readingArea.innerHTML="";
 let container=document.createElement("div");
 container.className=spreadSize===9?"spread-nine":"";

 const labels=["Past","Present","Future"];

 for(let i=0;i<spreadSize;i++){
  let reversed=allowRev && random(2);
  let card=document.createElement("div");
  card.className="card"+(spreadSize===9&&i===4?" center":"");
  card.innerHTML=`
   <div class="card-title">${spreadSize===3?labels[i]:"Position "+(i+1)}</div>
   <div class="card-name">${cards[i]}</div>
   <div class="card-state">${reversed?"↧ Reversed":"↑ Upright"}</div>
  `;
  container.appendChild(card);
 }
 readingArea.appendChild(container);
}
