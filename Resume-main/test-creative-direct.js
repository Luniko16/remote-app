// Direct test of creative template
// Run this in the browser console

console.log('=== DIRECT CREATIVE TEMPLATE TEST ===');

// Step 1: Check if we're on the right page
console.log('1. Page check');
const isResumeBuilder = window.location.pathname === '/' || window.location.pathname.includes('resume');
console.log('   On resume builder page:', isResumeBuilder);

// Step 2: Force creative template and check immediately
console.log('2. Setting creative template');
localStorage.setItem('resumai-template', 'creative');

// Step 3: Check radio button state
console.log('3. Checking radio buttons');
const creativeRadio = document.querySelector('input[value="creative"]');
if (creativeRadio) {
  console.log('   Creative radio found, checked:', creativeRadio.checked);
  if (!creativeRadio.checked) {
    console.log('   Clicking creative radio...');
    creativeRadio.click();
    console.log('   Creative radio now checked:', creativeRadio.checked);
  }
} else {
  console.log('   ❌ Creative radio not found');
}

// Step 4: Wait and check template rendering
setTimeout(() => {
  console.log('4. Checking template rendering after 1 second...');
  
  const preview = document.getElementById('resume-preview');
  if (preview) {
    // Look for very specific creative template indicators
    const creativeSidebar = preview.querySelector('div[class*="w-[35%]"]');
    const purpleElements = preview.querySelectorAll('[class*="purple"]');
    const flexElements = preview.querySelectorAll('[class*="flex"]');
    
    console.log('   Creative sidebar found:', !!creativeSidebar);
    console.log('   Purple elements count:', purpleElements.length);
    console.log('   Flex elements count:', flexElements.length);
    
    if (creativeSidebar && purpleElements.length > 0) {
      console.log('   ✅ Creative template is working!');
    } else {
      console.log('   ❌ Creative template not detected');
      console.log('   Preview classes:', preview.className);
      console.log('   First child classes:', preview.firstElementChild?.className);
    }
  } else {
    console.log('   ❌ No preview element found');
  }
}, 1000);

// Step 5: Force refresh test
window.forceCreativeRefresh = () => {
  console.log('🎨 Forcing creative template with refresh...');
  
  // Set template
  localStorage.setItem('resumai-template', 'creative');
  
  // Click radio if exists
  const radio = document.querySelector('input[value="creative"]');
  if (radio) radio.click();
  
  // Refresh
  setTimeout(() => location.reload(), 500);
};

console.log('\nForce refresh function: forceCreativeRefresh()');

console.log('\n=== DIRECT TEST COMPLETE ===');