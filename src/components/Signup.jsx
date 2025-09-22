import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faTransgender } from '@fortawesome/free-solid-svg-icons';
import {
    User,
    Mail,
    Lock,
    ArrowRight,
    ArrowLeft,
    UserPlus,
    Calendar,
    Ruler,
    Weight,
    CheckCircle
} from 'lucide-react';

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    age: Yup.string().required("Age is required"),
    height: Yup.string().required("Height is required"),
    weight: Yup.string().required("Weight is required"),
});

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({ resolver: yupResolver(validationSchema) });

    const handleRadioChange = (e) => {
        setGender(e.target.value);
    };

    const [gender, setGender] = useState("");

    const stepFields = {
        0: ["name", "email", "username", "password", "confirmPassword"],
        1: ["age", "height", "weight", "gender"],
    };

    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const existingUser = JSON.parse(localStorage.getItem(data.email) && localStorage.getItem(data.username) || 'null');
        if (existingUser) {
            alert("Email is already registered!");
        } else {
            localStorage.setItem(data.email, JSON.stringify(data));
            alert(`${data.username} has been successfully registered`);
            navigate('/login');
        }
    };

    const nextStep = async () => {
        const valid = await trigger(stepFields[step]);
        if (valid) {
            setStep((prev) => prev + 1);
        } else {
            alert("Please fill all the details correctly");
        }
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join AyurNutriCare</h1>
                    <p className="text-gray-600">Create your account to start your wellness journey</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                            {step > 0 ? <CheckCircle className="w-4 h-4" /> : '1'}
                        </div>
                        <div className={`w-16 h-1 ${step >= 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}>
                            2
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Step 1: Account Information */}
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
                                        {...register("name")}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
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
                                        {...register("email")}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">*{errors.email.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <User className="w-4 h-4" />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        {...register("username")}
                                        placeholder="Choose a username"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                    />
                                    {errors.username && <span className="text-red-500 text-sm">*{errors.username.message}</span>}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Lock className="w-4 h-4" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                            placeholder="Create a password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
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
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...register("confirmPassword")}
                                            placeholder="Confirm your password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >

                                        </button>
                                    </div>
                                    {errors.confirmPassword && <span className="text-red-500 text-sm">*{errors.confirmPassword.message}</span>}
                                </div>

                                <div className="text-center pt-4">
                                    <p className="text-sm text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                                            Login Here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Personal Information */}
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
                                        type="text"
                                        {...register("age")}
                                        placeholder="Enter your age"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                    {errors.age && <span className="text-red-500 text-sm">*{errors.age.message}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-gray-600 font-medium "> Gender:</p><br />

                                    <div className="flex gap-x-6">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={gender === "male"}
                                                onChange={handleRadioChange}
                                                className="accent-blue-500"
                                            />
                                            <FontAwesomeIcon icon={faMars} />
                                            <span>Male</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={gender === "female"}
                                                onChange={handleRadioChange}
                                                className="accent-pink-500"
                                            />
                                            <FontAwesomeIcon icon={faVenus} />
                                            <span>Female</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={gender === "other"}
                                                onChange={handleRadioChange}
                                                className="accent-purple-500"
                                            />
                                            <FontAwesomeIcon icon={faTransgender} />
                                            <span>Other</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Ruler className="w-4 h-4" />
                                        Height
                                    </label>
                                    <input
                                        type="text"
                                        {...register("height")}
                                        placeholder="Enter your height (e.g., 5'8\)"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
                                        {...register("weight")}
                                        placeholder="Enter your weight (e.g., 70 kg)"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                    {errors.weight && <span className="text-red-500 text-sm">*{errors.weight.message}</span>}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center gap-2 px-6 border bg border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </button>
                            )}

                            <div className="ml-auto">
                                {step < 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                                    >
                                        Complete Registration
                                        <CheckCircle className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </div >
    );
}

export default SignupForm;