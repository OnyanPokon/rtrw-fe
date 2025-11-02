import { useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FormField from './FormField';
import Button from '../atoms/Button';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Email" name="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} error={errors.email} required prefix={<UserOutlined className="text-gray-400" />} />

      <FormField label="Password" name="password" type="password" placeholder="Masukkan password" value={formData.password} onChange={handleChange} error={errors.password} required prefix={<LockOutlined className="text-gray-400" />} />

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm text-gray-600">Ingat saya</span>
        </label>

        <Link to="/reset-password" className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700">
          Lupa password?
        </Link>
      </div>

      <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
        Masuk
      </Button>

      <p className="text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/signup" className="font-semibold text-primary-600 transition-colors hover:text-primary-700">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default LoginForm;
