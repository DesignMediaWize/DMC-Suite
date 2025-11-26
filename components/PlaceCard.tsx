import React from 'react';
import { PlaceDetails, ActivityType } from '../types';
import { MapPin, Star, Plus, Check } from 'lucide-react';

interface PlaceCardProps {
  details: PlaceDetails;
  compact?: boolean;
  onAdd?: (place: PlaceDetails) => void;
  isAdded?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ details, compact = false, onAdd, isAdded = false }) => {
  // Use a reliable placeholder service that generates nice travel images based on keywords
  // We use the name + category to get a relevant image
  const keyword = encodeURIComponent(`${details.name} ${details.category || 'travel'}`);
  const bgImage = details.imageUrl || `https://image.pollinations.ai/prompt/${keyword}?width=400&height=300&nologo=true`;

  return (
    <div className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${compact ? 'flex h-24' : 'flex flex-col h-full'}`}>
      <div 
        className={`${compact ? 'w-24 h-full' : 'h-36'} bg-gray-100 bg-cover bg-center shrink-0 relative overflow-hidden`}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {!compact && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        )}
        
        {/* Category Badge */}
        {!compact && details.category && (
            <span className="absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wide">
                {details.category}
            </span>
        )}
      </div>

      <div className={`flex flex-col ${compact ? 'p-3 justify-center w-full' : 'p-4 flex-1'}`}>
        <div className="flex justify-between items-start gap-2">
          <h4 className={`font-bold text-gray-900 leading-tight ${compact ? 'text-sm' : 'text-base'}`}>{details.name}</h4>
          {details.priceLevel && (
             <span className="text-xs font-medium text-gray-500 shrink-0">{details.priceLevel}</span>
          )}
        </div>

        {details.rating && (
          <div className="flex items-center mt-1 text-xs text-amber-500">
            <div className="flex">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={10} fill={i < Math.floor(details.rating!) ? "currentColor" : "none"} className={i < Math.floor(details.rating!) ? "" : "text-gray-300"} />
               ))}
            </div>
            <span className="ml-1.5 font-medium text-gray-700">{details.rating}</span>
            {details.user_ratings_total && (
                 <span className="ml-1 text-gray-400">({details.user_ratings_total})</span>
            )}
          </div>
        )}
        
        {!compact && (
          <>
            <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">{details.description}</p>
            
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-50">
               {details.address && (
                <div className="flex items-center text-[10px] text-gray-400 max-w-[60%]">
                    <MapPin size={10} className="mr-1 shrink-0" />
                    <span className="truncate">{details.address}</span>
                </div>
               )}
               
               {onAdd && (
                 <button 
                    onClick={() => !isAdded && onAdd(details)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        isAdded 
                        ? 'bg-teal-50 text-teal-600 cursor-default'
                        : 'bg-slate-900 text-white hover:bg-teal-600 hover:shadow-md'
                    }`}
                 >
                    {isAdded ? <Check size={12} /> : <Plus size={12} />}
                    {isAdded ? 'Added' : 'Add to Trip'}
                 </button>
               )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
