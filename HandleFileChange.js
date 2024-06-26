import { parseCSV, parseTXT, parseXML } from './Parsers.js';
import { showToastUpload } from './Toast.js';

function HandleFileChange(event) {
    showToastUpload();
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const fileType = file.name.split('.').pop();
            let fileData;

            switch (fileType) {
                case 'json':
                    fileData = JSON.parse(e.target.result);
                    break;
                case 'txt':
                    fileData = parseTXT(e.target.result);
                    break;
                case 'csv':
                    fileData = parseCSV(e.target.result);
                    break;
                case 'xml':
                    fileData = parseXML(e.target.result);
                    break;
                default:
                    console.error('Unsupported file type.');
                    return;
            }

            document.getElementsByName("PrenomRapp")[0].value = fileData.PrenomRapp || '';
            document.getElementsByName("NomRapp")[0].value = fileData.NomRapp || '';
            document.getElementsByName("CommentaireRapp")[0].value = fileData.CommentaireRapp || '';
            document.getElementsByName("NomCandidat")[0].value = fileData.NomCandidat || '';
            document.getElementsByName("PrenomCandidat")[0].value = fileData.PrenomCandidat || '';
            document.getElementsByName("ExperiencePro")[0].value = fileData.ExperiencePro || '';
            document.getElementsByName("ParcoursScolaire")[0].value = fileData.ParcoursScolaire || '';
            document.getElementsByName("Note")[0].value = fileData.Note || '0';
        } catch (error) {
            console.error('Error parsing file:', error);
        }
    };
    reader.readAsText(file);
}
window.HandleFileChange = HandleFileChange;
