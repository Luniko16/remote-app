// Debug the creative template UI issue
// Run this in the browser console while on the resume page

console.log('=== CREATIVE TEMPLATE UI DEBUG ===');

// Step 1: Check current template state
const storedTemplate = localStorage.getItem('resumai-template');
console.log('1. Template in localStorage:', storedTemplate);

// Step 2: Check radio button state
const radioButtons = document.querySelectorAll('input[type="radio"]');
console.log('2. Radio buttons found:', radioButtons.length);

let creativeRadio = null;
radioButtons.forEach((radio, index) => {
  console.log(`   Radio ${index}: value="${radio.value}", checked=${radio.checked}`);
  if (radio.value === 'creative') {
    creativeRadio = radio;
  }
});

// Step 3: Force creative template selection
if (creativeRadio) {
  console.log('3. ✅ Creative radio found, forcing selection...');
  creativeRadio.checked = true;
  creativeRadio.click();
  
  // Trigger change event
  const event = new Event('change', { bubbles: true });
  creativeRadio.dispatchEvent(event);
  
  console.log('   Creative radio now checked:', creativeRadio.checked);
} else {
  console.log('3. ❌ Creative radio not found');
}

// Step 4: Check template context logs
console.log('4. Look for these logs in console:');
console.log('   ✅ "RadioGroup - Template changing from [old] to creative"');
console.log('   ✅ "TemplateProvider - 🎨 SWITCHING TO CREATIVE TEMPLATE"');
console.log('   ✅ "ResumeBuilder - Current template: creative"');
console.log('   ✅ "🎨 CreativeTemplate component is rendering!"');

// Step 5: Check preview element content
setTimeout(() => {
  console.log('5. Checking preview element after 2 seconds...');
  
  const preview = document.getElementById('resume-preview');
  if (preview) {
    // Look for creative template indicators
    const hasSidebar = preview.innerHTML.includes('w-[35%]');
    const hasTealColors = preview.innerHTML.includes('text-teal-600');
    const hasGrayBackground = preview.innerHTML.includes('bg-gray-50');
    const hasContactSection = preview.innerHTML.includes('CONTACT');
    
    console.log('   Creative template indicators:');
    console.log('   - Has sidebar (w-[35%]):', hasSidebar);
    console.log('   - Has teal colors:', hasTealColors);
    console.log('   - Has gray background:', hasGrayBackground);
    console.log('   - Has CONTACT section:', hasContactSection);
    
    if (hasSidebar && hasTealColors && hasContactSection) {
      console.log('   ✅ Creative template is rendering correctly!');
    } else {
      console.log('   ❌ Creative template not rendering - showing wrong template');
      
      // Check what template is actually showing
      if (preview.innerHTML.includes('About Me') && preview.innerHTML.includes('Experience') && preview.innerHTML.includes('Skills')) {
        console.log('   🔍 Detected: Looks like Modern template is showing instead');
      } else if (preview.innerHTML.includes('Professional Summary')) {
        console.log('   🔍 Detected: Looks like Classic template is showing instead');
      }
    }
    
    // Show first 500 characters of preview content
    console.log('   Preview content sample:', preview.innerHTML.substring(0, 500) + '...');
  } else {
    console.log('   ❌ No preview element found');
  }
}, 2000);

// Step 6: Force refresh with creative template
window.forceCreativeTemplate = () => {
  console.log('🎨 FORCING CREATIVE TEMPLATE...');
  
  // Set in localStorage
  localStorage.setItem('resumai-template', 'creative');
  console.log('   ✅ Set localStorage to creative');
  
  // Click radio if exists
  const radio = document.querySelector('input[value="creative"]');
  if (radio) {
    radio.click();
    console.log('   ✅ Clicked creative radio');
  }
  
  // Refresh page
  console.log('   🔄 Refreshing page in 1 second...');
  setTimeout(() => {
    location.reload();
  }, 1000);
};

console.log('\nQuick fix function: forceCreativeTemplate()');
console.log('This will force creative template and refresh the page');

console.log('\n=== END CREATIVE UI DEBUG ===');