import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface Day {
  dayName: string;
  dayNumber: number;
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState(17);
  const [searchQuery, setSearchQuery] = useState('');

  // Generate week days
  const days: Day[] = [
    { dayName: 'MER', dayNumber: 14 },
    { dayName: 'GIO', dayNumber: 15 },
    { dayName: 'VEN', dayNumber: 16 },
    { dayName: 'SAB', dayNumber: 17 },
    { dayName: 'DOM', dayNumber: 18 },
    { dayName: 'LUN', dayNumber: 19 },
    { dayName: 'MAR', dayNumber: 20 },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
            Ora al cinema
          </p>
          <h1 className="text-4xl font-light tracking-tight text-neutral-900 mb-10">
            Trova la tua sala
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-300 hover:border-neutral-900 transition-colors">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Cerca cinema o film..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent"
              />
              <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                <MapPin className="w-4 h-4 text-neutral-500" />
              </button>
              <span className="text-xs tracking-wide text-neutral-500">
                VO
              </span>
            </div>
          </div>

          {/* Calendar Days */}
          <div className="flex justify-center gap-2">
            {days.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`
                  relative
                  flex flex-col items-center justify-center
                  w-16 py-3
                  transition-all duration-300 ease-out
                  ${
                    selectedDay === day.dayNumber
                      ? 'text-neutral-900 scale-105'
                      : 'bg-transparent text-neutral-400 hover:text-neutral-700 hover:scale-102'
                  }
                `}
              >
                <span className="text-[9px] tracking-wide uppercase mb-1 opacity-50">
                  {day.dayName}
                </span>
                <span className="text-base font-light">
                  {day.dayNumber}
                </span>
                {/* Animated underline */}
                <span 
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-neutral-900
                    origin-left
                    ${selectedDay === day.dayNumber ? 'w-full transition-all duration-300 ease-out' : 'w-0'}
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}