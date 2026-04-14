// Data storage
let answers = {
    name: '',
    foods: [],
    traits: [],
    want: '',
    message: ''
};

// Current step
let currentStep = 0;

// Render function
function renderStep() {
    // Hide all steps
    for (let i = 0; i <= 7; i++) {
        document.getElementById('step' + i).classList.add('hidden');
    }
    // Show current step
    document.getElementById('step' + currentStep).classList.remove('hidden');
}

// Next step
function nextStep() {
    if (currentStep < 7) {
        currentStep++;
        renderStep();
    }
}

// Save name
function saveName() {
    answers.name = document.getElementById('nameInput').value.trim();
    if (!answers.name) {
        alert('กรุณากรอกชื่อของคุณ.');
        return;
    }
    if (validateStep(1)) {
        nextStep();
    } else {
        alert('ชื่อไม่ถูกต้อง ลองใหม่อีกครั้ง.');
    }
}

// Save foods
function saveFoods() {
    answers.foods = Array.from(document.querySelectorAll('#step2 input:checked')).map(cb => cb.value);
    if (answers.foods.length === 0) {
        alert('กรุณาเลือกอาหารที่ชอบอย่างน้อยหนึ่งอย่าง.');
        return;
    }
    if (validateStep(2)) {
        nextStep();
    } else {
        alert('อาหารที่เลือกยังไม่ตรงตามคำถาม ลองเลือกใหม่อีกครั้ง.');
    }
}

// Save traits
function saveTraits() {
    answers.traits = Array.from(document.querySelectorAll('#step3 input:checked')).map(cb => cb.value);
    if (answers.traits.length === 0) {
        alert('กรุณาเลือกลักษณะบุคลิกอย่างน้อยหนึ่งอย่าง.');
        return;
    }
    if (validateStep(3)) {
        nextStep();
    } else {
        alert('ลักษณะที่เลือกยังไม่ใช่คำตอบที่ต้องการ ลองใหม่อีกครั้ง.');
    }
}

// Save want
function saveWant() {
    answers.want = document.getElementById('wantInput').value.trim();
    if (!answers.want) {
        alert('กรุณาแบ่งปันสิ่งที่คุณต้องการจากฉัน.');
        return;
    }
    if (validateStep(4)) {
        nextStep();
    } else {
        alert('คำตอบนี้ยังไม่ผ่านการตรวจสอบ ลองเขียนใหม่โดยมีคำว่า “รัก” หรือ “ชอบ” ในข้อความ.');
    }
}

// Save message
function saveMessage() {
    answers.message = document.getElementById('messageInput').value.trim();
    if (!answers.message) {
        alert('กรุณาแบ่งปันข้อความจากหัวใจของคุณ.');
        return;
    }
    if (validateStep(5)) {
        nextStep();
    } else {
        alert('ข้อความยังไม่ผ่าน ลองเขียนใหม่ให้อ่านแล้วซึ้งใจ.');
    }
}

// Validate answer for the current step
function validateStep(step) {
    const correctName = 'วุฒิกร ปั้นนาค';
    const correctFoods = ['ช็อกโกแลต', 'ไอศกรีม'];
    const correctTraits = ['โรแมนติก', 'ใจดี'];

    switch (step) {
        case 1:
            return answers.name === correctName;
        case 2:
            return correctFoods.every(food => answers.foods.includes(food));
        case 3:
            return correctTraits.every(trait => answers.traits.includes(trait));
        case 4:
            return /รัก|ชอบ|อยาก/.test(answers.want);
        case 5:
            return /รัก|หัวใจ|คิดถึง/.test(answers.message);
        default:
            return true;
    }
}

// Restart game
function restartGame() {
    answers = { name: '', foods: [], traits: [], want: '', message: '' };
    currentStep = 0;
    renderStep();
    // Clear inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('wantInput').value = '';
    document.getElementById('messageInput').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
}

// Initial render
renderStep();