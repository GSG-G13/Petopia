import { message } from 'antd';
import { Copy } from 'iconsax-react';
import { useRef, useEffect, useState } from 'react';

interface Props {
  postID: number;
}

const CopyLink: React.FC<Props> = ({ postID }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [URL, setCurrentURL] = useState('');

  useEffect(() => {
    const currentURL = window.location.host;
    setCurrentURL(currentURL);
  }, []);

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
      <input
        ref={inputRef}
        value={`${URL}/post/${postID}`}
        readOnly
        className="copy-field"
      />
      <Copy size="28" variant="Outline" onClick={handleCopy} className="copy-icon" />
    </div>
  );
};

export default CopyLink;
