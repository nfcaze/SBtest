// Tüm kullanıcıları localStorage'dan al
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// Kullanıcı kaydı
function register() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    if (!name || !email || !pass) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    let users = getUsers();

    // email varsa hata
    if (users.some(u => u.email === email)) {
        alert("Bu e-posta zaten kullanılıyor!");
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
    window.location = "login.html";
}

// Giriş yapma
function login() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    let users = getUsers();

    let user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
        alert("E-posta veya şifre hatalı!");
        return;
    }

    // Aktif kullanıcıyı kaydet
    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert("Giriş başarılı!");
    window.location = "index.html"; // Ana sayfaya yönlendir
}

// Çıkış yapma
function logout() {
    localStorage.removeItem("loggedUser");
    window.location = "login.html";
}
