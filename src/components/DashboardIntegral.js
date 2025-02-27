import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, Link as RouterLink, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Container, Paper, Typography, Box, Grid, TextField, Button, MenuItem, FormControl, FormControlLabel,
  FormHelperText, InputLabel, Select, Checkbox, Divider, Alert, Card, CardContent, Stepper, Step,
  StepLabel, CircularProgress, AppBar, Toolbar, IconButton, Menu, Avatar, Tooltip, ListItemIcon,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  Chip, InputAdornment, LinearProgress, CardMedia, CardActions, Link, OutlinedInput, Radio,
  RadioGroup, FormLabel
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard as DashboardIcon, Add as AddIcon, 
  AddCircleOutline as AddCircleOutlineIcon, Visibility as VisibilityIcon,
  CloudUpload as CloudUploadIcon, Search as SearchIcon, FilterList as FilterListIcon,
  Delete as DeleteIcon, Edit as EditIcon, CheckCircle as CheckCircleIcon,
  CancelOutlined as CancelIcon, ErrorOutline as ErrorIcon, 
  ArrowBack as ArrowBackIcon, Calculate as CalculateIcon, 
  Save as SaveIcon, ClearAll as ClearAllIcon, Logout as LogoutIcon,
  InsertDriveFile as InsertDriveFileIcon, PictureAsPdf as PictureAsPdfIcon,
  FormatListBulleted as FormatListBulletedIcon, AccountCircle as AccountCircleIcon,
  HourglassEmpty as HourglassEmptyIcon, HourglassFull as HourglassFullIcon,
  DoneAll as DoneAllIcon, Assessment as AssessmentIcon,
  BarChart as BarChartIcon, PieChart as PieChartIcon, DonutLarge as DonutLargeIcon,
  LockOutlined as LockOutlinedIcon, 
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

// =============== CONTEXTO DE LA APLICACIÓN ===============
// URLs de las imágenes (ajusta las rutas según donde estén tus imágenes)
const uvegLogoUrl = "/images/uveg_logo.jpg";
const tlalLogoUrl = "/images/tlal.png";
const tlalGobLogoUrl = "/images/tlal_gob.png";
// Contexto de Autenticación
const AuthContext = createContext();

// Contexto de Solicitudes
const SolicitudesContext = createContext();

// Mock de usuarios para la demo
const mockUsers = [
  { id: 1, username: 'Asesor', password: 'jofiloteo', role: 'prueba', name: 'Prueba para el asesor' },
  { id: 2, username: 'capturista', password: 'captura123', role: 'capturista', name: 'Juan Pérez' },
  { id: 3, username: 'supervisor', password: 'super123', role: 'supervisor', name: 'María López' },
];



// Datos iniciales para la demo
const mockSolicitudes = [
  {
    id: 1,
    folio: 'SOL-2023-001',
    beneficiario: 'Ana María López',
    curp: 'LOPA880517MDFPNN09',
    programa: 'Despensas',
    estatus: 'aprobada',
    fechaCreacion: '2023-02-15',
    direccion: 'Calle Juárez #123, Col. Centro',
    telefono: '5512345678',
    documentos: ['ine.jpg', 'comprobante_domicilio.pdf'],
    evaluacionVulnerabilidad: {
      comidasDiarias: 2,
      consumoFrutas: 'bajo',
      consumoVerduras: 'bajo',
      consumoProteinas: 'bajo',
      consumoCereales: 'medio',
      gastoEnergia: '1000-1500',
      participacionComunitaria: false,
      nivelVulnerabilidad: 'alto'
    }
  },
  {
    id: 2,
    folio: 'SOL-2023-002',
    beneficiario: 'Juan Carlos Martínez',
    curp: 'MAMJ750628HDFRRN01',
    programa: 'Láminas',
    estatus: 'pendiente',
    fechaCreacion: '2023-03-05',
    direccion: 'Av. Revolución #456, Col. Moderna',
    telefono: '5587654321',
    documentos: ['ine.jpg'],
    evaluacionVulnerabilidad: null
  },
  {
    id: 3,
    folio: 'SOL-2023-003',
    beneficiario: 'María Fernanda Sánchez',
    curp: 'SAMF900414MDFNRR07',
    programa: 'Beca Escolar',
    estatus: 'en-revision',
    fechaCreacion: '2023-03-12',
    direccion: 'Calle Pino #789, Col. Bosques',
    telefono: '5523456789',
    documentos: ['ine.jpg', 'acta_nacimiento.pdf', 'constancia_estudios.pdf'],
    evaluacionVulnerabilidad: {
      comidasDiarias: 3,
      consumoFrutas: 'medio',
      consumoVerduras: 'medio',
      consumoProteinas: 'bajo',
      consumoCereales: 'alto',
      gastoEnergia: '500-1000',
      participacionComunitaria: true,
      nivelVulnerabilidad: 'medio'
    }
  },
  {
    id: 4,
    folio: 'SOL-2023-004',
    beneficiario: 'Roberto García Pérez',
    curp: 'GAPR650812HDFRCB05',
    programa: 'Despensas',
    estatus: 'rechazada',
    fechaCreacion: '2023-02-28',
    direccion: 'Av. Chapultepec #101, Col. Roma',
    telefono: '5534567890',
    documentos: ['ine.jpg', 'comprobante_domicilio.pdf'],
    evaluacionVulnerabilidad: {
      comidasDiarias: 3,
      consumoFrutas: 'alto',
      consumoVerduras: 'alto',
      consumoProteinas: 'medio',
      consumoCereales: 'alto',
      gastoEnergia: 'menos-500',
      participacionComunitaria: true,
      nivelVulnerabilidad: 'bajo'
    }
  },
  {
    id: 5,
    folio: 'SOL-2023-005',
    beneficiario: 'Laura Ramírez Torres',
    curp: 'RATL780923MDFMRR06',
    programa: 'Programa Vivienda',
    estatus: 'concluida',
    fechaCreacion: '2023-01-20',
    direccion: 'Calle Laurel #222, Col. Jardines',
    telefono: '5545678901',
    documentos: ['ine.jpg', 'comprobante_domicilio.pdf', 'solicitud_firmada.pdf'],
    evaluacionVulnerabilidad: {
      comidasDiarias: 2,
      consumoFrutas: 'bajo',
      consumoVerduras: 'bajo',
      consumoProteinas: 'bajo',
      consumoCereales: 'medio',
      gastoEnergia: 'mas-1500',
      participacionComunitaria: false,
      nivelVulnerabilidad: 'alto'
    }
  }
];

