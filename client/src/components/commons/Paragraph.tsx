import { ReactNode } from 'react';

interface Props {
  className?: string
  children?: ReactNode
  style?: object
  width?: string
  height?: string
}
const Paragraph: React.FC<Props> = (props) => (
  <p {...props}>
    {props.children}
  </p>
);
export default Paragraph;
