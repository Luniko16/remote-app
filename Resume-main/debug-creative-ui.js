// Debug creative template in UI
// Run this in the browser console

console.log('=== CREATIVE TEMPLATE UI DEBUG ===');

// Check if creative template radio button exists and works
const radioButtons = document.querySelectorAll('input[type="radio"]');
console.log('Found radio buttons:', radioButtons.length);

let creativeRadio = null;
radioButtons.forEach((radio, index) => {
  console.log(`Radio ${index}: value="${radio.value}", checked=${radio.checked}`);
  if (radio.value === 'creative') {
    creativeRadio = radio;
  }
});

if (creativeRadio) {
  console.log('✅ Creative radio button found');
  console.log('Creative radio checked:', creativeRadio.checked);
  
  // Test clicking the creative radio
  window.testCreativeRadio = () => {
    console.log('🎨 Clicking creative radio button...');
    creativeRadio.click();
    
    setTimeout(() => {
      console.log('Creative radio checked after click:', creativeRadio.checked);
      const newTemplate = localStorage.getItem('resumai-template');
      console.log('Template in localStorage after click:', newTemplate);
    }, 100);
  };
  
  console.log('Test function added: testCreativeRadio()');
} else {
  console.log('❌ Creative radio button not found');
}

// Check resume preview for creative template indicators
const previewElement = document.getElementById('resume-preview');
if (previewElement) {
  console.log('✅ Resume preview element found');
  
  // Look for creative template indicators
  const hasCreativeIndicators = {
    primaryColor: previewElement.innerHTML.includes('text-primary'),
    flexLayout: previewElement.innerHTML.includes('flex'),
    creativeClass: previewElement.className.includes('creative') || previewElement.innerHTML.includes('creative'),
    purpleColor: previewElement.innerHTML.includes('purple') || previewElement.innerHTML.includes('#7c3aed')
  };
  
  console.log('Creative template indicators:', hasCreativeIndicators);
} else {
  console.log('❌ Resume preview element not found');
}

// Manual template test
window.forceCreativeTemplate = () => {
  console.log('🎨 Forcing creative template...');
  localStorage.setItem('resumai-template', 'creative');
  
  // Try to trigger template change if possible
  const event = new Event('storage');
  window.dispatchEvent(event);
  
  console.log('✅ Creative template forced. Refresh page to see changes.');
};

console.log('Manual test function: forceCreativeTemplate()');

console.log('\n=== END CREATIVE UI DEBUG ===');