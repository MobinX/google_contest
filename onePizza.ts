const inputToObj = (str: string) => {
  let lines: string[] = str.split("\n");
  let customerNumber: number = parseInt(lines[0]); //First line is customer number

  let obj:any = {
    customer:[]
  };
  let i: number = 1;

  while (i < lines.length) {
    //strating from second line and skipping two lines(this and then linep---)
    console.warn(i);
    let currentLine: string[] = lines[i].split(" "); //liked lines
    let nextLine: string[] = lines[i + 1].split(" "); //disliked lines

    let likedArr:string[] = []
    let dislikedArr:string[] = []

    if((parseInt(currentLine[0])) > 0){
        for(let j:number =1; j< currentLine.length  ; j ++){
            likedArr.push(currentLine[j]) //adding liked items
        }
    }
    if(parseInt(nextLine[0]) > 0){
        for(let j:number = 1; j < nextLine.length; j++){
            dislikedArr.push(nextLine[j]) // adding disliked items
        }
    }
    obj.customer.push({liked:likedArr,disliked:dislikedArr})
  
    i = i + 2;
  }
  return obj;  
};

const simulate = (out:string,obj:any)=> {
    let outSlice = out.split(" ") 
    let customerCount = 0;

    //the customer will only come if ALL the items the like are avalable in pizza and there will not be any item he dislikes
     for(let i=1; i < outSlice.length; i++){
         
            for(let j=0; j < obj.customer.length; j++){
                
                if(obj.customer[j].disliked.indexOf(outSlice[i]) < 0){

                    //one condition fulfilled there is no item that customer dislikes
                    //checking another condition
                    let hasAllLikeditem = true //if there is not a single item that customer like it will become false
                    
                    for(let y = 0; y < obj.customer[j].liked.length; y++){
                        if(outSlice.indexOf(obj.customer[j].liked[y]) < 0) hasAllLikeditem = false; //the customer not like even one item
                    } 
                    
                    if(hasAllLikeditem) customerCount++;

                }
            }
     }
     return customerCount;

}


const obj:any = inputToObj(`3
2 cheese peppers
0
1 basil
1 pineapple
2 mushrooms tomatoes
1 basil`);

console.log(simulate("4 cheese mushrooms tomatoes peppers",obj))

