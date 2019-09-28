
const strToMin = require('./strToMin');
const genActivityHashTable =(routineObject)=>{
    let hashTable = new Object();
    for(let day in routineObject.days){
        if(routineObject.days[day].length != 0){
          routineObject.days[day].forEach(activity =>{
            const from = strToMin(activity.from);
            const to = strToMin(activity.to);
            const total = to-from;
            if(total !== 0){

              if(hashTable.hasOwnProperty(activity.name)){
                hashTable[activity.name] += total
              }else{
                hashTable[activity.name] = total
              }
            }
          });
        }
      }
    return hashTable;
};

module.exports = genActivityHashTable;