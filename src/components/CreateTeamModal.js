import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { closeModal, updateFormData, selectCurrentStep, incrementStep } from '../redux/features/team/teamSlice';

const CreateTeamModal = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector(selectCurrentStep);
    const { register, handleSubmit } = useForm();
    const formData = useSelector((state) => state.teams.formData);

    const handleNextStep = () => {
        // Handle logic to move to the next step
        dispatch(updateFormData(formData)); // Update the form data in the Redux store
        // Increment the current step
        dispatch(incrementStep()); // Add this line to increment the step
    };

    return (
        <div className="modal-box">
            <form onSubmit={handleSubmit(handleNextStep)}>
                {currentStep === 1 && (
                    <div>
                        <label>Team Name</label>
                        <input {...register('teamName')} />
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <label>Team Category</label>
                        <input {...register('teamCategory')} />
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <label>Logo</label>
                        <input {...register('logo')} />
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <label>Description</label>
                        <input {...register('description')} />
                    </div>
                )}
                {currentStep < 4 && (
                    <button type="submit">Next</button>
                )}
            </form>
        </div>
    );
};

export default CreateTeamModal;
