class RouletteTable2 {
    constructor(DOMTable, maximumNumber){
        this.maximumNumber = maximumNumber;
        this.table = DOMTable;
    }

    init(){

        const numOfColumns = this.maximumNumber / 3 + 1;
        let currentIndex = 0;
        for(let i = 0; i < numOfColumns; i++){
            this.drawColumn( i===0 ? 1 : 3, currentIndex);
            currentIndex+=3;
        }
    }

    drawColumn(numOfRows, startingNumber){
        let num = startingNumber;
        const row = document.createElement('div');
        row.className = 'row';
        for(let i = 0; i < numOfRows; i++){
            const cell = document.createElement('div');
            cell.className = 'roulette-number-2';
            const number = document.createElement('div');
            number.textContent = num;
            
            const statusContainer1 = document.createElement('div');
            statusContainer1.className = 'status-container';
            const statusBar = document.createElement('div');
            statusBar.className = 'status-bar';
            const frequencyCount = document.createElement('div');
            frequencyCount.className = 'frequency-count';
            frequencyCount.textContent = '0';
            statusContainer1.appendChild(statusBar);
            statusContainer1.appendChild(frequencyCount);
            
            const statusContainer2 = document.createElement('div');
            statusContainer2.className = 'status-container';
            const statusBar200 = document.createElement('div');
            statusBar200.className = 'status-bar-200';
            const frequencyCount200 = document.createElement('div');
            frequencyCount200.className = 'frequency-count-200';
            frequencyCount200.textContent = '0';
            statusContainer2.appendChild(statusBar200);
            statusContainer2.appendChild(frequencyCount200);

            cell.appendChild(number);
            cell.appendChild(statusContainer1);
            cell.appendChild(statusContainer2);
            num--;

            row.appendChild(cell)
        }

        
        this.table.appendChild(row);
    }

    updateRouletteTable(historyTable) {

        let history = historyTable.getHistory();

        const rouletteNumbers = this.table.getElementsByClassName('roulette-number-2');
        console.log(rouletteNumbers);
        const last37 = history.slice(-this.maximumNumber-1);
        const last200 = history.slice(-historyTable.getTableSize());

        for (let i = 0; i < this.maximumNumber + 1; i++) {
            const statusBar = rouletteNumbers[i].getElementsByClassName('status-bar')[0];
            console.log(rouletteNumbers[i]);
            const frequencyCount = rouletteNumbers[i].getElementsByClassName('frequency-count')[0];
            const statusBar200 = rouletteNumbers[i].getElementsByClassName('status-bar-200')[0];
            const frequencyCount200 = rouletteNumbers[i].getElementsByClassName('frequency-count-200')[0];
            
            const count37 = last37.filter(num => num == i).length;
            const count200 = last200.filter(num => num == i).length;
            frequencyCount.textContent = count37;
            frequencyCount200.textContent = count200;
            
            statusBar.className = 'status-bar grey';
            statusBar200.className = 'status-bar-200 grey-200';
            
            if(count37 > 0 && last37.length >= 37){
                statusBar.className = 'status-bar green';
            }
            if(count200 >= 5 && count200 <= 8){
                statusBar200.className = 'status-bar-200 green';
            }
            else if (count200 >= 9) {
                statusBar200.className = 'status-bar-200 red';
            }
        }
        const counts = [];
        if(history.length >= 5){
            for (let i = 0; i < this.maximumNumber + 1; i++) {
                counts.push({ number: i, count: last37.filter(num => num === i).length });
            }
            counts.sort((a, b) => b.count - a.count);
            for (let i = 0; i < 5; i++) {
                if(counts[i].count != 0){
                    rouletteNumbers[counts[i].number].getElementsByClassName('status-bar')[0].className = 'status-bar red';
                }
            } 
        }
        
    }

    updateBoxes(){
        const rouletteNumbers = this.table.getElementsByClassName('roulette-number-2');
        for(let i = 0 ; i < this.maximumNumber + 1; i++){
            this.setBoxColour(rouletteNumbers[i]);
        }
    }

    setBoxColour(rouletteNumberBox){
        const yellow1 = 'yellow';
        const yellow2 = 'rgb(212, 216, 90)';
        const yellow3 = 'lightgoldenrodyellow';
        const gray1 = 'gray';
        const gray2 = 'lightgray';
        const blue = 'rgb(138, 226, 239)';
        const statusBar200 = rouletteNumberBox.getElementsByClassName('status-bar-200')[0];
        let bar2Classes = statusBar200.classList;
        const statusBar = rouletteNumberBox.getElementsByClassName('status-bar')[0];
        let bar1Classes = statusBar.classList;

        let boxColor = gray2;

        if(bar1Classes.contains("grey")){
            if(bar2Classes.contains('grey-200') || bar2Classes.contains('green')){
                boxColor = gray1;
            }else if(bar2Classes.contains('red')){
                boxColor = blue;
            }
        }else if(bar1Classes.contains("red")){
            if(bar2Classes.contains('grey-200')){
                boxColor = yellow3;
            }else if(bar2Classes.contains('red')){
                boxColor = yellow1;
            }else if(bar2Classes.contains('green')){
                boxColor = yellow2;
            }
        }else if(bar1Classes.contains("green")){
            if(bar2Classes.contains('grey-200')){
                boxColor = gray2;
            }else if(bar2Classes.contains('red')){
                boxColor = yellow2;
            }else if(bar2Classes.contains('green')){
                boxColor = blue;
            }
        }
        console.log('BOX COLOR FOR ', rouletteNumberBox.getElementsByTagName('div')[0].textContent, ' --- ', boxColor);
        rouletteNumberBox.style.backgroundColor = boxColor;
    }
} 
window.RouletteTable = RouletteTable;