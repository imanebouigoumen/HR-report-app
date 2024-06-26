export const parseTXT = (data) => {
    const lines = data.split('\n');
    const parsedData = {};
    lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
            parsedData[key.trim()] = value.trim();
        }
    });
    return parsedData;
};

export const parseCSV = (data) => {
    const lines = data.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const parsedData = {};

    lines.slice(1).forEach(line => {
        const values = [];
        let value = '';
        let withinQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                withinQuotes = !withinQuotes;
            } else if (char === ',' && !withinQuotes) {
                values.push(value.trim());
                value = '';
            } else {
                value += char;
            }
        }

        values.push(value.trim());

        headers.forEach((header, index) => {
            parsedData[header] = values[index];
        });
    });

    return parsedData;
};

export const parseXML = (data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const parsedData = {
        PrenomRapp: xmlDoc.getElementsByTagName("PrenomRapp")[0]?.textContent || '',
        NomRapp: xmlDoc.getElementsByTagName("NomRapp")[0]?.textContent || '',
        CommentaireRapp: xmlDoc.getElementsByTagName("CommentaireRapp")[0]?.textContent || '',
        NomCandidat: xmlDoc.getElementsByTagName("NomCandidat")[0]?.textContent || '',
        PrenomCandidat: xmlDoc.getElementsByTagName("PrenomCandidat")[0]?.textContent || '',
        ExperiencePro: xmlDoc.getElementsByTagName("ExperiencePro")[0]?.textContent || '',
        ParcoursScolaire: xmlDoc.getElementsByTagName("ParcoursScolaire")[0]?.textContent || '',
        Note: xmlDoc.getElementsByTagName("Note")[0]?.textContent || '0',
    };
    return parsedData;
};
window.parseTXT = parseTXT;
window.parseCSV = parseCSV;
window.parseXML = parseXML;

