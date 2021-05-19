var trama = document.getElementById('trama');
var inputCrc = document.getElementById('CRC');
var radioPar = document.getElementById('par');
var radioImpar = document.getElementById('impar');
var writeAscii = document.getElementById('ascii');
var writeBinary = document.getElementById('binary');
var writeTramaCorrecta = document.getElementById('tramaCorrecta');

const isBinary = input =>{
  var isBin = true;
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) != "1" && input.charAt(i) != "0")
      isBin = false;
  }
  return isBin;
}

const Evaluate = () => {
  let error = "";
  let aux = trama.value;
  if(aux.length <= 0)
    error +="Ingresa una trama<br>";
  else if(!isBinary(aux))
    error +="Ingresa una trama en binario<br>";
  aux = inputCrc.value;
  if(aux.length <= 0)
    error += "Rellena la ecuacion CRC<br>";
  else if (!isBinary(aux))
    error += "La ecuacion CRC tiene que ser binaria<br>";
  if(aux.charAt(0) != 1)
    error += "Tu ecuacion CRC no existe<br>";
  if(!radioPar.checked && !radioImpar.checked)
    error += "Selecciona par o impar<br>";

  if (error == "") {
    document.getElementById("resultado").hidden = false;
    document.getElementById("error").hidden = true;
    if(radioPar.checked){
      var asc = trama.value;
      asc = MethodCrc(asc,inputCrc.value);
      if (asc == "") {
        writeTramaCorrecta.innerHTML = "La trama correcta es: " + trama.value;
        asc = QuitarBitsDeParidad(trama.value);
        asc = BinToDec(asc);
        asc = String.fromCharCode(asc);
        writeAscii.innerHTML = "El ASCII es: "  + asc;
      }else{
        var bits = GetPBits(trama.value);
        asc = HammingPar(QuitarBitsDeParidad(trama.value));
        asc = GetPBits(asc);
        asc = evaluarBits(bits,asc);
        asc = BinToDec(asc) - 1;
        let aux = trama.value;
        if(aux.charAt(asc)==0)
          aux = aux.substr(0,asc) + "1" + aux.substr(asc + 1);
        else
          aux = aux.substr(0,asc) + "0" + aux.substr(asc + 1);
          //alert(aux);
          asc = MethodCrc(aux,inputCrc.value);
        if (asc == "") {
            writeTramaCorrecta.innerHTML = "La trama correcta es: " + aux;
            asc = QuitarBitsDeParidad(trama.value);
            asc = BinToDec(asc);
            asc = String.fromCharCode(asc);
            writeAscii.innerHTML = "El ASCII es: "  + asc;
        }else{
          writeTramaCorrecta.innerHTML = "Hay mas de un error en la trama!";
          writeBinary.innerHTML = "";
          writeAscii.innerHTML = "";

        }

      }

    }else if(radioImpar.checked){
      var asc = trama.value;
      asc = MethodCrc(asc,inputCrc.value);
      if (asc == "") {
        writeTramaCorrecta.innerHTML = "La trama correcta es: " + trama.value;
        asc = QuitarBitsDeParidad(trama.value);
        asc = BinToDec(asc);
        asc = String.fromCharCode(asc);
        writeAscii.innerHTML = "El ASCII es: "  + asc;
      }else{
        var bits = GetPBits(trama.value);
        asc = HammingImpar(QuitarBitsDeParidad(trama.value));
        asc = GetPBits(asc);
        asc = evaluarBits(bits,asc);
        asc = BinToDec(asc) - 1;
        let aux = trama.value;
        if(aux.charAt(asc)==0)
          aux = aux.substr(0,asc) + "1" + aux.substr(asc + 1);
        else
          aux = aux.substr(0,asc) + "0" + aux.substr(asc + 1);
          //alert(aux);
          asc = MethodCrc(aux,inputCrc.value);
        if (asc == "") {
            writeTramaCorrecta.innerHTML = "La trama correcta es: " + aux;
            asc = QuitarBitsDeParidad(trama.value);
            asc = BinToDec(asc);
            asc = String.fromCharCode(asc);
            writeAscii.innerHTML = "El ASCII es: "  + asc;
        }else{
          writeTramaCorrecta.innerHTML = "Hay mas de un error en la trama!";
          writeBinary.innerHTML = "";
          writeAscii.innerHTML = "";

        }

      }
    }
  }else {
    document.getElementById("error").hidden = false;
    document.getElementById("resultado").hidden = true;
    document.getElementById("error").innerHTML = error;
  }
//
//   if(aux.length > 0){
//     let aux = inputCrc.value;
//     if(aux.length > 0){
//       if(aux.charAt(0) == 1){
//       }else alert("Selecciona par o impar");
//     }else alert("Tu ecuacion CRC no existe");
//   }else alert("Rellena la ecuacion CRC");
// }else alert("Ingresa una trama");

}
const evaluarBits = (cad1 , cad2) => {
  var result ="";
  for (var i = cad1.length - 1; i >= 0 ; i--) {
    if (cad1.charAt(i) == cad2.charAt(i))
      result = result + "0";
    else result = result + "1";
  }
  return result;

}
const GetPBits = cadena => {
  cadena = cadena.substring(0,2) + cadena.substring(3,4) + cadena.substring(7,8);
  return cadena;

}
const QuitarBitsDeParidad = cadena =>{
  cadena = cadena.substring(2,3) + cadena.substring(4,7) + cadena.substring(8,12) ;
  return cadena;
}
const MethodCrc = (cadena,polinomio) => {
  let aux = cadena;
  let resultado = "";
  for (var i = 0 ; i < polinomio.length - 1 ; i++)
    cadena = cadena + "0";
  while (polinomio.length <= cadena.length){
    var index = cadena.indexOf("1");
    if(index > -1){
    resultado = "";
    for (var i = 0 ; i < polinomio.length ; i++) {
      let chCad = cadena.charAt(i + index);
      let chPoli = inputCrc.value.charAt(i);
      if(chCad == chPoli)
        resultado = resultado + "0";
      else
        resultado = resultado + "1";
    }
    cadena = cadena.substring(index + polinomio.length ,cadena.length);
    cadena = resultado + cadena;
    index = cadena.indexOf("1");
    cadena = cadena.substring( index,cadena.length);
  }else cadena = "";
  }
  if (cadena != "") {
    cadena = cadena.substring(cadena.length - (polinomio.length - 1), cadena.length);
    while (cadena.length < polinomio.length - 1) {
      cadena = "0" + cadena;

    }
  }
  // writeCrc.innerHTML = "Con CRC: " + aux + cadena;
  return cadena;

}
const HammingImpar = cadena =>{
  cadena = "xx" + cadena.substring(0,1) + "x" + cadena.substring(1,4) + "x" + cadena.substring(4,8);
  //iteracion 1
  let contarUnos = 0;
  for(var i = 2; i < 11; i +=  2)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if (contarUnos % 2 != 0)
    cadena = "0"+cadena.substring(1,12);
  else
    cadena = "1"+cadena.substring(1,12);
  // iteracion 2
  contarUnos = 0;
  if(cadena.charAt(2) == '1')
       contarUnos ++;
  if(cadena.charAt(5) == '1')
       contarUnos ++;
  if(cadena.charAt(6) == '1')
        contarUnos ++;
  if(cadena.charAt(9) == '1')
       contarUnos ++;
  if(cadena.charAt(10) == '1')
       contarUnos ++;
  if (contarUnos % 2 != 0)
    cadena = cadena.substring(0,1) + "0" + cadena.substring(2,12);
  else
    cadena = cadena.substring(0,1) + "1" + cadena.substring(2,12);
  // iteracion 3
  contarUnos = 0;
  for(var i = 3; i < 7; i ++)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if(cadena.charAt(11) == '1')
       contarUnos ++;
       if (contarUnos % 2 != 0)
         cadena = cadena.substring(0,3) + "0" + cadena.substring(4,12);
       else
         cadena = cadena.substring(0,3) + "1" + cadena.substring(4,12);

// iteracion 4
contarUnos = 0;
for(var i = 7; i < 12; i ++)
  if(cadena.charAt(i) == '1')
        contarUnos ++;

  if (contarUnos % 2 != 0)
    cadena = cadena.substring(0,7) + "0" + cadena.substring(8,12);
  else
    cadena = cadena.substring(0,7) + "1" + cadena.substring(8,12);
    //writeHamming.innerHTML = "Con Hamming: " + cadena;
    return cadena;
}
const HammingPar = cadena =>{
  cadena = "xx" + cadena.substring(0,1) + "x" + cadena.substring(1,4) + "x" + cadena.substring(4,8);
  //iteracion 1
  let contarUnos = 0;
  for(var i = 2; i < 11; i +=  2)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if (contarUnos % 2 == 0)
    cadena = "0"+cadena.substring(1,12);
  else
    cadena = "1"+cadena.substring(1,12);
  // iteracion 2
  contarUnos = 0;
  if(cadena.charAt(2) == '1')
       contarUnos ++;
  if(cadena.charAt(5) == '1')
       contarUnos ++;
  if(cadena.charAt(6) == '1')
        contarUnos ++;
  if(cadena.charAt(9) == '1')
       contarUnos ++;
  if(cadena.charAt(10) == '1')
       contarUnos ++;
  if (contarUnos % 2 == 0)
    cadena = cadena.substring(0,1) + "0" + cadena.substring(2,12);
  else
    cadena = cadena.substring(0,1) + "1" + cadena.substring(2,12);
  // iteracion 3
  contarUnos = 0;
  for(var i = 3; i < 7; i ++)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if(cadena.charAt(11) == '1')
       contarUnos ++;
       if (contarUnos % 2 == 0)
         cadena = cadena.substring(0,3) + "0" + cadena.substring(4,12);
       else
         cadena = cadena.substring(0,3) + "1" + cadena.substring(4,12);

// iteracion 4
contarUnos = 0;
for(var i = 7; i < 12; i ++)
  if(cadena.charAt(i) == '1')
        contarUnos ++;

  if (contarUnos % 2 == 0)
    cadena = cadena.substring(0,7) + "0" + cadena.substring(8,12);
  else
    cadena = cadena.substring(0,7) + "1" + cadena.substring(8,12);
    //writeHamming.innerHTML = "Con Hamming: " + cadena;
    return cadena;
}
const BinToDec = number =>{

    numberI=0;
    var ch='';
    var pos=1;
        for(var i=(number.length)-1;i>=0;i--){
            ch=number.charAt(i);
            numberI=numberI+(parseInt(ch)*pos);
            pos=pos*2;
        }
        writeBinary.innerHTML = "En decimal es: " + numberI;
        return numberI;

}
