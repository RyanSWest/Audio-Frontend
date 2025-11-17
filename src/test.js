 const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTcmlIYW51bWFuIiwiaWF0IjoxNzYzMzU0NTkzLCJleHAiOjE3NjM0NDA5OTN9.H4QSwh6S6fTw-hZHr9JnUgE24cgLpa5nNa2fkRzxQJo'

const API_URL ='https://api.maybeart.app:3002'



 function useState(initial) {
  let value = initial;

  function setValue(newVal) {
    value = newVal;
   }

  function getValue() {
    return value;
  }

  return [getValue, setValue];
}

const [list ,setList]=useState([])
let list1 =[]
 
 const crap=[
  {
    "createdAt": "2025-11-15 07:36:53",
    "filename": "1763192212936-853702397.wav",
    "genre": null,
    "id": 12,
    "originalName": "157_Cm_HotViolin_01_702.wav",
    "size": 1646670,
    "title": "157_Cm_HotViolin_01_702",
    "url": "/uploads/1763192212936-853702397.wav"
  },
  {
    "createdAt": "2025-11-15 07:30:25",
    "filename": "1763191825032-30093250.wav",
    "genre": null,
    "id": 11,
    "originalName": "157_Cm_HotViolin_01_702.wav",
    "size": 1646670,
    "title": "157_Cm_HotViolin_01_702",
    "url": "/uploads/1763191825032-30093250.wav"
  }
]

fetch("https://api.maybeart.app:3002/library", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token
  }
})
  .then(res => res.json())
  .then(data =>  
    console.log(data.library[0])

     )
   .catch(err => console.error("ERROR:", err));


 const lastUpload = crap[    0];
 console.log("LAST",lastUpload, crap[-1])
  const currentUpload = `${API_URL}/${lastUpload.url}`
  console.log(currentUpload)

 const player = (arr) => {
  if (!Array.isArray(arr)) return []; // safeguard
  const rez = [];
  const API_URL = 'https://api.maybeart.app:3002';
  
  arr.forEach(e => {
    let v = API_URL + e.url;
    rez.push(v);
  });
  
  return rez;
};


console.log (player(crap))