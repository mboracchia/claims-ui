import {Claim, ClaimFile, ClaimState, ClaimStates, Client, Employee, Role, User} from "../models";

const loremIpsum: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque, magna sit amet ultricies sodales, metus tortor pharetra elit, ut malesuada nisi purus et lorem. Sed tempor dapibus mi ac porta. Sed at hendrerit justo. Donec ac ante at eros dictum cursus. Suspendisse placerat ullamcorper ipsum, ac vehicula ante finibus non. Duis quis venenatis turpis. Donec tristique pretium ligula, molestie elementum lorem auctor vel. Vivamus pharetra vel ante in dapibus. Aenean ullamcorper pretium lorem vitae placerat. Vivamus vel porta lacus. In eros nunc, condimentum vel mauris vel, feugiat gravida mi."

export const mockedRole: Role = {
    id: 0,
    name: 'Role Name'
}

export const mockedClaimFile: ClaimFile = {
    id: 0,
    name: 'File Name',
    // content: new File([new BlobPart()], 'public/favicon.ico')
}

export const mockedClaimStateNew: ClaimState = {
    id: 0,
    value: ClaimStates.NEW,
    handlers: mockedRole,
    nextStates: []
}

export const mockedClaimStateInReview: ClaimState = {
    id: 1,
    value: ClaimStates.IN_REVIEW,
    handlers: mockedRole,
    nextStates: []
}

export const mockedClaimStateClosed: ClaimState = {
    id: 2,
    value: ClaimStates.REJECTED,
    handlers: mockedRole,
    nextStates: []
}

export const mockedClaimStateAccepted: ClaimState = {
    id: 3,
    value: ClaimStates.ACCEPTED,
    handlers: mockedRole,
    nextStates: []
}

export const mockedUser: User = {
    id: 0,
    username: 'username',
    password: 'password'
}

export const mockedClient: Client = {
    id: 1,
    username: "concesionario",
    password: "password",
    company: 'Company Name'
}

export const mockedEmployee: Employee = {
    id: 2,
    username: "ventas",
    password: "password",
    role: mockedRole
}

export const mockedClaim: Claim = {
    id: 0,
    title: 'Claim Title',
    description: `Claim Description: ${loremIpsum}`,
    vins: [0, 1, 2, 3],
    creator: mockedUser,
    creationDate: new Date(Date.now()),
    lastUpdateDate: new Date(Date.now()),
    state: mockedClaimStateNew,
    stateHistory: [],
    circulars: [{
        ...mockedClaimFile
    }]
}

export const mockedClaims: Claim[] = [
    {...mockedClaim},
    {...mockedClaim, id: 1, vins: [4, 5, 6], state: mockedClaimStateInReview},
    {...mockedClaim, id: 2, vins: [7], state: mockedClaimStateClosed},
    {...mockedClaim, id: 3, vins: [8, 9, 10, 11, 12, 13], state: mockedClaimStateAccepted}
]