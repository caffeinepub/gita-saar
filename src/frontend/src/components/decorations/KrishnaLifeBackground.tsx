export default function KrishnaLifeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Krishna life imagery backgrounds - rotating through different scenes */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05]">
        {/* Baby Krishna with butter */}
        <div
          className="absolute top-0 left-0 w-full h-1/3 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-1.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Krishna playing flute */}
        <div
          className="absolute top-1/3 right-0 w-1/2 h-1/3 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-2.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Krishna lifting Govardhan */}
        <div
          className="absolute top-1/3 left-0 w-1/2 h-1/3 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-3.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Krishna with Arjuna on chariot */}
        <div
          className="absolute bottom-1/3 right-0 w-full h-1/3 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-4.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Krishna dancing on Kaliya */}
        <div
          className="absolute bottom-0 left-1/4 w-1/2 h-1/4 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-5.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Radha-Krishna devotional scene */}
        <div
          className="absolute bottom-0 right-1/4 w-1/2 h-1/4 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/krishna-life-bg-6.dim_1600x2400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      
      {/* Readability overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
    </div>
  );
}
