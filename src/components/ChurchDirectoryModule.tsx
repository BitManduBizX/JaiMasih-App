import React, { useState, useEffect } from 'react';
import { churchesData } from '../data/churchData';
import { Church } from '../types';
import {
  MapPin,
  Search,
  Phone,
  Clock,
  ExternalLink,
  PlusCircle,
  Share2,
  Check,
  Navigation,
  Globe,
  Users,
  Compass,
} from 'lucide-react';

export const ChurchDirectoryModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedDenomination, setSelectedDenomination] = useState('All');
  const [churches, setChurches] = useState<Church[]>(churchesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedChurchForMap, setSelectedChurchForMap] = useState<Church | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Church Form State
  const [newChurch, setNewChurch] = useState({
    name: '',
    nepaliName: '',
    city: 'Kathmandu',
    district: 'Kathmandu',
    province: 'Bagmati',
    address: '',
    pastor: '',
    foundedYear: new Date().getFullYear(),
    saturdayWorship: '10:00 AM – 01:00 PM',
    wednesdayStudy: '05:00 PM – 06:30 PM',
    fridayPrayer: '04:00 PM – 06:00 PM',
    contactPhone: '+977-',
    denomination: 'Independent Evangelical',
  });

  // Load custom added churches from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('jaimasih_custom_churches');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setChurches([...churchesData, ...parsed]);
        }
      }
    } catch (e) {
      console.error('Error loading custom churches:', e);
    }
  }, []);

  const provinces = [
    'All',
    'Bagmati',
    'Gandaki',
    'Koshi',
    'Lumbini',
    'Karnali',
    'Sudurpashchim',
    'Madhesh',
  ];

  const cities = [
    'All',
    'Kathmandu',
    'Pokhara',
    'Lalitpur',
    'Dharan',
    'Bharatpur',
    'Butwal',
    'Biratnagar',
    'Nepalgunj',
    'Birendranagar',
    'Dhangadhi',
  ];

  const denominations = [
    'All',
    'Independent Evangelical',
    'Assemblies of God',
    'Baptist',
    'Presbyterian',
    'Roman Catholic',
    'INF Fellowship Heritage',
    'Koinonia Fellowship',
  ];

  const filteredChurches = churches.filter((c) => {
    const matchesSearch =
      searchTerm === '' ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nepaliName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.pastor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince =
      selectedProvince === 'All' || c.province === selectedProvince;

    const matchesCity = selectedCity === 'All' || c.city === selectedCity;

    const matchesDenom =
      selectedDenomination === 'All' ||
      c.denomination.toLowerCase().includes(selectedDenomination.toLowerCase());

    return matchesSearch && matchesProvince && matchesCity && matchesDenom;
  });

  const handleCopyDetails = (church: Church) => {
    const text = `${church.nepaliName} (${church.name})\nठेगाना: ${church.address}, ${church.city}\nपास्टर: ${church.pastor}\nशनिबारीय संगति: ${church.serviceTimings.saturdayWorship}\nसम्पर्क: ${church.contactPhone}\nJaiMasih.org Church Directory`;
    navigator.clipboard.writeText(text);
    setCopiedId(church.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddChurchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChurch.name || !newChurch.nepaliName || !newChurch.address) return;

    const created: Church = {
      id: `custom-ch-${Date.now()}`,
      name: newChurch.name,
      nepaliName: newChurch.nepaliName,
      city: newChurch.city,
      district: newChurch.district,
      province: newChurch.province,
      address: newChurch.address,
      pastor: newChurch.pastor || 'Pastor',
      foundedYear: Number(newChurch.foundedYear) || 2026,
      serviceTimings: {
        saturdayWorship: newChurch.saturdayWorship,
        wednesdayBibleStudy: newChurch.wednesdayStudy,
        fridayPrayer: newChurch.fridayPrayer,
      },
      contactPhone: newChurch.contactPhone,
      denomination: newChurch.denomination,
      seatingCapacity: 400,
      coordinates: { lat: 27.7172, lng: 85.324 },
      notes: 'समुदायद्वारा दर्ता गरिएको नयाँ मण्डली।',
    };

    const updated = [created, ...churches];
    setChurches(updated);

    try {
      const stored = localStorage.getItem('jaimasih_custom_churches');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('jaimasih_custom_churches', JSON.stringify([created, ...existing]));
    } catch (err) {
      console.error('Error saving custom church:', err);
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#9B1B30] to-[#7f1526] text-white rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] tracking-wider uppercase mb-2">
            <span>राष्ट्रिय मण्डली गाइड (Church Directory Nepal)</span>
            <span aria-hidden="true">·</span>
            <span>सातै प्रदेशका मण्डलीहरू</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            "One Platform, Many Churches"
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
            काठमाडौं उपत्यका, पोखरा, धरान, नारायणगढ, बुटवल, नेपालगन्ज र सुदूरपश्चिम लगायत नेपालभरिका मण्डलीहरूको प्रामाणिक खोजी, आराधना समय र पास्टरहरूको सम्पर्क विवरण।
          </p>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#c29d2b] text-[#2C3539] text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>आफ्नो मण्डली दर्ता / सिफारिस गर्नुहोस् (Register Church)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#F5F0EB] rounded-2xl p-5 shadow-xs space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#9B1B30] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="मण्डलीको नाम, पास्टर, सहर वा ठेगाना खोज्नुहोस् (Search by church, pastor, city, address)..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-[#e8e2d8] rounded-xl text-sm text-[#2C3539] focus:outline-none focus:ring-2 focus:ring-[#9B1B30]/30 focus:border-[#9B1B30]"
          />
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Province Filter */}
          <div>
            <label className="block text-xs font-medium text-[#2C3539]/70 mb-1">
              प्रदेश (Province):
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e8e2d8] rounded-lg text-xs text-[#2C3539] focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
            >
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'सबै प्रदेशहरू (All Provinces)' : p}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-xs font-medium text-[#2C3539]/70 mb-1">
              सहर (City):
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e8e2d8] rounded-lg text-xs text-[#2C3539] focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'सबै सहरहरू (All Cities)' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Denomination Filter */}
          <div>
            <label className="block text-xs font-medium text-[#2C3539]/70 mb-1">
              सम्प्रदाय (Denomination):
            </label>
            <select
              value={selectedDenomination}
              onChange={(e) => setSelectedDenomination(e.target.value)}
              className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e8e2d8] rounded-lg text-xs text-[#2C3539] focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
            >
              {denominations.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'सबै सम्प्रदाय (All Denominations)' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs text-[#2C3539]/60 pt-2 border-t border-[#F5F0EB]">
          <span>
            फेला परेका मण्डलीहरू: <strong>{filteredChurches.length}</strong>
          </span>
          {(selectedProvince !== 'All' || selectedCity !== 'All' || selectedDenomination !== 'All' || searchTerm !== '') && (
            <button
              onClick={() => {
                setSelectedProvince('All');
                setSelectedCity('All');
                setSelectedDenomination('All');
                setSearchTerm('');
              }}
              className="text-[#9B1B30] hover:underline cursor-pointer"
            >
              फिल्टर हटाउनुहोस् (Reset Filters)
            </button>
          )}
        </div>
      </div>

      {/* Churches Grid */}
      {filteredChurches.length === 0 ? (
        <div className="bg-white border border-[#F5F0EB] rounded-2xl p-12 text-center text-[#2C3539]/70">
          <MapPin className="w-10 h-10 text-[#9B1B30]/40 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-[#2C3539] mb-1">
            कुनै मण्डली फेला परेन
          </h3>
          <p className="text-xs text-[#2C3539]/60 mb-4">
            तपाईंले खोज्नुभएको स्थान वा नाममा कुनै मण्डली भेटिएन। कृपया अन्य सहर वा शब्द प्रयोग गर्नुहोस्।
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#9B1B30] text-white text-xs rounded-xl hover:bg-[#811a2c] cursor-pointer"
          >
            यो स्थानको मण्डली थप्नुहोस् (Add This Church)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChurches.map((church) => (
            <div
              key={church.id}
              className="bg-white border border-[#F5F0EB] hover:border-[#9B1B30]/30 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Location & Denomination metadata (Anti-slop clean text) */}
                <div className="flex items-center justify-between text-[11px] text-[#2C3539]/60 font-mono mb-2">
                  <span className="text-[#9B1B30] font-semibold">
                    {church.city} · {church.province}
                  </span>
                  <span>स्थापना: {church.foundedYear}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-[#2C3539] leading-snug">
                  {church.nepaliName}
                </h3>
                <h4 className="text-xs text-[#2C3539]/60 font-mono mb-3">
                  {church.name}
                </h4>

                {/* Details list */}
                <div className="space-y-2 text-xs text-[#2C3539]/80 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9B1B30] mt-0.5 shrink-0" />
                    <span>{church.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>पास्टर: <strong>{church.pastor}</strong></span>
                  </div>

                  <div className="flex items-start gap-2 bg-[#FDFBF7] p-2 rounded-lg border border-[#f0eae0]">
                    <Clock className="w-3.5 h-3.5 text-[#9B1B30] mt-0.5 shrink-0" />
                    <div className="space-y-0.5">
                      <div className="font-semibold text-[#9B1B30]">
                        शनिबार: {church.serviceTimings.saturdayWorship}
                      </div>
                      {church.serviceTimings.wednesdayBibleStudy && (
                        <div className="text-[11px] text-[#2C3539]/70">
                          बुधबार: {church.serviceTimings.wednesdayBibleStudy}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <a
                      href={`tel:${church.contactPhone}`}
                      className="hover:underline font-mono"
                    >
                      {church.contactPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#F5F0EB] flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedChurchForMap(church)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#9B1B30]" />
                  <span>नक्सा हेर्नुहोस् (Map)</span>
                </button>

                <button
                  onClick={() => handleCopyDetails(church)}
                  className="p-2 rounded-lg bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs transition-colors cursor-pointer"
                  title="विवरण कपी गर्नुहोस् (Copy Info)"
                >
                  {copiedId === church.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>

                {church.website && (
                  <a
                    href={church.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs transition-colors"
                    title="वेबसाइट हेर्नुहोस्"
                  >
                    <ExternalLink className="w-4 h-4 text-[#9B1B30]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Map Modal Simulation */}
      {selectedChurchForMap && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-[#F5F0EB] p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-[#9B1B30] uppercase">
                  {selectedChurchForMap.city} · {selectedChurchForMap.province}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3539]">
                  {selectedChurchForMap.nepaliName}
                </h3>
                <p className="text-xs text-[#2C3539]/60">
                  {selectedChurchForMap.address}
                </p>
              </div>
              <button
                onClick={() => setSelectedChurchForMap(null)}
                className="p-1.5 rounded-lg text-[#2C3539]/60 hover:text-black hover:bg-[#F5F0EB] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Stylized Visual Map Card */}
            <div className="w-full h-52 bg-gradient-to-br from-[#ebf3f7] via-[#f7f5ed] to-[#f4ebe3] rounded-xl border border-[#dcd6cc] relative flex items-center justify-center overflow-hidden mb-4 shadow-inner">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#9B1B30_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#9B1B30] text-white flex items-center justify-center mx-auto mb-2 shadow-lg animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#2C3539]">
                  {selectedChurchForMap.name}
                </div>
                <div className="text-[11px] text-[#2C3539]/60 font-mono mt-0.5">
                  Lat: {selectedChurchForMap.coordinates.lat}, Lng: {selectedChurchForMap.coordinates.lng}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#2C3539]/80 mb-6 bg-[#FDFBF7] p-3 rounded-xl border border-[#f0eae0]">
              <div>
                <strong>शनिबारीय संगति:</strong> {selectedChurchForMap.serviceTimings.saturdayWorship}
              </div>
              <div>
                <strong>पास्टर:</strong> {selectedChurchForMap.pastor}
              </div>
              <div>
                <strong>सम्पर्क:</strong> {selectedChurchForMap.contactPhone}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  selectedChurchForMap.name + ' ' + selectedChurchForMap.city + ' Nepal'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-[#9B1B30] hover:bg-[#811a2c] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>गुगल म्यापमा खोल्नुहोस् (Open Google Maps)</span>
              </a>
              <button
                onClick={() => setSelectedChurchForMap(null)}
                className="py-2.5 px-4 bg-[#F5F0EB] hover:bg-[#eae3db] text-[#2C3539] text-xs font-medium rounded-xl transition-colors cursor-pointer"
              >
                बन्द गर्नुहोस्
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggest / Register Church Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#F5F0EB] p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#F5F0EB]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#2C3539]">
                  नयाँ मण्डली दर्ता / सिफारिस
                </h3>
                <p className="text-xs text-[#2C3539]/60">
                  नेपाली ख्रिष्टिय सञ्जालमा आफ्नो स्थानीय मण्डली समावेश गर्नुहोस्
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#2C3539]/60 hover:text-black hover:bg-[#F5F0EB] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddChurchSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">
                    मण्डलीको नाम (नेपाली)*
                  </label>
                  <input
                    type="text"
                    required
                    value={newChurch.nepaliName}
                    onChange={(e) => setNewChurch({ ...newChurch, nepaliName: e.target.value })}
                    placeholder="उदा: अनुग्रह मण्डली"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">
                    Church Name (English)*
                  </label>
                  <input
                    type="text"
                    required
                    value={newChurch.name}
                    onChange={(e) => setNewChurch({ ...newChurch, name: e.target.value })}
                    placeholder="e.g. Grace Fellowship"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#9B1B30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">प्रदेश (Province)</label>
                  <select
                    value={newChurch.province}
                    onChange={(e) => setNewChurch({ ...newChurch, province: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg"
                  >
                    <option value="Bagmati">Bagmati</option>
                    <option value="Gandaki">Gandaki</option>
                    <option value="Koshi">Koshi</option>
                    <option value="Lumbini">Lumbini</option>
                    <option value="Karnali">Karnali</option>
                    <option value="Sudurpashchim">Sudurpashchim</option>
                    <option value="Madhesh">Madhesh</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">सहर (City)*</label>
                  <input
                    type="text"
                    required
                    value={newChurch.city}
                    onChange={(e) => setNewChurch({ ...newChurch, city: e.target.value })}
                    placeholder="उदा: Pokhara"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">जिल्ला (District)</label>
                  <input
                    type="text"
                    value={newChurch.district}
                    onChange={(e) => setNewChurch({ ...newChurch, district: e.target.value })}
                    placeholder="उदा: Kaski"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2C3539] mb-1">
                  विस्तृत ठेगाना (Detailed Address)*
                </label>
                <input
                  type="text"
                  required
                  value={newChurch.address}
                  onChange={(e) => setNewChurch({ ...newChurch, address: e.target.value })}
                  placeholder="उदा: रामघाट-१०, पोखरा"
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">पास्टर / अगुवाको नाम</label>
                  <input
                    type="text"
                    value={newChurch.pastor}
                    onChange={(e) => setNewChurch({ ...newChurch, pastor: e.target.value })}
                    placeholder="उदा: पास्टर सामुएल"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#2C3539] mb-1">सम्पर्क फोन नम्बर</label>
                  <input
                    type="text"
                    value={newChurch.contactPhone}
                    onChange={(e) => setNewChurch({ ...newChurch, contactPhone: e.target.value })}
                    placeholder="+977-98..."
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2C3539] mb-1">
                  शनिबार संगति समय (Saturday Worship Time)
                </label>
                <input
                  type="text"
                  value={newChurch.saturdayWorship}
                  onChange={(e) => setNewChurch({ ...newChurch, saturdayWorship: e.target.value })}
                  placeholder="10:00 AM – 01:00 PM"
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#e4ded6] rounded-lg font-mono"
                />
              </div>

              <div className="pt-3 border-t border-[#F5F0EB] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#F5F0EB] text-[#2C3539] rounded-lg hover:bg-[#eae3db] cursor-pointer"
                >
                  रद्द गर्नुहोस्
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9B1B30] text-white font-medium rounded-lg hover:bg-[#811a2c] shadow-xs cursor-pointer"
                >
                  मण्डली सुरक्षित गर्नुहोस् (Save Church)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
