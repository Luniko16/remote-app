import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import type { ResumeData } from './types';
import type { Template } from '@/contexts/template-context';

// Template-specific styles
const getTemplateStyles = (template: Template = 'classic') => {
  const baseStyles = {
    page: {
      flexDirection: 'column' as const,
      backgroundColor: '#ffffff',
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 12, // Increased from 11
      lineHeight: 1.5, // Increased from 1.4
    },
  };

  switch (template) {
    case 'modern':
      return {
        ...baseStyles,
        page: { ...baseStyles.page, padding: 35, fontSize: 11 } // Increased from 10
      };
    case 'creative':
      return {
        ...baseStyles,
        page: { ...baseStyles.page, padding: 25, fontSize: 13 } // Increased from 12
      };
    default: // classic
      return baseStyles;
  }
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12, // Increased from 11
    lineHeight: 1.5, // Increased from 1.4
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 28, // Increased from 24
    fontWeight: 'bold',
    marginBottom: 8, // Increased from 5
    color: '#1f2937',
  },
  contactInfo: {
    fontSize: 11, // Increased from 10
    color: '#6b7280',
    marginBottom: 4, // Increased from 3
  },
  section: {
    marginBottom: 18, // Increased from 15
  },
  sectionTitle: {
    fontSize: 16, // Increased from 14
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10, // Increased from 8
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 3, // Increased from 2
  },
  summary: {
    fontSize: 12, // Increased from 11
    lineHeight: 1.6, // Increased from 1.5
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 15, // Increased from 12
  },
  jobTitle: {
    fontSize: 14, // Increased from 12
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 12, // Increased from 11
    color: '#6b7280',
    marginBottom: 3, // Increased from 2
  },
  dates: {
    fontSize: 11, // Increased from 10
    color: '#9ca3af',
    marginBottom: 5, // Increased from 4
  },
  description: {
    fontSize: 11, // Increased from 10
    lineHeight: 1.5, // Increased from 1.4
    color: '#374151',
  },
  educationItem: {
    marginBottom: 10, // Increased from 8
  },
  degree: {
    fontSize: 12, // Increased from 11
    fontWeight: 'bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 11, // Increased from 10
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 11, // Increased from 10
    color: '#374151',
    marginRight: 15,
    marginBottom: 5, // Increased from 4
  },
  projectItem: {
    marginBottom: 12, // Increased from 10
  },
  projectName: {
    fontSize: 12, // Increased from 11
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDescription: {
    fontSize: 11, // Increased from 10
    color: '#374151',
    lineHeight: 1.5, // Increased from 1.4
  },
});

interface ResumePDFProps {
  data: ResumeData;
  template?: Template;
}

// Template-specific PDF layouts
const ClassicPDF: React.FC<{ data: ResumeData; styles: any }> = ({ data, styles }) => (
  <>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.name}>{data.personalInfo.name || 'No Name Provided'}</Text>
      <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
      <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
      <Text style={styles.contactInfo}>{data.personalInfo.location}</Text>
      {data.personalInfo.linkedin && <Text style={styles.contactInfo}>{data.personalInfo.linkedin}</Text>}
      {data.personalInfo.website && <Text style={styles.contactInfo}>{data.personalInfo.website}</Text>}
    </View>

    {/* Summary */}
    {data.summary && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>
    )}

    {/* Experience */}
    {data.experience.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((exp) => (
          <View key={exp.id} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{exp.role}</Text>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.dates}>
              {exp.startDate} - {exp.endDate || 'Present'}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>
    )}

    {/* Education */}
    {data.education.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu) => (
          <View key={edu.id} style={styles.educationItem}>
            <Text style={styles.degree}>{edu.degree}</Text>
            <Text style={styles.institution}>{edu.institution}</Text>
            <Text style={styles.dates}>
              {edu.startDate} - {edu.endDate || 'Present'}
            </Text>
          </View>
        ))}
      </View>
    )}

    {/* Skills */}
    {data.skills.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill) => (
            <Text key={skill.id} style={styles.skill}>
              • {skill.name}
            </Text>
          ))}
        </View>
      </View>
    )}

    {/* Projects */}
    {data.projects.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((project) => (
          <View key={project.id} style={styles.projectItem}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
          </View>
        ))}
      </View>
    )}

    {/* References */}
    {data.references.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>References</Text>
        {data.references.map((ref) => (
          <View key={ref.id} style={styles.projectItem}>
            <Text style={styles.projectName}>{ref.name}</Text>
            <Text style={[styles.company, { fontSize: 11 }]}>{ref.title} - {ref.company}</Text>
            {ref.relationship && (
              <Text style={[styles.dates, { fontSize: 10 }]}>{ref.relationship}</Text>
            )}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {ref.email && <Text style={[styles.contactInfo, { marginRight: 15 }]}>Email: {ref.email}</Text>}
              {ref.phone && <Text style={styles.contactInfo}>Phone: {ref.phone}</Text>}
            </View>
          </View>
        ))}
      </View>
    )}
  </>
);

