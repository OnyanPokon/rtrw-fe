import { Layout } from 'antd';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, HeartFilled } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-0 text-white">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 opacity-10 blur-3xl md:h-96 md:w-96"></div>
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gradient-to-br from-accent-600 to-primary-600 opacity-10 blur-3xl md:h-80 md:w-80"></div>

      <div className="container-custom relative z-10 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-12 md:grid-cols-3 md:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-display text-gradient mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold md:text-2xl">RTRW Gorontalo</h3>
            <p className="text-sm leading-relaxed text-gray-400 md:text-base">Sistem Informasi Rencana Tata Ruang Wilayah Provinsi Gorontalo untuk perencanaan pembangunan berkelanjutan.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="mb-4 text-base font-bold text-white md:text-lg">Tautan Cepat</h4>
            <ul className="space-y-3">
              {['Beranda', 'Tentang RTRW', 'Peta Interaktif', 'Dokumen'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-white md:text-base">
                    <span className="h-0.5 w-0 bg-primary-500 transition-all duration-300 group-hover:w-4"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="mb-4 text-base font-bold text-white md:text-lg">Kontak</h4>
            <ul className="space-y-3">
              <li className="group flex items-start gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white md:text-base">
                <EnvironmentOutlined className="mt-1 flex-shrink-0 text-lg text-primary-500 transition-transform duration-300 group-hover:scale-110 md:text-xl" />
                <span>Jl. Nani Wartabone, Gorontalo</span>
              </li>
              <li className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white md:text-base">
                <PhoneOutlined className="flex-shrink-0 text-lg text-primary-500 transition-transform duration-300 group-hover:scale-110 md:text-xl" />
                <span>(0435) 821016</span>
              </li>
              <li className="group flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white md:text-base">
                <MailOutlined className="flex-shrink-0 text-lg text-primary-500 transition-transform duration-300 group-hover:scale-110 md:text-xl" />
                <span className="break-all">info@gorontaloprov.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700 md:my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-xs text-gray-400 sm:text-sm">© {currentYear} Pemerintah Provinsi Gorontalo. All rights reserved.</p>
          <p className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
            Dibuat dengan <HeartFilled className="animate-pulse text-red-500" /> untuk Gorontalo
          </p>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
