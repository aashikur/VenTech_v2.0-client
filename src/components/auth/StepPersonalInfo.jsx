import React from 'react';
import { BiUser, BiEnvelope, BiPhone, BiKey } from 'react-icons/bi';
import InputField from './shared/inputField';

const StepPersonalInfo = ({ form, handleChange }) => {
    return (
              <div className="space-y-5">
                <InputField icon={<BiUser />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
                <InputField icon={<BiEnvelope />} label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email" />
                <InputField icon={<BiPhone />} label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
                <InputField icon={<BiKey />} label="Password" name="pass" value={form.pass} onChange={handleChange} placeholder="Enter your password" type="password" />
                <InputField icon={<BiKey />} label="Confirm Password" name="confirmPass" value={form.confirmPass} onChange={handleChange} placeholder="Confirm your password" type="password" />
              </div>
    );
};

export default StepPersonalInfo;