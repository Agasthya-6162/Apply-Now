import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ApplicationData } from '../types';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 8,
    fontFamily: 'Helvetica',
    lineHeight: 1.2,
    color: '#000',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 2,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerLogo: {
    width: 65,
    height: 65,
  },
  headerTextContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  trustName: {
    fontSize: 12,
    color: '#2b5a9e',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  collegeName: {
    fontSize: 32,
    color: '#e63946',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  headerBlueBar: {
    backgroundColor: '#1e40af',
    padding: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerBlueBarText1: {
    fontSize: 9,
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerBlueBarText2: {
    fontSize: 8,
    color: '#ffffff',
    marginTop: 2,
    borderTopWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingTop: 2,
    width: '80%',
    textAlign: 'center',
  },
  appNoBox: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
  },
  sectionHeader: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 8,
  },
  mainGrid: {
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 0,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    minHeight: 16,
  },
  labelCol: {
    width: '35%',
    padding: 3,
    borderRightWidth: 1,
    borderColor: '#000',
    textAlign: 'right',
    backgroundColor: '#fff',
  },
  valueCol: {
    width: '65%',
    padding: 3,
    fontWeight: 'bold',
  },
  personalSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  personalData: {
    width: '75%',
  },
  photoSection: {
    width: '25%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderLeftWidth: 1,
    borderColor: '#000',
  },
  photoBox: {
    width: 80,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 5,
  },
  signatureBox: {
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subGridRow: {
    flexDirection: 'row',
    width: '100%',
  },
  subGridCol: {
    flex: 1,
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  subLabel: {
    width: '40%',
    padding: 3,
    borderRightWidth: 1,
    borderColor: '#000',
    textAlign: 'right',
  },
  subValue: {
    width: '60%',
    padding: 3,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    borderTopWidth: 1,
    borderColor: '#000',
    paddingTop: 2,
  }
});

const DataRow = ({ label, value, isLast = false }: { label: string; value: string; isLast?: boolean }) => (
  <View style={[styles.row, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.labelCol}>
      <Text>{label}</Text>
    </View>
    <View style={styles.valueCol}>
      <Text>{value || 'N/A'}</Text>
    </View>
  </View>
);

export const ApplicationPDF = ({ data }: { data: ApplicationData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text>Online Registration For Admission 2026-27</Text>
        <Text>Application Form</Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Image 
          src="https://drive.google.com/uc?id=1wmx-8lQMx_7r7tJAqTYDPjmRbA22q8lF" 
          style={styles.headerLogo} 
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.trustName}>Sahayog Sevabhavi Sanstha's</Text>
          <Text style={styles.collegeName}>Indira College of Pharmacy</Text>
        </View>
        <Image 
          src="https://picsum.photos/seed/pharmacy/200/200" 
          style={styles.headerLogo} 
        />
      </View>

      {/* Header Blue Bar */}
      <View style={styles.headerBlueBar}>
        <Text style={styles.headerBlueBarText1}>VISHNUPURI, NANDED-431606 DIST NANDED (MAHARASHTRA)</Text>
        <Text style={styles.headerBlueBarText2}>NAAC Accredited with 'A' Grade, an ISO 9001:2015 Certified Institute</Text>
      </View>

      {/* Application No Box */}
      <View style={styles.appNoBox}>
        <Text style={{ fontWeight: 'bold' }}>Application No. : {data.applicationId}    Version No : 1</Text>
      </View>

      {/* Personal Details Section */}
      <View style={styles.sectionHeader}>
        <Text>Personal Details</Text>
      </View>
      <View style={styles.mainGrid}>
        <View style={styles.personalSection}>
          <View style={styles.personalData}>
            <DataRow label="Candidate's Full Name" value={data.fullName} />
            <DataRow label="Name as per SSC" value={data.sscName} />
            <DataRow label="Mother's Name" value={data.motherName} />
            <DataRow label="Gender" value={data.gender} />
            <DataRow label="Date of Birth" value={data.dob} />
            <DataRow label="Nationality" value={data.nationality} />
            <DataRow label="Aadhar Number" value={data.aadharNumber} />
            <DataRow label="ABC ID" value={data.abcId} isLast />
          </View>
          <View style={styles.photoSection}>
            <View style={styles.photoBox}>
              {data.studentPhoto && <Image src={data.studentPhoto} style={{ width: '100%', height: '100%' }} />}
            </View>
            <View style={styles.signatureBox}>
              <Text style={{ fontSize: 6, color: '#666' }}>Signature</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Category Details */}
      <View style={styles.sectionHeader}>
        <Text>Domicile and Category Details</Text>
      </View>
      <View style={styles.mainGrid}>
        <DataRow label="Category" value={data.category} />
        {data.category !== 'OPEN' && (
          <>
            <DataRow label="Caste Certificate Number" value={data.casteCertificateNumber || ''} />
            <DataRow label="Caste Validity Number" value={data.casteValidityNumber || ''} />
          </>
        )}
        <DataRow label="Nationality" value={data.nationality} isLast />
      </View>

      {/* Permanent Address */}
      <View style={styles.sectionHeader}>
        <Text>Permanent Address</Text>
      </View>
      <View style={styles.mainGrid}>
        <DataRow label="Address" value={data.permanentAddress} isLast />
      </View>

      {/* Correspondence Address */}
      <View style={styles.sectionHeader}>
        <Text>Address for Correspondence</Text>
      </View>
      <View style={styles.mainGrid}>
        <DataRow label="Address" value={data.correspondenceAddress} isLast />
      </View>

      {/* Qualification Details */}
      <View style={styles.sectionHeader}>
        <Text>Qualification Details</Text>
      </View>
      <View style={styles.mainGrid}>
        <View style={[styles.row, { backgroundColor: '#f0f0f0' }]}>
          <Text style={{ padding: 3, fontWeight: 'bold' }}>SSC / Equivalent Details</Text>
        </View>
        <DataRow label="Board / University" value={data.board} />
        <DataRow label="Passing Year" value={data.passingYear} />
        <DataRow label="Roll Number" value={data.rollNumber} />
        <DataRow label="Percentage / Marks" value={data.percentage} isLast />
      </View>

      {/* Course Details */}
      <View style={styles.sectionHeader}>
        <Text>Course Applied For</Text>
      </View>
      <View style={styles.mainGrid}>
        <DataRow label="Course" value={data.course} />
        <DataRow label="College" value={data.college} isLast />
      </View>

      {/* Conditional B. Pharm Details */}
      {data.course === 'M. Pharm' && (
        <>
          <View style={styles.sectionHeader}>
            <Text>B. Pharm Graduation Details</Text>
          </View>
          <View style={styles.mainGrid}>
            <DataRow label="University" value={data.bPharmUniversity || ''} />
            <DataRow label="College" value={data.bPharmCollege || ''} />
            <DataRow label="CGPA" value={data.bPharmCgpa || ''} />
            <DataRow label="Grade" value={data.bPharmGrade || ''} isLast />
          </View>
        </>
      )}

      {/* Declaration */}
      <View style={[styles.sectionHeader, { marginTop: 10 }]}>
        <Text>Declaration by the Candidate</Text>
      </View>
      <View style={[styles.mainGrid, { padding: 5, fontSize: 7 }]}>
        <Text>
          I, {data.fullName}, hereby solemnly declare that the information provided in this application form is true, complete and correct to the best of my knowledge and belief. I have not suppressed any material fact or information. I am aware that if any information provided by me is found to be false, incorrect or misleading at any stage, my admission shall be cancelled immediately, and I shall be liable for legal action as per the rules.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <View>
            <Text>Place: {data.place}</Text>
            <Text>Date: {data.date}</Text>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: '#000', width: 120, textAlign: 'center', paddingTop: 2 }}>
            <Text>Signature of Candidate</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>https://mhtcet2026.mahacet.org/CandidateModule/frmPrintApplicationForm</Text>
        <Text>1/1</Text>
      </View>
    </Page>
  </Document>
);
