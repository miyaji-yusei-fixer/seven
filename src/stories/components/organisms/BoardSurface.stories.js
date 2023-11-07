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
        playerHands: ["s1", "hk", "c7", "dj", "j1"],
        hiddenHands: 5,
        discard: "s1"
    },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
    args: {
        playerHands: ["s1", "hk", "c7", "dj", "j1"],
        hiddenHands: 5,
        discard: "s1"
    },
};
