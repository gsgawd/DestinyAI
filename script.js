const btnGetStarted = document.getElementById('btn-get-started');
const btnBack = document.getElementById('btn-back');
const birthForm = document.getElementById('birth-form');

const viewLanding = document.getElementById('landing-view');
const viewInput = document.getElementById('input-view');
const viewDashboard = document.getElementById('dashboard-view');
const viewPredictions = document.getElementById('predictions-view');
const viewRituals = document.getElementById('rituals-view');

const linkDashboard = document.getElementById('link-dashboard');
const linkPredictions = document.getElementById('link-predictions');
const linkRituals = document.getElementById('link-rituals');

const loadingSpinner = document.getElementById('loading-spinner');
const resultsGrid = document.getElementById('results-grid');
const errorMessage = document.getElementById('error-message');

const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// THEME TOGGLE
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });
}
initTheme();

// AM/PM TOGGLE LOGIC
const togglePills = document.querySelectorAll('.toggle-pill');
togglePills.forEach(pill => {
    pill.addEventListener('click', () => {
        togglePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const radio = pill.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    });
});

// PASSWORD VISIBILITY TOGGLE LOGIC
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const iconPath = btn.querySelector('.eye-icon path');
        
        if (input.type === 'password') {
            input.type = 'text';
            // Change icon to eye-off (crossed out eye)
            iconPath.setAttribute('d', 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22');
        } else {
            input.type = 'password';
            // Change icon to eye (open eye)
            iconPath.setAttribute('d', 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z');
        }
    });
});

// NAVIGATION
const allViews = [viewLanding, viewInput, viewDashboard, viewPredictions, viewRituals];
const navLinksMap = {
    'link-dashboard': viewLanding,
    'link-predictions': viewPredictions,
    'link-rituals': viewRituals
};

function switchView(viewToShow, activeLinkId = null) {
    allViews.forEach(view => {
        if (!view) return;
        view.classList.remove('active');
        setTimeout(() => view.classList.add('hidden'), 400);
    });
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (activeLinkId) {
        document.getElementById(activeLinkId).classList.add('active');
    }
    
    setTimeout(() => {
        if (!viewToShow) return;
        viewToShow.classList.remove('hidden');
        setTimeout(() => viewToShow.classList.add('active'), 50);
    }, 400);
}

if (btnGetStarted) btnGetStarted.addEventListener('click', () => switchView(viewInput));
if (btnBack) btnBack.addEventListener('click', (e) => { e.preventDefault(); switchView(viewLanding, 'link-dashboard'); });

if (linkDashboard) linkDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView(viewLanding, 'link-dashboard'); });
if (linkPredictions) linkPredictions.addEventListener('click', (e) => { e.preventDefault(); switchView(viewPredictions, 'link-predictions'); renderRashis('predictions'); });
if (linkRituals) linkRituals.addEventListener('click', (e) => { e.preventDefault(); switchView(viewRituals, 'link-rituals'); renderRashis('rituals'); });

// RASHI DATA GENERATION
const rashis = [
    { en: 'Aries', hi: 'Mesh (मेष)', sym: '♈' },
    { en: 'Taurus', hi: 'Vrishabha (वृषभ)', sym: '♉' },
    { en: 'Gemini', hi: 'Mithuna (मिथुन)', sym: '♊' },
    { en: 'Cancer', hi: 'Karka (कर्क)', sym: '♋' },
    { en: 'Leo', hi: 'Simha (सिंह)', sym: '♌' },
    { en: 'Virgo', hi: 'Kanya (कन्या)', sym: '♍' },
    { en: 'Libra', hi: 'Tula (तुला)', sym: '♎' },
    { en: 'Scorpio', hi: 'Vrishchika (वृश्चिक)', sym: '♏' },
    { en: 'Sagittarius', hi: 'Dhanu (धनु)', sym: '♐' },
    { en: 'Capricorn', hi: 'Makara (मकर)', sym: '♑' },
    { en: 'Aquarius', hi: 'Kumbha (कुंभ)', sym: '♒' },
    { en: 'Pisces', hi: 'Meena (मीन)', sym: '♓' }
];

