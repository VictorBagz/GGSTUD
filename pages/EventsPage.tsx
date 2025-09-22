
import React, { useState, useEffect } from 'react';
import { Event, EventCategory, EventTimeline } from '../types';
import { eventsData } from '../constants';

const EventCard: React.FC<{ event: Event; onDetailsClick: (event: Event) => void }> = ({ event, onDetailsClick }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (event.targetDate && (event.timeline === EventTimeline.UPCOMING || event.timeline === EventTimeline.CURRENT)) {
      const interval = setInterval(() => {
        const target = new Date(event.targetDate).getTime();
        const now = new Date().getTime();
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          setCountdown(`${days}d`);
        } else {
          setCountdown('Event Started');
          clearInterval(interval);
        }
      }, 1000 * 60 * 60); // update every hour
      
      // initial call
      const target = new Date(event.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          setCountdown(`${days}d`);
      } else {
          setCountdown('Event Started');
      }

      return () => clearInterval(interval);
    }
  }, [event.targetDate, event.timeline]);

  const badgeColor = {
    [EventTimeline.CURRENT]: 'bg-red-500 animate-pulse',
    [EventTimeline.UPCOMING]: 'bg-blue-500',
    [EventTimeline.PAST]: 'bg-gray-500',
  }[event.timeline] || 'bg-purple-500';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${event.image})` }}>
        <div className={`absolute top-4 right-4 text-xs text-white font-bold px-3 py-1 rounded-full ${badgeColor}`}>
          {event.badge}
        </div>
        {countdown && (event.timeline === EventTimeline.UPCOMING || event.timeline === EventTimeline.CURRENT) && (
             <div className="absolute bottom-4 right-4 text-xs bg-black bg-opacity-70 text-white font-bold px-3 py-1 rounded-full">
                <i className="fas fa-clock mr-1"></i>{countdown}
             </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <p className="text-sm text-gray-500 mb-2"><i className="fas fa-calendar-alt mr-2 text-primary-red"></i>{event.date}</p>
          <h3 className="text-xl font-bold text-dark-gray mb-2">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-4"><i className="fas fa-map-marker-alt mr-2 text-primary-red"></i>{event.location}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
        </div>
        <button onClick={() => onDetailsClick(event)} className="mt-6 w-full bg-primary-red text-white font-bold py-2 px-4 rounded-lg hover:bg-dark-red transition duration-300">
          More Details
        </button>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
    const [timelineFilter, setTimelineFilter] = useState<EventTimeline>(EventTimeline.UPCOMING);
    const [categoryFilter, setCategoryFilter] = useState<EventCategory>(EventCategory.ALL);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const filteredEvents = eventsData.filter(event => {
        const timelineMatch = timelineFilter === EventTimeline.ALL ||
            (timelineFilter === EventTimeline.UPCOMING && (event.timeline === EventTimeline.UPCOMING || event.timeline === EventTimeline.CURRENT)) ||
            event.timeline === timelineFilter;
        
        const categoryMatch = categoryFilter === EventCategory.ALL || event.category === categoryFilter;

        return timelineMatch && categoryMatch;
    });

    return (
        <>
            <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
                <h1 className="text-5xl font-extrabold">Events & Tournaments</h1>
                <p className="mt-4 text-xl max-w-3xl mx-auto">Join us for exciting rugby competitions, training camps, and community events across Uganda.</p>
            </section>

            <div className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center mb-8 bg-gray-100 p-2 rounded-full">
                         <button onClick={() => setTimelineFilter(EventTimeline.UPCOMING)} className={`px-6 py-2 rounded-full font-semibold ${timelineFilter === EventTimeline.UPCOMING ? 'bg-primary-red text-white' : 'text-gray-600'}`}>Upcoming</button>
                         <button onClick={() => setTimelineFilter(EventTimeline.PAST)} className={`px-6 py-2 rounded-full font-semibold ${timelineFilter === EventTimeline.PAST ? 'bg-primary-red text-white' : 'text-gray-600'}`}>Past</button>
                         <button onClick={() => setTimelineFilter(EventTimeline.ALL)} className={`px-6 py-2 rounded-full font-semibold ${timelineFilter === EventTimeline.ALL ? 'bg-primary-red text-white' : 'text-gray-600'}`}>All Events</button>
                    </div>
                     <div className="flex justify-center flex-wrap gap-2 mb-12">
                         <button onClick={() => setCategoryFilter(EventCategory.ALL)} className={`px-4 py-2 text-sm rounded-full font-semibold ${categoryFilter === EventCategory.ALL ? 'bg-secondary-yellow text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
                         <button onClick={() => setCategoryFilter(EventCategory.TOURNAMENT)} className={`px-4 py-2 text-sm rounded-full font-semibold ${categoryFilter === EventCategory.TOURNAMENT ? 'bg-secondary-yellow text-white' : 'bg-gray-200 text-gray-700'}`}>Tournaments</button>
                         <button onClick={() => setCategoryFilter(EventCategory.MEETING)} className={`px-4 py-2 text-sm rounded-full font-semibold ${categoryFilter === EventCategory.MEETING ? 'bg-secondary-yellow text-white' : 'bg-gray-200 text-gray-700'}`}>Meetings</button>
                         <button onClick={() => setCategoryFilter(EventCategory.NATIONAL)} className={`px-4 py-2 text-sm rounded-full font-semibold ${categoryFilter === EventCategory.NATIONAL ? 'bg-secondary-yellow text-white' : 'bg-gray-200 text-gray-700'}`}>National</button>
                         <button onClick={() => setCategoryFilter(EventCategory.INTERNATIONAL)} className={`px-4 py-2 text-sm rounded-full font-semibold ${categoryFilter === EventCategory.INTERNATIONAL ? 'bg-secondary-yellow text-white' : 'bg-gray-200 text-gray-700'}`}>International</button>
                     </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map(event => <EventCard key={event.id} event={event} onDetailsClick={setSelectedEvent} />)}
                    </div>
                </div>
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedEvent(null)}>
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-t-lg" />
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-primary-red mb-4">{selectedEvent.title}</h2>
                            <p className="text-gray-600 mb-2"><i className="fas fa-calendar-alt w-6 text-primary-red"></i>{selectedEvent.date}</p>
                            <p className="text-gray-600 mb-4"><i className="fas fa-map-marker-alt w-6 text-primary-red"></i>{selectedEvent.location}</p>
                            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
                            <p className="text-gray-600"><i className="fas fa-user-tie w-6 text-primary-red"></i><strong>Responsible:</strong> {selectedEvent.responsible}</p>
                            {selectedEvent.leagues && (
                                <div className="mt-4">
                                    <h4 className="font-bold">Leagues/Components:</h4>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedEvent.leagues.map(league => (
                                            <span key={league} className="bg-secondary-yellow text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">{league}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button onClick={() => setSelectedEvent(null)} className="mt-6 w-full bg-dark-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EventsPage;
