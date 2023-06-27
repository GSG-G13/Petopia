import { message } from 'antd';
import { Copy } from 'iconsax-react';
import { useRef } from 'react';

interface Props {
  postID: number
}
const CopyLink: React.FC<Props> = ({ postID }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        message.success('Link copied to clipboard');
      } catch (error) {
        message.error('Failed to copy link to clipboard');
      }
    }
  };
  return (
    <div className="comment">
      <input ref={inputRef} defaultValue={`https://petopia/post/${postID}`} readOnly className="copy-field" />
      <Copy size="28" variant="Outline" onClick={handleCopy} className="copy-icon" />
    </div>
  );
};

export default CopyLink;
