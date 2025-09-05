import React from 'react';
import { BiUser, BiEnvelope, BiPhone, BiKey } from 'react-icons/bi';
import InputField from './shared/inputField';

const StepPersonalInfo = ({ form, handleChange }) => {
    const fields = [
        {
            icon: <BiUser />,
            label: "Full Name",
            name: "name",
            placeholder: "Enter your full name",
            type: "text"
        },
        {
            icon: <BiEnvelope />,
            label: "Email",
            name: "email",
            placeholder: "Enter your email",
            type: "email"
        },
        {
            icon: <BiPhone />,
            label: "Phone Number",
            name: "phone",
            placeholder: "Enter your phone number",
            type: "tel"
        },
        {
            icon: <BiKey />,
            label: "Password",
            name: "pass",
            placeholder: "Enter your password",
            type: "password"
        },
        {
            icon: <BiKey />,
            label: "Confirm Password",
            name: "confirmPass",
            placeholder: "Confirm your password",
            type: "password"
        }
    ];

    return (
        <div className="space-y-5">
            {fields.map((field, index) => (
                <InputField
                    key={index}
                    icon={field.icon}
                    label={field.label}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    type={field.type}
                />
            ))}
        </div>
    );
};

export default StepPersonalInfo;