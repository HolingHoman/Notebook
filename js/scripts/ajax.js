function ajax(method,url,FinalFunction, dataArray) {
    let XHR = new XMLHttpRequest();
    XHR.open(method, url);
    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send(dataArray);

    XHR.onreadystatechange = function () {
        if(this.status == 200 && this.readyState == 4){
            FinalFunction(this);
        }
    }
}