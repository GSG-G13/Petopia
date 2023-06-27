import { ReactNode } from 'react';

interface Props {
  className?: string
  children?: ReactNode
  style?: object
  width?: string
  height?: string
  onClick?: () => void
}
const Box: React.FC<Props> = (props) => (
  <div {...props}>
    {props.children}
  </div>
);
export default Box;