// Proveedor de autenticación
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simular delay de red
      setTimeout(() => {
        const foundUser = mockUsers.find(
          (user) => user.username === username && user.password === password
        );

        if (foundUser) {
          // Excluir la contraseña del objeto de usuario almacenado
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 800);
    });
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Verificar si el usuario tiene cierto rol
  const hasRole = (role) => {
    return user && user.role === role;
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        hasRole,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Proveedor de solicitudes
const SolicitudesProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar solicitudes al iniciar (simulando una API)
  useEffect(() => {
    const loadSolicitudes = async () => {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar si hay datos guardados en localStorage
      const savedSolicitudes = localStorage.getItem('solicitudes');
      if (savedSolicitudes) {
        setSolicitudes(JSON.parse(savedSolicitudes));
      } else {
        setSolicitudes(mockSolicitudes);
        localStorage.setItem('solicitudes', JSON.stringify(mockSolicitudes));
      }
      
      setLoading(false);
    };

    loadSolicitudes();
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    }
  }, [solicitudes, loading]);

  // Función para agregar una nueva solicitud
  const addSolicitud = (solicitud) => {
    const newSolicitud = {
      ...solicitud,
      id: solicitudes.length > 0 ? Math.max(...solicitudes.map(s => s.id)) + 1 : 1,
      folio: `SOL-2023-${String(solicitudes.length + 1).padStart(3, '0')}`,
      fechaCreacion: new Date().toISOString().split('T')[0],
      estatus: 'pendiente',
      evaluacionVulnerabilidad: null
    };
    
    setSolicitudes([...solicitudes, newSolicitud]);
    return newSolicitud;
  };

  // Función para actualizar una solicitud existente
  const updateSolicitud = (id, updatedData) => {
    setSolicitudes(
      solicitudes.map(solicitud => 
        solicitud.id === id ? { ...solicitud, ...updatedData } : solicitud
      )
    );
  };

  // Función para eliminar una solicitud
  const deleteSolicitud = (id) => {
    setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
  };

  // Función para obtener una solicitud por ID
  const getSolicitudById = (id) => {
    return solicitudes.find(solicitud => solicitud.id === Number(id)) || null;
  };

  // Función para agregar evaluación de vulnerabilidad a una solicitud
  const addEvaluacionVulnerabilidad = (solicitudId, evaluacion) => {
    updateSolicitud(solicitudId, { evaluacionVulnerabilidad: evaluacion });
  };

  // Estadísticas para el dashboard
  const getEstadisticas = () => {
    const totalSolicitudes = solicitudes.length;
    const pendientes = solicitudes.filter(s => s.estatus === 'pendiente').length;
    const enRevision = solicitudes.filter(s => s.estatus === 'en-revision').length;
    const aprobadas = solicitudes.filter(s => s.estatus === 'aprobada').length;
    const rechazadas = solicitudes.filter(s => s.estatus === 'rechazada').length;
    const concluidas = solicitudes.filter(s => s.estatus === 'concluida').length;
    const conEvaluacion = solicitudes.filter(s => s.evaluacionVulnerabilidad !== null).length;
    
    return {
      totalSolicitudes,
      pendientes,
      enRevision,
      aprobadas,
      rechazadas,
      concluidas,
      conEvaluacion,
      sinEvaluacion: totalSolicitudes - conEvaluacion
    };
  };

  return (
    <SolicitudesContext.Provider 
      value={{
        solicitudes,
        loading,
        addSolicitud,
        updateSolicitud,
        deleteSolicitud,
        getSolicitudById,
        addEvaluacionVulnerabilidad,
        getEstadisticas
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
};

// Hooks personalizados para usar los contextos
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

const useSolicitudes = () => {
  const context = useContext(SolicitudesContext);
  if (!context) {
    throw new Error('useSolicitudes debe usarse dentro de un SolicitudesProvider');
  }
  return context;
};

// =============== COMPONENTES COMUNES ===============

// Componente de Ruta Protegida
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();
  const location = useLocation();

  // Mostrar spinner mientras se verifica la autenticación
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Verificar autenticación
  if (!isAuthenticated) {
    // Redirigir a login y recordar la página a la que intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar rol si es necesario
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si está autenticado y tiene el rol requerido, mostrar el contenido
  return children;
};

// Componente para mostrar el estatus con un badge
const StatusBadge = ({ status, size = 'medium' }) => {
  // Configuraciones según el estatus
  const config = {
    pendiente: {
      label: 'Pendiente',
      color: 'warning',
      icon: <HourglassEmptyIcon fontSize="small" />
    },
    'en-revision': {
      label: 'En Revisión',
      color: 'info',
      icon: <HourglassFullIcon fontSize="small" />
    },
    aprobada: {
      label: 'Aprobada',
      color: 'success',
      icon: <CheckCircleIcon fontSize="small" />
    },
    rechazada: {
      label: 'Rechazada',
      color: 'error',
      icon: <CancelIcon fontSize="small" />
    },
    concluida: {
      label: 'Concluida',
      color: 'secondary',
      icon: <DoneAllIcon fontSize="small" />
    }
  };

  // Fallback para estatus desconocidos
  const { label, color, icon } = config[status] || {
    label: status,
    color: 'default',
    icon: null
  };

  return (
    <Chip
      label={label}
      color={color}
      size={size}
      icon={icon}
      variant="filled"
    />
  );
};


// Componente de Navbar/Barra de Navegación
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/login');
  };

  // Opciones de navegación
  const pages = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
    { name: 'Nueva Solicitud', path: '/nueva-solicitud', icon: <AddCircleOutlineIcon fontSize="small" /> },
    { name: 'Solicitudes', path: '/solicitudes', icon: <FormatListBulletedIcon fontSize="small" /> },
    { name: 'Importar Credenciales', path: '/importar-credenciales', icon: <CloudUploadIcon fontSize="small" /> },
  ];

  // Verificar la ruta actual para resaltar el botón activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Barra superior con logos e información institucional */}
      <AppBar position="static" color="default" sx={{ py: 1, boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
            {/* Contenedor de logos */}
            <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 0 }}>
              <img 
                src={uvegLogoUrl} 
                alt="UVEG Logo" 
                style={{ height: '40px', margin: '0 10px', objectFit: 'contain' }} 
              />
              <img 
                src={tlalLogoUrl} 
                alt="Tlalpujahua Logo" 
                style={{ height: '40px', margin: '0 10px', objectFit: 'contain' }} 
              />
              <img 
                src={tlalGobLogoUrl} 
                alt="Gobierno Tlalpujahua Logo" 
                style={{ height: '40px', margin: '0 10px', objectFit: 'contain' }} 
              />
            </Box>
            
            {/* Información institucional */}
            <Box textAlign={{ xs: 'center', sm: 'right' }}>
              <Typography variant="subtitle2" fontWeight="bold" color="primary">
                Área de Desarrollo Social - Tlalpujahua, Michoacán
              </Typography>
              <Typography variant="caption" display="block" color="textSecondary">
                Estadía Profesional UVEG - Tlalpujahua, Michoacán
              </Typography>
              <Typography variant="caption" display="block" color="textSecondary">
                Desarrollado por Alfonso Boldo
              </Typography>
            </Box>
          </Box>
        </Container>
      </AppBar>

      {/* Barra de navegación principal - Esta es la original */}
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo - Desktop */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Apoyos Sociales
            </Typography>

            {/* Menú Móvil */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.path);
                    }}
                    selected={isActive(page.path)}
                  >
                    <ListItemIcon>
                      {page.icon}
                    </ListItemIcon>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo - Móvil */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Apoyos Sociales
            </Typography>

            {/* Menú Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    my: 2, 
                    color: 'white', 
                    display: 'flex',
                    alignItems: 'center',
                    mx: 1,
                    backgroundColor: isActive(page.path) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    }
                  }}
                  startIcon={page.icon}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Menú Usuario */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    alt={user?.name || 'Usuario'} 
                    sx={{ 
                      bgcolor: 'secondary.main',
                      color: 'white'
                    }}
                  >
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    {user?.role === 'admin' ? 'Administrador' : 
                     user?.role === 'supervisor' ? 'Supervisor' : 'Capturista'}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">{user?.name}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Cerrar Sesión</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Pie de página con información del proyecto */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 2,
          px: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Dashboard desarrollado como evidencia del Proyecto de Modernización Administrativa
          </Typography>
        </Container>
      </Box>
    </>
  );
};
// =============== COMPONENTES PRINCIPALES ===============

