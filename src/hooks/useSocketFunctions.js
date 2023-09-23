import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvitation } from '../redux/features/invite/inviteSlice';

// Define a custom hook for handling invitations
function useInvitations(socketService) {
    const dispatch = useDispatch();
    const [uniqueInvitations, setUniqueInvitations] = useState(new Set());

    useEffect(() => {
        // Define the event listener function
        const handleInvitationSent = (data) => {
            // Check if the invitation team name is unique
            if (!uniqueInvitations.has(data.teamName)) {
                // If it's unique, add it to the state
                setUniqueInvitations((prevUniqueInvitations) => {
                    const updatedSet = new Set(prevUniqueInvitations);
                    updatedSet.add(data);
                    return updatedSet;
                });
            }

            dispatch(addInvitation(data));
        };

        // Add the event listener if it hasn't been added already
        if (!socketService.isInvitationSentListenerAdded()) {
            socketService.onInvitationSent(handleInvitationSent);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            // Remove the event listener
            socketService.removeInvitationSentListener(handleInvitationSent);
        };
    }, [uniqueInvitations, socketService]);

    // Convert the set to an array for rendering
    const invitations = Array.from(uniqueInvitations);

    return invitations;
}

export default {
    useInvitations
}