export function convertCSV(data) {
  const headers = Object.keys(data).join(',');
  const values = Object.values(data).map(value => {
    // Si la valeur contient une virgule ou un saut de ligne, l'encadrer avec des guillemets
    if (value.includes(',') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`; // Échapper les guillemets en doublant les guillemets
    } else {
      return value;
    }
  }).join(',');
  return `${headers}\n${values}`;
}

// Fonction pour échapper les caractères spéciaux pour XML
function escapeXML(value) {
  return value.replace(/[<>&"]/g, (match) => {
    switch (match) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      default: return match;
    }
  });
}

// Fonction pour convertir les données en XML avec échappement des valeurs
export function convertXML(data) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<form_data>\n';
  for (const [key, value] of Object.entries(data)) {
    xml += `<${key}>${escapeXML(value)}</${key}>\n`;
  }
  xml += '</form_data>';
  return xml;
}

export function convertTXT(data) {
  return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
}
window.convertTXT = convertTXT;
window.convertCSV = convertCSV;
window.convertXML = convertXML;