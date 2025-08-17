window.onload = function() {
    showPage('anasayfa');
};

document.addEventListener("DOMContentLoaded", function(){
    const logo = document.getElementById("main-logo");
    if(logo) logo.onclick = () => showPage('anasayfa');
});

// Slider içerikleri (Ana sayfa)
const sliderGroups = [
    { title: "Güzelliği", desc: "Güzellik ve zarafetin buluştuğu koleksiyon." },
    { title: "Bahar Havası", desc: "Bahar havasını üzerinizde taşıyın!" },
    { title: "Çiçeklerin Esintisi", desc: "Doğanın renkleriyle iç içe." },
    { title: "Sade", desc: "Minimal ve şık tasarımlar." },
    { title: "Sanatsal", desc: "Sanatı yaşamınıza taşıyan ürünler." }
];

const collectionGroups = {
    "Güzelliği": Array.from({length: 6}, (_, i) => `Deneme Güzelliği ${i + 1}`),
    "Bahar Havası": Array.from({length: 6}, (_, i) => `Deneme Bahar ${i + 1}`),
    "Çiçeklerin Esintisi": Array.from({length: 6}, (_, i) => `Deneme Çiçek ${i + 1}`),
    "Sade": Array.from({length: 6}, (_, i) => `Deneme Sade ${i + 1}`),
    "Sanatsal": Array.from({length: 6}, (_, i) => `Deneme Sanatsal ${i + 1}`)
};

// Ürünler: 3 grup, her biri 50 ürün
const urunGroups = {
    "Seramik": Array.from({length: 50}, (_, i) => ({
        id: `seramik-${i+1}`,
        grup: "Seramik",
        name: `Deneme Seramik ${i + 1}`,
        price: `${(Math.random()*400+80).toFixed(0)} TL`,
        desc: `Seramik ürün açıklaması ${i+1}. El yapımı, özel tasarım.`,
        img: ""
    })),
    "El Sanatları": Array.from({length: 50}, (_, i) => ({
        id: `elsanat-${i+1}`,
        grup: "El Sanatları",
        name: `Deneme El Sanatları ${i + 1}`,
        price: `${(Math.random()*250+70).toFixed(0)} TL`,
        desc: `El Sanatları ürün açıklaması ${i+1}. Doğal ve estetik.`,
        img: ""
    })),
    "Takı": Array.from({length: 50}, (_, i) => ({
        id: `taki-${i+1}`,
        grup: "Takı",
        name: `Deneme Takı ${i + 1}`,
        price: `${(Math.random()*180+40).toFixed(0)} TL`,
        desc: `Takı ürün açıklaması ${i+1}. Modern ve zarif.`,
        img: ""
    }))
};

// Ana sayfa sliderı (tek büyük parça)
function renderSlider() {
    const section = document.querySelector('.slider-section');
    section.innerHTML = `<div class="slider-content" id="slider-content"></div>`;
    let idx = 0;
    const sliderContent = section.querySelector("#slider-content");
    function showSlide(newIdx) {
        sliderContent.classList.add('hide');
        setTimeout(() => {
            sliderContent.innerHTML = `
                <div class="slider-title">${sliderGroups[newIdx].title}</div>
                <div class="slider-desc">${sliderGroups[newIdx].desc}</div>
            `;
            sliderContent.onclick = () => showPage('koleksiyon', sliderGroups[newIdx].title);
            sliderContent.classList.remove('hide');
            idx = newIdx;
        }, 350);
    }
    let autoTimer = setInterval(() => showSlide((idx + 1) % sliderGroups.length), 5000);
    section.onmousedown = function() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => showSlide((idx + 1) % sliderGroups.length), 5000);
    };
    showSlide(0);
}

