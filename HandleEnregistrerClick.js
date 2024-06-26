import { convertXML, convertTXT, convertCSV } from './Converters.js';
import { showToast } from './Toast.js';

function HandleEnregistrerClick(event) {
    event.preventDefault();
    showToast();

    const fileType = document.querySelector('input[name="fileType"]:checked').value;
    const form = document.getElementById("form");
    const data = new FormData(form);
    const formJSON = Object.fromEntries(data.entries());

    // Convert formJSON to a Blob
    let blob;
    let filename;
    if (fileType === 'json') {
        blob = new Blob([JSON.stringify(formJSON, null, 2)], { type: 'application/json' });
        filename = `candidature-${formJSON.NomCandidat}-${formJSON.PrenomCandidat}-${formJSON.NomRapp}-${formJSON.PrenomRapp}.json`;
    } else if (fileType === 'txt') {
        const textData = convertTXT(formJSON);
        blob = new Blob([textData], { type: 'text/plain' });
        filename = `candidature-${formJSON.NomCandidat}-${formJSON.PrenomCandidat}-${formJSON.NomRapp}-${formJSON.PrenomRapp}.txt`;
    } else if (fileType === 'csv') {
        const csvData = convertCSV(formJSON);
        blob = new Blob([csvData], { type: 'text/csv' });
        filename = `candidature-${formJSON.NomCandidat}-${formJSON.PrenomCandidat}-${formJSON.NomRapp}-${formJSON.PrenomRapp}.csv`;
    } else if (fileType === 'xml') {
        const xmlData = convertXML(formJSON);
        blob = new Blob([xmlData], { type: 'application/xml' });
        filename = `candidature-${formJSON.NomCandidat}-${formJSON.PrenomCandidat}-${formJSON.NomRapp}-${formJSON.PrenomRapp}.xml`;
    }

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.click();
}

window.HandleEnregistrerClick = HandleEnregistrerClick;

