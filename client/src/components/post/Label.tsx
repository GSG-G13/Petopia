import Box from '../commons/Box';
import Paragraph from '../commons/Paragraph';

interface Props {
  title: string
}
const Label: React.FC<Props> = ({ title }: Props) => {
  const colors = {
    main: '',
    side: '',
  };
  switch (title) {
    case 'Adoption':
      colors.main = 'var(--adoption-color)';
      colors.side = 'var(--adoption-side-color)';
      break;
    case 'Discuss':
      colors.main = 'var(--discuss-color)';
      colors.side = 'var(--discuss-side-color)';
      break;
    case 'Sell':
      colors.main = 'var(--sell-color)';
      colors.side = 'var(--sell-side-color)';
      break;
    case 'Help':
    case 'Post':
      colors.main = 'var(--help-color)';
      colors.side = 'var(--help-side-color)';
      break;
    case 'Breed':
      colors.main = 'var(--breed-color)';
      colors.side = 'var(--breed-side-color)';
      break;
    default:
      colors.main = 'white';
      colors.side = 'white';
  }
  return (
    <Box className="label" style={{ backgroundColor: colors.main }}>
      <Box className="top-label" style={{ backgroundColor: colors.side }} />
      <Paragraph className="label-content">{title}</Paragraph>
      <Box className="down-label" style={{ backgroundColor: colors.side }} />
    </Box>
  );
};
export default Label;
