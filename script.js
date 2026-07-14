// =========================
// Плавое появление страницы
// =========================

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// =========================
// Эффект шапки при скролле
// =========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(5,10,20,.92)";
        header.style.boxShadow = "0 0 25px rgba(0,170,255,.35)";

    } else {

        header.style.background = "rgba(0,0,0,.55)";
        header.style.boxShadow = "none";

    }

});

// =========================
// Кнопка "Играть"
// =========================

const play = document.querySelector(".play");

play.addEventListener("click", () => {

    alert("Добро пожаловать в Royal Casino!");

});

// =========================
// Кнопка "Бонус"
// =========================

const bonus = document.querySelector(".bonus");

bonus.addEventListener("click", () => {

    alert("🎁 Ваш бонус уже ждёт вас!");

});

// =========================
// Анимация свечения логотипа
// =========================

const logo = document.querySelector(".logo");

setInterval(() => {

    logo.style.textShadow = "0 0 25px #00AAFF";

    setTimeout(() => {

        logo.style.textShadow = "none";

    }, 700);

}, 2500);

// Функция для открытия нужного модального окна
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Функция для закрытия модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Переключение между окнами (например, из Входа сразу в Регистрацию)
function switchModal(currentModalId, targetModalId) {
    closeModal(currentModalId);
    openModal(targetModalId);
}

// Закрытие окна кликом на темную область вокруг него
window.onclick = function(event) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
}

// 1. Վերցնում ենք ֆորման կամ կոճակը և input-ները
const regForm = document.querySelector('#register-modal form'); // կամ քո ունեցած սելեկտորը
const usernameInput = document.querySelector('input[placeholder="Придумайте логин"]');
const emailInput = document.querySelector('input[placeholder="example@mail.com"]');

// 2. Լսում ենք ֆորմայի ուղարկման (submit) իրադարձությունը
regForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Որպեսզի էջը չվերաբեռնվի

    // Վերցնում ենք արժեքները
    const username = usernameInput.value;
    const email = emailInput.value;

    // 3. Պահում ենք LocalStorage-ում
    localStorage.setItem('registeredUser', username);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true'); // նշում ենք, որ օգտատերը մուտք է գործել

    alert('Գրանցումը հաջողվեց և տվյալները պահպանվեցին։');
    
    // Այստեղ կարող ես փակել մոդալ պատուհանը
    closeModal('register-modal'); 
});

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('registeredUser');

    if (isLoggedIn === 'true') {
        console.log(`Բարի գալուստ, ${savedUser}!`);
        // Օրինակ՝ «Войти» կոճակի փոխարեն կարող ես ցույց տալ իր անունը
        document.querySelector('.login-btn-class').textContent = savedUser; 
    }
});

const userObj = { name: "Victor", email: "example@mail.com", role: "user" };
localStorage.setItem('user', JSON.stringify(userObj));

const userData = JSON.parse(localStorage.getItem('user'));
console.log(userData.name); // Կտպի: Victor


// 1. Էջի տեսքը թարմացնելու ֆունկցիա (Header-ի համար)
function updateUI() {
    const currentUser = localStorage.getItem('currentUser'); // Ստուգում ենք՝ հիմա մարդ մտա՞ծ է

    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const profileUsername = document.getElementById('profile-username');

    if (currentUser) {
        if (authButtons) authButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (profileUsername) profileUsername.textContent = currentUser;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    }
}

// Էջը load լինելիս ստուգում ենք
document.addEventListener('DOMContentLoaded', updateUI);


