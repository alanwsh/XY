document.addEventListener('DOMContentLoaded', function () {
    const historyTable = document.getElementById('history-table');
    const addNumberButton = document.getElementById('add-number');
    const pastNumberInput = document.getElementById('past-number');
    const rouletteTable = document.getElementById('roulette-table');
    
    let history = [];
    let frequency = new Array(37).fill(0);
    let frequency200 = new Array(37).fill(0);
    let cols = 20;
    let rows = 20;
    
    // Initialize the table with 500 slots
    const row = document.createElement('tr');
    for (let i = 0; i < cols; i++) {
        const header = document.createElement('th');
        header.textContent = i + 1;
        row.appendChild(header);
    }
    historyTable.appendChild(row);
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        historyTable.appendChild(row);
    }
    
    // Initialize the roulette table
    for (let i = 0; i < 37; i++) {
        const cell = document.createElement('div');
        cell.className = 'roulette-number';
        
        const number = document.createElement('div');
        number.textContent = i;
        
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
        
        rouletteTable.appendChild(cell);
    }

    function updateHistoryTable() {
        const cells = historyTable.getElementsByTagName('td');
        for (let i = cells.length - 1; i > 0; i--) {
            cells[i].textContent = cells[i - 1].textContent;
        }
        cells[0].textContent = history[history.length - 1];
    }
    
    function updateRouletteTable() {
        const rouletteNumbers = rouletteTable.getElementsByClassName('roulette-number');
        for (let i = 0; i < 37; i++) {
            const statusBar = rouletteNumbers[i].getElementsByClassName('status-bar')[0];
            const frequencyCount = rouletteNumbers[i].getElementsByClassName('frequency-count')[0];
            const statusBar200 = rouletteNumbers[i].getElementsByClassName('status-bar-200')[0];
            const frequencyCount200 = rouletteNumbers[i].getElementsByClassName('frequency-count-200')[0];
            
            const last37 = history.slice(-37);
            const last200 = history.slice(-200);
            
            const count37 = last37.filter(num => num == i).length;
            const count200 = last200.filter(num => num == i).length;
            
            frequencyCount.textContent = count37;
            frequencyCount200.textContent = count200;
            
            statusBar.className = 'status-bar grey';
            statusBar200.className = 'status-bar-200 grey-200';
            
            if (count37 === 0 && last37.length === 37) {
                statusBar.className = 'status-bar blue';
            } else if (last37.length === 37) {
                statusBar.className = 'status-bar grey';
            }
            
            if (count200 > 6 && last200.length === 200) {
                statusBar200.className = 'status-bar-200 green';
            } else if (last200.length === 200) {
                statusBar200.className = 'status-bar-200 grey-200';
            }
        }
        
        // Highlight the most drawn numbers
        if (history.length >= 37) {
            const counts = [];
            for (let i = 0; i < 37; i++) {
                counts.push({ number: i, count: frequency[i] });
            }
            counts.sort((a, b) => b.count - a.count);
            for (let i = 0; i < 3; i++) {
                rouletteNumbers[counts[i].number].getElementsByClassName('status-bar')[0].className = 'status-bar red';
            }
        }
        
        if (history.length >= 200) {
            const counts200 = [];
            for (let i = 0; i < 37; i++) {
                counts200.push({ number: i, count: frequency200[i] });
            }
            counts200.sort((a, b) => b.count - a.count);
            for (let i = 0; i < 10; i++) {
                rouletteNumbers[counts200[i].number].getElementsByClassName('status-bar-200')[0].className = 'status-bar-200 pink';
            }
        }
    }

    function addNumber() {
        const num = parseInt(pastNumberInput.value);
        if (!isNaN(num) && num >= 0 && num <= 36) {
            history.push(num);
            frequency[num]++;
            if (history.length > 200) {
                frequency[history[history.length - 201]]--;
            }
            if (history.length > 37) {
                frequency200[history[history.length - 38]]--;
            }
            updateHistoryTable();
            updateRouletteTable();
        }
        pastNumberInput.value = '';
    }
    
    addNumberButton.addEventListener('click', addNumber);
    pastNumberInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addNumber();
        }
    });
});
