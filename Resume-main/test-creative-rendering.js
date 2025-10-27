// Test if creative template is actually rendering
// Run this in the browser console

console.log('=== CREATIVE TEMPLATE RENDERING TEST ===');

// Step 1: Force creative template
localStorage.setItem('resumai-template', 'creative');
console.log('1. Set template to creative');

// Step 2: Check if we can find the creative template elements
console.log('2. Checking for creative template elements...');

// Look for specific creative template elements
const checkElements = () => {
  const previewElement = document.getElementById('resume-preview');
  if (!previewElement) {
    console.log('❌ No preview element found');
    return;
  }

  // Check for creative template specific classes and content
  const checks = {
    hasSidebar: previewElement.querySelector('.w-\\[35\\%\\]') !== null,
    hasPurpleBackground: previewElement.querySelector('.bg-purple-50') !== null,
    hasPurpleText: previewElement.querySelector('.text-purple-600') !== null,
    hasFlexLayout: previewElement.querySelector('.flex') !== null,
    hasContactSection: previewElement.innerHTML.includes('Contact'),
    hasSkillsSection: previewElement.innerHTML.includes('Skills'),
  };

  console.log('Creative template element checks:', checks);

  const allPresent = Object.values(checks).every(check => check === true);
  
  if (allPresent) {
    console.log('✅ Creative template is rendering correctly!');
  } else {
    console.log('❌ Creative template elements missing');
    
    // Check what template is actually rendering
    if (previewElement.innerHTML.includes('Professional Summary')) {
      console.log('   Detected: Classic template is rendering instead');
    } else if (previewElement.innerHTML.includes('sidebar') || previewElement.innerHTML.includes('Contact')) {
      console.log('   Detected: Modern template might be rendering');
    } else {
      console.log('   Detected: Unknown template or no content');
    }
  }
};

// Step 3: Check immediately
checkElements();

// Step 4: Refresh and check again
window.testCreativeRendering = () => {
  console.log('🎨 Testing creative template rendering...');
  localStorage.setItem('resumai-template', 'creative');
  
  console.log('Refreshing page in 2 seconds...');
  setTimeout(() => {
    location.reload();
  }, 2000);
  
  console.log('After refresh, run this script again to check rendering');
};

// Step 5: Manual element inspection
window.inspectPreview = () => {
  const preview = document.getElementById('resume-preview');
  if (preview) {
    console.log('Preview element HTML:');
    console.log(preview.innerHTML);
  } else {
    console.log('No preview element found');
  }
};

console.log('Test functions:');
console.log('- testCreativeRendering() - Force creative and refresh');
console.log('- inspectPreview() - Show preview HTML');

console.log('\n=== END CREATIVE RENDERING TEST ===');