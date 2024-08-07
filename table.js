const tableRows = document.querySelectorAll('table tbody tr'); 

tableRows.forEach(row => {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.classList.add('download-button'); 
    row.appendChild(downloadButton);

    downloadButton.addEventListener('click', () => {
        // Logic to download data from the row
        // ... (getwhoisdb: Fetch row data, trigger download)
        alert("Download functionality (replace with actual download logic)");
    });
});
