// Comprehensive template debugging script
// Run this in the browser console to debug template selection

console.log('=== Template Flow Debug ===');

// 1. Check localStorage template
const storedTemplate = localStorage.getItem('resumai-template');
console.log('1. Template in localStorage:', storedTemplate);

// 2. Check if useTemplate hook is working
console.log('2. Checking template hook...');
// We can't directly access React hooks, but we can check the DOM

// 3. Check template selection UI
const templateRadios = document.querySelectorAll('input[type="radio"]');
console.log('3. Template radio buttons found:', templateRadios.length);

templateRadios.forEach((radio, index) => {
  console.log(`   Radio ${index}: value="${radio.value}", checked=${radio.checked}`);
});

// 4. Check resume preview element
const previewElement = document.getElementById('resume-preview');
if (previewElement) {
  console.log('4. ✅ Resume preview element found');
  console.log('   Classes:', previewElement.className);
  
  // Check if template-specific content is rendered
  const templateIndicators = {
    classic: previewElement.innerHTML.includes('Professional Summary'),
    modern: previewElement.innerHTML.includes('flex') || previewElement.innerHTML.includes('sidebar'),
    creative: previewElement.innerHTML.includes('About Me') || previewElement.innerHTML.includes('creative')
  };
  
  console.log('   Template indicators in DOM:', templateIndicators);
} else {
  console.log('4. ❌ Resume preview element not found');
}

// 5. Test template switching
console.log('5. Template switching test:');
console.log('   Try changing template in UI and run this script again');
console.log('   The localStorage value should change');

// 6. Test PDF generation with debug
console.log('6. To test PDF generation:');
console.log('   - Open browser console');
console.log('   - Click "Export to PDF"');
console.log('   - Look for "PDF Generation - Template: [template-name]" in logs');
console.log('   - Check if the correct template is being used');

// 7. Manual template test
console.log('7. Manual template test:');
console.log('   Run: localStorage.setItem("resumai-template", "modern")');
console.log('   Then refresh page and check if Modern template is selected');

console.log('=== End Template Debug ===');

// Helper function to test template switching
window.testTemplate = function(templateName) {
  console.log(`Testing template: ${templateName}`);
  localStorage.setItem('resumai-template', templateName);
  console.log('Template set in localStorage. Refresh page to see changes.');
};

console.log('Helper function added: testTemplate("modern"), testTemplate("creative"), testTemplate("classic")');