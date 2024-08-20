// to DO , In progess, in review , done

let sampleResponse = {
    "todo":[
        {
            id:1,
            text:"for sample todo"
        },
        {
            id:2,
            text:"for sample todo"
        }
    ],
    "inprogress":[
        {
            id:2,
            text:"for sample inprogress"
        }
    ],
    "inReview":[
        {
            id:3,
            text:"for sample inReview"
        }
    ],
    "Done":[
        {
            id:3,
            text:"for sample Done"
        }
    ]
};

let squence = [{data:"todo",next:{data:"todo",next:"inprogress"}}]
let squenceFlag = [
{"todo":"inprogress"},
{"inprogress":"inReview"},
{"inReview":"Done"}
]



let todoContainer =document.getElementById("todo-list-container");
let searchBoxInput = document.getElementById("searchBoxInput");

//submit-searchbox
let submitSearchBox = document.getElementById("submit-searchbox");
document.addEventListener("DOMContentLoaded",function(){
    createTreeofTodo(sampleResponse);
})

function createTreeofTodo(response){
    todoContainer.innerHTML="";
    let nestedFragment;
     for(let res in response){
        let div = document.createElement("div");
        div.id=res;
        div.classList.add("bucket")
       
         if(Array.isArray(response[res])){
           nestedFragment = createArrayTree(response[res],res)
         }
         div.appendChild(nestedFragment);
         todoContainer.appendChild(div)
     }
    
}

function createArrayTree(response,indicator){
    let divFragment = document.createDocumentFragment();
    for(let res of response){
        let div = document.createElement("div");
        div.id= "test_"+res.id;
        div.classList.add("card")
        div.setAttribute("data-bucket",indicator)
        div.innerHTML = res.text;
        divFragment.appendChild(div);
        
    }

    return divFragment;
}

submitSearchBox.addEventListener("click",inputHandler);

function inputHandler(e){
     let inputValue = searchBoxInput.value;
     sampleResponse["todo"].push({
            id: Date.now(),
            text:inputValue
     });
     createTreeofTodo(sampleResponse);
     searchBoxInput.value = "";

}
todoContainer.addEventListener("click",draggableEventHandler);

function draggableEventHandler(e){
    console.log(e.target.dataset);
    let todoId = document.getElementById("todo");
    let inprogressId = document.getElementById("inprogress");
    let inReviewId = document.getElementById("inReview");
    let doneId = document.getElementById("Done");
    let bucketType = e.target.dataset["bucket"];
    let nextStep ;
    // let squenceFlag = [
    //     {"todo":"inprogress"},
    //     {"inprogress":"inReview"},
    //     {"inReview":"Done"}
    //     ]
    for(let x of squenceFlag){
        console.log(x,">>>",bucketType);
        if(x[bucketType]){
            nextStep=x[bucketType];
            break;
        }
    }
    if(nextStep == "inprogress"){

        e.target.setAttribute("data-bucket",nextStep);
        inprogressId.appendChild(e.target);
    }else if(nextStep == "inReview"){
        e.target.setAttribute("data-bucket",nextStep);
        inReviewId.appendChild(e.target);
    }else if(nextStep == "Done"){
        e.target.setAttribute("data-bucket",nextStep);
        doneId.appendChild(e.target);
    }
   
}

function objHelper(nextStep){

}