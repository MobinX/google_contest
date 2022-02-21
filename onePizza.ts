const fs = require("fs");
const arg = process.argv.slice(2);
//function for converting input string into obj
const inputToObj = (str: string) => {
  let lines: string[] = str.split("\n");
  lines = lines.filter((chr) => isNaN(parseInt(chr[0])) == false);
  console.log(lines.length);
  let customerNumber: number = parseInt(lines[0]); //First line is customer number
  let obj: any = {
    customer: [],
  };
  let i: number = 1;
  while (i < lines.length) {
    //strating from second line and skipping two lines(this and then linep---)
    // console.warn(i);
    let currentLine: string[] = lines[i].split(" "); //liked lines
    let nextLine: string[] = lines[i + 1].split(" "); //disliked lines

    let likedArr: string[] = [];
    let dislikedArr: string[] = [];

    if (parseInt(currentLine[0]) > 0) {
      for (let j: number = 1; j < currentLine.length; j++) {
        likedArr.push(currentLine[j]); //adding liked items
      }
    }
    if (parseInt(nextLine[0]) > 0) {
      for (let j: number = 1; j < nextLine.length; j++) {
        dislikedArr.push(nextLine[j]); // adding disliked items
      }
    }
    obj.customer.push({ liked: likedArr, disliked: dislikedArr });

    i = i + 2;
  }
  return obj;
};

//comparing two array if second array has all the items of first array
const compareArray = (arr1: string[], arr2: string[]): boolean => {
  for (let i: number = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) < 0) return false; // this item arr1[i] is not contained in arr2
  }
  return true; //has all items of first array in second array
};
//checkking any signle item of array1 contain in array2
const isContainSingleItem = (arr1: string[], arr2: string[]): boolean => {
  for (let i: number = 0; i < arr1.length; i++) {
    //      //   f(arr1[]))
    if (arr2.indexOf(arr1[i]) >= 0) return true; //contained
  }
  return false;
};

const simulate = (out: string, obj: any) => {
  let outSlice = out.split(" ");
  outSlice.shift();
  let customerCount = 0;

  //the customer will only come if ALL the items the like are avalable in pizza and there will not be any item he dislikes
  for (let j = 0; j < obj.customer.length; j++) {
    if (
      isContainSingleItem(outSlice, obj.customer[j].disliked) == false &&
      compareArray(obj.customer[j].liked, outSlice) == true
    ) {
      customerCount++;
    }
  }
  return customerCount;
};

const solver = (obj: any) => {
  let items: string[] = []; //pizza items
  let customers: any[] = obj.customer.sort((a: any, b: any) => {
    return b.disliked.length - a.disliked.length;
  });

  for (let i: number = 0; i < customers.length; i++) {
    let disliked: string[] = customers[i].disliked;
    let liked: string[] = customers[i].liked;

    if (isContainSingleItem(disliked, items) == false) {
      for (
        let lkitm: number = 0 /*liked item */;
        lkitm < liked.length;
        lkitm++
      ) {
        items.push(liked[lkitm]);
      }
    }
  }
  let outString: string = `${items.length} `;
  for (let itm: number = 0; itm < items.length; itm++) {
    outString += `${items[itm]} `;
  }
  return outString;
};

let obj: any = inputToObj(`3
2 cheese peppers
0
1 basil
1 pineapple
2 mushrooms tomatoes
1 basil`);

//Main Work
if (arg[0] != "all") {
  try {
    let inp = fs.readFileSync(`inp/${arg[0]}.txt`, "utf8");
    obj = inputToObj(inp);
    if (arg[1] != undefined && arg[1] == "out") {
      try {
        fs.writeFileSync(`out/${arg[0]}.txt`, solver(obj));
        //file written successfully
      } catch (err) {
        console.error(err);
      }
    }
  } catch (er) {
    console.log(er);
  }
}
else{
  ["a","b","c","d","e"].map(nm =>{
    try{
      fs.writeFileSync(`out/${nm}.txt`, solver(inputToObj(fs.readFileSync(`inp/${nm}.txt`, "utf8"))));
      console.log("written")
    }
    catch(er) {console.log(er)}
  })
}

console.log(
  `Pizza items "${solver(obj)}" \n Total Customers "${simulate(
    solver(obj),
    obj
  )}" out of "${obj.customer.length} `
);

// console.log(simulate("4 cheese mushrooms tomatoes peppers basil", obj));
// console.log(solver(obj))

// console.log(simulate(solver(obj), obj));