const ModernPDF: React.FC<{ data: ResumeData; styles: any }> = ({ data, styles }) => (
  <View style={{ flexDirection: 'row' }}>
    {/* Left Column */}
    <View style={{ width: '35%', backgroundColor: '#f9fafb', padding: 20 }}>
      <Text style={[styles.name, { fontSize: 22, marginBottom: 15 }]}>{data.personalInfo.name || 'No Name Provided'}</Text>
      
      {/* Contact */}
      <View style={[styles.section, { marginBottom: 20 }]}>
        <Text style={[styles.sectionTitle, { fontSize: 14, color: '#6366f1' }]}>CONTACT</Text>
        <Text style={[styles.contactInfo, { fontSize: 11 }]}>{data.personalInfo.email}</Text>
        <Text style={[styles.contactInfo, { fontSize: 11 }]}>{data.personalInfo.phone}</Text>
        <Text style={[styles.contactInfo, { fontSize: 11 }]}>{data.personalInfo.location}</Text>
      </View>

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: 14, color: '#6366f1' }]}>SKILLS</Text>
          {data.skills.map((skill) => (
            <Text key={skill.id} style={[styles.skill, { fontSize: 11, marginBottom: 3 }]}>
              {skill.name}
            </Text>
          ))}
        </View>
      )}
    </View>

    {/* Right Column */}
    <View style={{ width: '65%', padding: 20 }}>
      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#6366f1' }]}>SUMMARY</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#6366f1' }]}>EXPERIENCE</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.role}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.dates}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#6366f1' }]}>EDUCATION</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.institution}>{edu.institution}</Text>
              <Text style={styles.dates}>
                {edu.startDate} - {edu.endDate || 'Present'}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* References */}
      {data.references.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#6366f1' }]}>REFERENCES</Text>
          {data.references.map((ref) => (
            <View key={ref.id} style={styles.projectItem}>
              <Text style={styles.projectName}>{ref.name}</Text>
              <Text style={[styles.company, { fontSize: 11 }]}>{ref.title} - {ref.company}</Text>
              {ref.relationship && (
                <Text style={[styles.dates, { fontSize: 10 }]}>{ref.relationship}</Text>
              )}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {ref.email && <Text style={[styles.contactInfo, { marginRight: 15, fontSize: 10 }]}>Email: {ref.email}</Text>}
                {ref.phone && <Text style={[styles.contactInfo, { fontSize: 10 }]}>Phone: {ref.phone}</Text>}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  </View>
);

const CreativePDF: React.FC<{ data: ResumeData; styles: any }> = ({ data, styles }) => (
  <View style={{ flexDirection: 'row', height: '100%' }}>
    {/* Left Sidebar - Enhanced Creative Design */}
    <View style={{ 
      width: '35%', 
      backgroundColor: '#0f766e', // Rich teal background
      padding: 20,
      borderRight: '3px solid #14b8a6' // Brighter teal border
    }}>
      {/* Name in Sidebar */}
      <Text style={[styles.name, { 
        fontSize: 24, 
        color: '#ffffff', // White text on dark background
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: 'bold'
      }]}>
        {data.personalInfo.name || 'Your Name'}
      </Text>

      {/* Contact Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.sectionTitle, { 
          color: '#5eead4', // Light teal for headers
          fontSize: 14, 
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 'bold'
        }]}>
          CONTACT
        </Text>
        {data.personalInfo.email && (
          <Text style={[styles.contactInfo, { fontSize: 10, marginBottom: 3, color: '#f0fdfa' }]}>
            {data.personalInfo.email}
          </Text>
        )}
        {data.personalInfo.phone && (
          <Text style={[styles.contactInfo, { fontSize: 10, marginBottom: 3, color: '#f0fdfa' }]}>
            {data.personalInfo.phone}
          </Text>
        )}
        {data.personalInfo.location && (
          <Text style={[styles.contactInfo, { fontSize: 10, marginBottom: 3, color: '#f0fdfa' }]}>
            {data.personalInfo.location}
          </Text>
        )}
      </View>

      {/* Skills Section in Sidebar */}
      {data.skills.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { 
            color: '#5eead4', // Light teal for headers
            fontSize: 14, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            SKILLS
          </Text>
          {data.skills.map((skill) => (
            <Text key={skill.id} style={[styles.skill, { 
              fontSize: 10, 
              marginBottom: 2, 
              color: '#f0fdfa' // Light teal text
            }]}>
              • {skill.name}
            </Text>
          ))}
        </View>
      )}

      {/* Education Section in Sidebar */}
      {data.education.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { 
            color: '#5eead4', // Light teal for headers
            fontSize: 14, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            EDUCATION
          </Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={{ marginBottom: 8 }}>
              <Text style={[styles.degree, { fontSize: 10, color: '#ffffff', fontWeight: 'bold' }]}>
                {edu.degree}
              </Text>
              <Text style={[styles.institution, { fontSize: 9, color: '#f0fdfa' }]}>
                {edu.institution}
              </Text>
              <Text style={[styles.dates, { fontSize: 8, color: '#ccfbf1' }]}>
                {edu.startDate} - {edu.endDate || 'Present'}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>

    {/* Right Main Content - Like the bottom image */}
    <View style={{ width: '65%', padding: 20 }}>
      {/* Summary Section */}
      {data.summary && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { 
            color: '#0f766e', // Darker teal to match sidebar
            fontSize: 16, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            SUMMARY
          </Text>
          <Text style={[styles.summary, { fontSize: 11, lineHeight: 1.5, color: '#374151' }]}>
            {data.summary}
          </Text>
        </View>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { 
            color: '#0f766e', // Darker teal to match sidebar
            fontSize: 16, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            EXPERIENCE
          </Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                <Text style={[styles.jobTitle, { fontSize: 12, color: '#1e293b', fontWeight: 'bold' }]}>
                  {exp.role}
                </Text>
                <Text style={[styles.dates, { fontSize: 10, color: '#64748b' }]}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </Text>
              </View>
              <Text style={[styles.company, { fontSize: 11, color: '#475569', fontStyle: 'italic', marginBottom: 5 }]}>
                {exp.company}
              </Text>
              <Text style={[styles.description, { fontSize: 10, lineHeight: 1.4, color: '#374151' }]}>
                {exp.description.split('\n').map((line, i) => 
                  line ? `• ${line.replace(/^- /, '')}` : ''
                ).filter(line => line).join('\n')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { 
            color: '#0f766e', // Darker teal to match sidebar
            fontSize: 16, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            PROJECTS
          </Text>
          {data.projects.map((project) => (
            <View key={project.id} style={{ marginBottom: 12 }}>
              <Text style={[styles.projectName, { fontSize: 12, color: '#1e293b', fontWeight: 'bold' }]}>
                {project.name}
              </Text>
              <Text style={[styles.projectDescription, { fontSize: 10, lineHeight: 1.4, color: '#374151' }]}>
                {project.description.split('\n').map((line, i) => 
                  line ? `• ${line.replace(/^- /, '')}` : ''
                ).filter(line => line).join('\n')}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* References Section */}
      {data.references.length > 0 && (
        <View>
          <Text style={[styles.sectionTitle, { 
            color: '#0f766e', // Darker teal to match sidebar
            fontSize: 16, 
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 'bold'
          }]}>
            REFERENCES
          </Text>
          {data.references.map((ref) => (
            <View key={ref.id} style={{ marginBottom: 12 }}>
              <Text style={[styles.projectName, { fontSize: 12, color: '#1e293b', fontWeight: 'bold' }]}>
                {ref.name}
              </Text>
              <Text style={[styles.company, { fontSize: 10, color: '#475569', fontStyle: 'italic' }]}>
                {ref.title} - {ref.company}
              </Text>
              {ref.relationship && (
                <Text style={[styles.dates, { fontSize: 9, color: '#64748b' }]}>
                  {ref.relationship}
                </Text>
              )}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 3 }}>
                {ref.email && (
                  <Text style={[styles.contactInfo, { fontSize: 9, marginRight: 15, color: '#374151' }]}>
                    Email: {ref.email}
                  </Text>
                )}
                {ref.phone && (
                  <Text style={[styles.contactInfo, { fontSize: 9, color: '#374151' }]}>
                    Phone: {ref.phone}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  </View>
);

const ResumePDF: React.FC<ResumePDFProps> = ({ data, template = 'classic' }) => {
  console.log('PDF Generation - ResumePDF component received template:', template);
  const templateStyles = StyleSheet.create(getTemplateStyles(template));
  console.log('PDF Generation - Template styles generated for:', template);
  
  const renderTemplate = () => {
    console.log('PDF Generation - Rendering template:', template);
    console.log('PDF Generation - Template type check:', typeof template);
    console.log('PDF Generation - Template === "creative":', template === 'creative');
    
    switch (template) {
      case 'modern':
        console.log('PDF Generation - Using ModernPDF component');
        return <ModernPDF data={data} styles={styles} />;
      case 'creative':
        console.log('PDF Generation - ✅ CREATIVE TEMPLATE SELECTED - Using CreativePDF component');
        return <CreativePDF data={data} styles={styles} />;
      default:
        console.log('PDF Generation - Using ClassicPDF component (default) - template was:', template);
        return <ClassicPDF data={data} styles={styles} />;
    }
  };
  
  return (
    <Document>
      <Page size="A4" style={templateStyles.page}>
        {renderTemplate()}
      </Page>
    </Document>
  );
};

// Enhanced HTML-to-PDF generation with selectable text
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

    // Add section separator (will be updated with template colors)
    let addSectionSeparator: () => void;

    // Generate PDF content based on template
    console.log('PDF Generation - Building content for template:', actualTemplate);

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
        primaryColor: '#7c3aed', // Purple
        headerColor: '#1e293b',  // Dark slate
        textColor: '#374151',    // Gray
        accentColor: '#64748b'   // Light gray
      }
    };

    const config = templateConfig[actualTemplate] || templateConfig.classic;
    console.log('PDF Generation - Using color scheme for template:', actualTemplate, config);

    // Add section separator with template-specific color
    addSectionSeparator = () => {
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

export async function generateTextBasedPDF(resumeData: ResumeData, filename: string = 'resume.pdf', template?: Template) {
  try {
    // Get template from localStorage if not provided
    const actualTemplate = template || (localStorage.getItem('resumai-template') as Template) || 'classic';
    
    // Debug: Log the data being passed to PDF generator
    console.log('PDF Generation - Resume Data:', resumeData);
    console.log('PDF Generation - Template parameter:', template);
    console.log('PDF Generation - Actual template used:', actualTemplate);
    console.log('PDF Generation - Personal Info:', resumeData.personalInfo);
    console.log('PDF Generation - Has Experience:', resumeData.experience.length > 0);
    console.log('PDF Generation - Has Education:', resumeData.education.length > 0);
    
    // Generate PDF blob
    const blob = await pdf(<ResumePDF data={resumeData} template={actualTemplate} />).toBlob();
    
    // Debug: Check blob size
    console.log('PDF Generation - Blob size:', blob.size, 'bytes');
    if (blob.size < 1000) {
      console.warn('PDF Generation - Warning: PDF blob is very small, might be empty');
    }
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error generating text-based PDF:', error);
    throw error;
  }
}

export default ResumePDF;