// Componente de Login
// Componente de Login
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Recuperar el destino al que el usuario intentaba acceder
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales inválidas. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        {/* NUEVO: Logotipos institucionales */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            flexWrap: 'wrap'
          }}
        >
          <img 
            src={uvegLogoUrl} 
            alt="UVEG Logo" 
            style={{ height: '50px', margin: '0 10px', objectFit: 'contain' }} 
          />
          <img 
            src={tlalLogoUrl} 
            alt="Tlalpujahua Logo" 
            style={{ height: '50px', margin: '0 10px', objectFit: 'contain' }} 
          />
          <img 
            src={tlalGobLogoUrl} 
            alt="Gobierno Tlalpujahua Logo" 
            style={{ height: '50px', margin: '0 10px', objectFit: 'contain' }} 
          />
        </Box>
        
        {/* NUEVO: Información institucional */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            Área de Desarrollo Social - Tlalpujahua, Michoacán
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Estadía Profesional UVEG
          </Typography>
        </Box>
        
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sistema de Gestión de Apoyos Sociales
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="password">Contraseña *</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                required
                disabled={loading}
              />
            </FormControl>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            
            <Box mt={2}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Usuario de prueba para el asesor:</strong>
                </Typography>
                <Typography variant="body2">
                  Admin: Asesor / el inicio de su correo sin el "@uveg.edu.mx"
                </Typography>
              </Alert>
            </Box>
          </Box>
        </Paper>
        
        {/* NUEVO: Pie de página */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Dashboard desarrollado como evidencia del Proyecto de Modernización Administrativa
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Desarrollado por Alfonso Boldo
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

// Componente de Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const { loading, getEstadisticas } = useSolicitudes();
  const { user } = useAuth();
  
  // Obtener estadísticas
  const estadisticas = getEstadisticas();

  // Tarjetas de estadísticas para el dashboard
  const statCards = [
    {
      title: "Solicitudes Pendientes",
      count: estadisticas.pendientes,
      icon: <HourglassEmptyIcon sx={{ fontSize: 40 }} color="warning" />,
      color: "#ff9800",
      action: () => navigate('/solicitudes?status=pendiente')
    },
    {
      title: "En Revisión",
      count: estadisticas.enRevision,
      icon: <HourglassFullIcon sx={{ fontSize: 40 }} color="info" />,
      color: "#2196f3",
      action: () => navigate('/solicitudes?status=en-revision')
    },
    {
      title: "Aprobadas",
      count: estadisticas.aprobadas,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} color="success" />,
      color: "#4caf50",
      action: () => navigate('/solicitudes?status=aprobada')
    },
    {
      title: "Rechazadas",
      count: estadisticas.rechazadas,
      icon: <CancelIcon sx={{ fontSize: 40 }} color="error" />,
      color: "#f44336",
      action: () => navigate('/solicitudes?status=rechazada')
    }
  ];

  // Tarjetas de acceso rápido
  const quickAccessCards = [
    {
      title: "Nueva Solicitud",
      description: "Crea una nueva solicitud de apoyo social",
      icon: <AddIcon sx={{ fontSize: 50 }} color="primary" />,
      action: () => navigate('/nueva-solicitud')
    },
    {
      title: "Importar Credenciales",
      description: "Carga masiva de documentos de identidad",
      icon: <CloudUploadIcon sx={{ fontSize: 50 }} color="secondary" />,
      action: () => navigate('/importar-credenciales')
    },
    {
      title: "Ver Solicitudes",
      description: "Gestiona y revisa todas las solicitudes",
      icon: <AssessmentIcon sx={{ fontSize: 50 }} style={{ color: "#9c27b0" }} />,
      action: () => navigate('/solicitudes')
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user?.name || 'Usuario'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Panel de Control — Sistema de Gestión de Apoyos Sociales
        </Typography>
      </Box>

      {/* Tarjetas de Estadísticas */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 8,
                  height: '100%',
                  backgroundColor: card.color
                }
              }}
              onClick={card.action}
            >
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {loading ? '...' : card.count}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {card.title}
                  </Typography>
                </Box>
                <Box>{card.icon}</Box>
              </Box>
              <Box mt="auto">
                <Chip
                  label="Ver detalles"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.08)',
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.12)' }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Resumen General */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Resumen General
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <DonutLargeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Total de Solicitudes:{' '}
                <Typography component="span" fontWeight="bold">
                  {loading ? '...' : estadisticas.totalSolicitudes}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <BarChartIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Concluidas:{' '}
                <Typography component="span" fontWeight="bold">
                  {loading ? '...' : estadisticas.concluidas}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <PieChartIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Con Evaluación:{' '}
                <Typography component="span" fontWeight="bold">
                  {loading ? '...' : estadisticas.conEvaluacion}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Acceso Rápido */}
      <Typography variant="h6" gutterBottom>
        Acceso Rápido
      </Typography>
      <Grid container spacing={3}>
        {quickAccessCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              onClick={card.action}
            >
              <CardContent>
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  alignItems="center" 
                  textAlign="center"
                  p={2}
                >
                  {card.icon}
                  <Typography variant="h6" component="div" mt={2}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {card.description}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ mt: 'auto', justifyContent: 'center', pb: 2 }}>
                <Button size="small" color="primary">
                  Acceder
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Componente de Lista de Solicitudes
const SolicitudesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { solicitudes, loading } = useSolicitudes();
  
  // Estado para filtros y paginación
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Obtener filtro inicial del query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    if (statusParam) {
      setStatusFilter(statusParam);
    }
  }, [location.search]);
  
  // Filtrar solicitudes según criterios de búsqueda
  useEffect(() => {
    let result = [...solicitudes];
    
    // Filtrar por término de búsqueda (nombre de beneficiario o folio)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        s => s.beneficiario.toLowerCase().includes(term) || 
             s.folio.toLowerCase().includes(term) ||
             s.curp.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por estatus
    if (statusFilter) {
      result = result.filter(s => s.estatus === statusFilter);
    }
    
    // Ordenar por fecha (más recientes primero)
    result = result.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    
    setFilteredSolicitudes(result);
    setPage(0); // Resetear a primera página al cambiar filtros
  }, [solicitudes, searchTerm, statusFilter]);
  
  // Manejadores de paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Resetear filtros
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    navigate('/solicitudes', { replace: true });
  };
  
  // Navegar a detalle de solicitud
  const handleViewDetail = (id) => {
    navigate(`/solicitudes/${id}`);
  };
  
  // Navegar a edición de solicitud
  const handleEditSolicitud = (id) => {
    navigate(`/nueva-solicitud?id=${id}`);
  };
  
  // Mostrar solicitudes paginadas
  const displayedSolicitudes = filteredSolicitudes
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            Listado de Solicitudes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/nueva-solicitud')}
          >
            Nueva Solicitud
          </Button>
        </Box>
        
        {/* Filtros */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            alignItems: 'center'
          }}
        >
          <TextField
            placeholder="Buscar por nombre, folio o CURP"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '250px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: '150px' }}>
            <InputLabel id="status-filter-label">Estatus</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Estatus"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="pendiente">Pendiente</MenuItem>
              <MenuItem value="en-revision">En Revisión</MenuItem>
              <MenuItem value="aprobada">Aprobada</MenuItem>
              <MenuItem value="rechazada">Rechazada</MenuItem>
              <MenuItem value="concluida">Concluida</MenuItem>
            </Select>
          </FormControl>
          
          <Tooltip title="Limpiar filtros">
            <IconButton 
              color="primary" 
              onClick={handleResetFilters}
              disabled={!searchTerm && !statusFilter}
            >
              <ClearAllIcon />
            </IconButton>
          </Tooltip>
          
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <Chip
              icon={<FilterListIcon />}
              label={`${filteredSolicitudes.length} resultados`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        
        {/* Tabla de solicitudes */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de solicitudes">
              <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.03)' }}>
                <TableRow>
                  <TableCell>Folio</TableCell>
                  <TableCell>Beneficiario</TableCell>
                  <TableCell>Programa</TableCell>
                  <TableCell>Estatus</TableCell>
                  <TableCell>Fecha de Creación</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedSolicitudes.length > 0 ? (
                  displayedSolicitudes.map((solicitud) => (
                    <TableRow 
                      key={solicitud.id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {solicitud.folio}
                      </TableCell>
                      <TableCell>{solicitud.beneficiario}</TableCell>
                      <TableCell>{solicitud.programa}</TableCell>
                      <TableCell>
                        <StatusBadge status={solicitud.estatus} size="small" />
                      </TableCell>
                      <TableCell>
                        {new Date(solicitud.fechaCreacion).toLocaleDateString('es-MX')}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Ver detalle">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleViewDetail(solicitud.id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar solicitud">
                          <IconButton 
                            color="secondary" 
                            onClick={() => handleEditSolicitud(solicitud.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                        No se encontraron solicitudes con los filtros seleccionados
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        {/* Paginación */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSolicitudes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>
    </Container>
  );
};

// Componente para nueva solicitud
const NuevaSolicitud = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addSolicitud, getSolicitudById, updateSolicitud } = useSolicitudes();
  
  const [editMode, setEditMode] = useState(false);
  const [solicitudId, setSolicitudId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // Estado para manejar los campos del formulario
  const [formData, setFormData] = useState({
    beneficiario: '',
    curp: '',
    programa: '',
    telefono: '',
    direccion: '',
    documentos: [],
    estatus: 'pendiente'
  });
  
  // Verificar si estamos en modo edición
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    if (id) {
      const solicitud = getSolicitudById(Number(id));
      if (solicitud) {
        setFormData({
          beneficiario: solicitud.beneficiario,
          curp: solicitud.curp,
          programa: solicitud.programa,
          telefono: solicitud.telefono,
          direccion: solicitud.direccion,
          documentos: solicitud.documentos,
          estatus: solicitud.estatus
        });
        setEditMode(true);
        setSolicitudId(Number(id));
      }
    }
    
    setLoading(false);
  }, [location.search, getSolicitudById]);
  
  // Opciones para el campo programa
  const programas = [
    'Despensas',
    'Láminas',
    'Beca Escolar',
    'Programa Vivienda',
    'Apoyo a Adultos Mayores',
    'Otro'
  ];
  
  // Manejar cambio en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Manejar cambio de estatus (solo en modo edición)
  const handleStatusChange = (e) => {
    setFormData(prev => ({ ...prev, estatus: e.target.value }));
  };
  
  // Simular carga de archivos
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name);
    
    // Añadir a los documentos existentes
    setFormData(prev => ({
      ...prev,
      documentos: [...prev.documentos, ...fileNames]
    }));
  };
  
  // Eliminar un documento
  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos.filter((_, i) => i !== index)
    }));
  };
  
  // Validar formulario
  const validateForm = () => {
    const { beneficiario, curp, programa } = formData;
    return beneficiario.trim() !== '' && curp.trim() !== '' && programa.trim() !== '';
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, complete los campos obligatorios');
      return;
    }
    
    setSaving(true);
    
    // Simular proceso de guardado
    setTimeout(() => {
      if (editMode) {
        updateSolicitud(solicitudId, formData);
      } else {
        const newSolicitud = addSolicitud(formData);
        setSolicitudId(newSolicitud.id);
      }
      
      setSaving(false);
      setSaved(true);
      
      // Redireccionar después de guardar
      setTimeout(() => {
        navigate(editMode ? `/solicitudes/${solicitudId}` : '/solicitudes');
      }, 1500);
    }, 1000);
  };
  
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {editMode ? 'Editar Solicitud' : 'Nueva Solicitud de Apoyo'}
        </Typography>
        
        {saved ? (
          <Box textAlign="center" my={4}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Solicitud {editMode ? 'Actualizada' : 'Creada'} Correctamente
            </Typography>
            <Typography color="textSecondary" paragraph>
              Redireccionando...
            </Typography>
            <CircularProgress size={24} sx={{ mt: 2 }} />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Datos del beneficiario */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Datos del Beneficiario
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="beneficiario"
                  label="Nombre Completo"
                  value={formData.beneficiario}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="curp"
                  label="CURP"
                  value={formData.curp}
                  onChange={handleChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 18 }}
                  helperText="Formato: 18 caracteres alfanuméricos"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="telefono"
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  helperText="10 dígitos"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="direccion"
                  label="Dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              
              {/* Datos del apoyo */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Datos del Apoyo
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="programa"
                  label="Programa de Apoyo"
                  value={formData.programa}
                  onChange={handleChange}
                  select
                  fullWidth
                  required
                >
                  <MenuItem value="">Seleccionar programa</MenuItem>
                  {programas.map((prog) => (
                    <MenuItem key={prog} value={prog}>
                      {prog}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              {editMode && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="estatus"
                    label="Estatus de la Solicitud"
                    value={formData.estatus}
                    onChange={handleStatusChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="pendiente">Pendiente</MenuItem>
                    <MenuItem value="en-revision">En Revisión</MenuItem>
                    <MenuItem value="aprobada">Aprobada</MenuItem>
                    <MenuItem value="rechazada">Rechazada</MenuItem>
                    <MenuItem value="concluida">Concluida</MenuItem>
                  </TextField>
                </Grid>
              )}
              
              {/* Documentos */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Documentos
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 2
                  }}
                >
                  <input
                    type="file"
                    id="document-upload"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="document-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                    >
                      Subir Documentos
                    </Button>
                  </label>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Formatos aceptados: PDF, JPG, PNG
                  </Typography>
                </Box>
              </Grid>
              
              {formData.documentos.length > 0 && (
  <Grid item xs={12}>
    <Typography variant="subtitle1" gutterBottom>
      Documentos adjuntos:
    </Typography>
    <CustomList>
      {formData.documentos.map((doc, index) => (
        <CustomListItem
          key={index}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDocument(index)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <CustomListItemIcon>
            {doc.endsWith('.pdf') ? <PictureAsPdfIcon color="error" /> : <InsertDriveFileIcon color="primary" />}
          </CustomListItemIcon>
          <CustomListItemText primary={doc} />
        </CustomListItem>
      ))}
    </CustomList>
  </Grid>
)}
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/solicitudes')}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={saving || !validateForm()}
                    startIcon={saving ? <CircularProgress size={24} /> : <SaveIcon />}
                  >
                    {saving ? 'Guardando...' : (editMode ? 'Actualizar Solicitud' : 'Guardar Solicitud')}
                  </Button>
                  
                  {editMode && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/evaluacion-vulnerabilidad/${solicitudId}`)}
                      disabled={saving}
                      sx={{ ml: 'auto' }}
                    >
                      Evaluación de Vulnerabilidad
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Container>
  );
};

// 1. Primero, asegúrate de tener estas dependencias instaladas:
// npm install react-router-dom react-hook-form @mui/material @mui/icons-material @emotion/react @emotion/styled

// 2. Los componentes personalizados deben definirse ANTES de ser utilizados
// Aquí está la definición correcta:

const CustomList = ({ children }) => {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
      {children}
    </Box>
  );
};

const CustomListItem = ({ children, secondaryAction }) => {
  return (
    <Box sx={{ display: 'flex', p: 1, borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
      {children}
      <Box sx={{ ml: 'auto' }}>
        {secondaryAction}
      </Box>
    </Box>
  );
};

const CustomListItemIcon = ({ children }) => {
  return (
    <Box sx={{ mr: 2 }}>
      {children}
    </Box>
  );
};

const CustomListItemText = ({ primary }) => {
  return (
    <Typography variant="body2">{primary}</Typography>
  );
};

// 3. En el componente NuevaSolicitud, asegúrate de que el código para mostrar documentos use los componentes personalizados:



// Componente para importar credenciales
const ImportarCredenciales = () => {
  // Estados para gestionar la carga de archivos
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [processingResults, setProcessingResults] = useState(null);
  const fileInputRef = useRef(null);

  // Manejadores de eventos para drag & drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Manejador para selección de archivos vía input
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  // Procesar archivos seleccionados o soltados
  const handleFiles = (newFiles) => {
    // Filtrar por tipo de archivo permitido
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const filteredFiles = newFiles.filter(file => allowedTypes.includes(file.type));
    
    // Si hay archivos no permitidos, se podría mostrar un aviso
    if (filteredFiles.length < newFiles.length) {
      console.log('Algunos archivos fueron omitidos por tipo no válido');
    }
    
    // Añadir metadatos adicionales a los archivos
    const processedFiles = filteredFiles.map(file => ({
      file,
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      preview: file.type.includes('image') ? URL.createObjectURL(file) : null,
      type: file.type,
      name: file.name,
      size: file.size,
      status: 'pending'
    }));
    
    setFiles([...files, ...processedFiles]);
  };

  // Eliminar un archivo de la lista
  const handleRemoveFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  // Iniciar la carga simulada
  const handleUpload = () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulación de progreso de carga
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          simulateProcessing();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Simular procesamiento de OCR después de la carga
  const simulateProcessing = () => {
    setTimeout(() => {
      // Simular resultado del procesamiento
      const processedFiles = files.map(file => ({
        ...file,
        status: Math.random() > 0.2 ? 'success' : 'error',
        extractedData: {
          nombre: file.name.split('.')[0],
          curp: `${file.name.substr(0, 4).toUpperCase()}${Math.floor(Math.random() * 900000) + 100000}${['H', 'M'][Math.floor(Math.random() * 2)]}DF`,
          confianza: Math.floor(Math.random() * 30) + 70
        }
      }));
      
      setFiles(processedFiles);
      setIsUploading(false);
      setUploadComplete(true);
      
      // Generar resumen de resultados
      const successCount = processedFiles.filter(f => f.status === 'success').length;
      const errorCount = processedFiles.filter(f => f.status === 'error').length;
      
      setProcessingResults({
        total: processedFiles.length,
        success: successCount,
        error: errorCount
      });
    }, 1500);
  };

  // Reiniciar el proceso
  const handleReset = () => {
    setFiles([]);
    setUploadComplete(false);
    setProcessingResults(null);
    setUploadProgress(0);
  };

  // Renderizado condicional del icono según el tipo de archivo
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return <PictureAsPdfIcon color="error" fontSize="large" />;
    } else {
      return <InsertDriveFileIcon color="primary" fontSize="large" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Importar Credenciales
        </Typography>
        <Typography color="textSecondary" paragraph>
          Sube imágenes de identificaciones o documentos oficiales para procesamiento automático.
        </Typography>
        
        {!uploadComplete ? (
          <>
            {/* Área de Drop Zone */}
            <Box
              sx={{
                border: '2px dashed',
                borderColor: isDragging ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 6,
                my: 3,
                textAlign: 'center',
                backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
              />
              <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Arrastra tus archivos aquí o haz clic para seleccionar
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Formatos soportados: JPG, PNG, PDF
              </Typography>
            </Box>
            
            {/* Lista de archivos seleccionados */}
            {files.length > 0 && (
              <>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {files.length} {files.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {files.map((file) => (
                      <Grid item xs={12} sm={6} md={4} key={file.id}>
                        <Card variant="outlined">
                          {file.preview ? (
                            <CardMedia
                              component="img"
                              height="140"
                              image={file.preview}
                              alt={file.name}
                              sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
                            />
                          ) : (
                            <Box 
                              sx={{ 
                                height: 140, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                bgcolor: 'grey.100' 
                              }}
                            >
                              {getFileIcon(file.type)}
                            </Box>
                          )}
                          <CardContent sx={{ pb: 1 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                              <Typography noWrap title={file.name} sx={{ maxWidth: '80%' }}>
                                {file.name}
                              </Typography>
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => handleRemoveFile(file.id)}
                                disabled={isUploading}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="body2" color="textSecondary">
                              {(file.size / 1024).toFixed(1)} KB
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={isUploading}
                    startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                  >
                    {isUploading ? 'Procesando...' : 'Procesar Archivos'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleReset}
                    disabled={isUploading}
                  >
                    Cancelar
                  </Button>
                </Box>
                
                {isUploading && (
                  <Box sx={{ width: '100%', mb: 3 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Subiendo y procesando archivos...
                    </Typography>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="body2" color="textSecondary" align="right" sx={{ mt: 1 }}>
                      {uploadProgress}%
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Alert 
              severity="success" 
              icon={<CheckCircleIcon />}
              sx={{ mb: 3 }}
            >
              <Typography variant="subtitle1">
                Procesamiento Completado
              </Typography>
              <Typography variant="body2">
                Se procesaron {processingResults.total} archivos: {processingResults.success} con éxito y {processingResults.error} con errores.
              </Typography>
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Chip 
                icon={<CheckCircleIcon />} 
                label={`${processingResults.success} Procesados`} 
                color="success" 
                variant="outlined" 
              />
              <Chip 
                icon={<ErrorIcon />} 
                label={`${processingResults.error} Con Errores`} 
                color="error" 
                variant="outlined" 
              />
            </Box>
            
            <Typography variant="h6" gutterBottom>
              Resultados de Procesamiento
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Table sx={{ mb: 3 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Archivo</TableCell>
                  <TableCell>Datos Extraídos</TableCell>
                  <TableCell>Confianza</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {file.type.includes('image') ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                          />
                        ) : (
                          getFileIcon(file.type)
                        )}
                        <Typography variant="body2">{file.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {file.status === 'success' ? (
                        <>
                          <Typography variant="body2">
                            Nombre: <strong>{file.extractedData.nombre}</strong>
                          </Typography>
                          <Typography variant="body2">
                            CURP: <strong>{file.extractedData.curp}</strong>
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="error">
                          No se pudieron extraer datos
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {file.status === 'success' && (
                        <Chip 
                          label={`${file.extractedData.confianza}%`}
                          size="small"
                          color={file.extractedData.confianza > 80 ? "success" : "warning"}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={file.status === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
                        label={file.status === 'success' ? 'Exitoso' : 'Error'}
                        color={file.status === 'success' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Aquí podría ir la lógica para continuar con los documentos procesados
                  alert('Documentos añadidos al sistema');
                }}
              >
                Guardar Resultados
              </Button>
              <Button
                variant="outlined"
                onClick={handleReset}
              >
                Iniciar Nuevo Procesamiento
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

// Componente de Evaluación de Vulnerabilidad
const EvaluacionVulnerabilidad = () => {
  const { solicitudId } = useParams();
  const navigate = useNavigate();
  const { getSolicitudById, addEvaluacionVulnerabilidad } = useSolicitudes();
  
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [resultado, setResultado] = useState(null);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      comidasDiarias: '',
      consumoFrutas: '',
      consumoVerduras: '',
      consumoProteinas: '',
      consumoCereales: '',
      gastoEnergia: '',
      participacionComunitaria: false
    }
  });
  
  // Cargar datos de la solicitud
  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const sol = getSolicitudById(solicitudId);
        if (sol) {
          setSolicitud(sol);
          
          // Si ya tiene evaluación, pre-cargar los datos
          if (sol.evaluacionVulnerabilidad) {
            // En un caso real, aquí se harían setValues o reset del formulario
            setResultado(sol.evaluacionVulnerabilidad);
          }
        }
      } catch (error) {
        console.error('Error al cargar solicitud:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSolicitud();
  }, [solicitudId, getSolicitudById]);
  
  // Observar valores del formulario
  const watchedValues = watch();
  
  // Calcular nivel de vulnerabilidad
  const calcularVulnerabilidad = (data) => {
    let puntaje = 0;
    let max = 0;
    
    // Comidas diarias (menos comidas = más vulnerabilidad)
    const comidasPuntaje = 6 - data.comidasDiarias; // 5->1, 1->5
    puntaje += comidasPuntaje;
    max += 5;
    
    // Consumo de alimentos (bajo=2, medio=1, alto=0)
    const consumoMap = { bajo: 2, medio: 1, alto: 0 };
    puntaje += consumoMap[data.consumoFrutas];
    puntaje += consumoMap[data.consumoVerduras];
    puntaje += consumoMap[data.consumoProteinas];
    puntaje += consumoMap[data.consumoCereales];
    max += 8;
    
    // Gasto en energía
    const energiaMap = { 
      'menos-500': 0, 
      '500-1000': 1, 
      '1000-1500': 2, 
      'mas-1500': 3 
    };
    puntaje += energiaMap[data.gastoEnergia];
    max += 3;
    
    // Participación comunitaria
    puntaje += data.participacionComunitaria ? 0 : 2;
    max += 2;
    
    // Calcular porcentaje y nivel
    const porcentaje = (puntaje / max) * 100;
    
    let nivel;
    if (porcentaje >= 70) {
      nivel = 'alto';
    } else if (porcentaje >= 40) {
      nivel = 'medio';
    } else {
      nivel = 'bajo';
    }
    
    return {
      puntaje,
      porcentaje: Math.round(porcentaje),
      nivel
    };
  };
  
  // Manejar envío del formulario
  const onSubmit = (data) => {
    // Calcular nivel de vulnerabilidad
    const evaluacion = calcularVulnerabilidad(data);
    
    // Crear objeto de resultado completo
    const resultadoCompleto = {
      ...data,
      puntaje: evaluacion.puntaje,
      porcentaje: evaluacion.porcentaje,
      nivelVulnerabilidad: evaluacion.nivel,
      fechaEvaluacion: new Date().toISOString()
    };
    
    setResultado(resultadoCompleto);
    setActiveStep(1);
  };
  
  // Guardar evaluación en la solicitud
  const handleGuardarEvaluacion = () => {
    if (!resultado) return;
    
    addEvaluacionVulnerabilidad(parseInt(solicitudId), resultado);
    setActiveStep(2);
    
    // Simular guardado exitoso
    setTimeout(() => {
      navigate(`/solicitudes/${solicitudId}`);
    }, 1500);
  };
  
  // Reiniciar el proceso
  const handleReiniciar = () => {
    setResultado(null);
    setActiveStep(0);
  };
  
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // Si no se encuentra la solicitud
  if (!solicitud) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          No se encontró la solicitud con ID {solicitudId}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/solicitudes')}
        >
          Volver al listado
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Evaluación de Vulnerabilidad
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            Beneficiario: {solicitud.beneficiario}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Folio: {solicitud.folio} | Programa: {solicitud.programa}
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Evaluación</StepLabel>
          </Step>
          <Step>
            <StepLabel>Resultados</StepLabel>
          </Step>
          <Step>
            <StepLabel>Guardado</StepLabel>
          </Step>
        </Stepper>
        
        {activeStep === 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Seguridad Alimentaria */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom>
                  Seguridad Alimentaria
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              {/* Comidas diarias */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="comidasDiarias"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Número de comidas al día"
                      fullWidth
                      error={!!errors.comidasDiarias}
                      helperText={errors.comidasDiarias?.message}
                    >
                      {[1, 2, 3, 4, 5].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Consumo de frutas */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="consumoFrutas"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Frecuencia de consumo de frutas"
                      fullWidth
                      error={!!errors.consumoFrutas}
                      helperText={errors.consumoFrutas?.message}
                    >
                      <MenuItem value="bajo">Bajo (0-1 veces por semana)</MenuItem>
                      <MenuItem value="medio">Medio (2-4 veces por semana)</MenuItem>
                      <MenuItem value="alto">Alto (5+ veces por semana)</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Consumo de verduras */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="consumoVerduras"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Frecuencia de consumo de verduras"
                      fullWidth
                      error={!!errors.consumoVerduras}
                      helperText={errors.consumoVerduras?.message}
                    >
                      <MenuItem value="bajo">Bajo (0-1 veces por semana)</MenuItem>
                      <MenuItem value="medio">Medio (2-4 veces por semana)</MenuItem>
                      <MenuItem value="alto">Alto (5+ veces por semana)</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Consumo de proteínas */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="consumoProteinas"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Frecuencia de consumo de proteínas"
                      fullWidth
                      error={!!errors.consumoProteinas}
                      helperText={errors.consumoProteinas?.message}
                    >
                      <MenuItem value="bajo">Bajo (0-1 veces por semana)</MenuItem>
                      <MenuItem value="medio">Medio (2-4 veces por semana)</MenuItem>
                      <MenuItem value="alto">Alto (5+ veces por semana)</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Consumo de cereales */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="consumoCereales"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Frecuencia de consumo de cereales"
                      fullWidth
                      error={!!errors.consumoCereales}
                      helperText={errors.consumoCereales?.message}
                    >
                      <MenuItem value="bajo">Bajo (0-1 veces por semana)</MenuItem>
                      <MenuItem value="medio">Medio (2-4 veces por semana)</MenuItem>
                      <MenuItem value="alto">Alto (5+ veces por semana)</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Seguridad Energética */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Seguridad Energética
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              {/* Gasto mensual en energía eléctrica */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="gastoEnergia"
                  control={control}
                  rules={{ required: 'Este campo es obligatorio' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Gasto mensual en energía eléctrica"
                      fullWidth
                      error={!!errors.gastoEnergia}
                      helperText={errors.gastoEnergia?.message}
                    >
                      <MenuItem value="menos-500">Menos de $500</MenuItem>
                      <MenuItem value="500-1000">$500 - $1,000</MenuItem>
                      <MenuItem value="1000-1500">$1,000 - $1,500</MenuItem>
                      <MenuItem value="mas-1500">Más de $1,500</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              
              {/* Integración Social */}
              <Grid item xs={12}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Integración Social
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>
              
              {/* Participación en actividades comunitarias */}
              <Grid item xs={12}>
                <Controller
                  name="participacionComunitaria"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Participa en actividades comunitarias"
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(`/solicitudes/${solicitudId}`)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<CalculateIcon />}
                  >
                    Calcular Nivel de Vulnerabilidad
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
        
        {activeStep === 1 && resultado && (
          <Box>
            <Alert 
              severity={
                resultado.nivelVulnerabilidad === 'alto' ? 'error' :
                resultado.nivelVulnerabilidad === 'medio' ? 'warning' : 'success'
              }
              sx={{ mb: 3 }}
            >
              <Typography variant="subtitle1">
                Nivel de Vulnerabilidad: {resultado.nivelVulnerabilidad.toUpperCase()}
              </Typography>
              <Typography variant="body2">
                Puntaje: {resultado.porcentaje}% ({resultado.nivelVulnerabilidad === 'alto' ? 'Prioridad Alta' : 
                          resultado.nivelVulnerabilidad === 'medio' ? 'Prioridad Media' : 'Prioridad Baja'})
              </Typography>
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Seguridad Alimentaria
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Comidas diarias:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.comidasDiarias}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Consumo de frutas:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.consumoFrutas === 'bajo' ? 'Bajo' : 
                         resultado.consumoFrutas === 'medio' ? 'Medio' : 'Alto'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Consumo de verduras:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.consumoVerduras === 'bajo' ? 'Bajo' : 
                         resultado.consumoVerduras === 'medio' ? 'Medio' : 'Alto'}
                         </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Consumo de proteínas:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.consumoProteinas === 'bajo' ? 'Bajo' : 
                         resultado.consumoProteinas === 'medio' ? 'Medio' : 'Alto'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Consumo de cereales:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.consumoCereales === 'bajo' ? 'Bajo' : 
                         resultado.consumoCereales === 'medio' ? 'Medio' : 'Alto'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Seguridad Energética e Integración Social
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Gasto mensual en energía:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.gastoEnergia === 'menos-500' ? 'Menos de $500' : 
                         resultado.gastoEnergia === '500-1000' ? '$500 - $1,000' : 
                         resultado.gastoEnergia === '1000-1500' ? '$1,000 - $1,500' : 'Más de $1,500'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Participación comunitaria:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {resultado.participacionComunitaria ? 'Sí' : 'No'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 2, 
                    bgcolor: resultado.nivelVulnerabilidad === 'alto' ? 'error.50' :
                             resultado.nivelVulnerabilidad === 'medio' ? 'warning.50' : 'success.50'
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Recomendación
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Typography variant="body2">
                      {resultado.nivelVulnerabilidad === 'alto' ? (
                        'Se recomienda prioridad alta en la atención. Considerar apoyo alimentario inmediato y seguimiento cercano del caso.'
                      ) : resultado.nivelVulnerabilidad === 'medio' ? (
                        'Se recomienda atención con prioridad media. Evaluar las áreas específicas de mayor vulnerabilidad para focalizar los apoyos.'
                      ) : (
                        'El beneficiario presenta un nivel bajo de vulnerabilidad. Se recomienda mantener el seguimiento habitual.'
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReiniciar}
              >
                Volver a Evaluar
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleGuardarEvaluacion}
              >
                Guardar Evaluación
              </Button>
            </Box>
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Evaluación Guardada Correctamente
            </Typography>
            <Typography color="textSecondary" paragraph>
              Redireccionando a los detalles de la solicitud...
            </Typography>
            <CircularProgress size={24} sx={{ mt: 2 }} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

// Componente de Detalle de Solicitud
const DetalleSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSolicitudById, updateSolicitud } = useSolicitudes();
  
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Cargar datos de la solicitud
  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const sol = getSolicitudById(Number(id));
        if (sol) {
          setSolicitud(sol);
        }
      } catch (error) {
        console.error('Error al cargar solicitud:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSolicitud();
  }, [id, getSolicitudById]);
  
  // Cambiar estatus de la solicitud
  const handleChangeStatus = (newStatus) => {
    updateSolicitud(Number(id), { estatus: newStatus });
    setSolicitud(prev => ({ ...prev, estatus: newStatus }));
  };
  
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  // Si no se encuentra la solicitud
  if (!solicitud) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          No se encontró la solicitud con ID {id}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/solicitudes')}
        >
          Volver al listado
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box>
            <Typography variant="h5" component="h1" gutterBottom>
              Detalles de Solicitud
            </Typography>
            <Typography color="textSecondary">
              Folio: {solicitud.folio}
            </Typography>
          </Box>
          <StatusBadge status={solicitud.estatus} />
        </Box>
        
        <Grid container spacing={3}>
          {/* Datos del beneficiario */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom>
              Datos del Beneficiario
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Información Personal
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Nombre:</Typography>
                  <Typography variant="body2">{solicitud.beneficiario}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">CURP:</Typography>
                  <Typography variant="body2">{solicitud.curp}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Teléfono:</Typography>
                  <Typography variant="body2">{solicitud.telefono || 'No registrado'}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Dirección:</Typography>
                  <Typography variant="body2">{solicitud.direccion || 'No registrada'}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Información del Apoyo
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Programa:</Typography>
                  <Typography variant="body2">{solicitud.programa}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Fecha de Solicitud:</Typography>
                  <Typography variant="body2">
                    {new Date(solicitud.fechaCreacion).toLocaleDateString('es-MX')}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Documentos:</Typography>
                  <Typography variant="body2">
                    {solicitud.documentos.length} adjuntos
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Evaluación:</Typography>
                  <Typography variant="body2">
                    {solicitud.evaluacionVulnerabilidad 
                      ? `${solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad.charAt(0).toUpperCase()}${solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad.slice(1)}` 
                      : 'No realizada'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Documentos adjuntos */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
              Documentos Adjuntos
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {solicitud.documentos.length > 0 ? (
                solicitud.documentos.map((doc, index) => (
                  <Card key={index} sx={{ width: 200, mb: 2 }}>
                    <Box 
                      sx={{ 
                        height: 140, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'grey.100' 
                      }}
                    >
                      {doc.endsWith('.pdf') ? (
                        <PictureAsPdfIcon color="error" sx={{ fontSize: 60 }} />
                      ) : (
                        <Box 
                          component="img" 
                          src={`https://via.placeholder.com/200x140?text=${encodeURIComponent(doc)}`}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          alt={doc}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ py: 1 }}>
                      <Typography variant="body2" noWrap title={doc}>
                        {doc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<VisibilityIcon />}>
                        Ver
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No hay documentos adjuntos.
                </Typography>
              )}
            </Box>
          </Grid>
          
          {/* Evaluación de vulnerabilidad */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
              Evaluación de Vulnerabilidad
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12}>
            {solicitud.evaluacionVulnerabilidad ? (
              <Card 
                variant="outlined" 
                sx={{ 
                  mb: 2,
                  bgcolor: solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad === 'alto' ? 'error.50' :
                           solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad === 'medio' ? 'warning.50' : 'success.50'
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Nivel de Vulnerabilidad: {solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad.toUpperCase()}
                    </Typography>
                    <Chip 
                      label={`${solicitud.evaluacionVulnerabilidad.porcentaje}%`}
                      color={
                        solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad === 'alto' ? 'error' :
                        solicitud.evaluacionVulnerabilidad.nivelVulnerabilidad === 'medio' ? 'warning' : 'success'
                      }
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Seguridad Alimentaria
                      </Typography>
                      <Typography variant="body2">
                        Comidas diarias: <strong>{solicitud.evaluacionVulnerabilidad.comidasDiarias}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Consumo general: <strong>{
                          ['bajo', 'bajo', 'bajo'].includes(
                            solicitud.evaluacionVulnerabilidad.consumoFrutas,
                            solicitud.evaluacionVulnerabilidad.consumoVerduras,
                            solicitud.evaluacionVulnerabilidad.consumoProteinas
                          ) ? 'Bajo' : 'Medio-Alto'
                        }</strong>
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Seguridad Energética
                      </Typography>
                      <Typography variant="body2">
                        Gasto mensual: <strong>{
                          solicitud.evaluacionVulnerabilidad.gastoEnergia === 'menos-500' ? 'Menos de $500' : 
                          solicitud.evaluacionVulnerabilidad.gastoEnergia === '500-1000' ? '$500 - $1,000' : 
                          solicitud.evaluacionVulnerabilidad.gastoEnergia === '1000-1500' ? '$1,000 - $1,500' : 'Más de $1,500'
                        }</strong>
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Integración Social
                      </Typography>
                      <Typography variant="body2">
                        Participación comunitaria: <strong>{solicitud.evaluacionVulnerabilidad.participacionComunitaria ? 'Sí' : 'No'}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/evaluacion-vulnerabilidad/${solicitud.id}`)}
                  >
                    Ver/Editar evaluación completa
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="body1" color="textSecondary" paragraph>
                  No se ha realizado la evaluación de vulnerabilidad para esta solicitud.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/evaluacion-vulnerabilidad/${solicitud.id}`)}
                >
                  Realizar Evaluación
                </Button>
              </Box>
            )}
          </Grid>
          
          {/* Acciones */}
          <Grid item xs={12}>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 2,
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/solicitudes')}
              >
                Volver al listado
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/nueva-solicitud?id=${solicitud.id}`)}
                >
                  Editar Solicitud
                </Button>
                
                {solicitud.estatus === 'pendiente' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChangeStatus('en-revision')}
                  >
                    Enviar a Revisión
                  </Button>
                )}
                
                {solicitud.estatus === 'en-revision' && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleChangeStatus('aprobada')}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleChangeStatus('rechazada')}
                    >
                      Rechazar
                    </Button>
                  </>
                )}
                
                {solicitud.estatus === 'aprobada' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleChangeStatus('concluida')}
                  >
                    Marcar como Concluida
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

// Componente principal que integra todos los demás
const DashboardIntegral = () => {
  return (
    <AuthProvider>
      <SolicitudesProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            } />
            <Route path="/nueva-solicitud" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <NuevaSolicitud />
                </>
              </ProtectedRoute>
            } />
            <Route path="/solicitudes" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <SolicitudesList />
                </>
              </ProtectedRoute>
            } />
            <Route path="/solicitudes/:id" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <DetalleSolicitud />
                </>
              </ProtectedRoute>
            } />
            <Route path="/importar-credenciales" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <ImportarCredenciales />
                </>
              </ProtectedRoute>
            } />
            <Route path="/evaluacion-vulnerabilidad/:solicitudId" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <EvaluacionVulnerabilidad />
                </>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </SolicitudesProvider>
    </AuthProvider>
  );
};

export default DashboardIntegral;