// 2. ԳՐԱՆՑՈՒՄ (Регистрация)
document.addEventListener('click', function(event) {
    const regModal = document.getElementById('register-modal');
    if (!regModal) return;

    // Գտնում ենք գրանցման կապույտ կոճակը («Создать аккаунт»)
    const regButton = regModal.querySelector('button:not(.close)');
    
    if (event.target === regButton) {
        event.preventDefault();

        // Գտնում ենք input-ները ըստ իրենց placeholder-ների
        const usernameInput = regModal.querySelector('input[placeholder="Придумайте логин"]');
        const emailInput = regModal.querySelector('input[placeholder="example@mail.com"]');
        const passwordInput = regModal.querySelector('input[placeholder="Придумайте сложный пароль"]');

        if (!usernameInput || !emailInput || !passwordInput) return;

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === '' || email === '' || password === '') {
            alert('Խնդրում ենք լրացնել բոլոր դաշտերը։');
            return;
        }

        // Վերցնում ենք արդեն գրանցված բոլոր օգտատերերին (եթե չկան, դատարկ մասիվ ենք ստեղծում)
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Ստուգում ենք՝ արդյոք այս լոգինով մարդ արդեն գրանցվա՞ծ է
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            alert('Այս լոգինով օգտատեր արդեն կա։ Ընտրեք այլ լոգին։');
            return;
        }

        // Ավելացնում ենք նոր օգտատիրոջը մասիվի մեջ
        users.push({ username: username, email: email, password: password });
        
        // Պահում ենք թարմացված մասիվը LocalStorage-ում
        localStorage.setItem('users', JSON.stringify(users));

        alert('Դուք հաջողությամբ գրանցվեցիք։ Հիմա կարող եք մուտք գործել։');
        regModal.style.display = 'none'; // Փակում ենք մոդալը
    }
});


// 3. ՄՈՒՏՔ (Войти) - Հենց քո ուզած ստուգումը
document.addEventListener('click', function(event) {
    const loginModal = document.getElementById('login-modal');
    if (!loginModal) return;

    // Գտնում ենք մուտքի կապույտ կոճակը («Войти»)
    const loginButton = loginModal.querySelector('button:not(.close)');

    if (event.target === loginButton) {
        event.preventDefault();

        const loginInput = loginModal.querySelector('input[placeholder="Введите ваш email"]') || loginModal.querySelectorAll('input')[0];
        const passwordInput = loginModal.querySelector('input[placeholder="Введите пароль"]') || loginModal.querySelectorAll('input')[1];

        if (!loginInput || !passwordInput) return;

        const loginValue = loginInput.value.trim(); // Սա կարող է լինել և՛ լոգին, և՛ email
        const passwordValue = passwordInput.value.trim();

        if (loginValue === '' || passwordValue === '') {
            alert('Խնդրում ենք լրացնել բոլոր դաշտերը։');
            return;
        }

        // Բերում ենք բոլոր գրանցված օգտատերերին LocalStorage-ից
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Փնտրում ենք օգտատիրոջը, ում լոգինը (կամ email-ը) և գաղտնաբառը համընկնում են
        const foundUser = users.find(u => (u.username === loginValue || u.email === loginValue) && u.password === passwordValue);

        if (foundUser) {
            // Եթե գտանք՝ մարդը մտնում է համակարգ
            localStorage.setItem('currentUser', foundUser.username);
            loginModal.style.display = 'none'; // Փակում ենք մոդալը
            updateUI(); // Թարմացնում ենք header-ը
        } else {
            // ԵԹԵ ՉԿԱ ԿԱՄ ՍԽԱԼ Է
            alert('Այդպիսի օգտատեր գոյություն չունի կամ գաղտնաբառն է սխալ։');
        }
    }
});


// 4. ԴՈՒՐՍ ԳԱԼ (Выйти)
document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'logout-btn') {
        localStorage.removeItem('currentUser'); // Ջնջում ենք ակտիվ օգտատիրոջը
        updateUI();
    }
});

// Функция для вращения колеса
function spinWheel() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert("Пожалуйста, войдите в аккаунт, чтобы крутить колесо!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(u => u.username === currentUser);

    // Список возможных призов
    const prizes = [100, 0, 500, 50, 1000, 0, 250];
    // Выбираем случайный приз
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

    // Логика анимации вращения (допустим, колесо крутится через CSS)
    alert(`Колесо крутится...`);

    setTimeout(() => {
        if (randomPrize > 0) {
            users[userIndex].balance += randomPrize;
            alert(`Поздравляем! Вы выиграли ${randomPrize} $!`);
        } else {
            alert("Повезет в следующий раз! Вы ничего не выиграли.");
        }

        // Сохраняем новый баланс в LocalStorage
        localStorage.setItem('users', JSON.stringify(users));
        updateUI(); // Обновляем баланс в шапке
    }, 2000); // 2 секунды на "вращение"
}

// ==========================================
// ԱՆԻՎԻ ՊՏՏՄԱՆ ՏՐԱՄԱԲԱՆՈՒԹՅՈՒՆԸ (WHEEL OF FORTUNE)
// ==========================================
const spinButton = document.getElementById('spin-button');
const wheel = document.getElementById('wheel');

