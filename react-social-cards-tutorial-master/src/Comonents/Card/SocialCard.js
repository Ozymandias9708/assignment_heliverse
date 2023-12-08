import './SocialCard.css';
import Location from '../Location/Location';
import Phone from '../Phone/Phone';

const SocialCard = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">{userData.first_name} {userData.first_name}</div>
            <div className="card__body">
                <Location location={userData.gender} domain={userData.domain} available={userData.available?"Yes":"No"}/>
                <Phone email={userData.email}/>
                {/* <Phone number={userData.cell} type="Cell"/> */}
                <div className="card__image"><img src={userData.avatar}/></div>
            </div>

        </div>
    )
};

export default SocialCard;