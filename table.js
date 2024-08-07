function waitForXHR(url, timeout = 5000) { // Default timeout is 5 seconds
    return new Promise((resolve, reject) => {
        let timeoutId;

        const xhrObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.initiatorType === 'xmlhttprequest' && entry.name.startsWith(url)) {
                    clearTimeout(timeoutId);
                    xhrObserver.disconnect(); 
                    resolve();
                }
            }
        });

        xhrObserver.observe({ type: 'resource', buffered: true });

        timeoutId = setTimeout(() => {
            xhrObserver.disconnect();
            reject(new Error(`XHR request for ${url} timed out after ${timeout}ms`));
        }, timeout);
    });
}

async function addDownloadButtons() {
    const datalistTable = document.getElementById('datalist');

    if (datalistTable) {
        try {
            const domain = window.location.hostname.split('.')[1]; // Extract domain from the current URL
            const xhrUrl = `https://www.${domain}.com/dashboard/data_list`;
            await waitForXHR(xhrUrl); // Wait for XHR to complete
    
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
        } catch (error) {
            console.error('Error waiting for XHR:', error.message);
            // You might want to handle the error, e.g., retry or show a message to the user
        }
    } else {
        console.error("Table with ID 'datalist' not found!");
    }
}

// Call the async function to start the process
addDownloadButtons();