if (spinButton && wheel) {
    let isSpinning = false;

    spinButton.addEventListener('click', () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Пожалуйста, войдите в аккаунт, чтобы играть!');
            return;
        }

        if (isSpinning) return; 

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let userIndex = users.findIndex(u => u.username === currentUser);

        if (userIndex === -1) return;

        // Ստուգում ենք բալանսը (արժեքը 100$)
        if (users[userIndex].balance < 100) {
            alert('Недостаточно средств! Стоимость прокрутки 100 $.');
            return;
        }

        isSpinning = true;
        
        // Գանձում ենք 100$
        users[userIndex].balance -= 100;
        localStorage.setItem('users', JSON.stringify(users));
        if (typeof updateUI === 'function') updateUI(); 

        // Պտտում ենք (մինիմում 5 լրիվ պտույտ + random անկյուն)
        const randomDegree = Math.floor(Math.random() * 360) + 1800; 
        wheel.style.transform = `rotate(${randomDegree}deg)`;

        // Սպասում ենք 4 վայրկյան մինչև անիմացիան պրծնի
        setTimeout(() => {
            const actualDegree = randomDegree % 360;
            let prize = 0;

            // Հաշվարկ ըստ աստիճանների (8 սեկտոր, ամեն մեկը 45 աստիճան)
            if (actualDegree >= 0 && actualDegree < 45) prize = 200;
            else if (actualDegree >= 45 && actualDegree < 90) prize = 100;
            else if (actualDegree >= 90 && actualDegree < 135) prize = 300;
            else if (actualDegree >= 135 && actualDegree < 180) prize = 0;
            else if (actualDegree >= 180 && actualDegree < 225) prize = 1000;
            else if (actualDegree >= 225 && actualDegree < 270) prize = 50;
            else if (actualDegree >= 270 && actualDegree < 315) prize = 500;
            else prize = 0;

            // Ավելացնում ենք շահումը բալանսին
            users[userIndex].balance += prize;
            localStorage.setItem('users', JSON.stringify(users));
            if (typeof updateUI === 'function') updateUI(); 

            if (prize > 0) {
                alert(`🎉 Поздравляем! Вы выиграли ${prize} $!`);
            } else {
                alert('😢 Вы ничего не выиграли. Попробуйте еще раз!');
            }

            isSpinning = false;
        }, 4000);
    });
}

function startGame() {
    console.log("Կոճակը սեղմվեց!"); // Սա կերևա կոնսոլում

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert("Մուտք գործեք խաղալու համար!");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(u => u.username === currentUser);

    if (userIndex === -1) {
        alert("Օգտատերը չի գտնվել:");
        return;
    }

    if (users[userIndex].balance < 50) {
        alert("Բալանսը բավարար չէ (պետք է 50$):");
        return;
    }

    users[userIndex].balance -= 50;
    const roll = Math.floor(Math.random() * 6) + 1;
    
    const diceResult = document.getElementById('dice-result');
    if (diceResult) diceResult.textContent = roll;

    if (roll >= 4) {
        users[userIndex].balance += 150;
        alert("Շնորհավոր, դու շահեցիր 150 $!");
    } else {
        alert("Ցավոք, այս անգամ չստացվեց։");
    }

    localStorage.setItem('users', JSON.stringify(users));
    if (typeof updateUI === 'function') updateUI();
}

function addDailyBonus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return; // Եթե մուտք չի գործել, բոնուս չկա

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(u => u.username === currentUser);

    if (userIndex !== -1) {
        // Ավելացնում ենք 50$
        users[userIndex].balance = (users[userIndex].balance || 0) + 50;
        
        // Պահում ենք բազայում
        localStorage.setItem('users', JSON.stringify(users));
        
        // Թարմացնում ենք էջը
        updateUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    checkPageProtection();
    addDailyBonus(); // <--- Ավելացրու սա
});

function addDailyBonus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = users.findIndex(u => u.username === currentUser);

    // Ստուգում ենք՝ արդյոք այսօր արդեն ստացե՞լ է բոնուսը
    const today = new Date().toLocaleDateString();
    if (users[userIndex].lastBonusDate !== today) {
        users[userIndex].balance += 50;
        users[userIndex].lastBonusDate = today; // Գրում ենք այսօրվա ամսաթիվը
        localStorage.setItem('users', JSON.stringify(users));
        updateUI();
        alert("Դուք ստացաք ամենօրյա 50$ բոնուս!");
    }
}

