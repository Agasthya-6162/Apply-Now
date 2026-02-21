import { z } from "zod";

export const admissionSchema = z.object({
  // A. Personal Details
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  sscName: z.string().min(3, "Name as per SSC marksheet is required"),
  motherName: z.string().min(3, "Mother's name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1, "Date of Birth is required"),
  aadharNumber: z.string().regex(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),
  abcId: z.string().regex(/^[0-9]{12}$/, "ABC ID must be 12 digits"),
  category: z.enum(["OPEN", "OBC", "SC", "ST", "VJNT", "SBC", "EWS"]),
  casteCertificateNumber: z.string().optional(),
  casteValidityNumber: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  studentPhoto: z.string().optional(),

  // B. Contact Details
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  permanentAddress: z.string().min(10, "Address must be at least 10 characters"),
  correspondenceAddress: z.string().min(10, "Address must be at least 10 characters"),

  // C. Academic Details (Qualifying Exam)
  qualifyingExam: z.string().min(1, "Qualifying exam is required"),
  board: z.string().min(1, "Board/University is required"),
  passingYear: z.string().regex(/^[0-9]{4}$/, "Invalid year"),
  rollNumber: z.string().min(1, "Roll number is required"),
  percentage: z.string().min(1, "Percentage/Marks is required"),

  // Additional Academic Details for M.Pharm
  bPharmUniversity: z.string().optional(),
  bPharmCollege: z.string().optional(),
  bPharmCgpa: z.string().optional(),
  bPharmGrade: z.string().optional(),

  // D. Course Details
  course: z.enum(["D. Pharm", "B. Pharm", "M. Pharm", "PharmD"]),
  college: z.string().min(1, "College name is required"),

  // E. Declaration
  declaration: z.boolean().refine((val) => val === true, "You must accept the declaration"),
  place: z.string().min(1, "Place is required"),
  date: z.string().min(1, "Date is required"),
});

export type AdmissionFormData = z.infer<typeof admissionSchema>;

export interface ApplicationData extends AdmissionFormData {
  applicationId: string;
}
