const datalistTable = document.getElementById('datalist'); 

if (datalistTable) {
    const tableRows = datalistTable.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.classList.add('download-button');
        row.appendChild(downloadButton);

        downloadButton.addEventListener('click', () => {
            // ... (Logic to download data from the row)
        });
    });
} else {
    console.error("Table with ID 'datalist' not found!");
}
