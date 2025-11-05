import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import type { ResumeData } from './types';

export type Template = 'classic' | 'modern' | 'creative';

// Enhanced HTML-to-PDF generation with selectable text (NO html2canvas)
export async function generateHTMLToPDF(resumeData: ResumeData, filename: string = 'resume.pdf', template?: Template) {
  try {
    // Import jsPDF dynamically for text-based PDF creation
    const { jsPDF } = await import('jspdf');
    
    // Get template from localStorage if not provided
    const actualTemplate = template || (localStorage.getItem('resumai-template') as Template) || 'classic';
    
    // Add template info to debug logs
    console.log('=== ENHANCED HTML-TO-PDF GENERATION STARTED ===');
    console.log('PDF Generation - Template parameter:', template);
    console.log('PDF Generation - Actual template used:', actualTemplate);
    console.log('PDF Generation - Creating selectable text PDF...');
    
    // Create new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set up fonts and styling
    doc.setFont('helvetica');
    
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      // Convert hex color to RGB
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
      };
      
      const rgb = hexToRgb(color);
      doc.setTextColor(rgb.r, rgb.g, rgb.b);
      
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * (fontSize * 0.35) + 5;
      
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Template-specific colors and styling
    const templateConfig = {
      classic: {
        primaryColor: '#2563eb', // Blue
        headerColor: '#1e293b',  // Dark slate
        textColor: '#374151',    // Gray
        accentColor: '#64748b'   // Light gray
      },
      modern: {
        primaryColor: '#6366f1', // Indigo
        headerColor: '#1e293b',  // Dark slate
        textColor: '#374151',    // Gray
        accentColor: '#64748b'   // Light gray
      },
      creative: {
        primaryColor: '#0f766e', // Teal (matching the creative template)
        headerColor: '#1e293b',  // Dark slate
        textColor: '#374151',    // Gray
        accentColor: '#64748b'   // Light gray
      }
    };

    const config = templateConfig[actualTemplate] || templateConfig.classic;
    console.log('PDF Generation - Using color scheme for template:', actualTemplate, config);

    // Add section separator with template-specific color
    const addSectionSeparator = () => {
      yPosition += 5;
      const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 59, g: 130, b: 246 };
      };
      
      const rgb = hexToRgb(config.primaryColor);
      doc.setDrawColor(rgb.r, rgb.g, rgb.b);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, margin + 30, yPosition);
      yPosition += 8;
    };

    // Header - Name (template-specific styling)
    const nameSize = actualTemplate === 'creative' ? 26 : actualTemplate === 'modern' ? 22 : 24;
    addText(resumeData.personalInfo.name || 'Your Name', nameSize, true, config.headerColor);
    yPosition += 5;

    // Contact Information
    const contactInfo = [];
    if (resumeData.personalInfo.email) contactInfo.push(`Email: ${resumeData.personalInfo.email}`);
    if (resumeData.personalInfo.phone) contactInfo.push(`Phone: ${resumeData.personalInfo.phone}`);
    if (resumeData.personalInfo.location) contactInfo.push(`Location: ${resumeData.personalInfo.location}`);
    if (resumeData.personalInfo.linkedin) contactInfo.push(`LinkedIn: ${resumeData.personalInfo.linkedin}`);
    if (resumeData.personalInfo.website) contactInfo.push(`Website: ${resumeData.personalInfo.website}`);
    
    contactInfo.forEach(info => {
      addText(info, 10, false, config.accentColor);
    });
    
    yPosition += 10;

    // Summary Section (template-specific title)
    if (resumeData.summary) {
      const summaryTitle = actualTemplate === 'creative' ? 'ABOUT ME' : 'PROFESSIONAL SUMMARY';
      addText(summaryTitle, 14, true, config.primaryColor);
      addSectionSeparator();
      addText(resumeData.summary, 11, false, config.textColor);
      yPosition += 5;
    }

    // Experience Section
    if (resumeData.experience.length > 0) {
      addText('PROFESSIONAL EXPERIENCE', 14, true, config.primaryColor);
      addSectionSeparator();
      
      resumeData.experience.forEach(exp => {
        addText(exp.role, 12, true, config.headerColor);
        addText(`${exp.company} | ${exp.startDate} - ${exp.endDate || 'Present'}`, 10, false, config.primaryColor);
        
        if (exp.description) {
          const descriptions = exp.description.split('\n').filter(line => line.trim());
          descriptions.forEach(desc => {
            addText(`• ${desc.replace(/^- /, '')}`, 10, false, config.textColor);
          });
        }
        yPosition += 3;
      });
    }

    // Projects Section
    if (resumeData.projects.length > 0) {
      addText('KEY PROJECTS', 14, true, config.primaryColor);
      addSectionSeparator();
      
      resumeData.projects.forEach(project => {
        addText(project.name, 12, true, config.headerColor);
        if (project.url) {
          addText(`Project URL: ${project.url}`, 9, false, config.primaryColor);
        }
        
        if (project.description) {
          const descriptions = project.description.split('\n').filter(line => line.trim());
          descriptions.forEach(desc => {
            addText(`• ${desc.replace(/^- /, '')}`, 10, false, config.textColor);
          });
        }
        yPosition += 3;
      });
    }

    // Education Section
    if (resumeData.education.length > 0) {
      addText('EDUCATION', 14, true, config.primaryColor);
      addSectionSeparator();
      
      resumeData.education.forEach(edu => {
        addText(edu.degree, 12, true, config.headerColor);
        addText(`${edu.institution} | ${edu.startDate} - ${edu.endDate || 'Present'}`, 10, false, config.primaryColor);
        yPosition += 3;
      });
    }

    // Skills Section
    if (resumeData.skills.length > 0) {
      addText('CORE SKILLS', 14, true, config.primaryColor);
      addSectionSeparator();
      
      const skillsText = resumeData.skills.map(skill => skill.name).join(' • ');
      addText(skillsText, 11, false, config.textColor);
    }

    // References Section
    if (resumeData.references.length > 0) {
      addText('REFERENCES', 14, true, config.primaryColor);
      addSectionSeparator();
      
      resumeData.references.forEach(ref => {
        addText(ref.name, 12, true, config.headerColor);
        addText(`${ref.title} - ${ref.company}`, 10, false, config.primaryColor);
        if (ref.relationship) {
          addText(ref.relationship, 9, false, config.accentColor);
        }
        
        const contactInfo = [];
        if (ref.email) contactInfo.push(`Email: ${ref.email}`);
        if (ref.phone) contactInfo.push(`Phone: ${ref.phone}`);
        
        if (contactInfo.length > 0) {
          addText(contactInfo.join(' | '), 9, false, config.textColor);
        }
        yPosition += 3;
      });
    }

    // Save the PDF
    console.log('PDF Generation - Saving selectable text PDF...');
    doc.save(filename);
    console.log('PDF Generation - Enhanced HTML-to-PDF completed successfully with selectable text');
    
    return true;
  } catch (error) {
    console.error('Error generating enhanced HTML-to-PDF:', error);
    throw error;
  }
}