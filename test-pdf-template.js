// Test script to verify template selection is working
// Run this in the browser console

console.log('=== Template PDF Test ===');

// Check current template
const templateData = localStorage.getItem('resumai-template');
console.log('Current template from localStorage:', templateData);

// Check if template hook is working
if (window.React) {
  console.log('React is available');
} else {
  console.log('React not found in window');
}

// Check if resume preview element exists and has content
const previewElement = document.getElementById('resume-preview');
const mobilePreviewElement = document.getElementById('resume-preview-mobile');

if (previewElement) {
  console.log('✅ Desktop preview element found');
  console.log('Preview element classes:', previewElement.className);
  console.log('Preview element children count:', previewElement.children.length);
} else {
  console.log('❌ Desktop preview element not found');
}

if (mobilePreviewElement) {
  console.log('✅ Mobile preview element found');
  console.log('Mobile preview element classes:', mobilePreviewElement.className);
} else {
  console.log('❌ Mobile preview element not found');
}

// Test template switching
console.log('To test template switching:');
console.log('1. Change template in the UI');
console.log('2. Check localStorage: localStorage.getItem("resumai-template")');
console.log('3. Try PDF export and check console logs');

console.log('=== End Template Test ===');