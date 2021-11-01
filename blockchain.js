//IGNORE ALL COMMENTS except this one

const SHA256 = require('crypto-js/sha256');
const prompt = require('prompt-sync')({sigint: true});
const { exec } = require('child_process');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
var fs = require('fs');

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		//console.log("Block mined: " + this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 4;
	}
	createGenesisBlock(){
		return new Block(0, "2021-11-1 23:13:15", "Genesis block", "0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}
	isChainValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];
			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}
		return true;
	}
}

let jsc = new Blockchain();
n = jsc.chain.length;
//var d = [];

/*console.log('Mining block 1...');
jsc.addBlock(new Block(1, "2/10/2021", {amount: 4}));

console.log('Mining block 2...');
jsc.addBlock(new Block(2, "3/10/2021", {amount: 10}));

console.log(JSON.stringify(jsc, null, 4));
*/

function prog(){
function disp(){
	console.log('Which function do you wish to perform?');
	console.log('1. Enter data into the blockchain')
	console.log('2. Obtain data from the blockchain')
	console.log('3. Exit')
	console.log('[1/2/3]?')
}
disp();
var s = prompt();
while(s !== 3){
	if(s == 2){
		n = jsc.chain.length;
		console.log('No. of blocks = ' + n);
		const m = prompt('Enter the number of the block you wish to view : ');
		console.log('{\ntimestamp = ' + JSON.stringify(jsc.chain[m-1].timestamp, null, 4), '\ndata = ' + JSON.stringify(jsc.chain[m-1].data, null, 4), '\n}');
		disp();
		s = prompt();
	}
	//else if(s == 1){
		/*console.log('Press enter and Ctrl+D after you finish entering data')
		var readline = require('readline');
		var input = [];
		var rl = readline.createInterface({
	    	input: process.stdin,
	    	output: process.stdout
		});
		rl.prompt();
		rl.on('line', function (cmd) {
		    input.push(cmd);
		});
		rl.on('close', function (cmd) {
		    fs.writeFile("d.txt", input.join('\n'), function(err){
		    	if(err){
		    		return console.log(err);
		    	}
		    	console.log(' > d.txt')
		    });
		    //jsc.addBlock(new Block(n, dateTime, d[-1]));
		    process.exit(0);
		});*/
		//disp();
		//s = prompt();
		/*function main(input) {
		    var arr = input.split("\n")
	    	process.stdout.write(JSON.stringify(arr));
		}

		process.stdin.resume();
		process.stdin.setEncoding("utf-8");
		var stdin_input = "";

		process.stdin.on("data", function (input) {
    	stdin_input += input;
		});

		process.stdin.on("end", function () {
   		main(stdin_input);
	});*/
	//}
	else if(s ==1){
		console.log('Open blockchain.js file and navigate to the penultimate line of the file');
		console.log('Add this line:\njsc.addBlock(new Block(n, dateTime, data));');
		console.log('Press enter');
		console.log('[Replace data by whatever data you wish to enter(enclosed in quotes) and dateTime by the date and time of the entry(enclosed in quotes)]');
		s = 3;
	}
	else if(s == 3){
		break;
	}
}
}
jsc.addBlock(new Block(n, "2021-11-1 23:18:12" , "amount: 4"));
jsc.addBlock(new Block(n, "2021-11-1 23:24:11" , "amount: 5"));

prog();
