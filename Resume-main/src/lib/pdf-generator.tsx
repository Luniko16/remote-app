import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import type { ResumeData } from './types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1f2937',
  },
  contactInfo: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#374151',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  institution: {
    fontSize: 10,
    color: '#6b7280',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    color: '#374151',
    marginRight: 15,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDescription: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
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
    </Page>
  </Document>
);

export async function generateTextBasedPDF(resumeData: ResumeData, filename: string = 'resume.pdf') {
  try {
    // Generate PDF blob
    const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
    
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