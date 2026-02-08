import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import axiosPublic from '../api/axiosPublic';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    username: '',
    password: '',
    telefono: '',
    oficio: '',
    ciudad: '',
    direccion: '',
    horario: ''
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (fotoPreview) {
        URL.revokeObjectURL(fotoPreview);
      }
    };
  }, [fotoPreview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFotoFile(null);
      setFotoPreview('');
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      toast.error('Solo se permiten imágenes (jpg, jpeg, png).');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede superar 5MB.');
      e.target.value = '';
      return;
    }

    if (fotoPreview) {
      URL.revokeObjectURL(fotoPreview);
    }
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!fotoFile) {
        const msg = 'Debes seleccionar una foto de perfil.';
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
      }

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.append('foto', fotoFile);

      const res = await axiosPublic.post('/api/auth/register/prestador', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        const successMsg = 'Registro exitoso. Tu cuenta está pendiente de aprobación.';
        setSuccess(successMsg);
        toast.success(successMsg);
        setTimeout(() => navigate('/login'), 5000);
      }
    } catch (err) {
      const backendMsg = err.response?.data?.message || '';
      const normalized = backendMsg.toLowerCase();
      const isDuplicate =
        normalized.includes('ya existe') ||
        normalized.includes('duplic') ||
        normalized.includes('registrad');
      const errorMsg = isDuplicate
        ? 'Este usuario ya existe.'
        : backendMsg || 'Error al registrar';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        {/* Logo */}
        <div style={{
          width: '120px',
          height: '120px',
          backgroundImage: "url(/images/LogoServiLocal.png)",
          backgroundSize: 'cover',
          borderRadius: '50%',
          margin: '0 auto 20px'
        }} />

        <h1 className="gradient-title">ServiLocal</h1>
        <h2 className="subtitle">Registro de Prestador</h2>

        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          fotoPreview={fotoPreview}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          showInlineError={false}
        />
      </div>
    </div>
  );
};

export default Register;
