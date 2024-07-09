// scripts.js
let items = [];

function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(value).replace(/,00$/, '');
}

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
    const quantitySold = parseInt(document.getElementById('quantitySold').value);

    if (!isNaN(purchasePrice) && !isNaN(sellingPrice) && !isNaN(quantitySold)) {
        const grossProfit = (sellingPrice - purchasePrice) * quantitySold;
        const margin = ((sellingPrice - purchasePrice) / sellingPrice) * 100;

        const item = {
            name: itemName,
            purchasePrice: purchasePrice,
            sellingPrice: sellingPrice,
            quantitySold: quantitySold,
            grossProfit: grossProfit.toFixed(2),
            margin: margin.toFixed(2)
        };

        items.push(item);
        displayItems(items);
        calculateTotal(items);
        document.getElementById('inventoryForm').reset();
    } else {
        alert('Pastikan semua input diisi dengan benar.');
    }
}

function displayItems(items) {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${formatCurrency(item.purchasePrice)}</td>
            <td>${formatCurrency(item.sellingPrice)}</td>
            <td>${item.quantitySold}</td>
            <td>${formatCurrency(item.grossProfit)}</td>
            <td>${item.margin}%</td>
        `;

        tbody.appendChild(row);
    });
}

function calculateTotal(items) {
    let totalGrossProfit = 0;
    let totalMargin = 0;

    items.forEach(item => {
        totalGrossProfit += parseFloat(item.grossProfit);
        totalMargin += parseFloat(item.margin);
    });

    const averageMargin = totalMargin / items.length;

    document.getElementById('totalGrossProfit').textContent = `Total Laba Kotor: ${formatCurrency(totalGrossProfit)}`;
    document.getElementById('averageMargin').textContent = `Rata-rata Margin: ${averageMargin.toFixed(2)}%`;
}

function calculateNetProfit() {
    const operationalCost = parseFloat(document.getElementById('operationalCostInput').value);
    const totalGrossProfitText = document.getElementById('totalGrossProfit').textContent;
    
    // Extract the numeric value from the formatted text
    const totalGrossProfit = parseFloat(totalGrossProfitText.replace(/[^\d,-]/g, '').replace(',', '.'));

    if (!isNaN(operationalCost) && !isNaN(totalGrossProfit)) {
        const netProfit = totalGrossProfit - operationalCost;
        document.getElementById('netProfit').textContent = `Laba Bersih: ${formatCurrency(netProfit)}`;
    } else {
        alert('Pastikan biaya operasional diisi dengan benar.');
    }
}
