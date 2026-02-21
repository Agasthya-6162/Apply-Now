import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { admissionSchema, AdmissionFormData } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Phone, 
  GraduationCap, 
  School, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Eye,
  Upload,
  X
} from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AdmissionFormProps {
  onSubmit: (data: AdmissionFormData) => void;
  onPreview: (data: AdmissionFormData) => void;
}

const steps = [
  { id: 'personal', title: 'Personal', icon: User },
  { id: 'contact', title: 'Contact', icon: Phone },
  { id: 'academic', title: 'Academic', icon: GraduationCap },
  { id: 'course', title: 'Course', icon: School },
  { id: 'declaration', title: 'Declaration', icon: FileText },
];

const InputField = ({ 
  label, 
  error, 
  registration, 
  type = "text", 
  placeholder,
  className,
  hint
}: { 
  label: string; 
  error?: string; 
  registration: any; 
  type?: string;
  placeholder?: string;
  className?: string;
  hint?: string;
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight flex justify-between">
      <span>{label} <span className="text-red-500">*</span></span>
      {hint && <span className="text-[10px] font-normal text-slate-400 normal-case italic">{hint}</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "px-3 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all placeholder:text-slate-300",
        error && "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/5"
      )}
      {...registration}
    />
    {error && <span className="text-[10px] text-red-600 font-semibold">{error}</span>}
  </div>
);

const SelectField = ({ 
  label, 
  error, 
  registration, 
  options,
  className
}: { 
  label: string; 
  error?: string; 
  registration: any; 
  options: string[];
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      className={cn(
        "px-3 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all bg-white",
        error && "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/5"
      )}
      {...registration}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <span className="text-[10px] text-red-600 font-semibold">{error}</span>}
  </div>
);

