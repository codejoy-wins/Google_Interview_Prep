// Write a function that takes in an index of the fibonacci sequence and outputs in binary.

// 1. Take in index of fib sequence.
// 2. Find the value at that index in the fib sequence.
// 3. Calculate which powers of 2 are needed to express that value.
// 4. Convert those powers of 2 into binary string format
// 5. Return binary string
// 6. Format answer using a helper function that adds commas to long numbers.
function fibbinary(n){                      // My main function fibbinary uses helper functions.
    var fibby = fib(n);                     // I first use the fibbonnaci helper function and store it in a variable called fibby.
    var result = converter(binary(fibby)); // binary calculates powers of 2. converter coverts the powers of 2 into a binary string.
    var formatted = format(fibby);
    console.log(formatted+" is the "+n+" index of the fibbonacci sequence and "+result+" in binary");
    return converter(binary(fibby));
}
fibbinary(5);
fibbinary(16);
fibbinary(30);
// fibbinary(40); takes 1 full second
fibbinary(42); // takes 3 seconds
function binary(n,cursed){
    if(cursed == undefined){  // I want an array to pass through the parameter on recursive calls to be initialized only once.
        var cursed = [];
    }
    if(n == 0){
        return cursed;  // this is the base case for my recursive call of calculating powers of two.
    }
    var b, x;
    for(var i = 0; i <= 200; i++){  // The 200 here is arbitrary.  I didn't want it to go forever. fibbinary(17) broke when i was 10
        b = Math.pow(2,i);
        if(b > n){
            var p = i-1;
            cursed.push(p);
            x = Math.pow(2,i-1);
            n = n-x;
            return binary(n, cursed);
        }
    }
    console.log("magic");  // This triggers before crashing to let me know I need a bigger value for the variable i.
}
function converter(arr){
    var bits = arr[0]+1;        // If the array I get back from calculating powers of two is [4,0], it means 2^4 and 2^0 is activated.
    var bitArr = [];            // if 2^4 is activated (1 not 0) then that means I need 5 bits because 1 bit is for 2^0. 
    for(var i =0; i < bits; i++){// I set up the correct number of bits as 0's, before targeting them and turning them into 1's.
        bitArr.push(0);
    }
    for(var j = 0; j < arr.length; j++){  // This is me turning the 0's into 1's.
        bitArr[arr[j]]=1;
    }
    reverse(bitArr);  // then I reverse the bit array because binary is read in reverse.  The highest powers come first.
    var output = "";
    for(var x = 0; x < bitArr.length;x++){  // stringify
        output+= bitArr[x];
    }
    return output;
}
function fib(n){
    if(n<2){
        return n;                       // standard fibonacci function
    }
    return fib(n-2)+fib(n-1);
}
function reverse(arr){                      // standard reverse function
    var temp;
    var l = Math.floor(arr.length/2);
    for(var i =0; i<l; i++){
        temp = arr[i];
        arr[i] = arr[arr.length-1-i];
        arr[arr.length-1-i] = temp;
    }
    return arr;
}
function format(n){                         // turn 1000000 into the more readable 1,000,000
    var a = [];
    var s = n.toString();                       // convert number to string
    for (var i =0; i < s.length; i++){
        a.push(s[i]);
    }                                           // iterate through numstring, pushing to empty array
    if (a.length < 4){
        let output = "";
        output+=n;                              // don't worry about formatting unless it's a big number
        return output;
    }
    var k = 0;                                  // k for counter... kounter
    var r = [];                                 // r for array... Rray
    for (var x = a.length-1; x>=0; x--){        // reverse it so I can add commas from the front
        if(k % 3 == 0 && k >1){                 // add commas at multiples of 3
            r.push(',');
        }
        r.push(a[x]);                           // copy full number
        k++;                                        // use counter to prevent a comma at the end.
    }
    reverse(r);                                 // now just reverse it back and convert to a string
    var output = "";
    for(k in r){
        output+=r[k];
    }
    return output;
}
// challenge:  moneyTalks() takes in a value and says, "34 million, 15 thousand, 827 dollars"