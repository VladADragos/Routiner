const strToMin = str =>{
    let minutes = 0;

    let _hours = parseInt(str.slice(0,2),10);
    let _minutes = parseInt(str.slice(3,5),10);
    
    minutes = _hours * 60+ _minutes; 
    
    return minutes;

  }

module.exports = strToMin;