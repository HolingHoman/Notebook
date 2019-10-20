let listNote = document.querySelector('.notebook__date-list');
let dataNote = {};
let TextArea = document.querySelector('#notebook-input');
let y;
let Propfalse = document.querySelector('.propFalse');
let Proptrue = document.querySelector('.propTrue');

function finalFnc(data){
    prop(true);
}
function dataFnc(data){
    let out = '';
    for(let key in data){
        out += `${key}=${data[key]}&`;
    }
    return out;
}

document.querySelector('#add-notebook').addEventListener('click', function () {
    if (TextArea.value == ''){
        prop(false);
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
        try {
            ajax('POST', 'php/signup.php', finalFnc, dataFnc(data));
        }
        catch (e) {
            if(e){
                Propfalse.classList.remove('hide');
                setTimeout(function () {
                    Propfalse.classList.add('hide');
                }, 2000);
            }
        }
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



function prop(Param) {
    let prop = document.createElement('div');
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    prop.classList.add('prop');
    prop.appendChild(h4);
    prop.appendChild(p);
    document.body.appendChild(prop);
    if(Param){
        prop.classList.add('propTrue');
        h4.textContent = 'Успешно';
        p.textContent = `Операция прошла успешно!`;
        removeProp(prop);
        prop.style.opacity = `1`;
    }
    else{
        prop.classList.add('propFalse');
        h4.textContent = 'Ошибка';
        p.textContent = `Во время выполнения операции произошла ошибка!`;
        removeProp(prop);
        prop.style.opacity = `1`;
    }
}
function removeProp(prop) {
    setTimeout(function () {
        prop.remove();
    }, 2800);
}