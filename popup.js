/*

__/\\\\\\\\\\\\________/\\\\\\\\\_____/\\\\\\\\\\\__/\\\\____________/\\\\__/\\\________/\\\_        
 _\/\\\////////\\\____/\\\\\\\\\\\\\__\/////\\\///__\/\\\\\\________/\\\\\\_\///\\\____/\\\/__       
  _\/\\\______\//\\\__/\\\/////////\\\_____\/\\\_____\/\\\//\\\____/\\\//\\\___\///\\\/\\\/____      
   _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_____\/\\\\///\\\/\\\/_\/\\\_____\///\\\/______     
    _\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_____\/\\\_____\/\\\__\///\\\/___\/\\\_______\/\\\_______    
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\_____\/\\\____\///_____\/\\\_______\/\\\_______   
      _\/\\\_______/\\\__\/\\\_______\/\\\_____\/\\\_____\/\\\_____________\/\\\_______\/\\\_______  
       _\/\\\\\\\\\\\\/___\/\\\_______\/\\\__/\\\\\\\\\\\_\/\\\_____________\/\\\_______\/\\\_______ 
        _\////////////_____\///________\///__\///////////__\///______________\///________\///________
*/

const toggleCheckbox = document.getElementById('toggle-checkbox');
const statusText = document.getElementById('status-text');
const body = document.body;

chrome.storage.sync.get(['elementRemovalEnabled'], function(result) {
    const isEnabled = result.elementRemovalEnabled || false;
    toggleCheckbox.checked = isEnabled;
    body.classList.toggle('enabled', isEnabled);
    statusText.textContent = isEnabled ? "Removal is enabled" : "Removal is disabled";
});

toggleCheckbox.addEventListener('change', function() {
    const isEnabled = toggleCheckbox.checked;
    chrome.storage.sync.set({ elementRemovalEnabled: isEnabled }, function() {
        body.classList.toggle('enabled', isEnabled);

        if (isEnabled) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs[0]) {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        }

        statusText.textContent = isEnabled ? "Removal is enabled" : "Removal is disabled";
    });
});
