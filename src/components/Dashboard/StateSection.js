import { Box, styled } from "@mui/material";

export default function StateSection({ isOffline, isSubmitting }) {
    return (
        <SpinnerContainer>
            {isSubmitting ? (
                <i>Submitting, please wait...</i>
            ) : isOffline ? (
                "Offline"
            ) : null}
        </SpinnerContainer>
    );
}

const SpinnerContainer = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 25px;
    font-style: italic;
`;
