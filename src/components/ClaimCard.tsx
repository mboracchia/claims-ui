import React from "react";
import {Claim, ClaimStates} from "../models";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Chip,
    Divider,
    ListItem,
    Typography
} from "@mui/material";
import {CalendarToday, Circle, Delete, DirectionsCar, Edit, Tag} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

export type ClaimCardProps = {
    claim: Claim,
    userIsEmployee?: boolean
    handleDelete: (claimId: number) => void
}

export default function ClaimCard(props: ClaimCardProps) {
    const chipData = [
        {id: 0, icon: <Tag/>, label: 'ID', content: props.claim.id},
        {id: 1, icon: <DirectionsCar/>, label: 'VINs', content: props.claim.vins.length},
        {id: 0, icon: <CalendarToday/>, label: 'Fecha de Creación', content: props.claim.creationDate.toLocaleString()},
    ]

    const history = useHistory();

    function getStateChipColor(claimState: ClaimStates) {
        switch (claimState) {
            case ClaimStates.NEW: return 'primary';
            case ClaimStates.IN_REVIEW: return 'warning';
            case ClaimStates.REJECTED: return 'error';
            case ClaimStates.ACCEPTED: return 'success';
            default: return 'primary';
        }
    }

    return (
        <Box mb={2}>
            <Card>
                <CardActionArea onClick={() => history.push(`/claim/${props.claim.id}`)}>
                    <CardContent>
                        <Box mb={1} sx={{
                            display: 'inline-flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <Box>
                                <Typography variant="h6" component="div">
                                    {props.claim.title}
                                </Typography>
                                <Box sx={{ display: 'inline-flex' }}>
                                    {
                                        chipData.map(data => {
                                            return (
                                                <ListItem disableGutters key={data.id} sx={{ marginRight: '8px' }}>
                                                    <Chip
                                                        size="small"
                                                        icon={data.icon}
                                                        label={data.label + ': ' + data.content}
                                                        sx={{ backgroundColor: 'transparent' }}
                                                    />
                                                </ListItem>
                                            );
                                        })
                                    }
                                </Box>
                            </Box>
                            {
                                !props.userIsEmployee &&
                                <Box>
                                    <Chip
                                        size={'small'}
                                        icon={<Circle/>}
                                        label={props.claim.state.value}
                                        variant={'outlined'}
                                        color={getStateChipColor(props.claim.state.value)}
                                    />
                                </Box>
                            }
                        </Box>
                        <Divider sx={{ marginBottom: '16px' }}/>
                        <Typography variant="body2" color="text.secondary">
                            {props.claim.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {
                    !props.userIsEmployee &&
                    <CardActions sx={{justifyContent: 'flex-end'}}>
                        <Button color="warning"
                                startIcon={<Delete/>}
                                onClick={() => props.handleDelete}
                        >
                            Cerrar Reclamo
                        </Button>
                    </CardActions>
                }
            </Card>
        </Box>
    );
}