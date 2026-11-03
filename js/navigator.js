class SigapNavigator {
    constructor() {
        this.currentHeading = 0;
        this.targetBearing = 0;
        this.initCompass();
        this.updateBattery();
    }

    // Inisialisasi Sensor Giroskop/Kompas
    initCompass() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.currentHeading = e.alpha || 0;
                this.updateArrowRotation();
            });
        } else {
            document.getElementById('voice-indicator').innerText = "⚠️ Kompas tidak didukung";
        }
    }

    // Update Rotasi Panah Visual
    updateArrowRotation() {
        const arrow = document.getElementById('direction-arrow');
        if (!arrow) return;
        
        let rotation = this.targetBearing - this.currentHeading;
        arrow.style.transform = `rotate(${rotation}deg)`;
    }

    // Set Target Arah (Nanti dihubungkan ke QR/Landmark)
    setTarget(bearing) {
        this.targetBearing = bearing;
        this.updateArrowRotation();
        this.speak("Arahkan ke titik kumpul");
    }

    // Fitur Suara Panduan (TTS)
    speak(text) {
        if ('speechSynthesis' in window) {
            const msg = new SpeechSynthesisUtterance(text);
            msg.lang = 'id-ID';
            window.speechSynthesis.speak(msg);
            document.getElementById('voice-indicator').innerText = `🔊 ${text}`;
        }
    }

    // Monitor Baterai HP
    async updateBattery() {
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            document.getElementById('battery-level').innerText = Math.round(battery.level * 100);
            
            battery.addEventListener('levelchange', () => {
                document.getElementById('battery-level').innerText = Math.round(battery.level * 100);
            });
        }
    }
}

// Jalankan sistem saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    window.sigapNav = new SigapNavigator();
});
