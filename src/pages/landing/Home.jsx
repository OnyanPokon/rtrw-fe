import { ContentsSection, DefinitionSection, MainLayout, ObjectivesSection } from '@/components';
import { heroData, rtrwContents, rtrwDefinition, rtrwObjectives } from '@/data/rtrwData';

const Home = () => {
  return (
    <MainLayout heroData={heroData}>
      <DefinitionSection data={rtrwDefinition} />
      <ObjectivesSection data={rtrwObjectives} />
      <ContentsSection data={rtrwContents} />
    </MainLayout>
  );
};

export default Home;
