const defaultPublicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFLHJGpStu7ztcJlKaqPGV+niVSpfczhs68QV8blp4PWEqkkDl17Abq0CZsxsLGMrlGuTiAODLb0aEMV2Yp//sNyNiLlUuzNXtCmUdI/1Z6EUxnM6ry4jmSnyLTocxR+eXc0DG6RRa37/GOODOrOjKPkRb2bISYW6UubuIDc+ViQIDAQAB
-----END PUBLIC KEY-----
`;

const defaultPrivateKeyPem = `
-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAMUsckalK27vO1wmUpqo8ZX6eJVKl9zOGzrxBXxuWng9YSqSQOXXsBurQJmzGwsYyuUa5OIA4MtvRoQxXZin/+w3I2IuVS7M1e0KZR0j/VnoRTGczqvLiOZKfItOhzFH55dzQMbpFFrfv8Y44M6s6Mo+RFvZshJhbpS5u4gNz5WJAgMBAAECgYAHXhX2YiVBfmqbPWADIRfx24uWQdTIg+Jhl/BKtNGS7PGMsS1VSUjD0pOAisA9GxPjGVepwuWjbwjVV1uLdjo/okHD16M6eb2z+7r9tKTk8AkHKiUWUjZoPy9KCqYYsDR4MxSg+V8a5OXxEgGy/mNNw5RVB9ZH89LR3Ill3XuxOQJBAPy2zpb64HV0g1trE/faA3eGiLIRk0XtzBD/aKGGsE0Zop+M2EC4+mO0U5gMxwjrJgckE/vAnLzUPguyl895lq0CQQDHvMPzcdm2lHlw6u/BUq9/gYAuQydnphnL+taK6FrTeyvGUoNZBULCl1wfbq2+r92VveXBnYBdYgrIG5vo8EHNAkEAt8aNB9ibYG8Bk3qUA9sESGiKgcwsKF9c1kOWqFhVX0w0Kgj3vmGGnPknDVzFZSPz/J9s9NhGYz+Je2I96gBG5QJARnNiel/R9wBvxVBYuMu9cy/uUmMFZx3DQ5t6SQyj3Kw5SH6aLbAZWCGjMMMNLZFCiyqr+5reSBHo06RJXeRAkQJARji9/YlnX8Z5S1i+ATuTXYbUzyLi9WkxD/NWUuZWadiAJv0r+JsuLqC3oYaIkL1BPQw1zv24wVX8lvnNHylodw==
-----END PRIVATE KEY-----
`;

// Sincroniza el contenido del textarea con el pre para resaltado
document.getElementById('jsonInput').addEventListener('input', function() {
    const codeElement = document.getElementById('jsonHighlight');
    codeElement.textContent = this.value;
    Prism.highlightElement(codeElement);
    adjustTextareaHeight(this); // Ajustar altura del textarea
});

// Sincroniza el contenido del textarea cifrado con el pre para resaltado
document.getElementById('encryptedInput').addEventListener('input', function() {
    const codeElement = document.getElementById('encryptedJsonHighlight');
    codeElement.textContent = this.value;
    Prism.highlightElement(codeElement);
    adjustTextareaHeight(this); // Ajustar altura del textarea
});

// Función para ajustar la altura del textarea al contenido
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

// Ajusta la altura del textarea cuando se pega contenido
document.getElementById('jsonInput').addEventListener('paste', function() {
    setTimeout(() => adjustTextareaHeight(this), 0);
});

document.getElementById('encryptedInput').addEventListener('paste', function() {
    setTimeout(() => adjustTextareaHeight(this), 0);
    const codeElement = document.getElementById('encryptedJsonHighlight');
    codeElement.textContent = document.getElementById('encryptedInput').value;
    Prism.highlightElement(codeElement);
});

// Mostrar/Ocultar el textarea para la clave personalizada (Cifrado)
document.querySelectorAll('input[name="keyOption"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const customKeyContainer = document.getElementById('customKeyContainer');
        if (this.value === 'custom') {
            customKeyContainer.style.display = 'block';
        } else {
            customKeyContainer.style.display = 'none';
        }
    });
});

// Mostrar/Ocultar el textarea para la clave privada personalizada (Descifrado)
document.querySelectorAll('input[name="privateKeyOption"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const customPrivateKeyContainer = document.getElementById('customPrivateKeyContainer');
        if (this.value === 'custom') {
            customPrivateKeyContainer.style.display = 'block';
        } else {
            customPrivateKeyContainer.style.display = 'none';
        }
    });
});

// Función para obtener la clave pública desde el localStorage o usar la predeterminada
function getPublicKey() {
    const storedKey = localStorage.getItem('publicKeyPem');
    if (storedKey) {
        return storedKey;
    } else {
        return defaultPublicKeyPem;
    }
}

// Función para obtener la clave privada desde el localStorage o usar la predeterminada
function getPrivateKey() {
    const storedKey = localStorage.getItem('privateKeyPem');
    if (storedKey) {
        return storedKey;
    } else {
        return defaultPrivateKeyPem;
    }
}

// Guardar la clave pública manualmente si se presiona el botón "Guardar Clave Pública"
document.getElementById('saveKeyButton').addEventListener('click', function() {
    const userKey = document.getElementById('publicKeyInput').value.trim();
    if (userKey) {
        localStorage.setItem('publicKeyPem', userKey);
        alert('Clave pública guardada en el navegador.');
        document.getElementById('customKeyContainer').style.display = 'none';
        document.getElementById('useCustomKey').checked = true;
    } else {
        alert('Por favor, ingrese una clave pública válida antes de guardarla.');
    }
});

// Guardar la clave privada manualmente si se presiona el botón "Guardar Clave Privada"
document.getElementById('savePrivateKeyButton').addEventListener('click', function() {
    const userKey = document.getElementById('privateKeyInput').value.trim();
    if (userKey) {
        localStorage.setItem('privateKeyPem', userKey);
        alert('Clave privada guardada en el navegador.');
        document.getElementById('customPrivateKeyContainer').style.display = 'none';
        document.getElementById('useCustomPrivateKey').checked = true;
    } else {
        alert('Por favor, ingrese una clave privada válida antes de guardarla.');
    }
});

function renderCheckboxes(jsonObject, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar el contenedor

    function createCheckbox(key, value) {
        const div = document.createElement('div');
        div.className = 'form-check';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'checkbox';
        input.id = key;
        input.value = key;

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = key;
        label.textContent = `${key}: ${value}`;

        div.appendChild(input);
        div.appendChild(label);
        container.appendChild(div);
    }

    function traverseObject(obj, currentKey = '') {
        for (const [key, value] of Object.entries(obj)) {
            const fullKey = currentKey ? `${currentKey}.${key}` : key;
            if (typeof value === 'object' && value !== null) {
                traverseObject(value, fullKey);
            } else {
                createCheckbox(fullKey, value);
            }
        }
    }

    traverseObject(jsonObject);
}

document.getElementById('jsonForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const jsonInput = document.getElementById('jsonInput').value;
    let jsonObject;

    try {
        jsonObject = JSON.parse(jsonInput);
        renderCheckboxes(jsonObject, 'checkboxContainer');
        document.getElementById('encryptionForm').style.display = 'block';
    } catch (error) {
        alert('El JSON de entrada no es válido.');
        console.error('Error en la validación del JSON:', error);
    }
});

document.getElementById('decryptJsonForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const encryptedInput = document.getElementById('encryptedInput').value;
    let encryptedObject;

    try {
        encryptedObject = JSON.parse(encryptedInput);
        renderCheckboxes(encryptedObject, 'decryptCheckboxContainer');
        document.getElementById('decryptionForm').style.display = 'block';
    } catch (error) {
        alert('El JSON cifrado no es válido.');
        console.error('Error en la validación del JSON cifrado:', error);
    }
});

async function encryptWithRSAOAEP(message, publicKeyPem) {
    try {
        const binaryDerString = atob(publicKeyPem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, ''));
        const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));

        const publicKey = await crypto.subtle.importKey(
            "spki",
            binaryDer.buffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            false,
            ["encrypt"]
        );

        const encodedMessage = new TextEncoder().encode(message);
        const encrypted = await crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            encodedMessage
        );

        return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    } catch (error) {
        alert('Error en el cifrado RSA-OAEP.');
        console.error('Error en el cifrado RSA-OAEP:', error);
    }
}

async function encryptWithPKCS1(message, publicKeyPem) {
    try {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKeyPem);
        return encrypt.encrypt(message);
    } catch (error) {
        alert('Error en el cifrado PKCS1.');
        console.error('Error en el cifrado PKCS1:', error);
    }
}

async function encryptJsonValues(jsonObject, encryptionType, selectedKeys, publicKeyPem) {
    try {
        const encryptedJsonObject = {};
        for (const [key, value] of Object.entries(jsonObject)) {
            const fullKey = selectedKeys.includes(key) ? key : '';
            if (typeof value === 'object' && value !== null) {
                encryptedJsonObject[key] = await encryptJsonValues(value, encryptionType, selectedKeys.map(k => k.startsWith(`${key}.`) ? k.slice(key.length + 1) : '').filter(k => k), publicKeyPem);
            } else {
                if (selectedKeys.includes(fullKey)) {
                    if (encryptionType === 'RSA-OAEP') {
                        encryptedJsonObject[key] = await encryptWithRSAOAEP(value.toString(), publicKeyPem);
                    } else {
                        encryptedJsonObject[key] = await encryptWithPKCS1(value.toString(), publicKeyPem);
                    }
                } else {
                    encryptedJsonObject[key] = value;
                }
            }
        }
        return encryptedJsonObject;
    } catch (error) {
        alert('Error en el cifrado de los valores del JSON.');
        console.error('Error en el cifrado de los valores del JSON:', error);
    }
}

async function decryptWithRSAOAEP(encryptedValue, privateKeyPem) {
    try {
        const binaryDerString = atob(privateKeyPem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, ''));
        const binaryDer = new Uint8Array([...binaryDerString].map(char => char.charCodeAt(0)));

        const privateKey = await crypto.subtle.importKey(
            "pkcs8",
            binaryDer.buffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            false,
            ["decrypt"]
        );

        const encryptedBytes = new Uint8Array([...atob(encryptedValue)].map(c => c.charCodeAt(0)));
        const decryptedBuffer = await crypto.subtle.decrypt(
            {
                name: "RSA-OAEP"
            },
            privateKey,
            encryptedBytes
        );

        return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
        alert('Error en el descifrado RSA-OAEP.');
        console.error('Error en el descifrado RSA-OAEP:', error);
    }
}

async function decryptWithPKCS1(encryptedValue, privateKeyPem) {
    try {
        const decrypt = new JSEncrypt();
        decrypt.setPrivateKey(privateKeyPem);
        return decrypt.decrypt(encryptedValue);
    } catch (error) {
        alert('Error en el descifrado PKCS1.');
        console.error('Error en el descifrado PKCS1:', error);
    }
}

async function decryptJsonValues(encryptedObject, selectedKeys, privateKeyPem, decryptionType) {
    try {
        const decryptedJsonObject = {};
        for (const [key, value] of Object.entries(encryptedObject)) {
            const fullKey = selectedKeys.includes(key) ? key : '';
            if (typeof value === 'object' && value !== null) {
                decryptedJsonObject[key] = await decryptJsonValues(value, selectedKeys.map(k => k.startsWith(`${key}.`) ? k.slice(key.length + 1) : '').filter(k => k), privateKeyPem, decryptionType);
            } else {
                if (selectedKeys.includes(fullKey)) {
                    let decryptedValue;
                    if (decryptionType === 'RSA-OAEP') {
                        decryptedValue = await decryptWithRSAOAEP(value, privateKeyPem);
                    } else {
                        decryptedValue = await decryptWithPKCS1(value, privateKeyPem);
                    }
                    decryptedJsonObject[key] = decryptedValue !== null ? decryptedValue : value;
                } else {
                    decryptedJsonObject[key] = value;
                }
            }
        }
        return decryptedJsonObject;
    } catch (error) {
        alert('Error en el descifrado de los valores del JSON.');
        console.error('Error en el descifrado de los valores del JSON:', error);
    }
}

document.getElementById('encryptionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const encryptionType = document.getElementById('encryptionType').value;
    const publicKeyPem = getPublicKey();
    const checkboxes = document.querySelectorAll('#checkboxContainer input[type="checkbox"]:checked');
    const selectedKeys = Array.from(checkboxes).map(checkbox => checkbox.value);

    const jsonInput = document.getElementById('jsonInput').value;
    let jsonObject;

    try {
        jsonObject = JSON.parse(jsonInput);
        const encryptedJson = await encryptJsonValues(jsonObject, encryptionType, selectedKeys, publicKeyPem);
        document.getElementById('encryptedJson').querySelector('code').textContent = JSON.stringify(encryptedJson, null, 2);
        Prism.highlightAll();
    } catch (error) {
        alert('Error en el cifrado.');
        console.error('Error en el cifrado:', error);
    }
});

document.getElementById('decryptionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const privateKeyPem = getPrivateKey();
    const decryptionType = document.getElementById('decryptionType').value;
    const checkboxes = document.querySelectorAll('#decryptCheckboxContainer input[type="checkbox"]:checked');
    const selectedKeys = Array.from(checkboxes).map(checkbox => checkbox.value);

    const encryptedInput = document.getElementById('encryptedInput').value;
    let encryptedObject;

    try {
        encryptedObject = JSON.parse(encryptedInput);
        const decryptedJson = await decryptJsonValues(encryptedObject, selectedKeys, privateKeyPem, decryptionType);
        document.getElementById('decryptedJson').querySelector('code').textContent = JSON.stringify(decryptedJson, null, 2);
        Prism.highlightAll();
    } catch (error) {
        alert('Error en el descifrado.');
        console.error('Error en el descifrado:', error);
    }
});
