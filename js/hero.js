let listNote = document.querySelector('.notebook__date-list');
let dataNote = {};
let TextArea = document.querySelector('#notebook-input');
let y;

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
        if (TimeMonth > 0 && TimeMonth < 9 || TimeMonth === 0){
            TimeMonth = `0${TimeMonth}`;
        }
        if (TimeM > 0 && TimeM < 9 || TimeM === 0){
            TimeM = `0${TimeM}`;
        }
        let dateNow = `${TimeH}:${TimeM}:${TimeS} ${TimeD}:${TimeMonth}:${TimeY}`;
        addTag.innerText = dateNow;
        dataNote[dateNow] = TextArea.value;
        listNote.prepend(addTag);
        addTag.dataset.time = addTag.innerText;
        TextArea.value = '';
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