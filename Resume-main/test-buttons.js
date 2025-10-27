// Test script to check if buttons are working
// Run this in the browser console

console.log('=== Button Test ===');

// Check if export button in header exists
const exportButton = document.querySelector('[role="button"]:has(svg)');
console.log('Export button found:', !!exportButton);

// Check if download buttons in preview exist
const downloadButtons = document.querySelectorAll('button:has(svg)');
console.log('Total buttons with icons:', downloadButtons.length);

// Check if PDF generation functions are available
if (window.generateHTMLToPDF) {
  console.log('✅ generateHTMLToPDF is available');
} else {
  console.log('❌ generateHTMLToPDF not found');
}

// Check if resume preview elements exist
const previewElement = document.getElementById('resume-preview');
const mobilePreviewElement = document.getElementById('resume-preview-mobile');

console.log('Desktop preview element:', !!previewElement);
console.log('Mobile preview element:', !!mobilePreviewElement);

// Check if template data is available
const templateData = localStorage.getItem('resumai-template');
const resumeData = localStorage.getItem('resumai-data');

console.log('Template in localStorage:', templateData);
console.log('Resume data exists:', !!resumeData);

// Test button click simulation
console.log('To test buttons:');
console.log('1. Look for "Export" button in header');
console.log('2. Look for "Download PDF" button on resume preview');
console.log('3. Check browser console for any errors when clicking');

console.log('=== End Button Test ===');