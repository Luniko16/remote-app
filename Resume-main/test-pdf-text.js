// Test script to verify PDF text selectability
// Run this in the browser console after generating a PDF

console.log('=== PDF Text Selectability Test ===');

// Check PDF generation method priority
console.log('Current PDF generation priority:');
console.log('1. Text-based PDF (creates selectable text)');
console.log('2. HTML-to-PDF (creates image-based PDF)');

// Check font sizes
console.log('Font size improvements:');
console.log('- Name: 28px (was 24px)');
console.log('- Section titles: 16px (was 14px)');
console.log('- Body text: 12px (was 11px)');
console.log('- Contact info: 11px (was 10px)');

// Instructions for testing
console.log('To test PDF text selectability:');
console.log('1. Generate a PDF using any export button');
console.log('2. Open the downloaded PDF');
console.log('3. Try to select text with your mouse');
console.log('4. If text is selectable, the text-based PDF worked');
console.log('5. If text is not selectable, it used HTML-to-PDF (image-based)');

// Check resume data
const resumeData = JSON.parse(localStorage.getItem('resumai-data') || '{}');
if (resumeData.personalInfo && resumeData.personalInfo.name) {
  console.log('✅ Resume has data - PDF should generate successfully');
  console.log('Name:', resumeData.personalInfo.name);
} else {
  console.log('❌ No resume data found - fill in some information first');
}

// Check template
const template = localStorage.getItem('resumai-template');
console.log('Selected template:', template || 'classic');

console.log('=== End PDF Text Test ===');