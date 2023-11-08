import BoardSurface from '@/components/organisms/BoardSurface.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
    title: 'Components/Organisms/BoardSurface',
    component: BoardSurface,
    tags: ['autodocs'],
    render: (args, { argTypes }) => ({
        props: Object.keys(argTypes),
        components: { BoardSurface },
        template: '<board-surface v-bind="$props" />',
    }),
    argTypes: {
        playerHands: [
            "s1",
            "h3",
            "c6",
            "sj",
            "cj",
            "dj",
            "hk"
        ],
        hiddenHands: 7,
        deckSheets: 37,
        discard: "ck"
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        playerHands: [
            "s1",
            "h3",
            "c6",
            "sj",
            "cj",
            "dj",
            "hk"
        ],
        hiddenHands: 5,
        deckSheets: 37,
        discard: "ck"
    },
};
