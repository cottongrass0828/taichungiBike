const areaList=document.getElementById('areaList');
const spotdetail=document.getElementById('spotdetail');
let result={};
let cAreaOpt;

fetch('https://datacenter.taichung.gov.tw/swagger/OpenData/91deb8b8-7547-4a60-8cae-7c95c0df2fda', {})
.then((response) => {
    return response.json()
}).then((data) => {
    sortAreaOpt(data)
}).catch((err) => {
    console.log('錯誤:', err)
});

function sortAreaOpt(jsonObj){
    var cArea=[];
    jsonObj.forEach(spot => {
        if(spot.CArea in result){ 
            result[spot.CArea].push(spot)
        }else{
            const areaOpt=document.createElement('option')
            areaOpt.textContent = spot.CArea
            areaList.appendChild(areaOpt)
            cArea.push(spot.CArea)
            result[spot.CArea]=[spot]
        }
    })
    const p=document.getElementById('updateTime')
    p.textContent ="更新時間："+jsonObj[0].UpdateTime
    cAreaOpt=cArea
    renew("0")
}


function renew(area){
    spotdetail.innerHTML = ''
    var count = 0;
    let num=cAreaOpt[area]
    let areaOpt = result[num]
    
    areaOpt.forEach(spot=>{
    count++;
    const tr = document.createElement("tr")
    if(count%2===0){
        tr.setAttribute('class','content')
    }else{
        tr.setAttribute('class','content2')
    }    
    const tdPosition = document.createElement("td")
    tdPosition.textContent=spot.Position
    const tdAvilable = document.createElement("td")
    tdAvilable.textContent=spot.AvailableCNT
    const tdEmp = document.createElement("td")
    tdEmp.textContent=spot.EmpCNT
    
    tr.appendChild(tdPosition)
    tr.appendChild(tdAvilable)
    tr.appendChild(tdEmp)
    spotdetail.appendChild(tr)
    })
}