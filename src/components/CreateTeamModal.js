import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { closeModal, updateFormData, selectCurrentStep, incrementStep, createNewTeam } from '../redux/features/team/teamSlice';
import { toast } from 'react-toastify';

const CreateTeamModal = ({ closeModal }) => {
    const dispatch = useDispatch();
    const currentStep = useSelector(selectCurrentStep);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()
    const formData = useSelector((state) => state.teams.formData);
    const [isSuccess, setIsSuccess] = useState(false);
    const [close, setClose] = useState(true)
    

    const handleNextStep = async (data) => {
    // Handle logic to move to the next step
    if (currentStep === 4) {
      try {
        const response = await dispatch(createNewTeam(data));
        const statusCode = response.payload?.statusCode;

        if (statusCode === 200) {
             setClose(false) 
          reset();
          toast.success('Team created successfully!');
          setIsSuccess(true);
        } else {
          toast.error('Team creation failed.');
        }
      } catch (error) {
        console.error('Team creation error:', error);
      }
    } else {
      dispatch(updateFormData(formData));
      dispatch(incrementStep());
    }
  };
    const handleCancel = () => {
        setClose(false); // Close the modal when "Cancel" is clicked
        closeModal(); // Close the modal via the prop callback
    };
    return (
        <div className="modal-box bg-[#FFFFFF] border-[1px] border-[#A5ECD7] p-8 w-[35vw]">
            <h2 className='text-[#000000] font-bold text-lg mb-6'>Create a new team</h2>

            <form onSubmit={handleSubmit(handleNextStep)}>
                {currentStep === 1 && (
                    <div className="flex flex-col">
                        <label className='text-[#AEB7B4] font-bold text-[14px] mb-2 '>Team Name</label>
                        <input
                            type="text"
                            placeholder=""
                            className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                            {...register("teamName", { required: true })}
                        />
                        {errors.teamName && <span className="text-red-500 text-[12px] mt-[4px]">Team name is required</span>}
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="flex flex-col">
                        <label className="text-[#AEB7B4] font-bold text-[14px] mb-2">Team Category</label>
                        <input
                            type="text"
                            placeholder=""
                            className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                            {...register("teamCategory", { required: true })}
                        />
                        {errors.teamCategory && <span className="text-red-500 text-[12px] mt-[4px]">Team category is required</span>}
                    </div>
                )}
                {currentStep === 3 && (
                    <div className="flex flex-col">
                        <label className="text-[#AEB7B4] font-bold text-[14px] mb-2">Team logo</label>
                        <input
                            type="url"
                            placeholder=""
                            className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                            {...register("teamLogo", { required: true })}
                        />
                        {errors.teamLogo && <span className="text-red-500 text-[12px] mt-[4px]">Team category is required</span>}
                    </div>
                )}
                {currentStep === 4 && (
                    <div className="flex flex-col">
                        <label className="text-[#AEB7B4] font-bold text-[14px] mb-2">Description</label>
                        <textarea
                            type="text"
                            cols={5}
                            placeholder=""
                            className="border-[#0A6AF6] border-[2px] rounded-lg w-[100%] max-w-lg input bg-[#FEFEFE]"
                            {...register("description", { required: true })}
                        />
                        {errors.description && <span className="text-red-500 text-[12px] mt-[4px]">Description is required</span>}
                    </div>
                )}
                {currentStep <= 4 && (
                    <div className="flex items-center justify-between mt-6">
                        <button onClick={handleCancel} className="btn capitalize border-[2px] border-[#000] font-bold text-md px-12 rounded-full bg-transparent text-[#000] hover:text-[#fff]">Cancel</button>
                        <button className="btn capitalize bg-[#0A6AF6] border-[#0A6AF6] text-[#fff] font-bold text-md px-12 rounded-full" type="submit">Continue</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateTeamModal;
