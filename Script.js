let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');


let mood='create';
let tmp;

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
// let datapro = JSON.parse(localStorage.getItem("product")) || []

submit.onclick=function(){
   let newpro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
   }

   if(title.value!=''&&price.value!=''&&category.value!=''&&newpro.count<100){
    if(mood==='create'){

        if(newpro.count>1){
         for(let i=0;i<newpro.count;i++)
         {
             datapro.push(newpro);
         }
        }
        else{
         datapro.push(newpro);
      
        }
    }
    else
    {
     datapro[tmp]=newpro
     mood='create'
     submit.innerHTML='Create';
     count.style.display='block';
    }
    cleardata()
   }
  

   localStorage.setItem('product',JSON.stringify(datapro))
   console.log(datapro);
   
   showdata()
 
}


//clear input


function cleardata(){
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
    getTotal()
    let table='';
    for(let i=0;i<datapro.length;i++)
    {
        table +=
        `
        <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onClick=updatedata(${i}) id="update">update</button></td>
                <td><button onClick=deleteitem(${i}) id="delete">delete</button></td>
                </tr>
        
        `
    }

    document.getElementById('ttbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall');
    if(datapro.length>0)
    {
        btndelete.innerHTML=
    
        `
                        <td><button onClick="deleteall()">Delete ALL(${datapro.length})</button></td>
    
        `
    }
    else{
        btndelete.innerHTML='';
    }
  
}

showdata();



//DELETE ITEM
 function deleteitem(i){
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro)
   showdata()
 }


 function deleteall(){
     datapro.splice(0);
     localStorage.clear();
    showdata();
 }


 //update item

 function updatedata(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal()
    count.style.display='none'
    category.value=datapro[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
 }


 //search

 let searchmood='title'

 function getSearchmood(id){

    let search=document.getElementById('search');
   if(id=='searchtitle'){
    searchmood='title';
    search.placeholder='Search By Title';
   }else{
    searchmood='category';
    search.placeholder='Search By Category';

   }
   search.focus();
   search.value='';
  showdata()
 }
 function searchitem(value)
 {
    let table='';
    if(searchmood=='title'){
        for(let i=0;i<datapro.length;i++)
        {
            if(datapro[i].title.includes(value.toLowerCase())){
                table +=
                `
                <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                       
                        <td>${datapro[i].discount}</td>
                         <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onClick=updatedata(${i}) id="update">update</button></td>
                        <td><button onClick=deleteitem(${i}) id="delete">delete</button></td>
                        </tr>
                
                `
            }
            

        }
    }
    else{
        for(let i=0;i<datapro.length;i++)
            {
                if(datapro[i].category.includes(value.toLowerCase())){
                    table +=
                    `
                    <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onClick=updatedata(${i}) id="update">update</button></td>
                            <td><button onClick=deleteitem(${i}) id="delete">delete</button></td>
                            </tr>
                    
                    `
                }
                
    
            }        
    }
    document.getElementById('ttbody').innerHTML=table;

 }
 const themeButton = document.getElementById('themeButton');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  let theme = 'light';
  if (document.body.classList.contains('dark-mode')) {
    theme = 'dark';
  }

 localStorage.setItem('theme', theme);
});
