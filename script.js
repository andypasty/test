let xp = 0;
let leben = 100;
let gold = 50;
let aktuelleWaffen = 0;
let kämpfen;
let monsterLeben;
let invetar = ["Stock"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const lebenText = document.querySelector("#lebenText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterLebenText = document.querySelector("#monsterLeben");


const waffe =[
    {
        name: "Stock",
        power: 5
    },
    {
        name: "Keule",
        power: 30
    },
    {
        name: "Schmiede Hammer",
        power: 50
    },
    {
        name: "Dunkelschwert",
        power: 100
    }
];

const monsters =[
    {
        name: "Krieger",
        level: 2,
        leben: 15
    },
    {
        name: "Bogenschütze",
        level: 8,
        leben: 60
    },
    {
        name: "Drache",
        level: 20,
        leben: 300
    }
];

const locations =[
    {
        name: "zurück",//0
        "button text": ["Gehe zum Händler", "Gehe in den Wald", "Drachen kampf"],
        "button functions": [goHändler, goWald, kampfDrache],
        text : "Bist bist auf einem leeren Weg. Schau doch bei den Händlern vorbei."
    },
    {
        name: "Händler",//1
        "button text": ["Kaufe 10 Leben (10 gold)", "Waffen aufwerten (40 gold)", "Gehe zurück auf den Weg"],
        "button functions": [buyLeben, buyWaffen, goWeg],
        text : "Du bist beim Händler was möchtest du tun."
    },
    {
        name: "wald",//2
        "button text": ["Kämpfe Krieger", "Kämpfe Bogenschütze", "Gehe zurück auf den Weg"],
        "button functions": [kampfKrieger, kampfBeast, goWeg],
        text : "Du hast die wahl ob du gegen einen Krieger Kämpfen möchtest oder gegen einen Bogenschützen"
    },
    {
        name: "kämpfe",//3
        "button text": ["Kämpfen", "Ausweichen", "Weg rennen"],
        "button functions": [attack, dodge, goWeg],
        text : "Du wirst angegriffen. Was tust du ?"
    },
    {
        name: "kill monster",//4
        "button text": ["Gehe zurück auf den Weg", "Gehe zum Händler", "Gehe zurück auf den Weg"],
        "button functions": [goWeg, goHändler, easterEgg],
        text : 'Der kampf ist vorbei und du hast gewonnen. Du schaust nach Schätzen und bekommst Gold'
    },
    {
		name: "lose",//5
		"button text": ["Versuche es erneut", "Versuche es erneut","Versuche es erneut"],
		"button functions": [restart, restart, restart],
		text: "DU BIST GESTORBEN. ☠️"
	},
    {
        name: "win",//6
        "button text": ["REPLAY?", "Gehe zum Händler", "REPLAY?"],
        "button functions": [restart, goHändler, restart],
        text : "Du hast den Drachen besiegt! Herzlichen glückwunscht! "
    },
    {
        name: "ester egg",//7
        "button text": ["2", "8", "Gehe zurück auf den Weg"],
        "button functions": [pickTwo, pickEight, goWeg],
        text : "Du hast ein genheimiss gefunden. Entscheide dich für eine Zahl. Es werden zufällige Zahlen generiert von 0 bis 10. Wenn du glück hast ist deine zahlt dabei."
    }
];

//initialize buttons
button1.onclick= goHändler;
button2.onclick= goWald;
button3.onclick= kampfDrache;

function update(location) {
    monsterStats.style.display ="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}



function goWeg(){
    update(locations[0]);
}

function goHändler(){
    update(locations[1]);
}

function goWald(){
    update(locations[2]);
}

function buyLeben() {
    if (gold >= 10){
        gold -= 10;
        leben += 10;
        goldText.innerText = gold;
        lebenText.innerText = leben;
    }else {
        text.innerText = "Du hast nicht genug Gold um noch mehr leben zu kaufen!";
    }
}

function buyWaffen(){
    if (aktuelleWaffen < waffe.length - 1){
        if (gold >= 40){
            gold -= 40;
            aktuelleWaffen ++;
            goldText.innerText = gold;
            let neueWaffen = waffe[aktuelleWaffen].name;
            text.innerText = "Du hast eine neue Waffe " + neueWaffen + '.';
            invetar.push(neueWaffen);
            text.innerText+= " In deinem Inventar hast du " + invetar;
        }else{
            text.innerText = "Du hast nicht genug Gold um eine Waffe zu kaufen."
        }
    }else{
        text.innerText = " Du hast schon die Stärkste Waffe!";
        button2.innerText = "Verkaufe eine Waffe für 15 Gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if (invetar.length > 1 ){
        gold += 15;
        goldText.innerText = gold;
        let aktuelleWaffen = invetar.shift();
        text.innerText = "DU verkaufst " + aktuelleWaffen + ".";
        text.innerText +=" in deinem Inventar befinden sich noch " + invetar;
    }else{
        text.innerText = " Du verkaufst deine Waffe! ";
    }
}


function kampfKrieger(){
    kämpfen = 0;
    goKämpfen();
}

function kampfBeast(){
    kämpfen = 1;
    goKämpfen();
}

function kampfDrache(){
    kämpfen = 2;
    goKämpfen();
}

function goKämpfen(){
    update(locations[3]);
    monsterLeben = monsters[kämpfen].leben;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[kämpfen].name;
    monsterLebenText.innerText = monsterLeben;
}

function attack(){
    text.innerText= "Der " + monsters[kämpfen].name + " greift dich an.";
    text.innerText += " Du greifst an mit " + waffe[aktuelleWaffen].name + ".";

    if (isMonsterHit()){
        leben -= getMonsterAttackValue(monsters[kämpfen].level);
    } else {
		text.innerText += " Du verfehlst";
	}
    
    monsterLeben -= waffe[aktuelleWaffen].power + Math.floor(Math.random() * xp) + 1;
	lebenText.innerText = leben;
	monsterLebenText.innerText = monsterLeben;   
	if (leben <= 0) {
		lose();
	} else if (monsterLeben <= 0) {
		kämpfen === 2 ? winGame() : defeatMonster();
	}
    if(Math.random() <= .1 && invetar.length !== 1){
        text.innerText += " Dein " + invetar.pop() + " ist gebrochen.";
        aktuelleWaffen --;
    }
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit(){
    return Math.random() > .2 || leben < 20;
}

function dodge(){
    text.innerText = "Du weichst dem Angriff aus " + monsters[kämpfen].name + ".";
}

function defeatMonster(){
    gold += Math.floor(monsters[kämpfen].level * 6.7) 
    xp += monsters[kämpfen].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    leben = 100;
    gold = 50;
    aktuelleWaffen = 0;
    invetar = ["Stock"];
    goldText.innerText = gold;
    lebenText.innerText = leben;
    xpText.innerText = xp;
    goWeg();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = " Du nimmst " + guess + ". Hier die zufalls zahlen:\n";

    for (let i = 0; i < 10; i++){
        text.innerText += numbers[i] +"\n";
    }

    if (numbers.indexOf(guess) !== -1){
        text.innerText += "Richtig! Du bekommst 20 Gold"; 
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += "Falsch! Du verlierst 10 Leben"; 
        leben -= 10;
        lebenText.innerText = leben;
        if (leben <= 0){
            lose();
        }
    }
}