// Ana sayfa: slider, koleksiyonlar ve ürünler
function getAnaSayfa() {
    return `
        <div class="slider-section"></div>
        <div class="collection-section">
            <div class="collection-title" id="collection-title" onclick="showPage('koleksiyon')">KOLEKSİYONLAR</div>
            ${Object.keys(collectionGroups).map(grup => `
                <div class="collection-group-title">${grup}</div>
                <div class="collection-list">
                    ${collectionGroups[grup].map((item, idx) =>
                        `<div class="collection-card" onmouseenter="showHoverSlider(this, '${grup}', ${idx})" onmouseleave="hideHoverSlider(this)">
                            ${item}
                            <div class="hover-slider"></div>
                        </div>`
                    ).join('')}
                </div>
            `).join('')}
        </div>
        <div class="urunler-section">
            <div class="urunler-title">ÜRÜNLER</div>
            ${Object.keys(urunGroups).map(grup => `
                <div class="urun-group-title">${grup}</div>
                <div class="urunler-slider-container">
                    <div class="urunler-slider-list">
                        ${urunGroups[grup].map(item =>
                            `<div class="urunler-card" onclick="showUrunDetay('${item.id}', '${grup}')">
                                <div class="urunler-card-img">${item.name.split(' ').slice(-1)[0]}</div>
                                <div>${item.name}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Koleksiyonlar sayfası
function getKoleksiyonPage(grup) {
    let title = grup ? grup : "KOLEKSİYON";
    let items = grup && collectionGroups[grup]
        ? collectionGroups[grup].map((item, idx) => `
            <div class="collection-card" style="width:260px;height:180px;font-size:1.4rem;"
                onmouseenter="showHoverSlider(this, '${grup}', ${idx})"
                onmouseleave="hideHoverSlider(this)">
                ${item}
                <div class="hover-slider"></div>
            </div>
        `).join('')
        : Object.keys(collectionGroups).map(g => `
            <div class="collection-group-title">${g}</div>
            <div class="collection-list">
                ${collectionGroups[g].map((item, idx) => `
                    <div class="collection-card" onmouseenter="showHoverSlider(this, '${g}', ${idx})" onmouseleave="hideHoverSlider(this)">
                        ${item}
                        <div class="hover-slider"></div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    return `<div class="collection-section">
        <div class="collection-title">${title}</div>
        <div class="collection-list">${items}</div>
    </div>`;
}

// Ürünler sayfası
function getUrunlerPage(grup) {
    let title = grup ? grup : "ÜRÜNLER";
    let items = grup && urunGroups[grup]
        ? `
            <div class="urun-group-title">${grup}</div>
            <div class="urunler-slider-container">
                <div class="urunler-slider-list">
                    ${urunGroups[grup].map(item => `
                        <div class="urunler-card" onclick="showUrunDetay('${item.id}', '${grup}')">
                            <div class="urunler-card-img">${item.name.split(' ').slice(-1)[0]}</div>
                            <div>${item.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `
        : Object.keys(urunGroups).map(g => `
            <div class="urun-group-title">${g}</div>
            <div class="urunler-slider-container">
                <div class="urunler-slider-list">
                    ${urunGroups[g].map(item => `
                        <div class="urunler-card" onclick="showUrunDetay('${item.id}', '${g}')">
                            <div class="urunler-card-img">${item.name.split(' ').slice(-1)[0]}</div>
                            <div>${item.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    setTimeout(initUrunlerSlider, 100);
    return `<div class="urunler-section">
        <div class="urunler-title">${title}</div>
        ${items}
    </div>`;
}

// Ürün detay sayfası
function getUrunDetayPage(itemId, grup) {
    let item = (urunGroups[grup] || []).find(x => x.id === itemId);
    if (!item) return `<div class="urun-detay-section"><div>Ürün bulunamadı.</div></div>`;
    return `
        <div class="urun-detay-section">
            <div class="urun-detay-img">${item.name.split(' ').slice(-1)[0]}</div>
            <div class="urun-detay-title">${item.name}</div>
            <div class="urun-detay-price">${item.price}</div>
            <div class="urun-detay-desc">${item.desc}</div>
            <button class="urun-detay-back" onclick="showPage('urunler', '${grup}')">Geri</button>
        </div>
    `;
}

// Ürünler sliderı: oklar ve otomatik kaydırma kontrolü
function initUrunlerSlider() {
    document.querySelectorAll('.urunler-slider-container').forEach(container => {
        let scrollPos = 0;
        let direction = -1; // sola kaydırma
        let maxScroll = container.scrollWidth - container.clientWidth;
        let autoScrolling = true;
        function autoScroll() {
            if (!autoScrolling || maxScroll <= 0) return;
            scrollPos += direction * 2;
            if (scrollPos < 0) scrollPos = maxScroll;
            if (scrollPos > maxScroll) scrollPos = 0;
            container.scrollTo({left: scrollPos, behavior: 'smooth'});
        }
        // Otomatik kaydırma (yavaşlatılmış)
        let urunSliderInterval = setInterval(autoScroll, 80);

        // Ok butonlarını ekle
        if (!container.querySelector('.slider-arrow-left')) {
            let leftArrow = document.createElement('button');
            leftArrow.innerHTML = '←';
            leftArrow.className = 'slider-arrow-left';
            leftArrow.style.position = 'absolute';
            leftArrow.style.left = '0';
            leftArrow.style.top = '50%';
            leftArrow.style.transform = 'translateY(-50%)';
            leftArrow.style.zIndex = '10';
            leftArrow.style.background = '#7d3cff';
            leftArrow.style.color = '#fff';
            leftArrow.style.border = 'none';
            leftArrow.style.borderRadius = '50%';
            leftArrow.style.width = '36px';
            leftArrow.style.height = '36px';
            leftArrow.style.fontSize = '1.7rem';
            leftArrow.style.cursor = 'pointer';
            leftArrow.style.opacity = '0.85';
            leftArrow.onclick = function() {
                scrollPos = Math.max(0, container.scrollLeft - 150);
                container.scrollTo({left: scrollPos, behavior: 'smooth'});
            };
            container.appendChild(leftArrow);

            let rightArrow = document.createElement('button');
            rightArrow.innerHTML = '→';
            rightArrow.className = 'slider-arrow-right';
            rightArrow.style.position = 'absolute';
            rightArrow.style.right = '0';
            rightArrow.style.top = '50%';
            rightArrow.style.transform = 'translateY(-50%)';
            rightArrow.style.zIndex = '10';
            rightArrow.style.background = '#7d3cff';
            rightArrow.style.color = '#fff';
            rightArrow.style.border = 'none';
            rightArrow.style.borderRadius = '50%';
            rightArrow.style.width = '36px';
            rightArrow.style.height = '36px';
            rightArrow.style.fontSize = '1.7rem';
            rightArrow.style.cursor = 'pointer';
            rightArrow.style.opacity = '0.85';
            rightArrow.onclick = function() {
                scrollPos = Math.min(maxScroll, container.scrollLeft + 150);
                container.scrollTo({left: scrollPos, behavior: 'smooth'});
            };
            container.appendChild(rightArrow);
        }

        // Fare ile slider'a gelince otomatik kaydırma tamamen dursun
        container.onmouseenter = () => { autoScrolling = false; };
        container.onmouseleave = () => { autoScrolling = true; };
        window.addEventListener('resize', () => { maxScroll = container.scrollWidth - container.clientWidth; });
        container.addEventListener('DOMNodeRemoved', () => clearInterval(urunSliderInterval));
    });
}

// İletişim sayfası
function getIletisimPage() {
    return `
        <div class="iletisim-section">
            <h2>İletişim</h2>
            <form>
                <input type="text" placeholder="Adınız Soyadınız" required><br>
                <input type="email" placeholder="E-posta" required><br>
                <textarea placeholder="Mesajınız" required style="height:80px;"></textarea><br>
                <button type="submit">Gönder</button>
            </form>
        </div>
    `;
}

// Blog sayfası
function getBlogPage() {
    return `
        <div class="blog-section">
            <h2>Blog</h2>
            <p>Burada blog yazıları yer alacak.</p>
        </div>
    `;
}

// Sayfa içeriklerini tanımla
const pages = {
    anasayfa: getAnaSayfa,
    koleksiyon: getKoleksiyonPage,
    urunler: getUrunlerPage,
    urundetay: getUrunDetayPage,
    iletisim: getIletisimPage,
    blog: getBlogPage
};

function showPage(page, grupOrId = "") {
    if(page === "urundetay" && typeof grupOrId === "object") {
        document.getElementById("content").innerHTML = pages[page](grupOrId.id, grupOrId.grup);
        return;
    }
    document.getElementById("content").innerHTML =
        typeof pages[page] === "function" ? pages[page](grupOrId) : pages[page];
    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    if(document.getElementById(`nav-${page}`)) document.getElementById(`nav-${page}`).classList.add("active");
    if(page === "anasayfa") setTimeout(() => { renderSlider(); }, 10);
    if(page === "urunler") setTimeout(initUrunlerSlider, 100);
}

// Ürün detayına gitmek için
window.showUrunDetay = function(itemId, grup) {
    showPage("urundetay", {id: itemId, grup});
};

// Koleksiyon hover fonksiyonları
window.showHoverSlider = function(card, grup, idx) {
    const hoverSlider = card.querySelector(".hover-slider");
    let imgs = [];
    for(let i=0; i<3; i++) {
        let num = idx + i + 1;
        imgs.push(`<div class="hover-slider-img">${grup} ${num}</div>`);
    }
    hoverSlider.innerHTML = imgs.join('');
    hoverSlider.style.display = "block";
};
window.hideHoverSlider = function(card) {
    const hoverSlider = card.querySelector(".hover-slider");
    hoverSlider.innerHTML = "";
    hoverSlider.style.display = "none";
};