import PropTypes from 'prop-types';
import SectionHeader from '../molecules/SectionHeader';

const DefinitionSection = ({ data }) => {
  const { title, icon, description } = data;

  return (
    <section id="tentang" className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements - Hidden on mobile */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 opacity-20 blur-3xl md:h-96 md:w-96 md:opacity-30"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-accent-100 to-primary-100 opacity-20 blur-3xl md:h-80 md:w-80 md:opacity-30"></div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-5xl">
          <SectionHeader title={title} icon={icon} centered />

          <div className="relative mt-8 md:mt-10">
            {/* Quote decoration - Hidden on mobile */}
            <div className="font-serif absolute -left-2 -top-2 hidden text-6xl text-primary-200 opacity-50 sm:block md:-left-4 md:-top-4 md:text-8xl">&quot;</div>

            <div className="shadow-elegant hover:shadow-elegant-hover animate-scale-in relative rounded-2xl border-l-4 border-primary-500 bg-gradient-to-br from-white to-primary-50 p-6 transition-all duration-500 sm:p-8 md:rounded-3xl md:border-l-8 md:p-12">
              <p className="text-lg font-medium italic leading-relaxed text-gray-700 sm:text-xl md:text-2xl">{description}</p>

              {/* Source badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-xs font-semibold text-primary-800 md:mt-8 md:px-6 md:py-3 md:text-sm">
                <span>📜</span>
                <span className="hidden sm:inline">UU No. 26 Tahun 2007 tentang Penataan Ruang</span>
                <span className="sm:hidden">UU No. 26/2007</span>
              </div>
            </div>

            <div className="font-serif absolute -bottom-2 -right-2 hidden text-6xl text-primary-200 opacity-50 sm:block md:-bottom-4 md:-right-4 md:text-8xl">&quot;</div>
          </div>
        </div>
      </div>
    </section>
  );
};

DefinitionSection.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default DefinitionSection;
