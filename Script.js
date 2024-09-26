let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

//gettotal

function getTotal(){
    if(price.value!=''){
        let result=(+price.value+ + taxes.value+ +ads.value )- + discount.value
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}

//getcreate

let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}



submit.onclick=function(){
   let newpro={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
   }
   datapro.push(newpro);
   localStorage.setItem('product',JSON.stringify(datapro))
   console.log(datapro);
   clear()
   showdata()
}


//clear input


function clear(){
    title.value='',
    price.value='',
    taxes.value='',
    ads.value='',
    discount.value='',
    total.innerHTML='',
    count.value='',
    category.value=''

}


//read data

function showdata(){
    let table='';
    for(let i=0;i<datapro.length;i++)
    {
        table+=
        `
        <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].category}</td>
                <td><button id="update">update</button></td>
                <td><button onClick=deleteitem(${i}) id="delete">delete</button></td>
                </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall');
    if(datapro.length>0)
    {
        btndelete.innerHTML=
    
        `
                        <td><button onClick="deleteall()">Delete ALL</button></td>
    
        `
    }
    else{
        btndelete.innerHTML='';
    }
  
}

showdata()



//DELETE ITEM
 function deleteitem(i){
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro)
   showdata()
 }


 function deleteall(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
 }