const TextAreaField = ({ 
  label, 
  error, 
  registration, 
  placeholder,
  className
}: { 
  label: string; 
  error?: string; 
  registration: any; 
  placeholder?: string;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">
      {label} <span className="text-red-500">*</span>
    </label>
    <textarea
      placeholder={placeholder}
      rows={3}
      className={cn(
        "px-3 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all placeholder:text-slate-300",
        error && "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500/5"
      )}
      {...registration}
    />
    {error && <span className="text-[10px] text-red-600 font-semibold">{error}</span>}
  </div>
);

const ImageUploadField = ({
  label,
  value,
  onChange,
  error,
  className
}: {
  label: string;
  value?: string;
  onChange: (base64: string) => void;
  error?: string;
  className?: string;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">
        {label}
      </label>
      <div className={cn(
        "relative border-2 border-dashed border-slate-200 rounded-lg p-4 transition-all hover:border-slate-400 flex flex-col items-center justify-center min-h-[120px] bg-slate-50/50",
        error && "border-red-500 bg-red-50"
      )}>
        {value ? (
          <div className="relative w-24 h-24">
            <img src={value} alt="Uploaded" className="w-full h-full object-cover rounded-md shadow-sm" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Click to upload photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
      </div>
      {error && <span className="text-[10px] text-red-600 font-semibold">{error}</span>}
    </div>
  );
};

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ onSubmit, onPreview }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState: { errors },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      college: "Indira College Of Pharmacy, Vishnupuri Nanded - 431606",
      nationality: "Indian",
    }
  });

  const permanentAddress = useWatch({ control, name: 'permanentAddress' });
  const selectedCourse = useWatch({ control, name: 'course' });
  const selectedCategory = useWatch({ control, name: 'category' });
  const studentPhoto = useWatch({ control, name: 'studentPhoto' });
  const selectedCollege = useWatch({ control, name: 'college' });

  useEffect(() => {
    if (sameAsPermanent) {
      setValue('correspondenceAddress', permanentAddress);
    }
  }, [sameAsPermanent, permanentAddress, setValue]);

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields as any);
    if (isValid) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFieldsForStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: {
        const base = ['course', 'college', 'fullName', 'sscName', 'motherName', 'gender', 'dob', 'aadharNumber', 'abcId', 'category', 'nationality'];
        if (selectedCategory && selectedCategory !== 'OPEN') {
          return [...base, 'casteCertificateNumber', 'casteValidityNumber'];
        }
        return base;
      }
      case 1: return ['mobile', 'email', 'permanentAddress', 'correspondenceAddress'];
      case 2: {
        const base = ['qualifyingExam', 'board', 'passingYear', 'rollNumber', 'percentage'];
        if (selectedCourse === 'M. Pharm') {
          return [...base, 'bPharmUniversity', 'bPharmCollege', 'bPharmCgpa', 'bPharmGrade'];
        }
        return base;
      }
      case 3: return []; // Course details moved to step 0
      case 4: return ['declaration', 'place', 'date'];
      default: return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-white md:my-8 md:shadow-2xl md:rounded-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-white p-4 md:p-6 border-b-4 border-[#1e40af]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Logo */}
          <div className="hidden md:block w-24 h-24 flex-shrink-0">
            <img 
              src="https://drive.google.com/uc?id=1wmx-8lQMx_7r7tJAqTYDPjmRbA22q8lF" 
              alt="Indira College Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center flex-1">
            <p className="text-[#1e40af] font-bold text-lg md:text-xl tracking-tight mb-1">
              Sahayog Sevabhavi Sanstha's
            </p>
            <h1 className="text-[#ef4444] text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
              Indira College of Pharmacy
            </h1>
            <div className="bg-[#1e40af] text-white py-2 px-4 mt-4 rounded-sm shadow-sm">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Vishnupuri, Nanded-431606 Dist Nanded (Maharashtra)
              </p>
              <div className="h-px bg-white/30 my-1 mx-auto w-3/4" />
              <p className="text-[9px] md:text-[11px] font-medium tracking-wide">
                NAAC Accredited with 'A' Grade, an ISO 9001:2015 Certified Institute
              </p>
            </div>
          </div>

          {/* Right Logo Placeholder */}
          <div className="hidden md:block w-24 h-24 flex-shrink-0">
            <img 
              src="https://picsum.photos/seed/pharmacy/200/200" 
              alt="Pharmacy Logo" 
              className="w-full h-full object-contain rounded-full border-2 border-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200 text-slate-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Admission Portal 2026-27
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-8 md:px-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          {/* Progress Line Background */}
          <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />
          
          {/* Active Progress Line */}
          <div 
            className="absolute top-5 left-0 h-1 bg-slate-900 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out rounded-full" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isActive ? "#0f172a" : isCompleted ? "#10b981" : "#ffffff",
                    borderColor: isActive ? "#0f172a" : isCompleted ? "#10b981" : "#e2e8f0",
                    color: isActive || isCompleted ? "#ffffff" : "#94a3b8"
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 shadow-sm",
                    isActive && "shadow-xl shadow-slate-900/20"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>
                
                <div className="absolute -bottom-6 whitespace-nowrap">
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest transition-colors duration-300",
                    isActive ? "text-slate-900" : isCompleted ? "text-emerald-600" : "text-slate-400"
                  )}>
                    {step.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                0{currentStep + 1}
              </div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                {steps[currentStep].title} Details
              </h2>
            </div>

            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 w-full">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg mb-6">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <School className="w-4 h-4" />
                        Admission Preference
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField 
                          label="Course Applied For" 
                          registration={register("course")} 
                          error={errors.course?.message}
                          options={["D. Pharm", "B. Pharm", "M. Pharm", "PharmD"]}
                        />
                        <InputField 
                          label="College Name" 
                          registration={register("college")} 
                          error={errors.college?.message}
                          placeholder="Enter preferred college name"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <ImageUploadField 
                    label="Student Photo"
                    value={studentPhoto}
                    onChange={(base64) => setValue('studentPhoto', base64)}
                    error={errors.studentPhoto?.message}
                    className="w-full md:w-48"
                  />
                </div>

                <InputField 
                  label="Full Name (Current)" 
                  registration={register("fullName")} 
                  error={errors.fullName?.message}
                  className="md:col-span-2"
                  placeholder="e.g. JOHN DOE"
                  hint="Enter in BLOCK letters"
                />
                <InputField 
                  label="Name as per SSC Marksheet" 
                  registration={register("sscName")} 
                  error={errors.sscName?.message}
                  className="md:col-span-2"
                  placeholder="e.g. DOE JOHN SMITH"
                  hint="Exactly as printed on SSC certificate"
                />
                <InputField 
                  label="Mother's Name" 
                  registration={register("motherName")} 
                  error={errors.motherName?.message}
                  placeholder="e.g. JANE DOE"
                />
                <SelectField 
                  label="Gender" 
                  registration={register("gender")} 
                  error={errors.gender?.message}
                  options={["Male", "Female", "Other"]}
                />
                <InputField 
                  label="Date of Birth" 
                  type="date"
                  registration={register("dob")} 
                  error={errors.dob?.message}
                />
                <InputField 
                  label="Aadhar Number" 
                  registration={register("aadharNumber")} 
                  error={errors.aadharNumber?.message}
                  placeholder="12-digit Aadhar number"
                />
                <InputField 
                  label="ABC ID (Academic Bank of Credits)" 
                  registration={register("abcId")} 
                  error={errors.abcId?.message}
                  placeholder="12-digit ABC ID"
                />
                <SelectField 
                  label="Category / Caste" 
                  registration={register("category")} 
                  error={errors.category?.message}
                  options={["OPEN", "OBC", "SC", "ST", "VJNT", "SBC", "EWS"]}
                />

                <AnimatePresence>
                  {selectedCategory && selectedCategory !== 'OPEN' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                    >
                      <InputField 
                        label="Caste Certificate Number" 
                        registration={register("casteCertificateNumber")} 
                        error={errors.casteCertificateNumber?.message}
                        placeholder="Enter Certificate No."
                      />
                      <InputField 
                        label="Caste Validity Number" 
                        registration={register("casteValidityNumber")} 
                        error={errors.casteValidityNumber?.message}
                        placeholder="Enter Validity No."
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <InputField 
                  label="Nationality" 
                  registration={register("nationality")} 
                  error={errors.nationality?.message}
                  placeholder="e.g. INDIAN"
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField 
                  label="Mobile Number" 
                  registration={register("mobile")} 
                  error={errors.mobile?.message}
                  placeholder="10-digit number"
                />
                <InputField 
                  label="Email Address" 
                  type="email"
                  registration={register("email")} 
                  error={errors.email?.message}
                  placeholder="example@email.com"
                />
                <TextAreaField 
                  label="Permanent Address" 
                  registration={register("permanentAddress")} 
                  error={errors.permanentAddress?.message}
                  placeholder="Enter full permanent address with pincode"
                />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="sameAsPermanent" 
                      checked={sameAsPermanent}
                      onChange={(e) => setSameAsPermanent(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <label htmlFor="sameAsPermanent" className="text-xs font-bold text-slate-600 uppercase tracking-tight cursor-pointer">
                      Same as Permanent Address
                    </label>
                  </div>
                  <TextAreaField 
                    label="Correspondence Address" 
                    registration={register("correspondenceAddress")} 
                    error={errors.correspondenceAddress?.message}
                    placeholder="Enter full correspondence address"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Qualifying Examination Details
                  </h3>
                </div>
                <InputField 
                  label="Qualifying Exam" 
                  registration={register("qualifyingExam")} 
                  error={errors.qualifyingExam?.message}
                  placeholder="e.g. HSC / DIPLOMA"
                />
                <InputField 
                  label="Board / University" 
                  registration={register("board")} 
                  error={errors.board?.message}
                  placeholder="e.g. MAHARASHTRA STATE BOARD"
                />
                <InputField 
                  label="Year of Passing" 
                  registration={register("passingYear")} 
                  error={errors.passingYear?.message}
                  placeholder="YYYY"
                />
                <InputField 
                  label="Roll Number" 
                  registration={register("rollNumber")} 
                  error={errors.rollNumber?.message}
                  placeholder="Enter seat number"
                />
                <InputField 
                  label="Percentage / Marks" 
                  registration={register("percentage")} 
                  error={errors.percentage?.message}
                  className="md:col-span-2"
                  placeholder="e.g. 85.50% or 450/600"
                />

                {selectedCourse === 'M. Pharm' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200 mt-4"
                  >
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        B. Pharm Graduation Details
                      </h3>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight mb-4">Required for M. Pharm Admission</p>
                    </div>
                    <InputField 
                      label="B. Pharm University" 
                      registration={register("bPharmUniversity")} 
                      error={errors.bPharmUniversity?.message}
                      placeholder="Enter University Name"
                    />
                    <InputField 
                      label="B. Pharm College" 
                      registration={register("bPharmCollege")} 
                      error={errors.bPharmCollege?.message}
                      placeholder="Enter College Name"
                    />
                    <InputField 
                      label="B. Pharm CGPA" 
                      registration={register("bPharmCgpa")} 
                      error={errors.bPharmCgpa?.message}
                      placeholder="e.g. 8.5"
                    />
                    <InputField 
                      label="B. Pharm Grade" 
                      registration={register("bPharmGrade")} 
                      error={errors.bPharmGrade?.message}
                      placeholder="e.g. A+"
                    />
                  </motion.div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Information Verified</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    You have successfully completed the course and academic details. Please proceed to the final declaration.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-left w-full max-w-md">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Course</p>
                  <p className="text-lg font-bold text-slate-900">{selectedCourse || 'Not Selected'}</p>
                  <p className="text-xs text-slate-500 mt-1">College: {selectedCollege}</p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <input 
                        type="checkbox" 
                        id="declaration" 
                        className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                        {...register("declaration")}
                      />
                    </div>
                    <label htmlFor="declaration" className="text-sm text-slate-700 leading-relaxed cursor-pointer">
                      <span className="font-bold text-slate-900 block mb-1">Self-Declaration</span>
                      I hereby declare that the information provided above is true, complete and correct to the best of my knowledge and belief. 
                      In the event of any information being found false or incorrect at any stage, my candidature/admission is liable to be cancelled.
                      {errors.declaration && <p className="text-red-600 mt-2 font-bold text-xs">{errors.declaration.message}</p>}
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Place" 
                    registration={register("place")} 
                    error={errors.place?.message}
                    placeholder="Enter city/town"
                  />
                  <InputField 
                    label="Date" 
                    type="date"
                    registration={register("date")} 
                    error={errors.date?.message}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-widest transition-all",
              currentStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {currentStep === steps.length - 1 ? (
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={async () => {
                  const isValid = await trigger();
                  if (isValid) {
                    const values = getFieldsForStep(0).concat(
                      getFieldsForStep(1),
                      getFieldsForStep(2),
                      getFieldsForStep(3),
                      getFieldsForStep(4)
                    );
                    // Trigger validation for all fields before preview
                    const isAllValid = await trigger(values as any);
                    if (isAllValid) {
                      const formData = (control as any)._formValues;
                      onPreview(formData);
                    }
                  }
                }}
                className="flex items-center gap-2 px-6 py-4 rounded-lg font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
              >
                <Eye className="w-5 h-5" />
                Print Preview
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-lg font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/20 active:scale-95"
              >
                Final Submit
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-lg font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-900/20 active:scale-95"
            >
              Next Step
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
