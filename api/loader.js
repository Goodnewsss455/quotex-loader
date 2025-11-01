const express = require('express');
const app = express();

// CORS enable করুন
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Main mobile-optimized loader code
app.get('/', (req, res) => {
  const loaderCode = `
(function() {
  // Mobile-Optimized Quotex Loader
  // Developer: @jisanmia
  // Server: jisanmia.pythonanywhere.com
  
  const SERVER_VERIFY = 'https://jisanmia.pythonanywhere.com/api/verify';
  const SERVER_FETCH_CODE = 'https://jisanmia.pythonanywhere.com/server';
  
  async function loadSweetAlert() {
    if (typeof Swal === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
  }

  function showMobileMessage(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.9); color: white; padding: 15px 25px; border-radius: 10px; z-index: 100000; font-size: 16px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3);';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s';
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }

  function createMobilePopup() {
    // Remove existing popup
    const existing = document.querySelector('.jisan-mobile-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = 'jisan-mobile-popup';
    popup.innerHTML = \\\`
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 99999; overflow-y: auto; font-family: Arial, sans-serif;">
        <button onclick="this.parentElement.remove()" style="position: fixed; top: 15px; right: 15px; width: 40px; height: 40px; background: #FF4757; color: white; border: none; border-radius: 50%; font-size: 20px; z-index: 100000;">×</button>
        
        <div style="background: linear-gradient(135deg, #667eea, #764ba2); margin: 20px; padding: 25px; border-radius: 20px; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid rgba(255,255,255,0.3);">
            <h2 style="margin: 0 0 10px 0; font-size: 24px;">🚀 QUOTEX TOOLS</h2>
            <p style="margin: 0; opacity: 0.9;">Developer: @jisanmia</p>
          </div>

          <div style="background: rgba(255,255,255,0.1); padding: 20px; margin: 20px 0; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2);">
            <h3 style="margin: 0 0 15px 0; text-align: center;">📊 Leaderboard Settings</h3>
            <input type="text" id="mobileName" placeholder="Your Name" value="TraderJisan" style="width: 100%; padding: 15px; margin: 10px 0; border: none; border-radius: 10px; font-size: 16px; background: rgba(255,255,255,0.9); box-sizing: border-box;">
            <input type="number" id="mobileBalance" placeholder="Balance" value="12500" style="width: 100%; padding: 15px; margin: 10px 0; border: none; border-radius: 10px; font-size: 16px; background: rgba(255,255,255,0.9); box-sizing: border-box;">
            
            <select id="mobileCountry" style="width: 100%; padding: 15px; margin: 10px 0; border: none; border-radius: 10px; font-size: 16px; background: rgba(255,255,255,0.9); box-sizing: border-box;">
              <option value="bd">🇧🇩 Bangladesh</option>
              <option value="in">🇮🇳 India</option>
              <option value="pk">🇵🇰 Pakistan</option>
              <option value="us">🇺🇸 USA</option>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
            <button onclick="updateLeaderboard()" style="padding: 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; color: white; font-size: 14px; cursor: pointer;">🔄 Update</button>
            <button onclick="enhanceUI()" style="padding: 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; color: white; font-size: 14px; cursor: pointer;">🎨 Enhance UI</button>
            <button onclick="removeAds()" style="padding: 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; color: white; font-size: 14px; cursor: pointer;">🚫 Remove Ads</button>
            <button onclick="showSignals()" style="padding: 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 10px; color: white; font-size: 14px; cursor: pointer;">📡 Signals</button>
          </div>

          <button onclick="applyAllSettings()" style="width: 100%; padding: 18px; margin: 10px 0; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; background: linear-gradient(45deg, #FF6B6B, #FF8E53); color: white;">💾 Apply Settings</button>
          <button onclick="toggleDarkMode()" style="width: 100%; padding: 18px; margin: 5px 0; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; background: linear-gradient(45deg, #4ECDC4, #44A08D); color: white;">🌙 Dark Mode</button>
        </div>
      </div>
    \\\`;

    document.body.appendChild(popup);
    setupMobileFunctions();
  }

  function setupMobileFunctions() {
    window.updateLeaderboard = function() {
      const name = document.getElementById('mobileName').value || 'TraderJisan';
      const balance = document.getElementById('mobileBalance').value || '12500';
      const country = document.getElementById('mobileCountry').value || 'bd';
      
      // Update leaderboard
      const elements = document.querySelectorAll('.position__header-name, [class*="name"], [class*="username"]');
      elements.forEach(el => {
        if (el.textContent && el.textContent.trim().length > 0) {
          el.innerHTML = \\\`\\\${getFlagEmoji(country)} \\\${name} - $\\\${balance}\\\`;
        }
      });
      
      showMobileMessage('Leaderboard updated!');
    };

    window.enhanceUI = function() {
      document.body.style.cssText += 'filter: contrast(1.1) brightness(1.05); transition: all 0.3s;';
      showMobileMessage('UI Enhanced!');
    };

    window.removeAds = function() {
      const ads = document.querySelectorAll('[class*="ad"], [class*="promo"], [class*="banner"]');
      ads.forEach(ad => ad.style.display = 'none');
      showMobileMessage('Ads removed!');
    };

    window.showSignals = function() {
      const signals = ['💰 BUY EUR/USD', '📉 SELL GBP/JPY', '💰 BUY GOLD', '📉 SELL OIL'];
      Swal.fire({
        title: '📡 Trading Signals',
        html: signals.map(s => \\\`<div style="padding: 10px; margin: 5px; background: #f8f9fa; border-radius: 8px;">\\\${s}</div>\\\`).join(''),
        confirmButtonText: 'Close'
      });
    };

    window.applyAllSettings = function() {
      updateLeaderboard();
      enhanceUI();
      removeAds();
      showMobileMessage('All settings applied!');
    };

    window.toggleDarkMode = function() {
      document.body.style.filter = document.body.style.filter.includes('invert') ? '' : 'invert(1) hue-rotate(180deg)';
      showMobileMessage('Dark mode toggled!');
    };
  }

  function getFlagEmoji(country) {
    const flags = {bd: '🇧🇩', in: '🇮🇳', pk: '🇵🇰', us: '🇺🇸'};
    return flags[country] || '🇺🇳';
  }

  // Initialize
  loadSweetAlert().then(() => {
    createMobilePopup();
    showMobileMessage('Quotex Tools Loaded! 👋');
  }).catch(err => {
    console.error('Loader error:', err);
  });

  console.log('📱 Quotex Mobile Tools Activated - @jisanmia');
})();
  `;

  res.setHeader('Content-Type', 'application/javascript');
  res.send(loaderCode);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mobile Loader Server Running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mobile loader server running on port ${PORT}`);
});

module.exports = app;
