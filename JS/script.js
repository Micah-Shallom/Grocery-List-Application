const form = document.getElementById('form');
const btn = document.getElementById('btn');
const listContainer = document.getElementById('list-container');
const clearBtn = document.getElementById('clearBtn');
const formInput = document.getElementById('formInput');
const alertBox =  document.getElementById('alert-box');

//Alert System
const showAlert = (msg , color) => {
    alertBox.classList.add('show');
    alertBox.textContent = msg;
    alertBox.style.backgroundColor = color;
    setTimeout( _ => {
        alertBox.classList.remove('show');
    },2000)
}

//Each Item 
const createSingleItem = (item) => {
    let div = document.createElement('div');
    div.className='list-item';
    div.innerHTML = `
    <span class="item">${item}</span>
        <span class="remove-item">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
    </span>
    `;
    listContainer.insertAdjacentElement('beforeend',div)
}

//New Item
const addNewItems = (item) => {
    //single Item maker
    createSingleItem(item);

    //show item was added;
    showAlert('Item Added', 'DarkCyan');

    //clearInput value
    formInput.value = ''
}

//Push To Local Storage;

const addToStorage = (item) => {
    // items container
    let groceryList;
    //Check if items are present in local Storage
    if(localStorage.getItem('groceryList')){
        //then the items container should be an array of the already stored Item
        groceryList = JSON.parse(localStorage.getItem('groceryList'));
    }else{
        //else our item container is an empty array ready to be fed;
        groceryList = [];
    }
    //hence push each item into our empty cart and even if the item container contains already stored items in local storage then still push into it;
    groceryList.push(item);
    //then update our storage with the updated list of groceries

    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}
const populateUI = () => {
    //If grocery-items exists in local storage then lets display them;
    if(localStorage.getItem('groceryList')){
        let storedGroceries = JSON.parse(localStorage.getItem('groceryList'));

        storedGroceries.forEach(grocitem => {
            createSingleItem(grocitem);
        })
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    let item = formInput.value;
    if(item == ''){
        showAlert('Please Enter an Item', `#b92c64`);
    }else{
        //Create a New Item;
        addNewItems(item);

        //Persist Individual Item Into Local Storage;
        addToStorage(item);
    }
});

//Remove All Items
const removeAll = () => {
    localStorage.removeItem('groceryList');
    
    let groceryItem = document.querySelectorAll('.list-item');
    groceryItem.forEach(item => {
        item.remove();
        
    });
    showAlert('Groceries Cleared',`#b92c64`);

};

//Remove Single Item
listContainer.addEventListener('click', e => {
    if(e.target.classList.contains('fa')){
        let groceryItem = e.target.parentElement.parentElement;
        let groceryItemContent = document.querySelector('.item').textContent
        groceryItem.remove();
        showAlert('An Item is Removed',`#b92c64`);
        reUpdateStorage(groceryItemContent);
    }
})

const reUpdateStorage = (item) => {
    let groceries = JSON.parse(localStorage.getItem('groceryList'));
    let itemIndex = groceries.indexOf(item);

    groceries.splice(itemIndex,1);

    //Now update localstorage
    localStorage.setItem('groceryList',JSON.stringify(groceries));
}

//Clear all Items from grocery-list
clearBtn.addEventListener('click', removeAll);

// Populating the User Interface with our groceries
document.addEventListener('DOMContentLoaded', populateUI);
