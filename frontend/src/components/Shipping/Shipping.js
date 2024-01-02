import { Fragment, useState } from 'react';
import './Shipping.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfoAction } from '../../redux/actions/cartAction';
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@mui/icons-material';
import MetaData from '../layout/MetaData';
import { Country, State } from 'country-state-city';
import CheckoutSteps from './CheckoutSteps/CheckoutSteps';
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector(state => state.cartState);

    const [country, saveCountry] = useState(shippingInfo.country);
    const [state, saveState] = useState(shippingInfo.state);
    const [city, saveCity] = useState(shippingInfo.city);
    const [pinCode, savePinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, savePhoneNo] = useState(shippingInfo.phoneNo);
    const [address, saveAddress] = useState(shippingInfo.address);

    const submitShippingHandler = (e) => {
        e.preventDefault();

        const data = {
            country,
            state,
            city,
            pinCode,
            phoneNo,
            address
        }

        dispatch(saveShippingInfoAction(data));

        navigate('/order/confirm');
    }

    return (
        <Fragment>
            <MetaData title="Shipping" />
            <CheckoutSteps activeStep={0} />
            <div className="shipping-container">
                <div className="shipping-box">
                    <h2 className="shipping-heading">Shipping Details</h2>
                    <form className="shipping-form" onSubmit={submitShippingHandler}>
                        <div className="shippingCity">
                            <LocationCity />
                            <input type="text" name="city" placeholder="City" required value={city} onChange={(e) => saveCity(e.target.value)} />
                        </div>
                        <div className="shippingPhone">
                            <Phone />
                            <input type="number" name="phoneNo" placeholder="Phone Number" required value={phoneNo} onChange={(e) => savePhoneNo(e.target.value)} />
                        </div>
                        <div className="shippingPin">
                            <PinDrop />
                            <input type="number" name="pinCode" placeholder="Pin Code" required value={pinCode} onChange={(e) => savePinCode(e.target.value)} />
                        </div>
                        <div className="shippingAddress">
                            <Home />
                            <input type="text" name="address" placeholder="Your Address" required value={address} onChange={(e) => saveAddress(e.target.value)} />
                        </div>
                        <div className="shipping-country">
                            <Public />
                            <select name="country" required defaultValue={country ? country : "unset"} onChange={(e) => saveCountry(e.target.value)}>
                                <option disabled hidden value="unset">Select Your Country</option>
                                {Country && Country.getAllCountries().map((item) => (
                                    <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="shipping-state">
                            <TransferWithinAStation />
                            <select name="state" required defaultValue={country && state ? state : "unset"} onChange={(e) => saveState(e.target.value)}>
                                <option disabled hidden value="unset">Select Your State</option>
                                {country && State.getStatesOfCountry(country).map((item) => (
                                    <option value={item.name} key={item.isoCode}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="submit-shipping">
                            <button className="submit-btn" disabled={country && state ? false : true}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default Shipping;