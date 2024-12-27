import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getDatabase, ref as dbRef, set, get, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjLksACSndv1YrPAOCZ9vt8rr0zTrWdNI",
    authDomain: "homely-ebb5a.firebaseapp.com",
    projectId: "homely-ebb5a",
    storageBucket: "homely-ebb5a.appspot.com",
    messagingSenderId: "855755763878",
    appId: "1:855755763878:web:3198e35bd24c526a064467",
    measurementId: "G-RP2G216MDQ"
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const database = getDatabase(app);
    const auth = getAuth(app);

    // Event listener for the pay button
    document.getElementById('paybtn').addEventListener('click', (event) => {
        event.preventDefault();
        upgradeplan();
    });

    async function upgradeplan() {
        const newplan = sessionStorage.getItem('newplan');
        const clientId = sessionStorage.getItem('clientId');

        if (!newplan || !clientId) {
            alert("Invalid plan or client ID.");
            return;
        }

        let newAdds;
        switch (newplan) {
            case '1': newAdds = 5; break;
            case '2': newAdds = 10; break;
            case '3': newAdds = 20; break;
            case '4': newAdds = 50; break;
            default:
                alert("Invalid plan selected.");
                return;
        }

        try {
            const DBReference = dbRef(database, `UsersAuthList/${clientId}`);
            const userSnapshot = await get(DBReference);

            if (!userSnapshot.exists()) {
                alert("User data not found.");
                return;
            }

            const updates = { Plan: newplan, Adds: newAdds };
            await update(DBReference, updates);
            alert("Plan updated successfully.");
            window.location.href = "العميل/property .html"
        } catch (error) {
            console.error("Error updating plan:", error);
            alert("An error occurred while updating the plan. Please try again.");
        }
    }

    // Card number input formatting
    const cardNumInput = document.querySelector('#cardNum');
    cardNumInput.addEventListener('keyup', () => {
        let cNumber = cardNumInput.value.replace(/\s/g, '');

        if (Number(cNumber)) {
            cNumber = cNumber.match(/.{1,4}/g).join(' ');
            cardNumInput.value = cNumber;
        }
    });
});
