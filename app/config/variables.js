export const task_status = [
    { label: 'Open', value: 'OPEN', search: 'Open' },
    { label: 'In Progress', value: 'IN_PROGRSS', search: 'In Progress' },
    { label: 'Paused', value: 'PAUSED', search: 'Paused' },
    { label: 'Completed', value: 'COMPLETED', search: 'Completed' },
    { label: 'Reopen', value: 'REOPEN', search: 'Completed' },
    { label: 'Done', value: 'DONE', search: 'Completed' },
]

export const task_status_obj = {
    OPEN: 'Open',
    IN_PROGRSS: 'In Progress',
    PAUSED: 'Paused',
    COMPLETED: 'Completed',
    REOPEN: 'Reopen',
    DONE: 'Done',
}
export const task_status_colors = {
    OPEN: '#FFA500',     // Orange
    IN_PROGRESS: '#FFFF00', // Yellow
    PAUSED: '#808080',    // Gray
    COMPLETED: '#0000FF', // Blue
    REOPEN: '#FF0000',    // Red
    DONE: '#008000',  // Green
}
