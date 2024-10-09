import { AiFillGithub, AiOutlineStar, AiTwotoneCalendar, AiFillStar } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { FiExternalLink } from "react-icons/fi"
import "./submission-details.styles.scss"
import { useNavigate, useParams } from "react-router-dom";
import { selectSubmissionById } from '../../store/Submission-List/submission-list.selector'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toggleFavouriteAction, deleteSubmissionAction } from '../../store/Submission-List/submission-list.action'
import { Modal } from '@mui/material'
import { useState } from 'react'

const SubmissionDetails = () => {
    const { id } = useParams();
    const submission = useSelector(selectSubmissionById(id));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submissionList = useSelector(state => state.submissionList.submissionList);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!submission) {
        return <Navigate to="/" />
    }

    const { title, description, summary, coverImage, hackathonName, hackathonStartDate, hackathonEndDate, githubSubmissionLink, otherLinks, timeOfSubmission } = submission;
    const time = new Date(timeOfSubmission);
    const date = time.getDate();
    const month = time.toLocaleDateString('en-us', { month: 'long' });

    const startDate = new Date(hackathonStartDate);
    const endDate = new Date(hackathonEndDate);
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleDateString('en-us', { month: 'short' });
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleDateString('en-us', { month: 'short' });
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const hackstartdate = startDay + " " + startMonth + " " + startYear;
    const hackenddate = endDay + " " + endMonth + " " + endYear;
    const makeValidUrl = (url) => {
        if (!url.includes("http")) {
            return "https://" + url;
        }
        return url;
    }

    const checkImageType = (image) => {
        return image;
    };



    const handleFavorite = () => {
        dispatch(toggleFavouriteAction(submissionList, submission.id))
    }

    return (


        <div>
            <div className="submission-header-container" >
                <div className='submission-subcontainer'>
                    <div className='submission-title-container'>
                        <img className='submission-img' src={checkImageType(coverImage)} alt="" />
                        <h2 className='submission-title'>{title}</h2>
                    </div>
                    <p className='submission-desc'>{summary}</p>
                    <div className='icon-container'>
                        <div className='star-icon'>
                            {submission.isFavourite ? <AiFillStar size={20}
                                onClick={handleFavorite}
                            /> : <AiOutlineStar size={20}
                                onClick={handleFavorite} />}
                        </div>
                        <div className='vertical-line-icon'></div>
                        <div className='calendar-icon'>
                            <AiTwotoneCalendar size={20} /> <span>
                                {date} {month}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='buttons-container'>
                    <button className='icon-button'
                        onClick={() => (
                            navigate(`/edit/${submission.id}`)
                        )}
                    >
                        <BsFillPencilFill /> Edit
                    </button>
                    <button className='icon-button'
                        onClick={handleOpen}

                    > <MdDelete />Delete</button>
                </div>

            </div>
            <div className='submission-body-container'>
                <div className='submission-summary-container'>
                    <span className='submission-summary-title'>Description</span>
                    <p id='summary-body'>
                        {description}
                    </p>
                </div>

                <div className='submission-info-container'>
                    <span style={{
                        marginTop: '0px'
                    }}>Hackathon</span>
                    <h2 className='hackathon-title'>{hackathonName}</h2>
                    <div className='date-container'>
                        <AiTwotoneCalendar id="date-icon" size={25} /> <div id='hackathon-date'>{hackstartdate} - {hackenddate}</div>
                    </div>
                    <div>
                        <a href={makeValidUrl(githubSubmissionLink)} target="blank"><button className='icon-link'><AiFillGithub size={25} /> &nbsp; GitHub Repository</button></a>
                        <a href={makeValidUrl(otherLinks)} target="blank">
                            <button className='icon-link'><FiExternalLink size={25} /> &nbsp; Other Link</button></a>
                    </div>
                </div>

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-container'>
                    <div className='modal-content'>
                        <h2 id="modal-title">Delete submission</h2>
                        <p id="modal-description">
                            The action is irreversible. Are you sure you want to delete this submission?
                        </p>
                    </div>

                    <div className='modal-buttons'>
                        <button className='modal-button' onClick={handleClose}>Cancel</button>
                        <button className='modal-button' onClick={() => {
                            dispatch(deleteSubmissionAction(submissionList, submission.id));
                            navigate('/');
                        }}>Delete</button>
                    </div>
                </div>
            </Modal>

        </div>



    )
};

export default SubmissionDetails;