import React, { useEffect, useState } from 'react';
import socketService from '../hooks/socketService';

function HomePage() {
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
    }, [uniqueInvitations]);

    // Convert the set to an array for rendering
    const invitations = Array.from(uniqueInvitations);
    console.log(invitations);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // You can customize the date format further
    };

    return (
        <div>
            <h1>Invitations</h1>
            <ul>
                {invitations.map((invitation, index) => (
                    <li key={index}>
                        Team Name: {invitation.teamName}, User: {invitation.user.email}, Time: {formatTimestamp(invitation.timestamp)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;
