//obtner los dias de una fecha, version basica (99% proximidad) 4 = 1
function getMomentDays(d){
  if(moment(d).isValid()){
    var d1=parseInt(moment(d).format("DD")),
        m1=parseInt(moment(d).format("MM")),
        y1=parseInt(moment(d).format("YYYY"));
    return d1+(m1*30)+(y1*365);
  }else{
    throw new ExcepcionGeneric(1001,"getMomentDays -> La fecha no tienen el formato correcto");
  }
}

//difrencia de fechas en dias
function getSubtractDays(major,minor){
  var major=getMomentDays(major);
  var minor=getMomentDays(minor);
  var c=major - minor;
  if(c >= 0){
    return c;
  }else{
    throw new ExcepcionGeneric(1002,"getSubtractDays -> La fecha mayor es menor que la menor");
  }
}

//poner una fecha menor basado en una fecha base y una x cantidad de dias
function setMomentToSubtractDay(currentDate,days){
  if(moment(currentDate).isValid()){
    var d = new Date(currentDate);
    d.setDate(d.getDate()-days);
    return d;
  }else{
    throw new ExcepcionGeneric(1003,"setMomentToSubtractDay -> La fecha no tienen el formato correcto");
  }
}


//poner una fecha mayor basado en una fecha base y una x cantidad de dias
function setMomentToIncreaseDay(currentDate,days){
  if(moment(currentDate).isValid()){
    var d = new Date(currentDate);
    d.setDate(d.getDate()+days);
    return d;
  }else{
    throw new ExcepcionGeneric(1003,"setMomentToIncreaseDay -> La fecha no tienen el formato correcto");
  }
}

//manejo de cadenas
function multiReplace(str, match, repl) {
  try{
    if (match === repl)
        return str;
    do {
        str = str.replace(match, repl);
    } while(str.indexOf(match) !== -1);
    return str;
  }catch(e){
    console.log("multiReplace > ");
    console.log(e);
  }
}

//funcion generica para cargar Excepcion
function ExcepcionGeneric(value,message) {
   this.value = value;
   this.message = message;
   this.toString = function() {
      return this.value + this.message
   };
}

ExcepcionGeneric.prototype.toString = function () {
  return this.value  + ': "' + this.message + '"';
}
