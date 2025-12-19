array
-created using []
-mutable
-typeof arr is object
-.length : to check length
-to change value at certain index :
    arr[index]=value

methods:
.toString(): Convert to String
.join("Elment"): to join elements of the array using the lement
.pop(): pop last element and return, from the array the item was removed
.push("item"): reaturns the length, add item to the array
.shift(): removes the 1st item
.unshift("item"): adds the item to the 1st
delete a[index]: delete the element, stored as empty, type is undefined, in simple the memory is allocated eith no element
.concat(arr1,arr2): concat arr1, arr2 in a new array, doesn't change base array
.splice(index, no,* elemnets to be added): from index remove no of elemnts and return and add rest elements
.slice(start,end): return new array of slice items

mfr:
map((x) =>{statements}): take array and perform tasks on array elements and return it
filter(): return that elemnets that satifies the condition
reduce(): resuce array to a single value

array.from("String): convert it to array