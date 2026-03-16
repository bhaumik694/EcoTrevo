import React , {useState,useEffect} from 'react'
import Select from 'react-select';
import ImageCarousel from './ImageCarousel'
import { FaMapMarkerAlt } from 'react-icons/fa';
import swap from '../assets/swap.png'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const countryOptions = [
  // India
  { value: 'DEL', label: 'DEL, Indira Gandhi International, Delhi' },
  { value: 'BOM', label: 'BOM, Chhatrapati Shivaji International, Mumbai' },
  { value: 'BLR', label: 'BLR, Kempegowda International, Bengaluru' },
  { value: 'MAA', label: 'MAA, Chennai International, Chennai' },
  { value: 'HYD', label: 'HYD, Rajiv Gandhi International, Hyderabad' },
  { value: 'CCU', label: 'CCU, Netaji Subhas Chandra Bose International, Kolkata' },

  // USA
  { value: 'JFK', label: 'JFK, John F. Kennedy International, New York' },
  { value: 'LAX', label: 'LAX, Los Angeles International, Los Angeles' },
  { value: 'SFO', label: 'SFO, San Francisco International, San Francisco' },
  { value: 'ORD', label: 'ORD, O\'Hare International, Chicago' },
  { value: 'ATL', label: 'ATL, Hartsfield-Jackson International, Atlanta' },

  // UK
  { value: 'LHR', label: 'LHR, Heathrow International, London' },
  { value: 'LGW', label: 'LGW, Gatwick Airport, London' },
  { value: 'MAN', label: 'MAN, Manchester Airport, Manchester' },

  // Europe
  { value: 'CDG', label: 'CDG, Charles de Gaulle International, Paris' },
  { value: 'FCO', label: 'FCO, Leonardo da Vinci-Fiumicino Airport, Rome' },
  { value: 'AMS', label: 'AMS, Amsterdam Schiphol Airport, Amsterdam' },
  { value: 'FRA', label: 'FRA, Frankfurt International, Frankfurt' },
  { value: 'ZRH', label: 'ZRH, Zurich International, Zurich' },
  { value: 'BCN', label: 'BCN, Barcelona–El Prat Airport, Barcelona' },

  // Middle East
  { value: 'DXB', label: 'DXB, Dubai International, Dubai' },
  { value: 'DOH', label: 'DOH, Hamad International, Doha' },
  { value: 'AUH', label: 'AUH, Abu Dhabi International, Abu Dhabi' },
  { value: 'RUH', label: 'RUH, King Khalid International, Riyadh' },
  { value: 'JED', label: 'JED, King Abdulaziz International, Jeddah' },

  // Asia-Pacific
  { value: 'HND', label: 'HND, Haneda International, Tokyo' },
  { value: 'NRT', label: 'NRT, Narita International, Tokyo' },
  { value: 'PEK', label: 'PEK, Beijing Capital International, Beijing' },
  { value: 'HKG', label: 'HKG, Hong Kong International, Hong Kong' },
  { value: 'ICN', label: 'ICN, Incheon International, Seoul' },
  { value: 'SIN', label: 'SIN, Changi International, Singapore' },
  { value: 'SYD', label: 'SYD, Sydney Kingsford Smith International, Sydney' },
  { value: 'MEL', label: 'MEL, Melbourne Tullamarine Airport, Melbourne' },

  // Africa
  { value: 'JNB', label: 'JNB, O. R. Tambo International, Johannesburg' },
  { value: 'CPT', label: 'CPT, Cape Town International, Cape Town' },
  { value: 'CAI', label: 'CAI, Cairo International, Cairo' },
  { value: 'ADD', label: 'ADD, Addis Ababa Bole International, Addis Ababa' },
  { value: 'NBO', label: 'NBO, Jomo Kenyatta International, Nairobi' },

  // South America
  { value: 'GRU', label: 'GRU, São Paulo-Guarulhos International, São Paulo' },
  { value: 'EZE', label: 'EZE, Ministro Pistarini International, Buenos Aires' },
  { value: 'BOG', label: 'BOG, El Dorado International, Bogotá' },
  { value: 'LIM', label: 'LIM, Jorge Chávez International, Lima' },
  { value: 'SCL', label: 'SCL, Arturo Merino Benítez International, Santiago' },

  // Oceania
  { value: 'AKL', label: 'AKL, Auckland International, Auckland' },
  { value: 'WLG', label: 'WLG, Wellington International, Wellington' },

  // Russia
  { value: 'SVO', label: 'SVO, Sheremetyevo International, Moscow' },
  { value: 'DME', label: 'DME, Domodedovo International, Moscow' },

  // Additional major cities can be added as needed
];

const colors = [
  'rgba(80, 209, 238, 0.31)', // Color for image1
  'rgba(241, 181, 86, 0.35)', // Color for image2
  'rgba(74, 110, 146, 0.31)', // Color for image3
];

const Home = () => {
  
const [fromLocation, setFromLocation] = useState(null);
const [toLocation, setToLocation] = useState(null);
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [currentIndex, setCurrentIndex] = useState(0);
const [backgroundColor, setBackgroundColor] = useState(colors[0]);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % colors.length;
      setBackgroundColor(colors[nextIndex]);
      return nextIndex;
    });
  }, 5000);

  return () => clearInterval(interval);
}, []);


const handleStartDateChange = (event) => {
  const selectedDate   
= new Date(event.target.value);

  // Ensure the start date is not in the past
  if (selectedDate <= new Date()) {
    // Handle past date selection (e.g., show an error message)
    toast.error('Start date cannot be in the past!', {
      theme: "colored",
      autoClose: 2000,
      position: 'bottom-right',
  });
    return;
  }

  // Ensure the start date is earlier than the end date
  if (endDate && selectedDate >= new Date(endDate)) {
    // Handle invalid date range (e.g., show an error message)
    toast.error('Start date must be earlier than the end date!', {
      theme: "colored",
      autoClose: 2000,
      position: 'bottom-right',
  });
    return;
  }

  setStartDate(event.target.value);
};

