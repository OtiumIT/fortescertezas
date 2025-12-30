import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { WhatsAppButton } from './components/features/WhatsAppButton';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Services } from './pages/public/Services';
import { ServiceDetail } from './pages/public/ServiceDetail';
import { Contact } from './pages/public/Contact';
import { Jobs } from './pages/public/Jobs';
import { JobDetail } from './pages/public/JobDetail';
import { Privacy } from './pages/public/Privacy';
import { Blog } from './pages/public/Blog';
import { PostDetail } from './pages/public/PostDetail';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ContentManagement } from './pages/admin/ContentManagement';
import { ServicesManagement } from './pages/admin/ServicesManagement';
import { JobsManagement } from './pages/admin/JobsManagement';
import { PostsManagement } from './pages/admin/PostsManagement';
import { ContactsList } from './pages/admin/ContactsList';
import { ApplicationsList } from './pages/admin/ApplicationsList';
import { ComingSoon } from './pages/admin/ComingSoon';
import { PrivacyManagement } from './pages/admin/PrivacyManagement';
import { ClientsManagement } from './pages/admin/ClientsManagement';
import { ContractsManagement } from './pages/admin/ContractsManagement';
import { EnterprisesManagement } from './pages/admin/EnterprisesManagement';
import { OccurrencesManagement } from './pages/admin/OccurrencesManagement';
import { EmployeesManagement } from './pages/admin/EmployeesManagement';
import { ScheduleManagement } from './pages/admin/ScheduleManagement';
import { WorkingHoursManagement } from './pages/admin/WorkingHoursManagement';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/servicos/:id" element={<ServiceDetail />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/vagas" element={<Jobs />} />
                <Route path="/vagas/:id" element={<JobDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<PostDetail />} />
                <Route path="/privacidade" element={<Privacy />} />
              </Routes>
              <WhatsAppButton />
            </Layout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/privacy" element={<PrivacyManagement />} />
                <Route path="/services" element={<ServicesManagement />} />
                <Route path="/jobs" element={<JobsManagement />} />
                <Route path="/posts" element={<PostsManagement />} />
                <Route path="/contacts" element={<ContactsList />} />
                <Route path="/applications" element={<ApplicationsList />} />
                <Route path="/clients" element={<ClientsManagement />} />
                <Route path="/contracts" element={<ContractsManagement />} />
                <Route path="/enterprises" element={<EnterprisesManagement />} />
                <Route path="/occurrences" element={<OccurrencesManagement />} />
                <Route path="/employees" element={<EmployeesManagement />} />
                <Route path="/schedule" element={<ScheduleManagement />} />
                <Route path="/working-hours" element={<WorkingHoursManagement />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
