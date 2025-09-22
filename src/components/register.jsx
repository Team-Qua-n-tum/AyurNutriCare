import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faTransgender, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Calendar, Ruler, Weight, MapPin, ArrowLeft, ArrowRight, CheckCircle, User, Mail, Lock, Users, UserCheck, Phone } from 'lucide-react';
import Logo from '../assets/Logo.svg';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string()
        .required('Phone number is required')
        .matches(/^\+?\d{10,12}$/, 'Enter a valid phone number (10-12 digits)'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    gender: Yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Select a valid gender'),
    location: Yup.string().required('Location is required'),
    role: Yup.string().required('Role is required').oneOf(['patient', 'doctor']),
    height: Yup.string().when('role', {
        is: 'patient',
        then: () => Yup.string().required('Height is required').matches(/^\d/, 'Enter valid height (e.g., 5\'8")'),
        otherwise: () => Yup.string().notRequired(),
    }),
    weight: Yup.string().when('role', {
        is: 'patient',
        then: () => Yup.string().required('Weight is required').matches(/^\d/, 'Enter valid weight (e.g., 70 kg)'),
        otherwise: () => Yup.string().notRequired(),
    }),
    doc_id_type: Yup.string().when('role', {
        is: 'doctor',
        then: () => Yup.string().required('ID type is required'),
        otherwise: () => Yup.string().notRequired(),
    }),
    doc_id: Yup.string().when('role', {
        is: 'doctor',
        then: () => Yup.string().required('ID number is required'),
        otherwise: () => Yup.string().notRequired(),
    }),
    medical_report: Yup.mixed().when('role', {
        is: 'patient',
        then: () =>
            Yup.mixed()
                .required('Medical report is required')
                .test('fileSize', 'File size too large (max 5MB)', (value) => !value || (value && value.size <= 5 * 1024 * 1024))
                .test('fileType', 'Unsupported file type', (value) => !value || (value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type))),
        otherwise: () => Yup.mixed().notRequired(),
    }),
});
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
        context: { role: '' }, // Initial context, updated below
    });

    const [step, setStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState('patient');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { isLoading } = useAuth();

    // Update form context with selectedRole
    React.useEffect(() => {
        setValue('role', selectedRole);
    }, [selectedRole, setValue]);

    const stepFields = {
        0: ['name', 'email', 'phone_number', 'password', 'confirmPassword'],
        1: ['age', 'gender', 'location', ...(selectedRole === 'patient' ? ['height', 'weight'] : [])],
        2: [selectedRole === 'doctor' ? 'doc_id_type' : 'medical_report', ...(selectedRole === 'doctor' ? ['doc_id'] : [])],
    };
    const handleRoleChange = (role) => {
        if (step === 0) {
            setSelectedRole(role);
        }
    };

    const handleRadioChange = (e) => {
        setValue('gender', e.target.value, { shouldValidate: true });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setValue('medical_report', file, { shouldValidate: true });
    };

    const onSubmit = (data) => {
        const existingEmail = JSON.parse(localStorage.getItem(data.email) || 'null');
        const existingPhoneNumber = JSON.parse(localStorage.getItem(data.phone_number) || 'null');
        if (existingEmail || existingPhoneNumber) {
            alert('Email or phone number is already registered!');
            return;
        }
        // Remove file object from data to avoid storing binary data in localStorage
        const { medical_report, ...dataToStore } = data;
        localStorage.setItem(data.email, JSON.stringify({ ...dataToStore, role: selectedRole }));
        alert(`${data.name} has been successfully registered`);
        navigate('/login');
    };

    const nextStep = async (e) => {
        e.preventDefault();
        const valid = await trigger(stepFields[step]);
        if (valid) {
            setStep((prev) => prev + 1);
        } else {
            alert('Please fill all the details correctly');
        }
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="login-container" role="main">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo" style={{ background: 'none' }}>
                        <img src={Logo} alt="AyurNutriCare Logo" className="rounded-full w-12 h-12 object-cover" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">AyurNutriCare</h1>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Food is medicine—personalized nutrition for lifelong wellness
                    </p>
                </div>

                <div className="card">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Role</h2>
                        <div className="role-selector flex gap-4">
                            <button
                                type="button"
                                onClick={(e) => handleRoleChange('patient', e)}
                                disabled={step > 0}
                                className={`role-button ${selectedRole === 'patient' ? 'active' : ''} ${step > 0 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200`}
                                aria-pressed={selectedRole === 'patient'}
                                aria-label="Select Patient Role"
                                aria-disabled={step > 0}
                            >
                                <Users className="w-6 h-6" />
                                <span className="text-sm font-medium">Patient</span>
                            </button>
                            <button
                                type="button"
                                onClick={(e) => handleRoleChange('doctor', e)}
                                disabled={step > 0}
                                className={`role-button ${selectedRole === 'doctor' ? 'active' : ''} ${step > 0 ? 'opacity-50 cursor-not-allowed' : ''} flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200`}
                                aria-pressed={selectedRole === 'doctor'}
                                aria-label="Select Doctor Role"
                                aria-disabled={step > 0}
                            >
                                <UserCheck className="w-6 h-6" />
                                <span className="text-sm font-medium">Doctor</span>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4" noValidate>
                        {step === 0 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                                    Account Information
                                </h3>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                    />
                                    {errors.name && <span className="text-red-500 text-sm">*{errors.name.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">*{errors.email.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phone_number')}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        aria-invalid={errors.phone_number ? 'true' : 'false'}
                                    />
                                    {errors.phone_number && <span className="text-red-500 text-sm">*{errors.phone_number.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Lock className="w-4 h-4" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            {...register('password')}
                                            placeholder="Create a password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            <FontAwesomeIcon />
                                        </button>
                                    </div>
                                    {errors.password && <span className="text-red-500 text-sm">*{errors.password.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Lock className="w-4 h-4" />
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...register('confirmPassword')}
                                            placeholder="Confirm your password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                        >
                                            <FontAwesomeIcon />
                                        </button>
                                    </div>
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">*{errors.confirmPassword.message}</span>}
                                </div>


                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                                    Personal Information
                                </h3>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Calendar className="w-4 h-4" />
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        {...register('age')}
                                        placeholder="Enter your age"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                        aria-invalid={errors.age ? 'true' : 'false'}
                                    />
                                    {errors.age && <span className="text-red-500 text-sm">*{errors.age.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <div className="flex gap-x-6">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                {...register('gender')}
                                                value="male"
                                                className="accent-blue-500"
                                                onChange={handleRadioChange}
                                                aria-checked={register('gender').value === 'male'}
                                            />
                                            <FontAwesomeIcon icon={faMars} />
                                            <span>Male</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                {...register('gender')}
                                                value="female"
                                                className="accent-pink-500"
                                                onChange={handleRadioChange}
                                                aria-checked={register('gender').value === 'female'}
                                            />
                                            <FontAwesomeIcon icon={faVenus} />
                                            <span>Female</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                {...register('gender')}
                                                value="other"
                                                className="accent-purple-500"
                                                onChange={handleRadioChange}
                                                aria-checked={register('gender').value === 'other'}
                                            />
                                            <FontAwesomeIcon icon={faTransgender} />
                                            <span>Other</span>
                                        </label>
                                    </div>
                                    {errors.gender && <span className="text-red-500 text-sm">*{errors.gender.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <MapPin className="w-4 h-4" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        {...register('location')}
                                        placeholder="Enter your location"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                        aria-invalid={errors.location ? 'true' : 'false'}
                                    />
                                    {errors.location && <span className="text-red-500 text-sm">*{errors.location.message}</span>}
                                </div>

                                {selectedRole === 'patient' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Ruler className="w-4 h-4" />
                                                Height
                                            </label>
                                            <input
                                                type="text"
                                                {...register('height')}
                                                placeholder="Enter your height (e.g., 5'8\)"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                                aria-invalid={errors.height ? 'true' : 'false'}
                                            />
                                            {errors.height && <span className="text-red-500 text-sm">*{errors.height.message}</span>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Weight className="w-4 h-4" />
                                                Weight
                                            </label>
                                            <input
                                                type="text"
                                                {...register('weight')}
                                                placeholder="Enter your weight (e.g., 70 kg)"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                                aria-invalid={errors.weight ? 'true' : 'false'}
                                            />
                                            {errors.weight && <span className="text-red-500 text-sm">*{errors.weight.message}</span>}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                                    Final Step
                                </h3>
                                {selectedRole === 'doctor' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <Calendar className="w-4 h-4" />
                                                Select Your ID Type
                                            </label>
                                            <select
                                                {...register('doc_id_type')}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                                aria-invalid={errors.doc_id_type ? 'true' : 'false'}
                                            >
                                                <option value="">Select ID type</option>
                                                <option value="pVerify">pVerify</option>
                                                <option value="HPR ID">HPR ID</option>
                                                <option value="Ayush ID">Ayush ID</option>
                                                <option value="Surepass Doctor ID">Surepass Doctor ID</option>
                                                <option value="Indian Medical Register ID">Indian Medical Register ID</option>
                                            </select>
                                            {errors.doc_id_type && <span className="text-red-500 text-sm">*{errors.doc_id_type.message}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                <User className="w-4 h-4" />
                                                ID Number
                                            </label>
                                            <input
                                                type="text"
                                                {...register('doc_id')}
                                                placeholder="Enter your ID number"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                                aria-invalid={errors.doc_id ? 'true' : 'false'}
                                            />
                                            {errors.doc_id && <span className="text-red-500 text-sm">*{errors.doc_id.message}</span>}
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Calendar className="w-4 h-4" />
                                            Submit Your Medical Report
                                        </label>
                                        <input
                                            type="file"
                                            {...register('medical_report')}
                                            onChange={handleFileChange}
                                            accept="application/pdf,image/jpeg,image/png"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                            aria-invalid={errors.medical_report ? 'true' : 'false'}
                                        />
                                        {errors.medical_report && <span className="text-red-500 text-sm">*{errors.medical_report.message}</span>}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                                    Login Here
                                </Link>
                            </p>
                        </div>
                        <div className="flex justify-between pt-6">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-6 border bg border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                                    aria-label="Go to previous step"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </button>
                            )}

                            <div className="ml-auto">
                                {step < 2 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                                        aria-label="Go to next step"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                        aria-label={`Sign up as ${selectedRole}`}
                                    >
                                        {isLoading ? 'Signing up...' : `Sign up as ${selectedRole}`}
                                        <CheckCircle className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;