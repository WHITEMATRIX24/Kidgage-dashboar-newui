import React, { useEffect, useState } from 'react'
import './Campaigns.css';
import { faPenToSquare, faPlus, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';





function Campaigns() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/api/banners");
            //   console.log(response.data);
            setBanners(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching banners:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

        console.log(banners);
        
    return (

        <div className='campaign-container'>
            <div className='campaign-heading'> <h1 className="campaign-heading-h3"> Campaigns</h1>
            </div>
            <div className='campaign-box-container'>
                {loading ? (
                    <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}> Loading...</h1>
                ) : banners.length > 0 ? (<div className='tabs'>
                    <div className='tab'>
                        <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch"></input>
                        <label for="tab-1" class="tab-label">Home Banner</label>

                        <div className='tab-content'>
                            <div className='campaign-button-container'>
                                <button className='add-campaign-button'><FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />Add campaign</button>
                            </div>
                            {banners.map((item) => (<div className='grid-banner-container'>
                                <div className='grid-item '><img className='banner-img' src={item.imageUrl} alt='no image' /></div>
                                <div className='grid-item '>
                                    <div className='campaign-details'>
                                        <p>{item.title}</p>
                                        <p>{item.bookingLink}</p>
                                        <div className='campaign-date-container' > <p>Starting Date :{item.startDate}</p> <p>Ending Date :{item.endDate}</p></div>
                                    </div>
                                </div>
                                <div className='grid-item '>
                                    <div className='campaign-actions'>
                                        <label class="switch">
                                            <input type='checkbox'></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} size='2x' />
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} size='2x' />

                                    </div>
                                </div>

                            </div>))}

                        </div>
                    </div>

                    <div className='tab'>
                        <input type="radio" name="css-tabs" id="tab-2" checked class="tab-switch"></input>
                        <label for="tab-2" class="tab-label">Desktop Banner</label>
                        <div className='tab-content'>

                            <div className='campaign-button-container'>
                                <button className='add-campaign-button'><FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />Add campaign</button>
                            </div>
                            <div className='grid-banner-container'>
                                <div className='grid-item '><img className='banner-img' src='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg' alt='no image' /></div>
                                <div className='grid-item '>
                                    <div className='campaign-details'>
                                        <p>Kidga Accedemy phy activity</p>
                                        <p>Link : https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/</p>
                                        <div className='campaign-date-container' > <p>Starting Date :</p> <p>Ending Date :</p></div>
                                    </div>
                                </div>
                                <div className='grid-item '>

                                    <div className='campaign-actions'>
                                        <label class="switch">
                                            <input type='checkbox'></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} size='2x' />
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} size='2x' />

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='tab'>
                        <input type="radio" name="css-tabs" id="tab-3" checked class="tab-switch"></input>
                        <label for="tab-3" class="tab-label">Mobile Banner</label>
                        <div className='tab-content'>

                            <div className='campaign-button-container'>
                                <button className='add-campaign-button'><FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff", }} />Add campaign</button>
                            </div>
                            <div className='grid-banner-container'>
                                <div className='grid-item '><img className='banner-img' src='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg' alt='no image' /></div>
                                <div className='grid-item '>
                                    <div className='campaign-details'>
                                        <p>Kidga Accedemy phy activity</p>
                                        <p>Link : https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/</p>
                                        <div className='campaign-date-container' > <p>Starting Date :</p> <p>Ending Date :</p></div>
                                    </div>
                                </div>
                                <div className='grid-item '>

                                    <div className='campaign-actions'>
                                        <label class="switch">
                                            <input type='checkbox'></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} size='2x' />
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} size='2x' />

                                    </div>
                                </div>

                            </div>
                            <div className='grid-banner-container'>
                                <div className='grid-item '><img className='banner-img' src='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg' alt='no image' /></div>
                                <div className='grid-item '>
                                    <div className='campaign-details'>
                                        <p>Kidga Accedemy phy activity</p>
                                        <p>Link : https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/</p>
                                        <div className='campaign-date-container' > <p>Starting Date :</p> <p>Ending Date :</p></div>
                                    </div>
                                </div>
                                <div className='grid-item '>

                                    <div className='campaign-actions'>
                                        <label class="switch">
                                            <input type='checkbox'></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} size='2x' />
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} size='2x' />

                                    </div>
                                </div>

                            </div>
                            <div className='grid-banner-container'>
                                <div className='grid-item '><img className='banner-img' src='https://cdn.pixabay.com/photo/2014/03/12/18/45/boys-286245_1280.jpg' alt='no image' /></div>
                                <div className='grid-item '>
                                    <div className='campaign-details'>
                                        <p>Kidga Accedemy phy activity</p>
                                        <p>Link : https://pixabay.com/photos/boys-kids-children-happy-sitting-286245/</p>
                                        <div className='campaign-date-container' > <p>Starting Date :</p> <p>Ending Date :</p></div>
                                    </div>
                                </div>
                                <div className='grid-item '>

                                    <div className='campaign-actions'>
                                        <label class="switch">
                                            <input type='checkbox'></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#106cb1", }} size='2x' />
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#d70404", }} size='2x' />

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                ) : <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: '30px', marginTop: '70px' }}>
                    Nothing to Display   </p>}


            </div>
        </div>
    )
}

export default Campaigns