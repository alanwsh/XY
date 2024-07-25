class HistoryTable {

    constructor(DOMTable, maximumNumber = 36, cols = 20, rows = 10) {
        this.table = DOMTable;
        this.cols = cols;
        this.rows = rows;
        this.history = [];
        this.frequency = new Array(maximumNumber+1).fill(0);
        this.frequency200 = new Array(maximumNumber+1).fill(0);
    }

    init(){
        this.createHeader();
        this.createTable();
    }

    createHeader(){
        const row = document.createElement('tr');
        for (let i = 0; i < this.cols; i++) {
            const header = document.createElement('th');
            header.textContent = i + 1;
            row.appendChild(header);
        }
        this.table.appendChild(row);
    }

    createTable(){
        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            this.table.appendChild(row);
        }
    }

    
    updateHistoryTable() {
        const cells = this.table.getElementsByTagName('td');
        for (let i = cells.length - 1; i > 0; i--) {
            cells[i].textContent = cells[i - 1].textContent;
        }
        cells[0].textContent = this.history.slice(-1);
    }

    getHistory(){
        return this.history;
    }

    addNumber(number) {
        const num = parseInt(number);
        if (!isNaN(num) && num >= 0 && num <= 36) {
            this.history.push(num);
            this.frequency[num]++;
            if (this.history.length > this.getTableSize()) {
                this.frequency200[this.history[this.history.length - this.getTableSize() + 1]]--;
            }
            if (this.history.length > this.maximumNumber + 1) {
                this.frequency[this.history[this.history.length - this.maximumNumber - 2]]--;
            }
            this.updateHistoryTable();
        }
    }

    getNumberFrequency(number){
        return this.frequency[number];
    }

    getTableSize(){
        return this.cols * this.rows;
    }
}

window.HistoryTable = HistoryTable;