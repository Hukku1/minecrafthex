document.getElementById('gradientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const startColor = document.getElementById('startColor').value.replace('#', '');
    const endColor = document.getElementById('endColor').value.replace('#', '');
    const text = document.getElementById('text').value;
    const bold = document.getElementById('bold').checked;
    const format = document.getElementById('format').value;
    
    const maxLength = 245;

    function hexToCustomFormat(hexColor, textChar, bold, format) {
        let customFormat = "";
        if (textChar !== ' ') {
            if (format === 'format1') {
                customFormat = `&#${hexColor.toLowerCase()}`;
            } else if (format === 'format2') {
                customFormat = "&x";
                for (let i = 0; i < hexColor.length; i++) {
                    customFormat += `&${hexColor[i].toLowerCase()}`;
                }
            }
        }
        if (bold && textChar !== ' ') {
            customFormat += "&l";
        }
        customFormat += textChar;
        return customFormat;
    }

    function createGradient(startColor, endColor, text, maxLength, format) {
        let formattedStrings = [];
        while (true) {
            const steps = text.length;
            const startRGB = [parseInt(startColor.substring(0, 2), 16), parseInt(startColor.substring(2, 4), 16), parseInt(startColor.substring(4, 6), 16)];
            const endRGB = [parseInt(endColor.substring(0, 2), 16), parseInt(endColor.substring(2, 4), 16), parseInt(endColor.substring(4, 6), 16)];
            const deltaR = (endRGB[0] - startRGB[0]) / (steps - 1);
            const deltaG = (endRGB[1] - startRGB[1]) / (steps - 1);
            const deltaB = (endRGB[2] - startRGB[2]) / (steps - 1);

            let gradientColors = [];
            for (let step = 0; step < steps; step++) {
                const r = Math.round(startRGB[0] + deltaR * step);
                const g = Math.round(startRGB[1] + deltaG * step);
                const b = Math.round(startRGB[2] + deltaB * step);
                const hexColor = `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                gradientColors.push(hexColor);
            }

            formattedStrings = [];
            for (let i = 0; i < gradientColors.length; i++) {
                const formattedString = hexToCustomFormat(gradientColors[i], text[i] || ' ', bold, format);
                formattedStrings.push(formattedString);
            }

            const finalOutput = formattedStrings.join('');
            if (finalOutput.length <= maxLength) {
                return finalOutput;
            }
            text = text.slice(0, -1);
        }
    }

    const result = createGradient(startColor, endColor, text, maxLength, format);
    document.getElementById('output').textContent = result;
});

// Atualizar os valores hexadecimais dos color pickers em tempo real
document.getElementById('startColor').addEventListener('input', function() {
    document.getElementById('startColorValue').textContent = this.value;
});

document.getElementById('endColor').addEventListener('input', function() {
    document.getElementById('endColorValue').textContent = this.value;
});
