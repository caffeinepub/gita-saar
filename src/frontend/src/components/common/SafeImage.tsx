import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export default function SafeImage({ src, alt, fallbackSrc, className, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    }
  };

  // If error and no fallback, render a styled placeholder
  if (hasError && !fallbackSrc) {
    return (
      <div
        className={`bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${className || ''}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-primary/40 text-xs font-medium">
          {alt.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
