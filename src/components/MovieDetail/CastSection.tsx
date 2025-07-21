import CastDetails from "./CastDetails";

interface CastSectionProps {
  mediaCredits: any[];
}

const CastSection = ({ mediaCredits }: CastSectionProps) => (
  <div className="mt-8 sm:mt-12">
    <CastDetails mediaCredits={mediaCredits} />
  </div>
);

export default CastSection;
