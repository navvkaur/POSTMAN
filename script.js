//https://crudcrud.com/api/61e98bdeb25847d9bb30d8fe6d23f585


function savetoLocalstorage(event) {
    event.preventDefault();
    
let userDetails = {
    My_Expense_Amount : document.getElementById('amount').value,
    Description: document.getElementById('des').value,
    category :document.getElementById('cat').value 
}

//let userDetails_serialized=JSON.stringify(userDetails)  
axios.post("https://crudcrud.com/api/d76aabca3db74839b762f7afff1fbd36/appointmentData",userDetails)
.then((res)=>{
    //console.log(res);
    showNewUseronScreen(userDetails)
}).catch((err)=>{
    //console.error(err);
})
//localStorage.setItem(userDetails.My_Expense_Amount , userDetails_serialized)

}

function showNewUseronScreen(userDetails){
 const d=document.getElementById('ul')
 const li= `<li id="${userDetails.My_Expense_Amount}"> '${userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}'
  <button onclick = editUser('${userDetails._id}','${ userDetails.My_Expense_Amount}','${userDetails.Description}','${userDetails.category}')> Edit </button> 
  <button onclick = deleteUserfromApi('${userDetails._id}')> Delete </button> 
   </li>`
d.innerHTML=d.innerHTML + li
}

window.addEventListener("DOMContentLoaded",()=>
{
    axios.get("https://crudcrud.com/api/d76aabca3db74839b762f7afff1fbd36/appointmentData")
    .then((res)=>{
        console.log(res);
        for(var i = 0;i< res.data.length;i++)
        {
            showNewUseronScreen(res.data[i]);
        }
    }).catch((err)=>{
        console.error(err);
    })
})
function deleteUserfromApi(id)
{
    console.log(id)
axios.delete(`https://crudcrud.com/api/d76aabca3db74839b762f7afff1fbd36/appointmentData/${id}`).then((response)=>{
    console.log(response)
     deleteUser(id);
     axios.get("https://crudcrud.com/api/d76aabca3db74839b762f7afff1fbd36/appointmentData")
    .then((res)=>{
        console.log(res);
        for(var i = 0;i< res.data.length;i++)
        {
            showNewUseronScreen(res.data[i]);
        }
    }).catch((err)=>{
        console.error(err);
    })
    })
    .catch((err)=>{
        console.log(err)
    })}

function deleteUser(id) {
   const parentNode=document.getElementById('ul')
     const deletechild= document.getElementById('id')
     if(deletechild ){
        parentNode.removeChild(deletechild);
     }
     
    }
function editUser(id,amount,description,category) {
document.getElementById('amount').value=amount
document.getElementById('des').value=description
document.getElementById('cat').value=category

deleteUserfromApi(id)

}