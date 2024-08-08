

document.addEventListener('DOMContentLoaded', function () {

    const historyTable = document.getElementById('history-table');
    const addNumberButton = document.getElementById('add-number');
    const pastNumberInput = document.getElementById('past-number');
    const rouletteTable = document.getElementById('roulette-table');
    const rouletteTable2 = document.getElementById('roulette-v2');

    function seedDummyData(){
        for(let i = 0; i < 200; i ++){
            addNumber(Math.floor(Math.random() * (36 - 0 + 1)) + 0)
        }
        updateHistoryTable();
        updateRouletteTable();
    }

    const maximumNumber = 36;
    const row = 40;
    const col = 10;

    const his_table = new HistoryTable(historyTable, maximumNumber, col, row);
    his_table.init();

    const rou_table = new RouletteTable(rouletteTable, 36);
    // rou_table.init();

    const rou_table_2 = new RouletteTable2(rouletteTable2, 36);
    rou_table_2.init();

    async function addNumber(){
        his_table.addNumber(pastNumberInput.value);
        await rou_table_2.updateRouletteTable(his_table);
        rou_table_2.updateBoxes();
        pastNumberInput.value = '';
    }
    addNumberButton.addEventListener('click', function (event) {
        addNumber();
    });

    pastNumberInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addNumber();
        }
    });
    
    // seedDummyData();
});
