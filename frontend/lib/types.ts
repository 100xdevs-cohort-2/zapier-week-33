export type EditorCanvasTypes =
    | 'Email'
    | 'Condition'
    | 'AI'
    | 'Slack'
    | 'Google Drive'
    | 'Notion'
    | 'Custom Webhook'
    | 'Google Calendar'
    | 'Trigger'
    | 'Action'
    | 'Wait'


export type EditorCanvasCardType = {
    title: string
    description: string
    completed: boolean
    current: boolean
    metadata: any
    type: EditorCanvasTypes
}

export type EditorNode = EditorNodeType
export type EditorNodeType = {
    id: string
    type: EditorCanvasCardType['type']
    position: {
        x: number
        y: number
    }
    data: EditorCanvasCardType
}
export type EditorActions =
    | {
        type: 'LOAD_DATA'
        payload: {
            elements: EditorNode[]
            edges: {
                id: string
                source: string
                target: string
            }[]
        }
    }
    | {
        type: 'UPDATE_NODE'
        payload: {
            elements: EditorNode[]
        }
    }
    | { type: 'REDO' }
    | { type: 'UNDO' }
    | {
        type: 'SELECTED_ELEMENT'
        payload: {
            element: EditorNode
        }
    }
export type ConnectionProviderProps = {
    discordNode: {
        webhookURL: string
        content: string
        webhookName: string
        guildName: string
    }
    setDiscordNode: React.Dispatch<React.SetStateAction<any>>
    googleNode: {}[]
    setGoogleNode: React.Dispatch<React.SetStateAction<any>>
    notionNode: {
        accessToken: string
        databaseId: string
        workspaceName: string
        content: ''
    }
    workflowTemplate: {
        discord?: string
        notion?: string
        slack?: string
    }
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    slackNode: {
        appId: string
        authedUserId: string
        authedUserToken: string
        slackAccessToken: string
        botUserId: string
        teamId: string
        teamName: string
        content: string
    }
    setSlackNode: React.Dispatch<React.SetStateAction<any>>
    setWorkFlowTemplate: React.Dispatch<
        React.SetStateAction<{
            discord?: string
            notion?: string
            slack?: string
        }>
    >
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'
export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
    slackSpecial?: boolean
}