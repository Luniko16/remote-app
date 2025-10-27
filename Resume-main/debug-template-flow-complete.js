// Complete template flow debugging
// Run this in the browser console

console.log('=== COMPLETE TEMPLATE FLOW DEBUG ===');

// Step 1: Check localStorage
const storedTemplate = localStorage.getItem('resumai-template');
console.log('1. Template in localStorage:', storedTemplate);

// Step 2: Force set creative template
console.log('2. Setting creative template...');
localStorage.setItem('resumai-template', 'creative');
console.log('   Template set to:', localStorage.getItem('resumai-template'));

// Step 3: Check radio buttons
console.log('3. Checking radio buttons...');
const radioButtons = document.querySelectorAll('input[type="radio"]');
let creativeRadio = null;

radioButtons.forEach((radio, index) => {
  console.log(`   Radio ${index}: value="${radio.value}", checked=${radio.checked}`);
  if (radio.value === 'creative') {
    creativeRadio = radio;
  }
});

if (creativeRadio) {
  console.log('   ✅ Creative radio found, checked:', creativeRadio.checked);
} else {
  console.log('   ❌ Creative radio not found');
}

// Step 4: Check template context
console.log('4. Template context check...');
console.log('   Look for "TemplateProvider" logs in console');

// Step 5: Check resume preview element
console.log('5. Checking resume preview...');
const previewElement = document.getElementById('resume-preview');
if (previewElement) {
  console.log('   ✅ Preview element found');
  console.log('   Element HTML preview:', previewElement.innerHTML.substring(0, 300) + '...');
  
  // Check for creative template indicators
  const hasFlexLayout = previewElement.innerHTML.includes('flex');
  const hasPurpleColors = previewElement.innerHTML.includes('purple') || previewElement.innerHTML.includes('text-purple-600');
  const hasSidebar = previewElement.innerHTML.includes('w-[35%]') || previewElement.innerHTML.includes('sidebar');
  
  console.log('   Creative indicators:');
  console.log('   - Has flex layout:', hasFlexLayout);
  console.log('   - Has purple colors:', hasPurpleColors);
  console.log('   - Has sidebar:', hasSidebar);
  
  if (hasFlexLayout && hasPurpleColors && hasSidebar) {
    console.log('   ✅ Creative template is rendering correctly!');
  } else {
    console.log('   ❌ Creative template not rendering properly');
  }
} else {
  console.log('   ❌ Preview element not found');
}

// Step 6: Manual template test
window.forceCreativeAndRefresh = () => {
  console.log('🎨 Forcing creative template and refreshing...');
  localStorage.setItem('resumai-template', 'creative');
  
  // Try to click the creative radio if it exists
  const creativeRadio = document.querySelector('input[value="creative"]');
  if (creativeRadio) {
    console.log('   Clicking creative radio button...');
    creativeRadio.click();
  }
  
  setTimeout(() => {
    console.log('   Refreshing page...');
    location.reload();
  }, 1000);
};

// Step 7: Check if template is being overridden
console.log('6. Checking for template override...');
console.log('   After refresh, look for these logs:');
console.log('   ✅ "ResumePreview - Received template: creative"');
console.log('   ✅ "ResumePreview - Is creative? true"');
console.log('   ✅ "ResumePreview - Selected template component: CreativeTemplate"');

console.log('\nQuick fix function: forceCreativeAndRefresh()');
console.log('This will force creative template and refresh the page');

console.log('\n=== END COMPLETE DEBUG ===');