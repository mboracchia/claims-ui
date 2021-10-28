export type Claim = {
    id: number,
    title: string,
    description: string,
    vins: number[],
    creator: User,
    creationDate: Date,
    lastUpdateDate: Date,
    state: ClaimState,
    stateHistory: ClaimState[],
    circulars: ClaimFile[],
    otherFiles?: ClaimFile[]
}

export type ClaimFile = {
    id: number,
    name: string,
    // content: File
}

export type ClaimState = {
    id: number,
    value: ClaimStates,
    handlers: Role,
    nextStates: ClaimState[]
}

export type User = {
    id: number,
    username: string,
    password: string
}

export type Client = User & {
    company: string
}

export type Employee = User & {
    role: Role
}

export type Role = {
    id: number,
    name: string
}

export enum ClaimStates {
    NEW = 'Nuevo - Esperando Revisión',
    IN_REVIEW = 'Siendo Revisado por Área de Ventas',
    ACCEPTED = 'Aceptado',
    REJECTED = 'Rechazado'
}