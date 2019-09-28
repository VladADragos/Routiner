const sort = (hashTable)=>{
    let sortedHashTable=[];
    for(element in hashTable){
      const duration = hashTable[element];
      const activity = {activity: element, duration}
        if(sortedHashTable.length === 0){
          sortedHashTable.push(activity);
        }else{
          const index = sortedHashTable.length -1;

          if(duration > sortedHashTable[index].duration){
            sortedHashTable.unshift(activity);
          }else{
            sortedHashTable.push(activity);
          }
      }
    }

    return sortedHashTable;
}
module.exports = sort;