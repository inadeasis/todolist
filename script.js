// adds items to db
function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    // console.log(text.value)
    db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value="";
}

// using a getter fxn to get items from db
// snapshot -> pic of db and get current data
// sends us data whenever we update something -> uses a socket

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot)=>{
        console.log(snapshot);
        let items = [];
        snapshot.docs.forEach((doc)=>{
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateItems(items);
    })
}


function generateItems(items){

    let itemsHTML = "";
    items.forEach((item)=>{
        //console.log(item);
        itemsHTML +=`
        <div class="todo-item">
            <div class="check">
              <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked": "" }" >
              <img
                  src="https://img.icons8.com/external-becris-lineal-becris/20/000000/external-check-mintab-for-ios-becris-lineal-becris-1.png"
                />
              </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked": "" }">
            ${item.text}
            </div>
        </div>`

    })
    document.querySelector(".todo-items").innerHTML = itemsHTML;
    createEventListeners();
}


function createEventListeners(){
    let todoCheck = document.querySelectorAll(".todo-item .check-mark");
    //console.log(todoCheck);
    todoCheck.forEach((checkMark)=>{
        checkMark.addEventListener("click", function(){
            markAsCompleted(checkMark.dataset.id);
        })
    })
}

function markAsCompleted(id){
    //console.log("Mark as Completed")
    // from db
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc){
        if(doc.exists){
            //console.log("Here is the doc", doc.data());
            let status = doc.data().status;
            if(status == "active"){
                item.update({
                    status: "completed"
                })
            } else if(status == "completed"){
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();