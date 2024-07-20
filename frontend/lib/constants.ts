export const EditorCanvasDefaultCardTypes = {
    Email: { description: 'Send and email to a user', type: 'Action' },
    Condition: {
        description: 'Boolean operator that creates different conditions lanes.',
        type: 'Action',
    },
    AI: {
        description:
            'Use the power of AI to summarize, respond, create and much more.',
        type: 'Action',
    },
    Slack: { description: 'Send a notification to slack', type: 'Action' },
    'Google Drive': {
        description:
            'Connect with Google drive to trigger actions or to create files and folders.',
        type: 'Trigger',
    },
    Notion: { description: 'Create entries directly in notion.', type: 'Action' },
    'Custom Webhook': {
        description:
            'Connect any app that has an API key and send data to your applicaiton.',
        type: 'Action',
    },
    Discord: {
        description: 'Post messages to your discord server',
        type: 'Action',
    },
    'Google Calendar': {
        description: 'Create a calendar invite.',
        type: 'Action',
    },
    Trigger: {
        description: 'An event that starts the workflow.',
        type: 'Trigger',
    },
    Action: {
        description: 'An event that happens after the workflow begins',
        type: 'Action',
    },
    Wait: {
        description: 'Delay the next action step by using the wait timer.',
        type: 'Action',
    },
}