function renderRashis(type) {
    const gridId = type === 'predictions' ? 'rashi-predictions-grid' : 'rashi-rituals-grid';
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    rashis.forEach(rashi => {
        const textContent = type === 'predictions' 
            ? `Today brings a surge of cosmic energy for ${rashi.en}. Focus on internal clarity.`
            : `Light a ghee lamp facing east and chant the Surya Mantra to invite prosperity.`;
            
        const card = document.createElement('div');
        card.className = 'rashi-card';
        card.innerHTML = `
            <div class="rashi-icon">${rashi.sym}</div>
            <div class="rashi-name-en">${rashi.en}</div>
            <div class="rashi-name-hi">${rashi.hi}</div>
            <p class="rashi-text">${textContent}</p>
        `;
        grid.appendChild(card);
    });
}


birthForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const birthPlace = document.getElementById('birthPlace').value;
    const birthTime = document.getElementById('birthTime').value;
    const dayNightRadio = document.querySelector('input[name="dayNight"]:checked');
    const dayNight = dayNightRadio ? dayNightRadio.value : 'Day';

    switchView(viewDashboard);
    resultsGrid.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');

    try {
        await generateKundli(fullName, birthPlace, birthTime, dayNight);
    } catch (error) {
        loadingSpinner.classList.add('hidden');
        errorMessage.textContent = "Error: " + error.message;
        errorMessage.classList.remove('hidden');
    }
});

async function generateKundli(name, place, time, dayNight) {
    if (typeof CONFIG === 'undefined' || !CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        throw new Error("Gemini API Key is missing. Please add it to config.js.");
    }

    const prompt = `Act as an expert Vedic Astrologer. Analyze the following birth details:
Name: ${name}
Birth Place: ${place}
Birth Time: ${time} (${dayNight})

Provide the analysis in a strict JSON format with the following keys, containing only text strings (no nested objects, use bullet points where asked):
"vedic_chart": "Identify Ascendant, Moon sign, and Sun sign.",
"planets": "3 short bullet points focusing on Health.",
"dasha": "3 short bullet points focusing on Core Strengths.",
"career": "3 short bullet points focusing on 5-Year Career Forecast.",
"wealth": "3 short bullet points focusing on 5-Year Wealth Forecast.",
"supporting": "3 short bullet points focusing on Areas for Caution."

Return ONLY valid JSON.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    let textResult = data.candidates[0].content.parts[0].text;
    
    textResult = textResult.replace(/```json\n?|\n?```/g, '');
    const resultJson = JSON.parse(textResult);

    const formatList = (text) => {
        if (!text) return "<li>Data currently unavailable.</li>";
        // Convert plain text bullets to actual <li> elements and bold words between **
        let items = text.split('\n').filter(i => i.trim() !== '');
        if (items.length === 1 && !items[0].includes('*')) {
            return `<li>${items[0].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
        }
        return items.map(item => `<li>${item.replace(/^[-*•]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('');
    };

    document.getElementById('res-vedic').innerHTML = `<li>${resultJson.vedic_chart ? resultJson.vedic_chart.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') : "Your celestial alignment suggests a profound period of transformation."}</li>`;
    document.getElementById('res-dasha').innerHTML = formatList(resultJson.dasha);
    document.getElementById('res-career').innerHTML = formatList(resultJson.career);
    document.getElementById('res-wealth').innerHTML = formatList(resultJson.wealth);
    document.getElementById('res-supporting').innerHTML = formatList(resultJson.supporting);
    document.getElementById('res-planets').innerHTML = formatList(resultJson.planets);

    // Artificial delay to build anticipation
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        resultsGrid.classList.remove('hidden');
    }, 2500); // 2.5 seconds of loading
}