const handleEndDateChange = (event) => {
  const selectedDate = new Date(event.target.value);

  // Ensure the end date is not in the past
  if (selectedDate <= new Date()) {
    // Handle past date selection (e.g., show an error message)
    toast.error('End date must be later than the start date!', {
      theme: "colored",
      autoClose: 2000,
      position: 'bottom-right',
  });
    return;
  }

  // Ensure the end date is later than the start date
  if (startDate && selectedDate <= new Date(startDate)) {
    // Handle invalid date range (e.g., show an error message)

    toast.error('End date must be later than the start date!', {
      theme: "colored",
      autoClose: 2000,
      position: 'bottom-right',
  });
    return;
  }

  setEndDate(event.target.value);
};

  return (
    <>
    <ToastContainer />
    <div className="relative h-screen overflow-hidden">
      <ImageCarousel />

      <div className='absolute z-10 text-white top-48 left-36 font-poppins font-extrabold text-6xl capitalize'>
        Its A Big World Out There , <br /> GO EXPLORE IT!
      </div>
       
      <div className='flex items-center z-10 absolute top-96 left-56 gap-6'>

        {/* From Card */}
        <div style={{ backgroundColor: backgroundColor }} className="backdrop-filter backdrop-blur-md border border-white/30 rounded-[12px] p-4 w-64 text-white">
          <div className="text-center">
            <p className="uppercase font-bold text-lg">From</p>
            <p className='bg-white h-1 mx-4'></p>
            <div className="flex items-center justify-center mt-2 pt-2">
              <FaMapMarkerAlt className="mr-2" />
              <Select
                className='!appearance-none !bg-transparent text-black w-full cursor-pointer'
                options={countryOptions}
                value={fromLocation}
                onChange={setFromLocation}
                placeholder="Select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: backgroundColor,
                    backdropFilter: 'blur(4px)',
                    borderColor: 'rgba(80,209,238,0.31)',
                    color: 'white',
                    boxShadow: 'none',
                    ':hover': { borderColor: 'rgba(80,209,238,0.31)' },
                  }),
                  singleValue: (base) => ({ ...base, color: 'white' }),
                  placeholder: (base) => ({ ...base, color: 'white' }),
                  dropdownIndicator: (base) => ({ ...base, color: 'white' }),
                  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
                  input: (base) => ({ ...base, color: 'white' }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(10,20,40,0.95)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? 'rgba(80,209,238,0.31)' : 'transparent',
                    color: 'white',
                    ':hover': { backgroundColor: 'rgba(80,209,238,0.31)' },
                  }),
                }}
              />
            </div>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <img src={swap} alt="swap" />
        </div>

        {/* To Card */}
        <div style={{ backgroundColor: backgroundColor }} className="backdrop-blur-md border border-white/30 rounded-[12px] p-4 w-64 text-white">
          <div className="text-center">
            <p className="uppercase font-bold text-lg">To</p>
            <p className='bg-white h-1 mx-4'></p>
            <div className="flex items-center justify-center mt-2 pt-2">
              <FaMapMarkerAlt className="mr-2" />
              <Select
                className='!appearance-none !bg-transparent text-black w-full cursor-pointer'
                options={countryOptions}
                value={toLocation}
                onChange={setToLocation}
                placeholder="Select"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: backgroundColor,
                    backdropFilter: 'blur(4px)',
                    borderColor: 'rgba(80,209,238,0.31)',
                    color: 'white',
                    boxShadow: 'none',
                    ':hover': { borderColor: 'rgba(80,209,238,0.31)' },
                  }),
                  singleValue: (base) => ({ ...base, color: 'white' }),
                  placeholder: (base) => ({ ...base, color: 'white' }),
                  dropdownIndicator: (base) => ({ ...base, color: 'white' }),
                  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
                  input: (base) => ({ ...base, color: 'white' }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(10,20,40,0.95)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected ? 'rgba(80,209,238,0.31)' : 'transparent',
                    color: 'white',
                    ':hover': { backgroundColor: 'rgba(80,209,238,0.31)' },
                  }),
                }}
              />
            </div>
          </div>
        </div>

        {/* Dates Card */}
        <div style={{ backgroundColor: backgroundColor }} className="backdrop-blur-md border border-white/30 rounded-[12px] p-4 w-64 text-white">
          <div className="text-center">
            <p className="uppercase font-bold text-lg">Dates</p>
            <p className='bg-white h-1 mx-4'></p>
            <div className='flex flex-col p-2'>
              <div className="flex items-center justify-center gap-8 mt-2">
                <input
                  style={{ backgroundColor: 'transparent', colorScheme: 'dark' }}
                  className='p-2 w-full text-white'
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
              </div>
              <div className='uppercase font-bold text-sm mt-1'>To</div>
              <div className="flex items-center justify-center gap-8 mt-2">
                <input
                  style={{ backgroundColor: 'transparent', colorScheme: 'dark' }}
                  className='p-2 w-full text-white'
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='z-10 absolute bottom-10 left-[44%]'>
        <button className='bg-white/80 shadow-[0px_1.526px_1.526px_0px_rgba(0,0,0,0.2)] py-4 px-6 font-bold rounded-br-[32px] rounded-tl-[32px] hover:rounded-tr-[32px] hover:rounded-bl-[32px] hover:rounded-br-[0px] hover:rounded-tl-[0px]'>Book Now</button>
      </div> 
      
    </div>
    </>
  )
}

export default Home
