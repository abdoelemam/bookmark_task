var siteName = document.getElementById("Name")
var siteUrl = document.getElementById("Url")
var content = document.getElementById("Content") 
var submitBtn = document.getElementById("btn-submit")
var updateBtn = document.getElementById("update-button")
var search = document.getElementById("Search")
var layer_Message = document.getElementById("Layer")
var closeBtn = document.getElementById("closeBtn")

var lst = [];
var storage = JSON.parse(localStorage.getItem("sites"))
if (storage !== null){
    lst = storage ;
    display(lst)
}

function addSite(){ 
    if (validateName() && validateUrl() && check_name()){
            var site = {
                name: siteName.value ,
                url: siteUrl.value  
            }
        
            lst.push(site);
            display(lst);
            clear()
            siteName.classList.remove("is-valid")
            siteUrl.classList.remove("is-valid")

            localStorage.setItem("sites", JSON.stringify(lst))
       
    }
    else{
        show_Message()
    }


}   

function display(lstSites){
    cartoona = ""
    for(var i = 0; i<lstSites.length ; i++){
        cartoona += `<tr>
                        <th>${i+1}</th>
                        <th>${lstSites[i].name}</th>
                        <th><button  class="btn  btn-visit btn-success"><a href="${lstSites[i].url}">Visit</a></button></th>
                        <th><button onclick="update(${i})" class="btn btn-update btn-warning">Update</button></th>
                        <th><button onclick="delet(${i})" class="btn btn-delete btn-danger">delete</button></th>
                    </tr>`
    }

    content.innerHTML = cartoona;
}

function delet(index){
    lst.splice(index,1)
    localStorage.setItem("sites", JSON.stringify(lst))
    display(lst)
}

function clear(){
    siteName.value = "";
    siteUrl.value = "";
}


var i ;

function update(index){
    i = index ;
    siteName.value = lst[index].name ;
    siteUrl.value = lst[index].url ;

    submitBtn.classList.replace("d-block","d-none");
    updateBtn.classList.replace("d-none","d-block");

    
}

function setUpdate(){
    lst[i].name = siteName.value;
    lst[i].url = siteUrl.value;
    
    submitBtn.classList.replace("d-none","d-block");
    updateBtn.classList.replace("d-block","d-none");
    clear()
    display(lst)
}

function validateName(){
    regex = /^[A-Za-z0-9]{3,}$/

    if(regex.test(siteName.value)){
        siteName.classList.remove("is-invalid")
        siteName.classList.add("is-valid")
        return true
    }
    else{
        siteName.classList.add("is-invalid")
        return false
    }

}

function validateUrl(){
    regex = /^(ftp|http|https):\/\/[^ "]+$/

    if(regex.test(siteUrl.value)){
        siteUrl.classList.remove("is-invalid")
        siteUrl.classList.add("is-valid")
        return true
    }
    else{
        siteUrl.classList.add("is-invalid")
        return false
    }
}

function make_Search(){
    var searchName = search.value.toLowerCase().trim() ; 
    var search_Lst= []

    for (var i=0; i< lst.length ; i++){
        if(lst[i].name.toLowerCase().trim().includes(searchName)){
            search_Lst.push(lst[i])
        }
    }

    display(search_Lst)
    
}

function clos(){
    layer_Message.classList.replace("d-block", "d-none" )
}

function show_Message(){
    layer_Message.classList.replace("d-none", "d-block")
}

function check_name(){

    for (var i=0; i<lst.length; i++){
        if(siteName.value.toLowerCase().trim() == lst[i].name){
            return false
        }
    }
    return true
}