import './Location.css';

const Location = ({ location , domain, available}) => {
  return <div className="location">
      <p>{location}</p>
      <p>{domain}</p>
      <p>Available: {available}</p>
      
    </div>;
};

export default Location;
