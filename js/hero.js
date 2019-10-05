let listNote = document.querySelector('.notebook__date-list');
let dataNote = {};
let TextArea = document.querySelector('#notebook-input');
let y;

function finalFnc(data){
    console.log(data.response);
}
function dataFnc(data){
    let out = '';
    for(let key in data){
        out += `${key}=${data[key]}&`;
    }
    console.log(out);
    return out;
}

document.querySelector('#add-notebook').addEventListener('click', function () {
    if (TextArea.value == ''){
        alert('Блокнот пустой!');
    }
    else{
        let date = new Date;
        let TimeS = date.getSeconds();
        let TimeM = date.getMinutes();
        let TimeH = date.getHours();
        let TimeD = date.getDate();
        let TimeMonth = date.getMonth();
        let TimeY = date.getFullYear();
        let addTag = document.createElement('p');
        if (TimeS > 0 && TimeS < 9 || TimeS === 0){
            TimeS = `0${TimeS}`;
        }
        if (TimeMonth > 0 && TimeMonth <= 9 || TimeMonth === 0){
            TimeMonth = `0${TimeMonth}`;
        }
        if (TimeM > 0 && TimeM < 9 || TimeM === 0){
            TimeM = `0${TimeM}`;
        }
        if (TimeD > 0 && TimeD < 9 || TimeD === 0){
            TimeD = `0${TimeD}`;
        }
        let dateNow = `${TimeY}-${TimeMonth}-${TimeD} ${TimeH}:${TimeM}:${TimeS}`;
        addTag.innerText = dateNow;
        dataNote[dateNow] = TextArea.value;
        listNote.prepend(addTag);
        addTag.dataset.time = addTag.innerText;
        let data = {
            time: dateNow,
            text: TextArea.value
        };
        TextArea.value = '';
        ajax('POST', 'php/signup.php', finalFnc, dataFnc(data));
        document.querySelectorAll('.notebook .notebook__date-list p').forEach(function (element) {
            element.onclick = function () {
                y = element.innerText;
                document.querySelector('#notebook-input').value = dataNote[element.innerText];
            }
        })
    }
});

document.querySelector('#save-edit-notebook').addEventListener('click', function () {
    dataNote[y] = TextArea.value;
    TextArea.value = '';
    let EditP = document.querySelector(`.notebook .notebook__date-list p[data-time="${y}"]`);
    setTimeout(function () {
        EditP.removeAttribute('style');
    }, 2000);
    EditP.style.color = '#ff4b44';
});
document.querySelector('#delete-note-notebook').addEventListener('click', function () {
    let s = document.querySelector(`.notebook .notebook__date-list p[data-time="${y}"]`);
    s.remove();
    TextArea.value = '';
    for(let element in dataNote){
        if(element == s.innerText){
            delete dataNote[s.innerText]
        }
    }
});