// Debug script to test PDF generation
// Run this in the browser console when on the resume page

console.log('=== PDF Debug Script ===');

// Check if resume data exists
const resumeData = JSON.parse(localStorage.getItem('resumai-data') || '{}');
console.log('Resume data from localStorage:', resumeData);

// Check if required elements exist
const previewElement = document.getElementById('resume-preview');
const mobilePreviewElement = document.getElementById('resume-preview-mobile');

console.log('Desktop preview element:', previewElement);
console.log('Mobile preview element:', mobilePreviewElement);

// Check if the data has content
if (resumeData.personalInfo) {
    console.log('Personal info name:', resumeData.personalInfo.name);
    console.log('Has experience:', resumeData.experience?.length > 0);
    console.log('Has education:', resumeData.education?.length > 0);
    console.log('Has skills:', resumeData.skills?.length > 0);
} else {
    console.log('❌ No personal info found in resume data');
}

// Test if PDF libraries are loaded
console.log('Checking PDF libraries...');
try {
    import('@react-pdf/renderer').then(() => {
        console.log('✅ @react-pdf/renderer is available');
    }).catch(() => {
        console.log('❌ @react-pdf/renderer failed to load');
    });

    import('html2pdf.js').then(() => {
        console.log('✅ html2pdf.js is available');
    }).catch(() => {
        console.log('❌ html2pdf.js failed to load');
    });
} catch (error) {
    console.log('Error checking libraries:', error);
}

console.log('=== End Debug Script ===');